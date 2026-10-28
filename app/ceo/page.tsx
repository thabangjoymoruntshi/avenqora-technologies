
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import CEOStaffManager from "@/components/CEOStaffManager";
import CEOAutomationMonitor from "@/components/CEOAutomationMonitor";
import CEOTaskManager from "@/components/CEOTaskManager";

export const dynamic = "force-dynamic";

export default async function CEOPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

    const account = session.user as typeof session.user & {
    id?: string;
    role?: string;
    mfaVerified?: boolean;
  };

  if (account.role !== "CEO") {
    redirect("/admin");
  }

  if (account.id && account.id !== "admin") {
    const staffAccount = await prisma.staff.findUnique({
      where: { id: account.id },
      select: { twoFactorEnabled: true },
    });

    if (
      staffAccount?.twoFactorEnabled &&
      account.mfaVerified !== true
    ) {
      redirect("/login?error=two-factor-required");
    }
  }

  const [inquiries, proposals, staff, activeStaff, recentLogs] =
    await Promise.all([
      prisma.inquiry.count(),
      prisma.proposal.count(),
      prisma.staff.count(),
      prisma.staff.count({ where: { isActive: true } }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          actorEmail: true,
          action: true,
          targetType: true,
          createdAt: true,
        },
      }),
    ]);

  const metrics = [
    { label: "Total enquiries", value: inquiries },
    { label: "Total proposals", value: proposals },
    { label: "Staff accounts", value: staff },
    { label: "Active staff", value: activeStaff },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-widest text-emerald-400">
              AVENQORA TECHNOLOGIES
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              CEO Dashboard
            </h1>
            <p className="mt-2 text-slate-400">
              Business overview and administrative control.
            </p>
          </div>

         <div className="flex flex-wrap items-center gap-3">
  <a
    href="/settings/profile"
    className="rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800"
  >
    Profile
  </a>

  <a
    href="/settings/security"
    className="rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800"
  >
    Security
  </a>

  <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
    <p className="text-xs text-slate-400">Signed in as</p>
    <p className="mt-1 font-medium">
      {session.user.name ?? session.user.email}
    </p>
    <p className="mt-1 text-xs text-emerald-400">CEO access</p>
  </div>
</div>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold">Business management</h2>
            <p className="mt-2 text-sm text-slate-400">
              Access existing workflows and manage staff securely.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/admin"
                className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-slate-950 hover:bg-emerald-400"
              >
                Manage enquiries
              </a>
              <a
                href="/"
                className="rounded-lg border border-slate-700 px-5 py-3 font-medium hover:bg-slate-800"
              >
                View website
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Staff overview</h2>
            <p className="mt-3 text-3xl font-bold">{activeStaff}</p>
            <p className="text-sm text-slate-400">Active staff accounts</p>

          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Recent audit activity</h2>
          <p className="mt-2 text-sm text-slate-400">
            A record of recent actions captured by the system.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 pr-4 font-medium">Action</th>
                  <th className="pb-3 pr-4 font-medium">Performed by</th>
                  <th className="pb-3 pr-4 font-medium">Target</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-800/70">
                    <td className="py-4 pr-4">{log.action}</td>
                    <td className="py-4 pr-4">{log.actorEmail}</td>
                    <td className="py-4 pr-4">{log.targetType ?? "—"}</td>
                    <td className="py-4 whitespace-nowrap text-slate-400">
                      {log.createdAt.toLocaleString("en-ZA", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Africa/Johannesburg",
                      })}
                    </td>
                  </tr>
                ))}

                {recentLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-slate-400"
                    >
                      No audit activity recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <CEOAutomationMonitor />
        <CEOTaskManager />
        <CEOStaffManager />
      </div>
    </main>
  );
}
