const services = [
  {
    number: "01",
    title: "Digital Experiences",
    description:
      "Modern, responsive websites and front-end applications designed to create strong digital experiences.",
    tags: ["Web Design", "React", "Next.js"],
  },
  {
    number: "02",
    title: "Software Solutions",
    description:
      "Custom web applications and business systems built around real-world workflows and business needs.",
    tags: ["Web Apps", "Full-Stack", "Custom Systems"],
  },
  {
    number: "03",
    title: "Backend & Data",
    description:
      "Reliable APIs, databases, authentication, and server-side systems that power modern applications.",
    tags: ["APIs", "PostgreSQL", "Prisma"],
  },
  {
    number: "04",
    title: "IT & Technical Solutions",
    description:
      "Practical technology support and technical solutions that help businesses operate more effectively.",
    tags: ["IT Support", "Troubleshooting", "Systems"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-white/10 bg-slate-950 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            What We Do
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Technology built around{" "}
            <span className="text-cyan-400">your needs.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            From digital experiences to complete software systems, Avenqora
            creates technology designed to solve problems, support growth, and
            move businesses forward.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold text-cyan-400">
                  {service.number}
                </span>

                <span className="text-slate-600 transition group-hover:text-cyan-400">
                  →
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}