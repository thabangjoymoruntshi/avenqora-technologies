
import Link from "next/link";

const liveWebsite = "https://property-upreed.vercel.app/";

const gallery = [
  {
    src: "/images/property-upreed/unnamed.jpg",
    alt: "Property Upreed business and services",
  },
  {
    src: "/images/property-upreed/unnamed%201.jpg",
    alt: "Property Upreed project photography",
  },
  {
    src: "/images/property-upreed/unnamed%202%20.jpg",
    alt: "Property Upreed service work",
  },
  {
    src: "/images/property-upreed/unnamed%203.jpg",
    alt: "Property Upreed equipment and installations",
  },
  {
    src: "/images/property-upreed/unnamed%204.jpg",
    alt: "Property Upreed solutions",
  },
  {
    src: "/images/property-upreed/unnamed%205.jpg",
    alt: "Property Upreed business gallery",
  },
  {
    src: "/images/property-upreed/unnamed%206.jpg",
    alt: "Property Upreed services gallery",
  },
];

const services = [
  {
    title: "Borehole Solutions",
    description:
      "Dedicated service presentation for borehole installations, water access solutions and related services.",
  },
  {
    title: "Well Rehabilitation",
    description:
      "Information about well rehabilitation and services focused on improving existing water infrastructure.",
  },
  {
    title: "Pumps & Water Systems",
    description:
      "Showcasing pump systems, water tanks and associated water management solutions.",
  },
  {
    title: "Irrigation",
    description:
      "Presenting irrigation solutions for property and water distribution requirements.",
  },
  {
    title: "Plumbing & Drain Jetting",
    description:
      "Clear service information covering plumbing and drain jetting requirements.",
  },
  {
    title: "General Maintenance",
    description:
      "A broader service offering for property maintenance and related requirements.",
  },
];

export default function PropertyUpreedProject() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <section className="border-b border-green-950/20 bg-[#063d28] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-green-100/70 transition hover:text-[#a7cf45]"
          >
            &larr; Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-[#a7cf45]">
            Project 10 · Property Services & Maintenance
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Property Upreed
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-green-50/80">
            A professional digital presence for Property Upreed, presenting
            its borehole solutions, water infrastructure services, plumbing,
            irrigation and general property maintenance offerings.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={liveWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#a7cf45] px-6 py-3 text-sm font-semibold text-[#063d28] transition hover:bg-[#b9df60]"
            >
              Explore Live Website
            </a>

            <Link
              href="/#projects"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Website Preview */}
      <section className="bg-[#f4f7f4] py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#075b36]">
            Website Preview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#063d28]">
            A digital presence built around property solutions
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
            The website brings Property Upreed&apos;s service offering into
            one accessible online experience, helping visitors understand
            the business and find the right way to make contact.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-green-950/10 bg-white shadow-xl">
            <img
              src="/images/property-upreed/Property%20Upreed.webp"
              alt="Property Upreed website branding"
              className="block max-h-[460px] w-full bg-white object-contain p-6"
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#075b36]">
            Project Overview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#063d28]">
            Bringing property and water services online
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-neutral-600">
            Developed as a business website concept for Property Upreed
            (Pty) Ltd in Heidelberg, Gauteng. The digital experience
            presents the company&apos;s services, communicates its business
            identity and gives visitors convenient ways to explore its
            offering and make enquiries.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Business",
                value: "Property Upreed (Pty) Ltd",
              },
              {
                label: "Location",
                value: "Heidelberg, Gauteng",
              },
              {
                label: "Industry",
                value: "Property & Water Services",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-green-950/10 bg-[#f4f7f4] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#075b36]">
                  {item.label}
                </p>
                <p className="mt-3 font-semibold text-[#063d28]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#063d28] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a7cf45]">
            Business Services
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            A structured presentation of the service offering
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-green-50/70">
            The website organises the business&apos;s service areas into
            clear sections, helping visitors identify relevant solutions.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-[#a7cf45]/50"
              >
                <div className="mb-5 h-1 w-10 rounded-full bg-[#a7cf45]" />
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-green-50/65">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#f4f7f4] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#075b36]">
            Project Gallery
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#063d28]">
            A closer look at Property Upreed
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-neutral-600">
            A visual showcase using the project&apos;s supplied business
            imagery to complement its online presentation.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((photo) => (
              <div
                key={photo.src}
                className="overflow-hidden rounded-xl border border-green-950/10 bg-white shadow-sm"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#075b36]">
            Development Focus
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#063d28]">
            A responsive business website experience
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-neutral-600">
            The implementation focuses on responsive presentation,
            structured service information, intuitive navigation and
            accessible customer contact options across desktop and mobile
            devices.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Responsive Design",
              "Business Website",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-green-950/15 bg-[#f4f7f4] px-4 py-2 text-sm font-medium text-[#063d28]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#063d28] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a7cf45]">
            Explore the Project
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Discover Property Upreed online
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-green-50/70">
            Visit the live website to explore its business presentation
            and digital experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#063d28] transition hover:bg-green-50"
            >
              Back to Projects
            </Link>

            <a
              href={liveWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
