import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, project, message } = body;

    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        project,
        message,
      },
    });

        await resend.emails.send({
      from: "Avenqora <onboarding@resend.dev>",
      to: "avenqoratechnology@gmail.com",
      subject: `New Avenqora Inquiry from ${name}`,
      html: `
        <h2>New Avenqora Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${project}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      {
        message: "Your inquiry has been submitted successfully.",
        inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry creation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating the inquiry." },
      { status: 500 }
    );
  }
}