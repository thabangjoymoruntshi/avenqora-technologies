
import Link from "next/link";

export default function CityPlumberProject() {
  return (
    <main className="min-h-screen bg-white text-stone-900">
      <section className="border-b border-stone-200 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-slate-500 transition hover:text-amber-600"
          >
            &larr; Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Project 04 Â· Business Website
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            City Plumber &amp; Drilling Contractor
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
            A professional business website built to present plumbing and
            drilling services, showcase project imagery, and help potential
            customers discover services and make enquiries.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://city-plumber-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-[#101c32] transition hover:bg-amber-600"
            >
              Explore Live Website
            </a>

            <Link
              href="/#projects"
              className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold transition hover:bg-stone-100"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>


      <section className="bg-[#f5f7fa] py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Website Preview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#101c32]">
            Explore the City Plumber website
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-stone-600">
            A visual preview of the website showcasing plumbing and drilling
            services, project photography, and customer enquiry options.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
            <img
              src="/images/City%20Plumber.png"
              alt="City Plumber and Drilling Contractor website screenshot"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Project Overview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            A practical digital presence for a service business
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            The website gives the business an online destination where
            customers can learn about its services, view project photography,
            find business information, and access enquiry options.
            The focus is on clear presentation, usability, and helping
            customers take the next step.
          </p>
        </div>
      </section>

      <section className="bg-[#101c32] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Website Features
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Built around customer needs
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Service Presentation</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Present plumbing and drilling services in an accessible
                format so visitors can understand the business offering.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Project Gallery</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Showcase project imagery to give prospective customers a
                visual reference for the business and its work.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Customer Enquiries</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Make it easier for visitors to find business information
                and take the next step towards requesting a service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Development Focus
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            A responsive business website
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            This project demonstrates how a focused website can give a
            service business a professional online presence without the
            complexity of a large management platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Responsive Design",
              "Service Pages",
              "Image Gallery",
              "Customer Enquiries",
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

      <section className="bg-[#101c32] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Explore the project
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See the website in action
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-300">
            Visit the deployed website to explore the actual customer
            experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-200"
            >
              Back to Projects
            </Link>

            <a
              href="https://city-plumber-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1c2c46]"
            >
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
