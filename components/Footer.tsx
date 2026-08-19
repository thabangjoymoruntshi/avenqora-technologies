const footerLinks = {
  Company: [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Founder & CEO", href: "/founder" },
    { name: "Contact", href: "#contact" },
  ],
  Services: [
    { name: "Digital Experiences", href: "#services" },
    { name: "Software Solutions", href: "#services" },
    { name: "Backend & Data", href: "#services" },
    { name: "IT & Technical Solutions", href: "#services" },
  ],
};
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="/" className="inline-block">
              <div className="text-xl font-bold tracking-wide text-white">
                AVENQORA
              </div>

              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Technologies
              </div>
            </a>

            <p className="mt-5 max-w-sm leading-7 text-slate-500">
              Technology that moves business forward. Digital experiences,
              software solutions, and IT built around real business needs.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-cyan-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-cyan-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Avenqora Technologies. All rights reserved.</p>

          <p>Technology That Moves Business Forward.</p>
        </div>
      </div>
    </footer>
  );
}