import Link from "next/link";

export default function YouMustProject() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="border-b border-stone-200 bg-[#fff8ed]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link href="/#projects" className="text-sm font-medium text-stone-500 transition hover:text-amber-700">
            ← Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Project 03 · Automotive Marketplace
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            You Must
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
            A modern automotive marketplace concept designed to make vehicle
            discovery easier through a clean browsing experience, dedicated
            vehicle pages, and a responsive interface.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://you-must.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-[#21180b] transition hover:bg-amber-400"
            >
              Explore Live Website
            </a>
            <Link
              href="/#projects"
              className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold transition hover:bg-white"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Website Preview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Explore the You Must experience
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-stone-600">
            A visual preview of the automotive marketplace, showcasing its
            vehicle-focused presentation and digital browsing experience.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
            <img
              src="/images/You%20Must%201.png"
              alt="You Must automotive marketplace website preview"
              className="block h-auto w-full"
            />

            <img
              src="/images/You%20Must%202.png"
              alt="You Must automotive marketplace website preview"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Project Overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            A digital market place for vehicle discovery
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            You Must demonstrates how a dedicated automotive platform can
            present vehicles in an organized, accessible format. The project
            focuses on a modern interface, individual vehicle experiences,
            and responsive presentation across screen sizes.
          </p>
        </div>
      </section>

      <section className="bg-[#18181b] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Platform Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Designed around the vehicle browsing journey
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Vehicle Listings</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Present vehicles in a structured format that helps visitors
                browse available automotive options.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Dedicated Vehicle Pages</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Give individual vehicles their own pages for a more focused
                browsing experience.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Responsive Experience</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Use a modern, adaptable layout designed to work across
                desktop and mobile screens.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Development Focus
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            A modern, vehicle-focused web experience
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            The project brings together page structure, reusable interface
            patterns, and responsive design to demonstrate how an automotive
            marketplace can make vehicle information easier to explore.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Next.js",
              "TypeScript",
              "Responsive Design",
              "Vehicle Listings",
              "Dynamic Pages",
              "Web Development",
            ].map((technology) => (
              <span key={technology} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700">
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#18181b] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Explore the Project
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See You Must in action
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-300">
            Visit the live website to explore the automotive marketplace
            experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/#projects" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-200">
              Back to Projects
            </Link>
            <a href="https://you-must.vercel.app/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
