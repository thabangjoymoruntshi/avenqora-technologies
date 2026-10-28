ALTER TABLE "Staff"
ADD COLUMN "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "twoFactorSecret" TEXT,
ADD COLUMN "twoFactorPendingSecret" TEXT,
ADD COLUMN "recoveryCodeHashes" JSONB;
