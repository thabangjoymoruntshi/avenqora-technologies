import Link from "next/link";

export default function ACPlumbingProject() {
  return (
    <main className="min-h-screen bg-white text-stone-900">
      <section className="border-b border-stone-200 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link href="/#projects" className="text-sm font-medium text-slate-500 transition hover:text-amber-600">
            ← Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Project 06 · Plumbing Services
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            A &amp; C Plumbing Vaal Triangle
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
            A professional plumbing business website created to showcase
            services, highlight the business's Best of Vaal Readers' Choice
            Award 2026 recognition, and make it easier for customers to get
            in touch.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://ac-plumbing.vercel.app/"
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
            Explore the A &amp; C Plumbing website
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-stone-600">
            A preview of the business website, designed to bring together
            service information, award recognition, and customer contact
            options in one professional online destination.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
            <img
              src="/images/AC%20Plumbing.png"
              alt="A and C Plumbing Vaal Triangle website preview"
              className="block h-auto w-full"
            />

            <img
              src="/images/AC%20Plumbing 2.png"
              alt="A and C Plumbing Vaal Triangle website preview"
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
            A stronger online presence for a local plumbing business
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            This project demonstrates how a business website can present
            services clearly while building credibility through the company's
            award recognition. The experience brings service information and
            direct customer contact options together in a responsive design.
          </p>
        </div>
      </section>

      <section className="bg-[#101c32] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Website Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Built to showcase the business and its services
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Award Recognition</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Highlight the Best of Vaal Readers' Choice 2026 recognition
                as an important part of the business's online presentation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Service Presentation</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Present plumbing and related building services in a clear,
                accessible format for prospective customers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">Customer Contact</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Make it easier for visitors to connect with the business
                through convenient contact options, including WhatsApp.
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
            Professional presentation with practical functionality
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-stone-600">
            The website focuses on responsive layouts, recognizable business
            branding, clear service presentation, and accessible contact
            options. Its goal is to help customers understand the offering
            and take the next step towards making an enquiry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Next.js",
              "Responsive Design",
              "Business Website",
              "Award Showcase",
              "WhatsApp Contact",
              "Web Development",
            ].map((technology) => (
              <span key={technology} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700">
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101c32] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Explore the Project
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See A &amp; C Plumbing in action
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-300">
            Visit the live website to explore the business's services,
            presentation, and customer experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/#projects" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-200">
              Back to Projects
            </Link>
            <a href="https://ac-plumbing.vercel.app/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1c2c46]">
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
