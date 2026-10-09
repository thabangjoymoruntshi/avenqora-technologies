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
  salesStatus: string;
  createdAt: string;
};

type Proposal = {
id: string;
inquiryId: string;
title: string;
description: string;
amount: number;
status: string;
createdAt: string;
};


export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [proposalInquiry, setProposalInquiry] = useState<Inquiry | null>(null);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalAmount, setProposalAmount] = useState("");

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

// Add the new code here, directly below setInquiries(data)
const proposalsResponse = await fetch("/api/proposals");

if (!proposalsResponse.ok) {
  throw new Error("Failed to fetch proposals");
}

const proposalsData = await proposalsResponse.json();
setProposals(proposalsData);
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

  async function updateSalesStatus(id: string, salesStatus: string) {
  try {
    const response = await fetch("/api/inquiries", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        salesStatus,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update sales status");
    }

    const updatedInquiry = await response.json();

    setInquiries((currentInquiries) =>
      currentInquiries.map((inquiry) =>
        inquiry.id === updatedInquiry.id
          ? { ...inquiry, salesStatus: updatedInquiry.salesStatus }
          : inquiry
      )
    );
  } catch (error) {
    console.error("Failed to update sales status:", error);
  }
}

  async function deleteInquiry(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this inquiry?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch("/api/inquiries", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete inquiry");
    }

    setInquiries((currentInquiries) =>
      currentInquiries.filter((inquiry) => inquiry.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
  }
}


  async function handleSendProposal(proposalId: string) {
    const confirmed = window.confirm(
      "Send this proposal to the customer's email address?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/proposals/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proposalId }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to send proposal.");
        return;
      }

      setProposals((currentProposals) =>
        currentProposals.map((proposal) =>
          proposal.id === result.proposal.id
            ? result.proposal
            : proposal
        )
      );

      alert(result.message || "Proposal sent successfully.");
    } catch (error) {
      console.error("Send proposal error:", error);
      alert("Something went wrong while sending the proposal.");
    }
  }

  async function handleProposalStatus(
proposalId: string,
status: "ACCEPTED" | "REJECTED"
) {
const confirmed = window.confirm(
`Are you sure you want to mark this proposal as ${status.toLowerCase()}?`
);


if (!confirmed) return;

try {
  const response = await fetch("/api/proposals/status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ proposalId, status }),
  });

  const result = await response.json();

  if (!response.ok) {
    alert(result.error || "Failed to update proposal status.");
    return;
  }

  setProposals((currentProposals) =>
    currentProposals.map((proposal) =>
      proposal.id === result.id ? result : proposal
    )
  );

  alert(`Proposal marked as ${status.toLowerCase()}.`);
} catch (error) {
  console.error("Proposal status update error:", error);
  alert("Something went wrong while updating the proposal.");
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

                                          <div className="mt-3">
                      <label
                        htmlFor={`sales-status-${inquiry.id}`}
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
                      >
                        Sales Status
                      </label>

                      <select
                        id={`sales-status-${inquiry.id}`}
                        value={inquiry.salesStatus}
                        onChange={(event) =>
                          updateSalesStatus(inquiry.id, event.target.value)
                        }
                        className="mt-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm font-semibold text-emerald-400 outline-none transition focus:border-emerald-400"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                        <option value="NEGOTIATION">NEGOTIATION</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </div>
                    </div>

                    <p className="text-sm text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {inquiry.message}
                  </p>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-400 hover:bg-red-500/20"
                    >
                      Delete Inquiry
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = `mailto:${inquiry.email}?subject=${encodeURIComponent(
                          `Re: Avenqora Inquiry - ${inquiry.project}`
                        )}`;
                      }}
                      className="ml-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-500/20"
                    >
                      Contact Customer
                    </button>

                    <button
                      type="button"
                      onClick={() => {
  alert("Create Proposal button clicked");
  setProposalInquiry(inquiry);
}}
                      className="ml-3 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:border-cyan-400 hover:bg-cyan-500/20"
                    >
                      Create Proposal
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      
    <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold">Saved Proposals</h2>
        <p className="mt-1 text-sm text-slate-400">
          Proposals you've created for customer inquiries.
        </p>
      </div>

      {proposals.length === 0 ? (
        <p className="px-6 py-8 text-sm text-slate-400">
          No proposals saved yet.
        </p>
      ) : (
        <div className="divide-y divide-white/10">
          {proposals.map((proposal) => (
            <article key={proposal.id} className="p-6">
              <h3 className="text-lg font-semibold text-cyan-400">
                {proposal.title}
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {proposal.description}
              </p>

              
              <p className="mt-3 text-lg font-bold text-emerald-400">
                R {Number(proposal.amount).toFixed(2)}
              </p>
              

              <p className="mt-2 text-xs text-slate-500">
                Inquiry ID: {proposal.inquiryId}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Created: {new Date(proposal.createdAt).toLocaleString()}
              </p>

          
          <p
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              proposal.status === "ACCEPTED"
                ? "bg-emerald-500/15 text-emerald-400"
                : proposal.status === "REJECTED"
                ? "bg-red-500/15 text-red-400"
                : proposal.status === "SENT"
                ? "bg-amber-500/15 text-amber-400"
                : "bg-slate-500/15 text-slate-300"
            }`}
          >
            Status:{" "}
            {proposal.status === "DRAFT"
              ? "Draft"
              : proposal.status === "SENT"
              ? "Sent"
              : proposal.status === "ACCEPTED"
              ? "Accepted"
              : proposal.status === "REJECTED"
              ? "Rejected"
              : proposal.status}
          </p>



              
              <button
                type="button"
                onClick={() => handleSendProposal(proposal.id)}
                disabled={proposal.status === "SENT"}
                className="mt-4 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {proposal.status === "SENT"
                  ? "Proposal Sent"
                  : "Send Proposal"}
              </button>

              
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                handleProposalStatus(proposal.id, "ACCEPTED")
              }
              disabled={
                proposal.status === "ACCEPTED" ||
                proposal.status === "REJECTED"
              }
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Accept
            </button>

            <button
              type="button"
              onClick={() =>
                handleProposalStatus(proposal.id, "REJECTED")
              }
              disabled={
                proposal.status === "ACCEPTED" ||
                proposal.status === "REJECTED"
              }
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reject
            </button>
     </div>




            </article>
          ))}
        </div>
      )}
    </section>


    {proposalInquiry && (
      <section className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Create Proposal</h2>

          <button
            type="button"
            onClick={() => setProposalInquiry(null)}
            className="text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Preparing a proposal for {proposalInquiry.name} —{" "}
          {proposalInquiry.project}
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch("/api/proposals", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inquiryId: proposalInquiry.id,
                title: proposalTitle,
                description: proposalDescription,
                amount: Number(proposalAmount),
              }),
            });

            const result = await response.json();

            if (!response.ok) {
              alert(result.error || "Could not create the proposal.");
              return;
            }

            setProposals((currentProposals) => [result, ...currentProposals]);

            setProposalTitle("");
            setProposalDescription("");
            setProposalAmount("");
            setProposalInquiry(null);

            alert("Proposal created successfully.");
          }}
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Proposal Title
            </label>
            <input
              required
              value={proposalTitle}
              onChange={(event) => setProposalTitle(event.target.value)}
              placeholder="e.g. Business Website Development"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description and Scope of Work
            </label>
            <textarea
              required
              rows={5}
              value={proposalDescription}
              onChange={(event) =>
                setProposalDescription(event.target.value)
              }
              placeholder="Describe the work, deliverables and agreed terms."
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Proposed Amount (ZAR)
            </label>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={proposalAmount}
              onChange={(event) => setProposalAmount(event.target.value)}
              placeholder="e.g. 8500"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Save Proposal
          </button>
        </form>
      </section>
    )}

  </div>
</main>
  );
}
