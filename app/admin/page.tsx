"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  project: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
};

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const newCount = inquiries.filter(
    (inquiry) => inquiry.status === "NEW"
  ).length;

  const inProgressCount = inquiries.filter(
    (inquiry) => inquiry.status === "IN_PROGRESS"
  ).length;

  const completedCount = inquiries.filter(
    (inquiry) => inquiry.status === "COMPLETED"
  ).length;

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    async function loadAdminData() {
      try {
        const session = await getSession();

        if (!session) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("/api/inquiries");

        if (!response.ok) {
          throw new Error("Failed to fetch inquiries");
        }

        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error("Failed to load admin data:", error);
      } finally {
        setCheckingAuth(false);
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  async function updateStatus(
    id: string,
    status: "NEW" | "IN_PROGRESS" | "COMPLETED"
  ) {
    setUpdatingId(id);

    try {
      const response = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update inquiry status");
      }

      const updatedInquiry = await response.json();

      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === updatedInquiry.id
            ? { ...inquiry, status: updatedInquiry.status }
            : inquiry
        )
      );
    } catch (error) {
      console.error("Failed to update inquiry status:", error);
    } finally {
      setUpdatingId("");
    }
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Avenqora Technologies
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Inquiry Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            Manage project inquiries submitted through your website.
          </p>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-400">Total Inquiries</p>
            <p className="mt-2 text-3xl font-bold">{inquiries.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-400">New</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {newCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-400">In Progress</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {inProgressCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-400">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {completedCount}
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">Recent Inquiries</h2>
          </div>

          <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:flex-row">
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {loading ? (
            <div className="px-6 py-10 text-center text-slate-400">
              Loading inquiries...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400">
              No inquiries match your search or filter.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredInquiries.map((inquiry) => (
                <article key={inquiry.id} className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {inquiry.name}
                      </h3>

                      <p className="mt-1 text-sm text-cyan-400">
                        {inquiry.email}
                      </p>

                      <p className="mt-3 text-sm text-slate-400">
                        Project:{" "}
                        <span className="text-slate-200">
                          {inquiry.project}
                        </span>
                      </p>
                    </div>

                    <div className="mt-2">
                      <label
                        htmlFor={`status-${inquiry.id}`}
                        className="text-sm text-slate-400"
                      >
                        Status
                      </label>

                      <select
                        id={`status-${inquiry.id}`}
                        value={inquiry.status}
                        onChange={(event) =>
                          updateStatus(
                            inquiry.id,
                            event.target.value as
                              | "NEW"
                              | "IN_PROGRESS"
                              | "COMPLETED"
                          )
                        }
                        disabled={updatingId === inquiry.id}
                        className="mt-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm font-semibold text-cyan-400 outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>

                    <p className="text-sm text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {inquiry.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}