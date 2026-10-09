import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      inquiryId,
      title,
      description,
      amount,
    } = body;

    if (!inquiryId || !title || !description || amount === undefined) {
      return NextResponse.json(
        {
          error:
            "Inquiry ID, title, description and amount are required.",
        },
        { status: 400 }
      );
    }

    const proposal = await prisma.proposal.create({
      data: {
        inquiryId,
        title,
        description,
        amount: Number(amount),
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error("Proposal creation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating the proposal." },
      { status: 500 }
    );
  }
}

export async function GET() {
try {
const session = await getServerSession(authOptions);


if (!session) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const proposals = await prisma.proposal.findMany({
  orderBy: {
    createdAt: "desc",
  },
});

return NextResponse.json(proposals);


} catch (error) {
console.error("Proposal retrieval error:", error);


return NextResponse.json(
  { error: "Could not retrieve proposals." },
  { status: 500 }
);


}
}
