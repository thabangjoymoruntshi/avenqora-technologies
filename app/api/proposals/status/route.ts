import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireRole } from "@/app/lib/permissions";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
try {
const access = await requireRole(["CEO", "ADMIN"]);

if (access.response) {
  return access.response;
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
