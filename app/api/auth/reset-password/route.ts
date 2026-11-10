import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const token = typeof body.token === "string" ? body.token.trim() : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!token || token.length > 256) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (password.length < 12 || password.length > 128) {
      return NextResponse.json(
        { error: "Your password must be between 12 and 128 characters." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const now = new Date();
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { tokenHash: hashToken(token) },
      include: {
        staff: {
          select: {
            id: true,
            email: true,
            isActive: true,
          },
        },
      },
    });

    if (
      !tokenRecord ||
      tokenRecord.usedAt ||
      tokenRecord.expiresAt <= now ||
      !tokenRecord.staff.isActive
    ) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.$transaction(async (tx) => {
      // Claim the token atomically so it cannot be used twice.
      const claimed = await tx.passwordResetToken.updateMany({
        where: {
          id: tokenRecord.id,
          usedAt: null,
          expiresAt: { gt: now },
        },
        data: { usedAt: now },
      });

      if (claimed.count !== 1) {
        throw new Error("RESET_TOKEN_ALREADY_USED");
      }

      // Only the password hash is changed. Existing 2FA settings remain intact.
      await tx.staff.update({
        where: { id: tokenRecord.staff.id },
        data: { passwordHash },
      });

      // Invalidate every other outstanding reset token for this account.
      await tx.passwordResetToken.updateMany({
        where: {
          staffId: tokenRecord.staff.id,
          usedAt: null,
        },
        data: { usedAt: now },
      });

      await tx.auditLog.create({
        data: {
          actorId: tokenRecord.staff.id,
          actorEmail: tokenRecord.staff.email,
          action: "ACCOUNT_PASSWORD_RESET",
          targetType: "Staff",
          targetId: tokenRecord.staff.id,
        },
      });
    });

    return NextResponse.json(
      { message: "Your password has been reset successfully. You can now sign in." },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message !== "RESET_TOKEN_ALREADY_USED"
    ) {
      console.error("Password reset failed:", error);
    }

    return NextResponse.json(
      { error: "This reset link is invalid or has expired. Please request a new one." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
}
