import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}
export async function POST(request: Request) {
  try {
        const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, project, message } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof project !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !project.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (
      name.length > 120 ||
      email.length > 254 ||
      project.length > 120 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Please check your details and try again." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeProject = escapeHtml(project.trim());
    const safeMessage = escapeHtml(message.trim());
   

    

    const inquiry = await prisma.inquiry.create({
      data: {
  name: name.trim(),
  email: email.trim(),
  project: project.trim(),
  message: message.trim(),
},
    });

       await resend.emails.send({
  from: "Avenqora Technologies <info@avenqoratechnologies.co.za>",
  to: "avenqoratechnology@gmail.com",
  subject: `New Avenqora Inquiry from ${name.trim().replace(/[\r\n]/g, " ")}`,
  html: `
    <h2>New Avenqora Inquiry</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Service:</strong> ${safeProject}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage.replace(/\r?\n/g, "<br>")}</p>
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