
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export const dynamic = "force-dynamic";

export async function POST() {
  const access = await requireRole(["CEO"]);

  if (access.response) {
    return access.response;
  }

  try {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const enquiries = await prisma.inquiry.findMany({
      where: {
        createdAt: { lt: cutoff },
        salesStatus: { in: ["NEW", "CONTACTED"] },
      },
      select: {
        id: true,
        name: true,
        project: true,
        salesStatus: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });


    const tasksCreated = await prisma.automationTask.createMany({
  data: enquiries.map((enquiry) => ({
    inquiryId: enquiry.id,
    ruleKey: "FOLLOW_UP_24H",
    reason: `Enquiry has remained ${enquiry.salesStatus} for more than 24 hours.`,
    dueAt: new Date(
      enquiry.createdAt.getTime() + 24 * 60 * 60 * 1000
    ),
  })),
  skipDuplicates: true,
});


    await prisma.auditLog.create({
      data: {
        actorEmail: access.session?.user?.email ?? "CEO",
        action: "AUTOMATION_FOLLOW_UP_SCAN",
        targetType: "Inquiry",
        details: {
          scannedAt: now.toISOString(),
          cutoff: cutoff.toISOString(),
          overdueCount: enquiries.length,
          enquiryIds: enquiries.map((enquiry) => enquiry.id),
        },
      },
    });

    return NextResponse.json({
      success: true,
      scannedAt: now.toISOString(),
      overdueCount: enquiries.length,
      tasksCreated: tasksCreated.count,
      enquiries,
    });
  } catch (error) {
    console.error("Follow-up automation failed:", error);

    return NextResponse.json(
      { error: "Unable to run the follow-up monitor." },
      { status: 500 }
    );
  }
}
