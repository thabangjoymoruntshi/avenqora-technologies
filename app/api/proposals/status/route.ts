import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth";

export const dynamic = "force-dynamic";

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
const { proposalId, status } = body;

if (!proposalId || !["ACCEPTED", "REJECTED"].includes(status)) {
  return NextResponse.json(
    { error: "A valid proposal ID and status are required." },
    { status: 400 }
  );
}

const proposal = await prisma.proposal.findUnique({
  where: { id: proposalId },
});

if (!proposal) {
  return NextResponse.json(
    { error: "Proposal not found." },
    { status: 404 }
  );
}

const updatedProposal = await prisma.proposal.update({
  where: { id: proposalId },
  data: { status },
});

return NextResponse.json(updatedProposal);


} catch (error) {
console.error("Proposal status update error:", error);


return NextResponse.json(
  { error: "Could not update proposal status." },
  { status: 500 }
);


}
}
