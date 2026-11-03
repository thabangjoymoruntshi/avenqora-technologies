
import Link from "next/link";

const features = [
  {
    title: "Auto Electrical Diagnostics",
    description:
      "Showcases the business's automotive electrical diagnostic and troubleshooting services.",
  },
  {
    title: "Starter & Alternator Repairs",
    description:
      "Highlights specialist starter and alternator repair services for vehicle owners.",
  },
  {
    title: "Vehicle Tracking & Security",
    description:
      "Presents vehicle tracking and security solutions, including AutoWatch and Netstar.",
  },
];

const technologies = [
  "Next.js",
  "Responsive Design",
  "Business Website",
  "Automotive Services",
  "Web Development",
];

export default function JakesAutoElectricalProject() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-blue-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-blue-700 transition hover:text-blue-950"
          >
            &larr; Back to Projects
          </Link>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_280px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Project 08 · Automotive Business Website
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
                Jake's Auto Electrical
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                A professional digital presence created for an automotive
                electrical business, presenting its services, vehicle
                solutions, business information and customer contact options.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://jakes-auto-electrical-prototype.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Explore Live Website
                </a>

                <Link
                  href="/#projects"
                  className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold transition hover:bg-white"
                >
                  Back to Portfolio
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-lg">
              <img
                src="/images/jakes-auto-electrical/jakes-logo.png"
                alt="Jake's Auto Electrical logo"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Website Preview */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Website Preview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A digital experience for automotive services
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            Explore the website design and how the business's services,
            branding and customer information are presented online.
          </p>

          <div className="mt-10 grid gap-8">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
              <img
                src="/images/jakes-auto-electrical/Picture%201.jpeg"
                alt="Jake's Auto Electrical website homepage preview"
                className="block h-auto w-full"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
              <img
                src="/images/jakes-auto-electrical/Picture%202.jpeg"
                alt="Jake's Auto Electrical additional website preview"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-y border-blue-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Project Overview
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Bringing automotive expertise online
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-slate-600">
            The website gives Jake's Auto Electrical a structured online
            presence where customers can discover automotive electrical
            services, explore vehicle security solutions and find business
            contact information. The design combines automotive imagery
            with a clean blue-and-white visual identity.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#101C32] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Business Features
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Services and solutions presented clearly
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
              >
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Focus */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Development Focus
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Professional, responsive and customer-focused
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-slate-600">
            The development focused on presenting the business professionally,
            organising service information and creating an accessible
            experience across desktop and mobile devices.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#101C32] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Explore the Project
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Experience Jake's Auto Electrical
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Visit the live prototype to explore the website and its
            automotive business experience.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#101C32] transition hover:bg-blue-50"
            >
              Back to Projects
            </Link>

            <a
              href="https://jakes-auto-electrical-prototype.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
