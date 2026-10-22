
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export async function GET() {
  const access = await requireRole(["CEO", "ADMIN", "EMPLOYEE"]);

  if (access.response) return access.response;

  const user = access.session!.user as typeof access.session.user & {
    id?: string;
  };

  if (!user.id || user.id === "admin") {
    return NextResponse.json(
      { error: "The CEO database account must be set up first." },
      { status: 409 }
    );
  }

  const staff = await prisma.staff.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!staff) {
    return NextResponse.json(
      { error: "Account not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(staff);
}

export async function PATCH(request: Request) {
  const access = await requireRole(["CEO", "ADMIN", "EMPLOYEE"]);

  if (access.response) return access.response;

  const user = access.session!.user as typeof access.session.user & {
    id?: string;
    email?: string | null;
  };

  if (!user.id || user.id === "admin") {
    return NextResponse.json(
      { error: "The CEO database account must be set up first." },
      { status: 409 }
    );
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!name || name.length > 100) {
      return NextResponse.json(
        { error: "Name is required and must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const existing = await prisma.staff.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing && existing.id !== user.id) {
      return NextResponse.json(
        { error: "That email address is already in use." },
        { status: 409 }
      );
    }

    const updated = await prisma.staff.update({
      where: { id: user.id },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorEmail: user.email ?? updated.email,
        action: "ACCOUNT_PROFILE_UPDATED",
        targetType: "Staff",
        targetId: user.id,
        details: { name: updated.name, email: updated.email },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Profile update failed:", error);

    return NextResponse.json(
      { error: "Unable to update profile." },
      { status: 500 }
    );
  }
}
