
"use client";

import { useCallback, useEffect, useState } from "react";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function CEOStaffManager() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadStaff = useCallback(async () => {
    try {
      const response = await fetch("/api/ceo/staff");

      if (!response.ok) {
        throw new Error("Unable to load staff accounts.");
      }

      setStaff(await response.json());
    } catch {
      setMessage("Unable to load staff accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStaff();
  }, [loadStaff]);

  async function createStaff(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/ceo/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to create staff account.");
      }

      setName("");
      setEmail("");
      setPassword("");
      setRole("EMPLOYEE");
      setMessage("Staff account created successfully.");
      await loadStaff();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create staff account."
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateStaff(
    member: StaffMember,
    changes: { role?: string; isActive?: boolean }
  ) {
    setMessage("");

    try {
      const response = await fetch(`/api/ceo/staff/${member.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to update staff account.");
      }

      setMessage(`Updated ${member.name}'s account.`);
      await loadStaff();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to update staff account."
      );
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Staff management</h2>
      <p className="mt-2 text-sm text-slate-400">
        Create staff accounts and control roles and account access.
      </p>

      {message && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-slate-700 p-3 text-sm"
        >
          {message}
        </p>
      )}

      <form
        onSubmit={createStaff}
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        <label className="text-sm text-slate-300">
          Full name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white"
            autoComplete="name"
          />
        </label>

        <label className="text-sm text-slate-300">
          Email address
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white"
            autoComplete="email"
          />
        </label>

        <label className="text-sm text-slate-300">
          Temporary password (minimum 12 characters)
          <input
            required
            type="password"
            minLength={12}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white"
            autoComplete="new-password"
          />
        </label>

        <label className="text-sm text-slate-300">
          Staff role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 sm:col-span-2"
        >
          {saving ? "Creating account..." : "Create staff account"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Existing staff</h3>

        {loading ? (
          <p className="mt-4 text-sm text-slate-400">Loading staff...</p>
        ) : staff.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            No staff accounts have been created yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {staff.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {member.email}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {member.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label={`Role for ${member.name}`}
                    value={member.role}
                    onChange={(event) =>
                      void updateStaff(member, { role: event.target.value })
                    }
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      void updateStaff(member, {
                        isActive: !member.isActive,
                      })
                    }
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
                  >
                    {member.isActive ? "Deactivate" : "Reactivate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
