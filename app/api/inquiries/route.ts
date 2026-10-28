import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const access = await requireRole(["CEO", "ADMIN", "EMPLOYEE"]);

if (access.response) {
  return access.response;
}
    const inquiries = await prisma.inquiry.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        project: true,
        message: true,
        status: true,
        salesStatus: true,
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
    const access = await requireRole(["CEO", "ADMIN"]);

if (access.response) {
  return access.response;
}
    const body = await request.json();

    const { id, status, salesStatus } = body;

    if (!id) {
  return NextResponse.json(
    { error: "Inquiry ID is required." },
    { status: 400 }
  );
}

if (status) {
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
}

if (salesStatus) {
  const allowedSalesStatuses = [
    "NEW",
    "CONTACTED",
    "PROPOSAL_SENT",
    "NEGOTIATION",
    "WON",
    "LOST",
  ];

  if (!allowedSalesStatuses.includes(salesStatus)) {
    return NextResponse.json(
      { error: "Invalid sales status." },
      { status: 400 }
    );
  }

  const inquiry = await prisma.inquiry.update({
    where: {
      id,
    },
    data: {
      salesStatus,
    },
  });

  return NextResponse.json(inquiry);
}

return NextResponse.json(
  { error: "Status or sales status is required." },

  { status: 400 }
);

    
  } catch (error) {
    console.error("Inquiry update error:", error);
    console.error(
       "Inquiry fetch error message:",
       error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      { error: "Something went wrong while updating the inquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const access = await requireRole(["CEO"]);

if (access.response) {
  return access.response;
}

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required." },
        { status: 400 }
      );
    }

    await prisma.inquiry.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Inquiry delete error:", error);

    return NextResponse.json(
      { error: "Something went wrong while deleting the inquiry." },
      { status: 500 }
    );
  }
}