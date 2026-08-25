export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 px-6 pt-24 lg:px-8">
      {/* Background atmosphere */}
      <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06)_0,transparent_45%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Digital • Software • IT
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Technology that
            <br />
            <span className="text-cyan-400">moves business forward.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
            Avenqora Technologies builds modern digital experiences, custom
            software, and practical IT solutions designed around the way your
            business works.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              Start a Project
              <span className="ml-2">→</span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              Explore Our Work
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-white/10 pt-7">
            <div>
              <p className="text-sm font-semibold text-white">
                Built around your needs
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Practical technology
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Modern technology
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Built for today's web
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Ready to evolve
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Designed for growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}