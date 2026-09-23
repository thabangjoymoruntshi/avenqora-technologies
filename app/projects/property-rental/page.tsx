import Link from "next/link";

export default function PropertyRentalProject() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            
             <Link
            href="/#projects"
            className="text-sm font-medium text-slate-500 transition hover:text-cyan-400"
          >
            ← Back to Projects
          </Link>

          
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Property Technology
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Property Rental Platform
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              A full-stack property rental application concept connecting
              property listings, users, and rental workflows through a modern
              digital experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-stone-200 px-4 py-2 text-sm text-stone-700">
                React
              </span>
              <span className="rounded-full bg-stone-200 px-4 py-2 text-sm text-stone-700">
                Node.js
              </span>
              <span className="rounded-full bg-stone-200 px-4 py-2 text-sm text-stone-700">
                Prisma
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Project Overview
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
                A modern approach to property rentals
              </h2>

              <p className="mt-6 leading-7 text-stone-600">
                Rentora Properties is a full-stack property rental platform
                designed to provide a simple and professional experience for
                discovering properties and managing rental enquiries.
              </p>

              <p className="mt-4 leading-7 text-stone-600">
                The platform combines a modern property marketplace interface
                with backend data management, property submissions, enquiry
                handling, and administrative workflows.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-sm">
              <img
                src="/images/Rentora%20Properties.png"
                alt="Rentora Properties"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Key Features
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              Built around the rental workflow
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-stone-900">
                Property Listings
              </h3>
              <p className="mt-3 leading-6 text-stone-600">
                Present rental properties with clear information including
                location, property type, bedrooms, pricing, and descriptions.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-stone-900">
                Property Submissions
              </h3>
              <p className="mt-3 leading-6 text-stone-600">
                Allow property owners or representatives to submit properties
                for review through a structured workflow.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-stone-900">
                Admin Management
              </h3>
              <p className="mt-3 leading-6 text-stone-600">
                Provide administrative controls for reviewing, approving, and
                rejecting submitted properties.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-stone-900">
                Rental Enquiries
              </h3>
              <p className="mt-3 leading-6 text-stone-600">
                Give prospective tenants a straightforward way to enquire
                about available properties.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-stone-900">
                Database Integration
              </h3>
              <p className="mt-3 leading-6 text-stone-600">
                Use Prisma and a PostgreSQL database to manage application
                data and rental records.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-stone-900">
                Responsive Experience
              </h3>
              <p className="mt-3 leading-6 text-stone-600">
                Designed to provide a consistent experience across desktop,
                tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Technology
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              Full-stack development
            </h2>

            <p className="mt-6 leading-7 text-stone-600">
              The project demonstrates frontend development, backend API
              development, database integration, and administrative
              functionality working together as one application.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["React", "Node.js", "Prisma", "PostgreSQL", "Next.js"].map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Explore the project
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See Rentora Properties in action
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-300">
            Explore the property rental platform and its digital experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-200"
            >
              Back to Projects
            </Link>

            <a
              href="https://rentora-properties.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-stone-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Explore Rentora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}