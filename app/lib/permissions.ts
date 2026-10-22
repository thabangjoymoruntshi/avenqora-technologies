
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";

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

  const role = (
    session.user as typeof session.user & { role?: string }
  ).role;

  if (!role || !allowedRoles.includes(role as UserRole)) {
    return {
      session,
      response: NextResponse.json(
        { error: "Forbidden: insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  return { session, response: null };
}
