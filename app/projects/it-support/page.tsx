import Link from "next/link";

const features = [
  {
    title: "Support Tickets",
    description:
      "Customers can submit technical issues through a structured support ticket workflow.",
  },
  {
    title: "Ticket Tracking",
    description:
      "Users can view submitted tickets and monitor their progress from a centralized dashboard.",
  },
  {
    title: "Ticket Lifecycle",
    description:
      "Tickets move through defined stages including new, open, in progress, waiting, resolved, and closed.",
  },
  {
    title: "Priority Management",
    description:
      "Support requests can be categorized by priority to help organize technical workloads.",
  },
  {
    title: "Support Communication",
    description:
      "Customers and support teams have a structured environment for managing technical issues.",
  },
  {
    title: "Persistent Data",
    description:
      "Users, tickets, messages, attachments, and knowledge content are stored through the application database.",
  },
];

const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "NextAuth",
  "REST API",
];

const tickets = [
  {
    number: "AVQ-1024",
    category: "Network",
    subject: "Network connectivity issue",
    time: "12 minutes ago",
    priority: "High",
    status: "Open",
    statusStyle: "bg-blue-500/10 text-blue-400",
  },
  {
    number: "AVQ-1023",
    category: "Email",
    subject: "Email configuration",
    time: "1 hour ago",
    priority: "Medium",
    status: "In Progress",
    statusStyle: "bg-amber-500/10 text-amber-400",
  },
  {
    number: "AVQ-1022",
    category: "Software",
    subject: "Software installation",
    time: "Yesterday",
    priority: "Low",
    status: "Resolved",
    statusStyle: "bg-green-500/10 text-green-400",
  },
];

export default function ITSupportProject() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-zinc-500 transition hover:text-green-400"
          >
            ← Back to Projects
          </Link>

          <div className="mt-12 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              IT & Support
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              IT Support Portal
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              A full-stack support platform designed to help businesses
              organize technical support requests, track issues, and manage
              communication between customers and support teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-400"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            {/* Browser Bar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-5 py-4">
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />

              <div className="ml-4 flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs text-zinc-500">
                Avenqora IT Support Portal
              </div>
            </div>

            <div className="grid min-h-[650px] md:grid-cols-[250px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-zinc-800 bg-zinc-900 p-6 md:block">
                <div className="mb-10">
                  <h2 className="text-xl font-bold tracking-tight">
                    Avenqora
                  </h2>

                  <p className="text-sm text-zinc-500">
                    IT Support Portal
                  </p>
                </div>

                <nav className="space-y-2">
                  <div className="rounded-xl bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
                    Dashboard
                  </div>

                  <div className="rounded-xl px-4 py-3 text-sm text-zinc-400">
                    Submit Ticket
                  </div>

                  <div className="rounded-xl px-4 py-3 text-sm text-zinc-400">
                    My Tickets
                  </div>

                  <div className="rounded-xl px-4 py-3 text-sm text-zinc-400">
                    Knowledge Base
                  </div>

                  <div className="rounded-xl px-4 py-3 text-sm text-zinc-400">
                    Profile
                  </div>

                  <div className="rounded-xl px-4 py-3 text-sm text-zinc-400">
                    Settings
                  </div>
                </nav>

                <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-semibold">
                    Need help?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Contact the Avenqora support team if you need assistance.
                  </p>

                  <div className="mt-4 rounded-xl bg-green-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950">
                    Contact Support
                  </div>
                </div>
              </aside>

              {/* Dashboard */}
              <div className="bg-zinc-950 p-6 lg:p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Support Dashboard
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Welcome back, Sipho
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-zinc-950">
                    SH
                  </div>
                </div>

                {/* Hero */}
                <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
                  <p className="text-sm font-medium text-green-400">
                    Avenqora Support
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Need technical assistance?
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                    Submit a support ticket and our team will help you resolve
                    your technical issue.
                  </p>

                  <div className="mt-5 inline-block rounded-xl bg-green-500 px-5 py-2.5 text-sm font-semibold text-zinc-950">
                    Submit New Ticket
                  </div>
                </div>

                {/* Statistics */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Total Tickets", "24"],
                    ["Open Tickets", "07"],
                    ["In Progress", "05"],
                    ["Resolved", "12"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                    >
                      <p className="text-sm text-zinc-500">
                        {label}
                      </p>

                      <p className="mt-3 text-3xl font-bold">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent Tickets */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-400">
                        Support Activity
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        Recent Tickets
                      </h3>
                    </div>

                    <span className="text-sm font-medium text-green-400">
                      View All
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                    {tickets.map((ticket, index) => (
                      <div
                        key={ticket.number}
                        className={`p-5 ${
                          index !== tickets.length - 1
                            ? "border-b border-zinc-800"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-sm font-semibold text-green-400">
                                #{ticket.number}
                              </span>

                              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                                {ticket.category}
                              </span>
                            </div>

                            <h4 className="mt-2 text-sm font-semibold">
                              {ticket.subject}
                            </h4>

                            <p className="mt-1 text-xs text-zinc-500">
                              {ticket.time}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                              {ticket.priority}
                            </span>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${ticket.statusStyle}`}
                            >
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Cards */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <p className="text-sm text-green-400">
                      Knowledge Base
                    </p>

                    <h3 className="mt-2 font-bold">
                      Find answers quickly
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Browse troubleshooting guides and helpful articles.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <p className="text-sm text-green-400">
                      Support Team
                    </p>

                    <h3 className="mt-2 font-bold">
                      We're here to help
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Our support team is available to assist with technical
                      issues and service requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
                Project Overview
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Turning technical support into a structured workflow.
              </h2>
            </div>

            <div className="space-y-5 text-zinc-400">
              <p className="leading-7">
                The IT Support Portal provides businesses with a centralized
                environment for submitting, tracking, and managing technical
                support requests.
              </p>

              <p className="leading-7">
                Customers can create support tickets, monitor their status,
                review previous requests, and communicate with support teams
                through a structured workflow.
              </p>

              <p className="leading-7">
                The project demonstrates how authentication, frontend
                interfaces, APIs, database architecture, and business
                workflows can operate together as one full-stack application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-zinc-800 bg-zinc-900/40 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
            Key Features
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built around the support lifecycle.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-green-500/30"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-sm font-bold text-green-400">
                  +
                </div>

                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
                Technology
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Full-stack application architecture.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-zinc-400">
                The platform combines a modern frontend with authentication,
                backend APIs, database persistence, and structured support
                workflows.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <p className="text-sm font-semibold">
                    {technology}
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    Core technology
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
            Explore the project
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            See the IT Support Portal in action.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-500">
            The live support platform will be connected here once the
            production deployment is ready.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Back to Projects
            </Link>

            <div className="rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">
               <a
              href="https://it-support-portal-avenqora-technologies.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore IT Support Portal
            </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}