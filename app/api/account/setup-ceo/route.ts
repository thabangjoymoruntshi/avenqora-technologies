
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export async function POST() {
  const access = await requireRole(["CEO"]);

  if (access.response) return access.response;

  const user = access.session!.user as typeof access.session.user & {
    id?: string;
    email?: string | null;
    name?: string | null;
  };

  if (user.id !== "admin") {
    return NextResponse.json(
      { error: "This setup is only for the existing environment-based CEO account." },
      { status: 403 }
    );
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      { error: "CEO environment credentials are not configured." },
      { status: 500 }
    );
  }

  if (user.email?.trim().toLowerCase() !== email) {
    return NextResponse.json(
      { error: "The signed-in CEO email does not match the configured account." },
      { status: 403 }
    );
  }

  try {
    const existing = await prisma.staff.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. No changes were made." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const staff = await prisma.staff.create({
      data: {
        name: user.name?.trim() || "Avenqora CEO",
        email,
        passwordHash,
        role: "CEO",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: staff.id,
        actorEmail: staff.email,
        action: "CEO_DATABASE_ACCOUNT_CREATED",
        targetType: "Staff",
        targetId: staff.id,
      },
    });

    return NextResponse.json({
      message: "CEO database account created. Sign out and sign back in to use profile and security settings.",
      account: staff,
    });
  } catch (error) {
    console.error("CEO account setup failed:", error);

    return NextResponse.json(
      { error: "Unable to set up the CEO account. Check the server logs." },
      { status: 500 }
    );
  }
}