import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Avenqora Admin",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },


async authorize(credentials) {
  const email = credentials?.email;
  const password = credentials?.password;

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return null;
  }

  // Existing CEO login

  const normalizedEmail = email.trim().toLowerCase();

  // Check database accounts first so saved password changes take effect
  const staff = await prisma.staff.findUnique({
    where: { email: normalizedEmail },
  });

  if (staff) {
    if (!staff.isActive) return null;

    const passwordIsValid = await bcrypt.compare(
      password,
      staff.passwordHash
    );

    if (!passwordIsValid) return null;

    return {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
    };
  }

  // Keep environment-based CEO login as a fallback
  if (
    normalizedEmail === process.env.ADMIN_EMAIL?.trim().toLowerCase() &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return {
      id: "admin",
      name: "Avenqora Admin",
      email: normalizedEmail,
      role: "CEO",
    };
  }

  return null;
},

    }),
  ],

 session: {
  strategy: "jwt" as const,
},

callbacks: {
  async jwt({
    token,
    user,
  }: {
    token: JWT;
    user?: User;
  }) {
    if (user) {
      const account = user as User & {
        role?: string;
      };

      token.sub = account.id;
      (token as JWT & { role?: string }).role =
        account.role ?? "EMPLOYEE";
    }

    return token;
  },

  async session({
    session,
    token,
  }: {
    session: import("next-auth").Session;
    token: JWT;
  }) {
    if (session.user) {
      const account = session.user as typeof session.user & {
        id?: string;
        role?: string;
      };

      account.id = token.sub;
      account.role =
        (token as JWT & { role?: string }).role ?? "EMPLOYEE";
    }

    return session;
  },
},


  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);