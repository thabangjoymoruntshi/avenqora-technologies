import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { Resend } from "resend";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

const genericMessage =
  "If an active account exists for that email, password reset instructions will be sent.";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function getBaseUrl(request: NextRequest) {
  const configuredUrl = process.env.NEXTAUTH_URL;
  if (configuredUrl) return configuredUrl;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return vercelUrl.startsWith("http")
      ? vercelUrl
      : `https://${vercelUrl}`;
  }

  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  const response = () =>
    NextResponse.json(
      { message: genericMessage },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );

  try {
    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || email.length > 254) return response();

    const staff = await prisma.staff.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
      },
    });

    if (!staff || !staff.isActive) return response();

    const now = new Date();

    // Account-level cooldown: one reset email per 60 seconds.
    const recentToken = await prisma.passwordResetToken.findFirst({
      where: { staffId: staff.id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    if (
      recentToken &&
      now.getTime() - recentToken.createdAt.getTime() < 60_000
    ) {
      return response();
    }

    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);

    await prisma.$transaction([
      prisma.passwordResetToken.updateMany({
        where: { staffId: staff.id, usedAt: null },
        data: { usedAt: now },
      }),
      prisma.passwordResetToken.create({
        data: {
          tokenHash,
          staffId: staff.id,
          expiresAt,
        },
      }),
    ]);

    if (!process.env.RESEND_API_KEY) {
      await prisma.passwordResetToken.updateMany({
        where: { tokenHash, usedAt: null },
        data: { usedAt: new Date() },
      });
      console.error("Password reset email could not be sent: RESEND_API_KEY is missing.");
      return response();
    }

    const resetUrl = new URL(
      `/reset-password?token=${encodeURIComponent(rawToken)}`,
      getBaseUrl(request)
    ).toString();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(staff.name);

    const { error } = await resend.emails.send({
      from: "Avenqora Technologies <info@avenqoratechnologies.co.za>",
      to: staff.email,
      subject: "Reset your Avenqora account password",
      text: [
        `Hello ${staff.name},`,
        "",
        "A password reset was requested for your Avenqora account.",
        `Use this link within 30 minutes: ${resetUrl}`,
        "",
        "If you did not request this, you can ignore this email.",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033;max-width:600px;margin:auto">
          <h2>Password reset</h2>
          <p>Hello ${safeName},</p>
          <p>A password reset was requested for your Avenqora account.</p>
          <p>
            <a href="${resetUrl}" style="display:inline-block;background:#0891b2;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px">
              Reset password
            </a>
          </p>
          <p>This link expires in 30 minutes and can only be used once.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p>Avenqora Technologies</p>
        </div>
      `,
    });

    if (error) {
      await prisma.passwordResetToken.updateMany({
        where: { tokenHash, usedAt: null },
        data: { usedAt: new Date() },
      });
      console.error("Password reset email delivery failed:", error);
    }

    return response();
  } catch (error) {
    console.error("Forgot-password request failed:", error);
    return response();
  }
}
