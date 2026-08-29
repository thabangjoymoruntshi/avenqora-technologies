const possibilities = [
  {
    number: "01",
    title: "Digital Experiences",
    description:
      "Create a professional digital presence that helps your business build credibility, reach customers, and communicate what you offer.",
    examples: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Responsive web experiences",
    ],
  },
  {
    number: "02",
    title: "Business Applications",
    description:
      "Turn business processes, ideas, and workflows into custom applications designed around the way your organization operates.",
    examples: [
      "Management systems",
      "Client portals",
      "Dashboards",
      "Internal business applications",
    ],
  },
  {
    number: "03",
    title: "Backend & Connected Systems",
    description:
      "Build the technology behind your applications so your data, services, and systems can communicate securely and reliably.",
    examples: [
      "APIs",
      "Databases",
      "Authentication systems",
      "Third-party integrations",
    ],
  },
  {
    number: "04",
    title: "Technology for Growth",
    description:
      "Build a technology foundation that can evolve with your business as your users, requirements, and ambitions grow.",
    examples: [
      "Scalable architecture",
      "Performance improvements",
      "System enhancements",
      "Future-ready technology",
    ],
  },
];

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      
      
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        {/* Background glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Discover What&apos;s Possible
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your idea could become{" "}
            <span className="text-cyan-400">something real.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Technology can do more than simply put your business online.
            Avenqora helps turn ideas, challenges, and business needs into
            practical digital solutions.
          </p>
        </div>
      </section>

      {/* Possibilities */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              What We Can Build
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore the possibilities
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Whether you need a simple digital presence or a complete
              technology solution, the right approach starts with understanding
              what you are trying to achieve.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {possibilities.map((possibility) => (
              <article
                key={possibility.number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <span className="text-sm font-semibold text-cyan-400">
                    {possibility.number}
                  </span>

                  <h3 className="mt-6 text-2xl font-bold">
                    {possibility.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {possibility.description}
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="mb-4 text-sm font-semibold text-white">
                      Possibilities include:
                    </p>

                    <ul className="space-y-3">
                      {possibility.examples.map((example) => (
                        <li
                          key={example}
                          className="flex items-center text-sm text-slate-400"
                        >
                          <span className="mr-3 text-cyan-400">→</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* Problem-driven possibilities */}
<section className="border-t border-white/10 px-6 py-24 lg:px-8">
  <div className="mx-auto max-w-7xl">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
        Start With the Problem
      </p>

      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Not sure what you need?
      </h2>

      <p className="mt-5 leading-7 text-slate-400">
        You don't need to know the technical solution. Start with the problem
        you're trying to solve, and we'll explore what could be built to help.
      </p>
    </div>

    <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "I need a website for my business",
          project:"website",
          description:
            "Build a professional digital presence that helps customers discover your business, understand what you offer, and get in touch.",
        },
        {
          title: "I need a system to manage my business",
          project: "software",
          description:
            "Turn repetitive processes and business workflows into a custom application designed around the way your organization operates.",
        },
        {
          title: "I want to give customers their own portal",
          project: "software",
          description:
            "Create a secure digital space where customers can access information, interact with your business, or manage their own activity.",
        },
        {
          title: "I need my systems to communicate",
          project: "backend",
          description:
            "Connect applications and services so information can move between systems reliably instead of being handled manually.",
        },
        {
          title: "I want to automate a manual process",
          project: "software",
          description:
            "Identify repetitive tasks and explore ways technology can reduce manual work, improve consistency, and save valuable time.",
        },
        {
          title: "I have an idea but don't know where to start",
          project: "other",
          description:
            "Bring the idea. We'll help explore what is technically possible and what kind of solution could turn the concept into something real.",
        },
      ].map((item) => (
        <article
          key={item.title}
          className="group rounded-2xl border border-white/10 bg-slate-900/40 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/70"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
            →
          </div>

          <h3 className="mt-6 text-xl font-bold text-white">
            {item.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            {item.description}
          </p>

          <a
            href={`/?project=${item.project}#contact`} 
            className="mt-6 inline-flex text-sm font-semibold text-cyan-400"
            >
            Explore the possibility
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </article>
      ))}
    </div>
  </div>
</section>

      {/* Idea section */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Have an Idea?
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            You don&apos;t need to know exactly how to build it.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
            You bring the idea, problem, or goal. We explore the technology
            and determine what can be built to move you forward.
          </p>

          <div className="mt-10">
            <a
              href="/#contact"
              className="inline-flex items-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start a Project
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}