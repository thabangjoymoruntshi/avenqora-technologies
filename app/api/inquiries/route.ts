import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const inquiries = await prisma.inquiry.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        project: true,
        message: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(inquiries, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Inquiry fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while fetching inquiries." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Inquiry ID and status are required." },
        { status: 400 }
      );
    }

    const allowedStatuses = ["NEW", "IN_PROGRESS", "COMPLETED"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid inquiry status." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Inquiry update error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating the inquiry." },
      { status: 500 }
    );
  }
}