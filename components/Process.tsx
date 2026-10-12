
const steps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description:
      "We discuss your goals, understand the problem, and define the scope of the solution before development begins.",
  },
  {
    number: "02",
    title: "Design & Development",
    description:
      "We build a solution around your requirements, focusing on usability, functionality, and maintainable technology.",
  },
  {
    number: "03",
    title: "Testing & Refinement",
    description:
      "We check the solution, address issues, and refine the experience before delivery.",
  },
  {
    number: "04",
    title: "Delivery & Next Steps",
    description:
      "We prepare the solution for handover and discuss any ongoing support or future improvements that may be needed.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-white/10 bg-slate-900/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            How We Work
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From first idea to{" "}
            <span className="text-cyan-400">working solution.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            A clear, structured approach helps us align technology with your
            goals at every stage of a project.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 transition duration-300 hover:border-cyan-400/30"
            >
              <span className="text-sm font-semibold text-cyan-400">
                {step.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Discuss Your Project →
          </a>
        </div>
      </div>
    </section>
  );
}
