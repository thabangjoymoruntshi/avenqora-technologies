export default function Founder() {
  return (
    <section id="founder" className="border-t border-gray-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          <div className="flex justify-center lg:justify-start">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <img
                src="/images/Founder.jpg"
                alt="Thabang Joy Moruntshi, Founder and CEO of Avenqora Technologies"
                className="h-auto w-full max-w-md object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Founder & CEO
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Meet the Founder
            </h2>

            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Thabang Joy Moruntshi
            </h3>

            <p className="mt-2 text-lg font-medium text-gray-600">
              Founder & CEO, Avenqora Technologies
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Thabang Joy Moruntshi is the Founder and CEO of Avenqora
              Technologies, focused on building practical digital experiences,
              software solutions, and IT services that help businesses solve
              real problems through technology.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              Avenqora was founded around the belief that technology should be
              practical, adaptable, and built around the needs of the people
              and businesses using it.
            </p>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Start a Project →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}