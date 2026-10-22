
"use client";

import { useState } from "react";

type Enquiry = {
  id: string;
  name: string;
  project: string;
  salesStatus: string;
  createdAt: string;
};

type ScanResult = {
  scannedAt: string;
  overdueCount: number;
  tasksCreated: number;
  enquiries: Enquiry[];
};

export default function CEOAutomationMonitor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);

  async function runMonitor() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ceo/automation/follow-up", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "The follow-up monitor failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to run the follow-up monitor."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-widest text-emerald-400">
            INTELLIGENT AUTOMATION
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Enquiry follow-up monitor
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Identify enquiries older than 24 hours that still need sales
            follow-up. This monitor does not contact customers or change
            enquiry statuses.
          </p>
        </div>

        <button
          type="button"
          onClick={runMonitor}
          disabled={loading}
          className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Scanning enquiries..." : "Run follow-up scan"}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-800 p-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6">
         <div className="grid gap-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-800 p-4">
    <p className="text-sm text-slate-400">
      Enquiries needing attention
    </p>
    <p className="mt-2 text-3xl font-bold">
      {result.overdueCount}
    </p>
  </div>

  <div className="rounded-xl border border-slate-800 p-4">
    <p className="text-sm text-slate-400">
      Follow-up tasks saved
    </p>
    <p className="mt-2 text-3xl font-bold">
      {result.tasksCreated}
    </p>
  </div>
</div>

<p className="mt-2 text-xs text-slate-500">
  Last scan:{" "}
  {new Date(result.scannedAt).toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
  })}
</p>

          {result.enquiries.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 pr-4 font-medium">Customer</th>
                    <th className="py-3 pr-4 font-medium">Project</th>
                    <th className="py-3 pr-4 font-medium">Sales status</th>
                    <th className="py-3 font-medium">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {result.enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-b border-slate-800/70"
                    >
                      <td className="py-3 pr-4">{enquiry.name}</td>
                      <td className="py-3 pr-4">{enquiry.project}</td>
                      <td className="py-3 pr-4">{enquiry.salesStatus}</td>
                      <td className="py-3 whitespace-nowrap text-slate-400">
                        {new Date(enquiry.createdAt).toLocaleDateString(
                          "en-ZA",
                          { timeZone: "Africa/Johannesburg" }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">
              No overdue enquiries were found in this scan.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
