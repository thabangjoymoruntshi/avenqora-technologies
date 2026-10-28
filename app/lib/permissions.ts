
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";
import { prisma } from "@/app/lib/prisma";

export type UserRole = "CEO" | "ADMIN" | "EMPLOYEE";

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      session: null,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const account = session.user as typeof session.user & {
    id?: string;
    role?: string;
    mfaVerified?: boolean;
  };

  const role = account.role;

  if (!role || !allowedRoles.includes(role as UserRole)) {
    return {
      session,
      response: NextResponse.json(
        { error: "Forbidden: insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  // Check whether this staff account requires two-step verification.
  if (account.id && account.id !== "admin") {
    const staff = await prisma.staff.findUnique({
      where: { id: account.id },
      select: { twoFactorEnabled: true },
    });

    if (staff?.twoFactorEnabled && account.mfaVerified !== true) {
      return {
        session,
        response: NextResponse.json(
          {
            error:
              "Two-step verification is required. Please sign in again.",
          },
          { status: 401 }
        ),
      };
    }
  }

  return { session, response: null };
}
