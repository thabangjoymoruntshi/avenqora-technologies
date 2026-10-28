import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { authenticator } from "otplib";

const ISSUER = "Avenqora Technologies";

function getEncryptionKey(): Buffer {
  const value = process.env.TOTP_ENCRYPTION_KEY;

  if (!value || !/^[a-f0-9]{64}$/i.test(value)) {
    throw new Error("TOTP_ENCRYPTION_KEY must be a 32-byte hexadecimal key.");
  }

  return Buffer.from(value, "hex");
}

export function encryptTotpSecret(secret: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(secret, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    tag.toString("hex"),
    encrypted.toString("hex"),
  ].join(".");
}

export function decryptTotpSecret(payload: string): string {
  const parts = payload.split(".");

  if (
    parts.length !== 3 ||
    !parts[0] ||
    !parts[1] ||
    !parts[2]
  ) {
    throw new Error("Invalid encrypted authenticator secret.");
  }

  const [ivHex, tagHex, encryptedHex] = parts;
  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(ivHex, "hex"),
  );

  decipher.setAuthTag(Buffer.from(tagHex, "hex"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

export function createTotpEnrollment(email: string) {
  const secret = authenticator.generateSecret();
  const uri = authenticator.keyuri(email, ISSUER, secret);

  return { secret, uri };
}

export function verifyTotpCode(secret: string, code: string): boolean {
  const token = code.replace(/\s/g, "");

  if (!/^\d{6}$/.test(token)) {
    return false;
  }

  return authenticator.verify({ token, secret });
}

export function createRecoveryCodes(count = 10): string[] {
  return Array.from({ length: count }, () => {
    const raw = randomBytes(8).toString("hex").toUpperCase();
    return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-${raw.slice(12)}`;
  });
}

export function hashRecoveryCode(code: string): string {
  const normalized = code.replace(/[\s-]/g, "").toUpperCase();

  return createHash("sha256").update(normalized).digest("hex");
}
