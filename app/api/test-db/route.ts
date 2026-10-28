import { NextResponse } from "next/server";
import { requireRole } from "@/app/lib/permissions";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const access = await requireRole(["CEO"]);

  if (access.response) {
    return access.response;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Database connection successful.",
    });
  } catch (error) {
    console.error("Database diagnostic failed:", error);

    return NextResponse.json(
      { success: false, error: "Database connection failed." },
      { status: 500 }
    );
  }
}