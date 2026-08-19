import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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