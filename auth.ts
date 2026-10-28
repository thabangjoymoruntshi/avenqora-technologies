import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

import {
  decryptTotpSecret,
  hashRecoveryCode,
  verifyTotpCode,
} from "@/app/lib/two-factor";


async function consumeRecoveryCode(
  staffId: string,
  code: string,
): Promise<boolean> {
  const candidateHash = hashRecoveryCode(code);

  try {
    return await prisma.$transaction(
      async (tx) => {
        const account = await tx.staff.findUnique({
          where: { id: staffId },
          select: { recoveryCodeHashes: true },
        });

        const stored = account?.recoveryCodeHashes;

        if (!Array.isArray(stored)) return false;

        const hashes = stored.filter(
          (value): value is string => typeof value === "string",
        );

        const index = hashes.indexOf(candidateHash);

        if (index === -1) return false;

        hashes.splice(index, 1);

        await tx.staff.update({
          where: { id: staffId },
          data: { recoveryCodeHashes: hashes },
        });

        return true;
      },
      { isolationLevel: "Serializable" },
    );
  } catch {
    return false;
  }
}

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
        authenticatorCode: {
  label: "Authenticator or recovery code",
  type: "text",
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

let mfaVerified = false;

if (staff.twoFactorEnabled) {
  const code = credentials?.authenticatorCode;

  if (typeof code !== "string" || !code.trim()) {
    return null;
  }

  let validCode = false;

  if (staff.twoFactorSecret) {
    const secret = decryptTotpSecret(staff.twoFactorSecret);
    validCode = verifyTotpCode(secret, code);
  }

  if (!validCode) {
    validCode = await consumeRecoveryCode(staff.id, code);
  }

  if (!validCode) return null;

  mfaVerified = true;
}

return {
  id: staff.id,
  name: staff.name,
  email: staff.email,
  role: staff.role,
  mfaVerified,
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
  mfaVerified?: boolean;
};

      token.sub = account.id;
      (token as JWT & { role?: string }).role =
        account.role ?? "EMPLOYEE";
        (token as JWT & { mfaVerified?: boolean }).mfaVerified =
  account.mfaVerified ?? false;
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
      mfaVerified?: boolean;
    };

    account.id = token.sub;
    account.role =
      (token as JWT & { role?: string }).role ?? "EMPLOYEE";

    account.mfaVerified =
      (token as JWT & { mfaVerified?: boolean }).mfaVerified ?? false;
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