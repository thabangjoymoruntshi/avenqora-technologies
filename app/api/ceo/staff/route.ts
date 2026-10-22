
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export async function GET() {
  const access = await requireRole(["CEO"]);

  if (access.response) {
    return access.response;
  }

  const staff = await prisma.staff.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(staff);
}

export async function POST(request: Request) {
  const access = await requireRole(["CEO"]);

  if (access.response) {
    return access.response;
  }

  try {
    const body = await request.json();
    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password =
      typeof body.password === "string" ? body.password : "";
    const role = body.role;

    if (!name || !email || password.length < 12) {
      return NextResponse.json(
        { error: "Name and email are required. Password must be at least 12 characters." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (role !== "ADMIN" && role !== "EMPLOYEE") {
      return NextResponse.json(
        { error: "Role must be ADMIN or EMPLOYEE." },
        { status: 400 }
      );
    }

    const existing = await prisma.staff.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A staff account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const staff = await prisma.staff.create({
      data: {
        name,
        email,
        passwordHash,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorEmail: access.session!.user!.email ?? "CEO",
        action: "STAFF_CREATED",
        targetType: "Staff",
        targetId: staff.id,
        details: {
          name: staff.name,
          email: staff.email,
          role: staff.role,
        },
      },
    });

    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    console.error("Staff creation failed:", error);

    return NextResponse.json(
      { error: "Unable to create staff account." },
      { status: 500 }
    );
  }
}
