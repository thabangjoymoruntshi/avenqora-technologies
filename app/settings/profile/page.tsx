
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const session = await getSession();

        if (!session) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("/api/account/profile");
        const data = await response.json();

        if (!response.ok) {
          setError(data.error ?? "Unable to load your profile.");
          return;
        }

        setProfile(data);
        setName(data.name);
        setEmail(data.email);
      } catch {
        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to save your profile.");
        return;
      }

      setProfile(data);
      setName(data.name);
      setEmail(data.email);
      setMessage("Profile updated successfully.");
    } catch {
      setError("Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Loading profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <a
          href={profile?.role === "CEO" ? "/ceo" : "/admin"}
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to dashboard
        </a>

        <h1 className="mt-6 text-3xl font-bold">My profile</h1>
        <p className="mt-2 text-slate-400">
          Manage your Avenqora account details.
        </p>

        <form
          onSubmit={saveProfile}
          className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate-300">
              Full name
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={100}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={254}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {profile && (
            <p className="text-sm text-slate-400">
              Account role: {profile.role}
            </p>
          )}

          {message && <p className="text-sm text-emerald-400">{message}</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>

        <a
          href="/settings/security"
          className="mt-6 inline-block text-sm text-cyan-400 hover:text-cyan-300"
        >
          Manage password →
        </a>
      </div>
    </main>
  );
}
