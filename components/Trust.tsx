
const commitments = [
  {
    number: "01",
    title: "Clear Communication",
    description:
      "Understand the project scope, discuss requirements, and keep expectations clear throughout the work.",
  },
  {
    number: "02",
    title: "Solutions Built Around You",
    description:
      "Explore technology that fits your business goals instead of adding unnecessary complexity.",
  },
  {
    number: "03",
    title: "Quality-Focused Development",
    description:
      "Pay attention to functionality, usability, and testing as the solution takes shape.",
  },
  {
    number: "04",
    title: "Transparent Next Steps",
    description:
      "Discuss scope, timelines, costs, and support requirements before deciding how to proceed.",
  },
];

export default function Trust() {
  return (
    <section
      id="trust"
      className="border-t border-white/10 bg-slate-900/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            The Avenqora Approach
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built on clarity.
            <span className="block text-cyan-400">
              Focused on your goals.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Good technology starts with a clear understanding of the problem.
            We focus on practical solutions, thoughtful development, and clear
            expectations from the beginning.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 transition duration-300 hover:border-cyan-400/30"
            >
              <span className="text-sm font-semibold text-cyan-400">
                {item.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="text-xl font-bold text-white">
              Have a project in mind?
            </h3>
            <p className="mt-2 leading-7 text-slate-400">
              Let's discuss your requirements and the best way forward.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-5 inline-flex shrink-0 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-0"
          >
            Let's Talk →
          </a>
        </div>
      </div>
    </section>
  );
}
