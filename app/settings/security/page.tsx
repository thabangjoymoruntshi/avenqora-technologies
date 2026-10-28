
"use client";

import { useState } from "react";
import { getSession } from "next-auth/react";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [authenticatorSecret, setAuthenticatorSecret] = useState("");
  const [authenticatorCode, setAuthenticatorCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [twoFactorMessage, setTwoFactorMessage] = useState("");
  const [twoFactorError, setTwoFactorError] = useState("");


  async function startAuthenticatorSetup() {
    setTwoFactorLoading(true);
    setTwoFactorMessage("");
    setTwoFactorError("");
    setRecoveryCodes([]);

    try {
      const response = await fetch("/api/account/two-factor/enroll", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        setTwoFactorError(data.error ?? "Unable to start setup.");
        return;
      }

      setQrCode(data.qrCodeDataUrl);
      setAuthenticatorSecret(data.secret);
      setTwoFactorMessage(
        "Scan the QR code with your authenticator app, then enter its six-digit code.",
      );
    } catch {
      setTwoFactorError("Unable to start setup. Please try again.");
    } finally {
      setTwoFactorLoading(false);
    }
  }

  async function verifyAuthenticatorSetup(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setTwoFactorLoading(true);
    setTwoFactorMessage("");
    setTwoFactorError("");

    try {
      const response = await fetch("/api/account/two-factor/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: authenticatorCode }),
      });
      const data = await response.json();

      if (!response.ok) {
        setTwoFactorError(data.error ?? "Verification failed.");
        return;
      }

      setRecoveryCodes(data.recoveryCodes ?? []);
      setQrCode("");
      setAuthenticatorSecret("");
      setAuthenticatorCode("");
      setTwoFactorMessage(
        "Authenticator verification enabled. Save your recovery codes securely.",
      );
    } catch {
      setTwoFactorError("Unable to verify the code. Please try again.");
    } finally {
      setTwoFactorLoading(false);
    }
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    if (newPassword.length < 12) {
      setError("Your new password must be at least 12 characters.");
      return;
    }

    setSaving(true);

    try {
      const session = await getSession();

      if (!session) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to change password.");
        return;
      }

      setMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Unable to change your password. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <a
          href="/settings/profile"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to profile
        </a>

        <h1 className="mt-6 text-3xl font-bold">Security</h1>
        <p className="mt-2 text-slate-400">
          Protect your Avenqora account by updating your password.
        </p>

        
        <section className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Two-step verification
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Use an authenticator app to add another layer of protection to
              your Avenqora account.
            </p>
          </div>

          {!qrCode && recoveryCodes.length === 0 && (
            <button
              type="button"
              onClick={startAuthenticatorSetup}
              disabled={twoFactorLoading}
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {twoFactorLoading
                ? "Starting setup..."
                : "Set up authenticator"}
            </button>
          )}

          {qrCode && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                1. Open Google Authenticator or Microsoft Authenticator and
                scan this QR code.
              </p>

              <img
                src={qrCode}
                alt="Authenticator setup QR code"
                className="w-56 rounded-xl bg-white p-3"
              />

              <div>
                <p className="mb-2 text-sm text-slate-300">
                  If you cannot scan the QR code, enter this setup key manually:
                </p>
                <code className="block break-all rounded-xl bg-slate-900 p-3 text-sm text-cyan-300">
                  {authenticatorSecret}
                </code>
              </div>

              <form onSubmit={verifyAuthenticatorSetup} className="space-y-4">
                <label
                  htmlFor="authenticatorCode"
                  className="block text-sm text-slate-300"
                >
                  2. Enter the six-digit code from your authenticator app
                </label>

                <input
                  id="authenticatorCode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={authenticatorCode}
                  onChange={(event) =>
                    setAuthenticatorCode(
                      event.target.value.replace(/\D/g, "").slice(0, 6),
                    )
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 tracking-[0.3em] outline-none focus:border-cyan-400"
                  placeholder="000000"
                />

                <button
                  type="submit"
                  disabled={twoFactorLoading || authenticatorCode.length !== 6}
                  className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                >
                  {twoFactorLoading ? "Verifying..." : "Verify and enable"}
                </button>
              </form>
            </div>
          )}

          {twoFactorMessage && (
            <p role="status" className="text-sm text-emerald-400">
              {twoFactorMessage}
            </p>
          )}

          {twoFactorError && (
            <p role="alert" className="text-sm text-red-400">
              {twoFactorError}
            </p>
          )}

          {recoveryCodes.length > 0 && (
            <div className="space-y-3 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
              <h3 className="font-semibold text-amber-300">
                Save your recovery codes
              </h3>
              <p className="text-sm text-slate-300">
                Each code can be used once if you lose access to your
                authenticator. Store them somewhere secure. They will not be
                shown again after leaving this page.
              </p>

              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                {recoveryCodes.map((code) => (
                  <li
                    key={code}
                    className="rounded-lg bg-slate-900 p-2 text-center"
                  >
                    {code}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(recoveryCodes.join("\n"))
                }
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
              >
                Copy recovery codes
              </button>
            </div>
          )}
        </section>


        <form
          onSubmit={changePassword}
          className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div>
            <label htmlFor="currentPassword" className="mb-2 block text-sm text-slate-300">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="mb-2 block text-sm text-slate-300">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={12}
              maxLength={128}
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
            />
            <p className="mt-2 text-xs text-slate-500">
              Use at least 12 characters.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm text-slate-300">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={12}
              maxLength={128}
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {message && <p className="text-sm text-emerald-400">{message}</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Change password"}
          </button>
        </form>
      </div>
    </main>
  );
}
