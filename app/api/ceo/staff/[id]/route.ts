
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  const access = await requireRole(["CEO"]);

  if (access.response) {
    return access.response;
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.staff.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Staff account not found." },
        { status: 404 }
      );
    }

    const data: {
      name?: string;
      role?: string;
      isActive?: boolean;
    } = {};

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return NextResponse.json(
          { error: "Name cannot be empty." },
          { status: 400 }
        );
      }

      data.name = body.name.trim();
    }

    if (body.role !== undefined) {
      if (body.role !== "ADMIN" && body.role !== "EMPLOYEE") {
        return NextResponse.json(
          { error: "Role must be ADMIN or EMPLOYEE." },
          { status: 400 }
        );
      }

      data.role = body.role;
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { error: "isActive must be true or false." },
          { status: 400 }
        );
      }

      data.isActive = body.isActive;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid changes provided." },
        { status: 400 }
      );
    }

    const updated = await prisma.staff.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorEmail: access.session!.user!.email ?? "CEO",
        action: "STAFF_UPDATED",
        targetType: "Staff",
        targetId: id,
        details: {
          changes: data,
          previousRole: existing.role,
          previousIsActive: existing.isActive,
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Staff update failed:", error);

    return NextResponse.json(
      { error: "Unable to update staff account." },
      { status: 500 }
    );
  }
}
