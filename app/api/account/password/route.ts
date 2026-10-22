
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export async function PATCH(request: Request) {
  const access = await requireRole(["CEO", "ADMIN", "EMPLOYEE"]);

  if (access.response) return access.response;

  const user = access.session!.user as typeof access.session.user & {
    id?: string;
    email?: string | null;
  };

  if (!user.id || user.id === "admin") {
    return NextResponse.json(
      {
        error:
          "Password changes for the environment-based CEO account need separate setup.",
      },
      { status: 409 }
    );
  }

  try {
    const body = await request.json();

    const currentPassword =
      typeof body.currentPassword === "string"
        ? body.currentPassword
        : "";

    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 12) {
      return NextResponse.json(
        { error: "New password must be at least 12 characters." },
        { status: 400 }
      );
    }

    if (newPassword.length > 128) {
      return NextResponse.json(
        { error: "New password must be 128 characters or fewer." },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "Choose a different new password." },
        { status: 400 }
      );
    }

    const staff = await prisma.staff.findUnique({
      where: { id: user.id },
    });

    if (!staff || !staff.isActive) {
      return NextResponse.json(
        { error: "Active account not found." },
        { status: 404 }
      );
    }

    const passwordIsValid = await bcrypt.compare(
      currentPassword,
      staff.passwordHash
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.staff.update({
      where: { id: staff.id },
      data: { passwordHash },
    });

    await prisma.auditLog.create({
      data: {
        actorId: staff.id,
        actorEmail: staff.email,
        action: "ACCOUNT_PASSWORD_CHANGED",
        targetType: "Staff",
        targetId: staff.id,
      },
    });

    return NextResponse.json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Password change failed:", error);

    return NextResponse.json(
      { error: "Unable to change password." },
      { status: 500 }
    );
  }
}
