import Link from "next/link";

export default function FlomanProject() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="border-b border-gray-200 bg-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-700"
          >
            &larr; Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Project 05 Â· Business Website
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Floman Plumbing
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
            A straightforward business website designed to help a plumbing
            business present its services, showcase plumbing supplies,
            and give customers a convenient way to get in touch.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://floman-plumbing.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Explore Live Website
            </a>

            <Link
              href="/#projects"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold transition hover:bg-gray-100"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>


      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Website Preview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
            Explore the Floman Plumbing website
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-gray-600">
            A visual preview of the website built to present Floman Plumbing's
            services and help customers connect with the business.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <img
              src="/images/Floman%20Plumbing%20.png"
              alt="Floman Plumbing website screenshot"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Project Overview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Making local business services easier to discover
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            Floman Plumbing demonstrates how a focused website can help
            a local business communicate its services and provide customers
            with a clear starting point for enquiries and product requests.
            The approach prioritizes a useful customer experience over
            unnecessary complexity.
          </p>
        </div>
      </section>

      <section className="bg-[#18181b] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Business Features
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            A clear route from browsing to enquiry
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Plumbing Services</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Present plumbing services and help potential customers
                understand what the business offers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Supplies and Products</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Give customers a place to explore plumbing supplies,
                pipes and fittings, and solar-related offerings.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Customer Contact</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Support customer communication with accessible contact
                options and WhatsApp-based ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Development Focus
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Simple, useful, and responsive
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            This project demonstrates the value of matching a website's
            features to the needs of a real business. Customers can discover
            the offering and find a route to contact the business without
            having to navigate an unnecessarily complicated platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Responsive Design",
              "Business Website",
              "Service Presentation",
              "WhatsApp Ordering",
              "Web Development",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#18181b] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Explore the project
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See Floman Plumbing in action
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-300">
            Visit the live website to explore the business's digital
            presence and customer experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#18181b] transition hover:bg-gray-100"
            >
              Back to Projects
            </Link>

            <a
              href="https://floman-plumbing.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
