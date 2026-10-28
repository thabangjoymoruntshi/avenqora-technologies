
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth";
import {
  createRecoveryCodes,
  decryptTotpSecret,
  hashRecoveryCode,
  verifyTotpCode,
} from "@/app/lib/two-factor";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Please sign in first." },
      { status: 401 },
    );
  }

  const user = session.user as typeof session.user & { id?: string };

  if (!user.id || user.id === "admin") {
    return NextResponse.json(
      { error: "A database-backed account is required." },
      { status: 409 },
    );
  }

  let body: { code?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body.code !== "string" || !/^\d{6}$/.test(body.code.trim())) {
    return NextResponse.json(
      { error: "Enter the six-digit code from your authenticator app." },
      { status: 400 },
    );
  }

  try {
    const staff = await prisma.staff.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        isActive: true,
        twoFactorEnabled: true,
        twoFactorPendingSecret: true,
      },
    });

    if (!staff || !staff.isActive) {
      return NextResponse.json(
        { error: "Your staff account is unavailable." },
        { status: 403 },
      );
    }

    if (staff.twoFactorEnabled) {
      return NextResponse.json(
        { error: "Authenticator verification is already enabled." },
        { status: 409 },
      );
    }

    if (!staff.twoFactorPendingSecret) {
      return NextResponse.json(
        { error: "Start authenticator setup before verifying a code." },
        { status: 409 },
      );
    }

    const secret = decryptTotpSecret(staff.twoFactorPendingSecret);

    if (!verifyTotpCode(secret, body.code)) {
      return NextResponse.json(
        { error: "Incorrect or expired code. Try the latest code in your app." },
        { status: 400 },
      );
    }

        const recoveryCodes = createRecoveryCodes();
    const recoveryCodeHashes = recoveryCodes.map(hashRecoveryCode);

    await prisma.staff.update({
      where: { id: staff.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: staff.twoFactorPendingSecret,
        twoFactorPendingSecret: null,
        recoveryCodeHashes,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: staff.id,
        actorEmail: session.user.email ?? "",
        action: "TWO_FACTOR_ENABLED",
        targetType: "Staff",
        targetId: staff.id,
      },
    });

    return NextResponse.json({
      message: "Authenticator verification is now enabled.",
      recoveryCodes,
    });
  } catch (error) {
    console.error("Authenticator verification failed:", error);

    return NextResponse.json(
      { error: "Unable to verify the code. Check the server logs." },
      { status: 500 },
    );
  }
}
