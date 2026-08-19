const principles = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start by understanding the goals, challenges, and needs behind every project.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We turn ideas into practical, modern technology designed around the people who use it.",
  },
  {
    number: "03",
    title: "Evolve",
    description:
      "We create solutions with the flexibility to adapt as businesses grow and their needs change.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-slate-900/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Company introduction */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              About Avenqora
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Technology should make business{" "}
              <span className="text-cyan-400">better.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Avenqora Technologies is focused on creating practical digital
              experiences, software solutions, and IT services around the needs
              of modern businesses.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              We believe great technology starts with understanding the
              problem. From there, we design, build, and refine solutions that
              help turn ideas into useful digital experiences.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-cyan-400">
              <span className="h-px w-8 bg-cyan-400" />
              Technology That Moves Business Forward.
            </div>
          </div>

          {/* Principles */}
          <div className="space-y-4">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="group rounded-2xl border border-white/10 bg-slate-950/60 p-6 transition duration-300 hover:border-cyan-400/30"
              >
                <div className="flex gap-5">
                  <span className="pt-1 text-sm font-semibold text-cyan-400">
                    {principle.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {principle.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-400">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}