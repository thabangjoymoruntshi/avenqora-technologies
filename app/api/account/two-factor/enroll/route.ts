
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import QRCode from "qrcode";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth";
import {
  createTotpEnrollment,
  encryptTotpSecret,
} from "@/app/lib/two-factor";

export const runtime = "nodejs";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Please sign in first." },
      { status: 401 },
    );
  }

  const user = session.user as typeof session.user & {
    id?: string;
    email?: string | null;
  };

  if (!user.id || user.id === "admin") {
    return NextResponse.json(
      {
        error:
          "Set up your database-backed CEO account before enabling authenticator verification.",
      },
      { status: 409 },
    );
  }

  try {
    const staff = await prisma.staff.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        isActive: true,
        twoFactorEnabled: true,
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

    const enrollment = createTotpEnrollment(staff.email);
    const encryptedSecret = encryptTotpSecret(enrollment.secret);
    const qrCodeDataUrl = await QRCode.toDataURL(enrollment.uri);

    await prisma.staff.update({
      where: { id: staff.id },
      data: {
        twoFactorPendingSecret: encryptedSecret,
      },
    });

    return NextResponse.json({
      qrCodeDataUrl,
      secret: enrollment.secret,
      message:
        "Scan the QR code in your authenticator app, then verify a six-digit code to finish setup.",
    });
  } catch (error) {
    console.error("Authenticator enrollment failed:", error);

    return NextResponse.json(
      { error: "Unable to start authenticator setup. Check the server logs." },
      { status: 500 },
    );
  }
}
