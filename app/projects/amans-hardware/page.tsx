
import Link from "next/link";

const liveWebsite = "https://amans-hardware-store.vercel.app/";

const gallery = [
  { src: "/images/amans-hardware/Material%201.webp", alt: "Building materials at Amans Hardware" },
  { src: "/images/amans-hardware/Material%202.jpg", alt: "Hardware and building supplies" },
  { src: "/images/amans-hardware/Material%203.jpg", alt: "Amans Hardware product range" },
  { src: "/images/amans-hardware/Material%204.jpg", alt: "Materials for construction and renovation" },
  { src: "/images/amans-hardware/Material%206.webp", alt: "Amans Hardware product gallery" },
];

export default function AmansHardwareProject() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="border-b border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link href="/#projects" className="text-sm font-medium text-neutral-400 transition hover:text-red-400">
            &larr; Back to Projects
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
            Project 09 · Hardware & Building Supplies
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Amans Hardware
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
            A modern retail website for Amans Hardware & Building Supplies,
            designed to showcase product categories, introduce the store,
            and make customer enquiries easier.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={liveWebsite} target="_blank" rel="noopener noreferrer"
              className="rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
              Explore Live Website
            </a>
            <Link href="/#projects"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Website Preview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">A digital storefront for a local hardware business</h2>
          <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
            The website combines a clear retail presentation with product discovery
            and direct communication channels.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
            <img src="/images/amans-hardware/Amans%20Logo.jpeg"
              alt="Amans Hardware and Building Supplies logo"
              className="block max-h-[420px] w-full bg-white object-contain p-8" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Project Overview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Bringing a local hardware store online</h2>
          <p className="mt-6 max-w-3xl leading-8 text-neutral-600">
            Developed as a digital storefront for Amans Hardware & Building Supplies
            in Heidelberg, Gauteng. The website gives visitors an accessible way to
            explore the store's product ranges, view photographs, find its location,
            and contact the business about product availability.
          </p>
        </div>
      </section>

      <section className="bg-neutral-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Business Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Designed around the customer journey</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Product Categories",
                description: "Dedicated sections for building materials, hardware and tools, flooring, and wood and timber.",
              },
              {
                title: "Product Gallery",
                description: "A visual showcase of materials and products to help customers discover the store's offering.",
              },
              {
                title: "Customer Enquiries",
                description: "Direct WhatsApp and telephone contact options, alongside store information and directions.",
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Product Showcase</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">A closer look at the materials</h2>
          <p className="mt-5 max-w-3xl leading-8 text-neutral-600">
            The gallery brings the store's product ranges into the online experience,
            giving customers a visual introduction before making an enquiry.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <img src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Development Focus</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">A responsive and accessible retail experience</h2>
          <p className="mt-6 max-w-3xl leading-8 text-neutral-600">
            The implementation focuses on responsive layouts, straightforward
            navigation, clear product presentation, and convenient enquiry
            options across desktop and mobile devices.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "WhatsApp Integration"].map((item) => (
              <span key={item} className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Explore the project</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">See Amans Hardware in action</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-neutral-300">
            Visit the live website to explore the digital storefront and its customer experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/#projects" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200">
              Back to Projects
            </Link>
            <a href={liveWebsite} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Visit Live Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
