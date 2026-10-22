
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export const dynamic = "force-dynamic";

const TASK_STATUSES = ["OPEN", "IN_PROGRESS", "COMPLETED"] as const;

export async function GET() {
  const { response } = await requireRole(["CEO"]);

  if (response) {
    return response;
  }

  try {
    const tasks = await prisma.automationTask.findMany({
      include: {
        inquiry: {
          select: {
            name: true,
            email: true,
            project: true,
            salesStatus: true,
          },
        },
      },
      orderBy: [{ status: "asc" }, { dueAt: "asc" }],
    });

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error("Failed to load automation tasks:", error);

    return NextResponse.json(
      { error: "Unable to load automation tasks." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { response } = await requireRole(["CEO"]);

  if (response) {
    return response;
  }

  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("id" in body) ||
      !("status" in body) ||
      typeof body.id !== "string" ||
      !body.id.trim() ||
      typeof body.status !== "string" ||
      !TASK_STATUSES.includes(
        body.status as (typeof TASK_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "A valid task ID and status are required." },
        { status: 400 }
      );
    }

    const task = await prisma.automationTask.update({
      where: { id: body.id },
      data: { status: body.status },
    });

    return NextResponse.json({ success: true, task });
  } catch (error) {
    console.error("Failed to update automation task:", error);

    return NextResponse.json(
      { error: "Unable to update the task. It may not exist." },
      { status: 500 }
    );
  }
}
