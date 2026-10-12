import Link from "next/link";

export default function BusinessSuitePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 pb-24 pt-36 lg:px-8">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <Link
            href="/#projects"
            className="text-sm font-medium text-slate-500 transition hover:text-cyan-400"
          >
            ← Back to Projects
          </Link>

          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Business Platform
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
            Avenqora Business Suite
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-400">
            A modern business management platform concept designed to bring
            everyday operations, data, and workflows into one digital
            environment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Next.js", "TypeScript", "PostgreSQL"].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Overview
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Bringing business operations together.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Many businesses rely on separate tools to manage customers, tasks, records, and
              daily operations. This concept explores how a centralized business platform could 
              bring these activities into one organized environment, helping teams improve 
              visibility, reduce fragmented workflows, and access important information more efficiently.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              The concept focuses on creating a flexible foundation that can
              adapt to different business processes while keeping information
              organized and accessible.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <p className="text-sm font-semibold text-white">
              Project Type
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Business Management Platform
            </p>

            <div className="my-6 h-px bg-white/10" />

            <p className="text-sm font-semibold text-white">
              Project Status
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Avenqora Product Initiative
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-white/10 bg-slate-900/30 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Key Capabilities
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Designed around real business workflows.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Business Dashboard",
                description:
                  "A centralized view of important business information, activity, and operational data.",
              },
              {
                title: "Workflow Management",
                description:
                  "Organize recurring processes and tasks into structured digital workflows.",
              },
              {
                title: "Data Management",
                description:
                  "Store and manage business information through a structured backend and database.",
              },
              {
                title: "Scalable Architecture",
                description:
                  "A foundation designed to evolve as business requirements become more sophisticated.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-7"
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Problem & Solution */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              The Challenge
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Disconnected tools can slow business operations.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              When business information and everyday tasks are spread across
              different tools, it can become harder to maintain visibility,
              organize workflows, and make informed decisions.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              The Approach
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              One platform, designed around your workflow.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Avenqora Business Suite explores a unified digital environment
              for business information, operational workflows, and important
              activity, with a flexible foundation that can adapt as a
              business grows.
            </p>
          </div>
        </div>
      </section>

            {/* Business Value */}
      <section className="border-y border-white/10 bg-slate-900/30 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Business Value
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold">
            A clearer view of everyday operations.
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-slate-400">
            The concept is designed to explore how a unified platform could
            help businesses organize information, understand daily activity,
            and build more consistent workflows as their needs evolve.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Better Visibility",
                description:
                  "Bring important business information into a more organized environment.",
              },
              {
                title: "Structured Workflows",
                description:
                  "Explore clearer ways to organize recurring tasks and business processes.",
              },
              {
                title: "Room to Grow",
                description:
                  "Plan a flexible foundation that can adapt to changing business requirements.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
              >
                <h3 className="text-lg font-bold">{value.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Technology */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Technology
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Built with a modern technology foundation.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Next.js",
              "TypeScript",
              "PostgreSQL",
            ].map((technology) => (
              <div
                key={technology}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center font-semibold text-slate-300"
              >
                {technology}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Build Something Similar
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Have a business system in mind?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Tell us what your business needs and we'll explore what can be
            built around your workflows.
          </p>

          <Link
            href="/?project=software#contact"
            className="mt-8 inline-flex items-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Start a Project →
          </Link>
        </div>
      </section>
    </main>
  );
}