const solutions = [
  {
    number: "01",
    title: "Establish Your Digital Presence",
    description:
      "Create a professional online presence that gives your business credibility and makes it easier for customers to discover and connect with you.",
    outcome: "Get discovered",
  },
  {
    number: "02",
    title: "Build Your Business Application",
    description:
      "Turn your business processes and ideas into custom web applications designed around the way your organization actually works.",
    outcome: "Work smarter",
  },
  {
    number: "03",
    title: "Connect Your Systems",
    description:
      "Build APIs and backend systems that allow your applications, services, and business data to communicate reliably.",
    outcome: "Stay connected",
  },
  {
    number: "04",
    title: "Prepare for Growth",
    description:
      "Create a strong technology foundation that can evolve with your business instead of holding it back as your needs change.",
    outcome: "Scale confidently",
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-t border-white/10 bg-slate-900/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Solutions
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Technology that solves{" "}
            <span className="text-cyan-400">real problems.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Your technology should support your goals, not create more
            problems. Avenqora turns ideas, challenges, and business needs into
            practical digital solutions.
          </p>
        </div>

        {/* Solution list */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.number}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              {/* Hover glow */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-400">
                    {solution.number}
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition group-hover:text-cyan-400">
                    {solution.outcome}
                  </span>
                </div>

                <h3 className="mt-10 text-2xl font-bold text-white">
                  {solution.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {solution.description}
                </p>

                <div className="mt-8 h-px w-full bg-white/10" />

                <div className="mt-5 flex items-center text-sm font-semibold text-cyan-400">
                  Discover what's possible
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}