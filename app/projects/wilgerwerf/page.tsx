
import Link from "next/link";

const features = [
  {
    title: "Tea Garden Experience",
    description:
      "A welcoming digital presentation of Wilgerwerf Tea Garden, highlighting its atmosphere, hospitality and special experiences.",
  },
  {
    title: "Venue Hire & Celebrations",
    description:
      "Showcases the venue for birthday parties, kitchen teas, baby showers, family gatherings and special occasions.",
  },
  {
    title: "Events & Functions",
    description:
      "Presents options for business meetings, conferences, buffet experiences, party planning and memorial services.",
  },
];

const technologies = [
  "Next.js",
  "Responsive Design",
  "Business Website",
  "Website Development",
  "Digital Experiences",
];

export default function WilgerwerfProject() {
  return (
    <main className="min-h-screen bg-[#F5E9CE] text-[#252914]">
      {/* Hero */}
      <section className="border-b border-[#646847]/20 bg-[#EEE0BF]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-[#646847] transition hover:text-[#252914]"
          >
            &larr; Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-[#646847]">
            Project 04 · Tea Garden & Venue
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Wilgerwerf Tea Garden
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555642]">
            A beautifully presented website created to showcase Wilgerwerf
            Tea Garden, its venue, hospitality, celebrations and event
            experiences through a warm and elegant digital presence.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="https://wilgerwerf-tea-garden.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#646847] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#252914]"
            >
              Explore Live Website
            </a>

            <Link
              href="/#projects"
              className="rounded-full border border-[#646847]/40 px-7 py-3 text-sm font-semibold text-[#252914] transition hover:bg-[#F5E9CE]"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Website Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#646847]">
            Website Preview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A digital experience inspired by nature and hospitality
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-[#555642]">
            The website uses a warm botanical visual direction to reflect
            the character of the tea garden while presenting its services
            and venue information in a clear and accessible way.
          </p>

          <div className="mt-10 grid gap-7">
            <div className="overflow-hidden rounded-2xl border border-[#646847]/20 bg-[#EEE0BF] shadow-lg">
              <img
                src="/images/Wilderwerf.png"
                alt="Wilgerwerf Tea Garden website preview"
                className="block h-auto w-full"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#646847]/20 bg-[#EEE0BF] shadow-lg">
              <img
                src="/images/Wilderwerf%202.png"
                alt="Wilgerwerf Tea Garden additional website preview"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="border-y border-[#646847]/20 bg-[#EEE0BF] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#646847]">
            Project Overview
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Bringing a welcoming venue into the digital space
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-[#555642]">
            Wilgerwerf Tea Garden demonstrates how thoughtful website
            development can help a hospitality and events business
            communicate its offering online. The website brings together
            venue information, services, photography, customer reviews
            and contact options in one cohesive experience.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#252914] py-20 text-[#F5E9CE]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C4C89B]">
            Website Features
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Designed around experiences, events and hospitality
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[#F5E9CE]/15 bg-white/[0.04] p-7"
              >
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#D2D0B8]">
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
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#646847]">
            Development Focus
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A distinctive and responsive business website
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-[#555642]">
            The development focused on creating a consistent visual
            identity, presenting information clearly and making the
            website accessible across different screen sizes.
            Its warm colour palette, botanical direction and structured
            content help establish a recognisable online presence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[#646847]/30 bg-[#EEE0BF] px-4 py-2 text-sm font-medium text-[#555642]"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#646847] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EEE0BF]">
            Explore the Project
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Experience Wilgerwerf Tea Garden
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#F5E9CE]">
            Visit the live website to explore the finished digital
            experience and discover what Wilgerwerf Tea Garden offers.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-full bg-[#F5E9CE] px-7 py-3 text-sm font-semibold text-[#252914] transition hover:bg-white"
            >
              Back to Projects
            </Link>

            <a
              href="https://wilgerwerf-tea-garden.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/50 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

