
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
