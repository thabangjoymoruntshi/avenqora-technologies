const projects = [
  {
    number: "01",
    category: "Business Platform",
    title: "Avenqora Business Suite",
    href: "/projects/business-suite",
    description:
      "A modern business management platform concept designed to bring everyday operations, data, and workflows into one digital environment.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    
  number: "02",
  category: "Property Technology",
  title: "Property Rental Platform",
  href: "/projects/property-rental",
  description:
    "A full-stack property rental application concept connecting property listings, users, and rental workflows through a modern digital experience.",
  technologies: ["React", "Node.js", "Prisma"],
  image: "/images/Rentora%20Properties.png",
},
  {
    number: "03",
    category: "IT & Support",
    title: "IT Support Portal",
    href: "/projects/it-support",
    description:
      "A technology support platform concept designed to help businesses organize support requests, technical issues, and service communication.",
    technologies: ["Next.js", "TypeScript", "API"],
    image: "/images/IT%20Support%20Portal.png"
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-white/10 bg-slate-950 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Selected Work
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ideas turned into{" "}
              <span className="text-cyan-400">digital solutions.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Explore selected projects and technology concepts demonstrating
              how Avenqora approaches real-world digital challenges.
            </p>
          </div>

          <span className="text-sm font-medium text-slate-500">
            Portfolio 
          </span>
        </div>

        {/* Project cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              href={project.href}
              key={project.number}
              className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
             {/* Project visual */}
<div className="relative h-48 overflow-hidden border-b border-white/10 bg-slate-900">
  {project.image ? (
    <img
      src={project.image}
      alt={project.title}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

      <span className="relative text-5xl font-bold text-white/10 transition duration-300 group-hover:text-cyan-400/20">
        {project.number}
      </span>
    </div>
  )}
</div>

              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  {project.category}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            More projects and case studies coming as Avenqora grows.
          </p>
        </div>
      </div>
    </section>
  );
}