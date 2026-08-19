import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany();

    return Response.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 }
    );
  }
}