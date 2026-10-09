import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Resend } from "resend";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

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
const { proposalId } = body;

if (!proposalId) {
  return NextResponse.json(
    { error: "Proposal ID is required." },
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

const inquiry = await prisma.inquiry.findUnique({
  where: { id: proposal.inquiryId },
});

if (!inquiry) {
  return NextResponse.json(
    { error: "The customer inquiry could not be found." },
    { status: 404 }
  );
}

const amount = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
}).format(proposal.amount);

const { data, error } = await resend.emails.send({
  from: "Avenqora <onboarding@resend.dev>",
  to: inquiry.email,
  subject: `Project Proposal: ${proposal.title}`,
  html: `
    <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <h2>Project Proposal from Avenqora Technologies</h2>
      <p>Hello ${inquiry.name},</p>
      <p>Thank you for your interest in Avenqora Technologies.</p>
      <h3>${proposal.title}</h3>
      <p>${proposal.description.replace(/\n/g, "<br>")}</p>
      <p><strong>Proposed amount:</strong> ${amount}</p>
      <p>Please reply to this email if you would like to discuss the proposal.</p>
      <p>Kind regards,<br>Avenqora Technologies</p>
    </div>
  `,
});

if (error) {
  console.error("Proposal email error:", error);

  return NextResponse.json(
    { error: "The proposal email could not be sent." },
    { status: 502 }
  );
}

const updatedProposal = await prisma.proposal.update({
  where: { id: proposal.id },
  data: { status: "SENT" },
});

return NextResponse.json({
  message: "Proposal email sent successfully.",
  emailId: data?.id,
  proposal: updatedProposal,
});


} catch (error) {
console.error("Proposal sending error:", error);


return NextResponse.json(
  { error: "Something went wrong while sending the proposal." },
  { status: 500 }
);


}
}
