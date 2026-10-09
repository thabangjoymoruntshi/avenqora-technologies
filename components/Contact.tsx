"use client";

import { FormEvent, useEffect, useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedProject = params.get("project");

    if (selectedProject) {
      setProject(selectedProject);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      project: formData.get("project"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Please complete all fields.");
        return;
      }

      setStatus(result.message);
      form.reset();
      setProject("");
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-slate-950 px-6 py-24 lg:px-8"
    >
      <div className="absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          {/* Contact message */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Start a Project
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Have an idea?
              <br />
              <span className="text-cyan-400">Let's build it.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Tell us what you're looking to build, improve, or solve. We'll
              use your information to understand the project and determine the
              best way forward.
            </p>

            <div className="mt-10 space-y-5">
              <div>
                <p className="text-sm font-semibold text-white">Digital</p>
                <p className="mt-1 text-sm text-slate-500">
                  Websites, applications, and digital experiences.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Software</p>
                <p className="mt-1 text-sm text-slate-500">
                  Custom systems built around your business.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">IT</p>
                <p className="mt-1 text-sm text-slate-500">
                  Practical technical solutions and support.
                </p>
              </div>

                        
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="project"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                What do you need?
              </label>

              <select
                id="project"
                name="project"
                value={project}
                onChange={(event) => setProject(event.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-cyan-400/50"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="website">Website / Digital Experience</option>
                <option value="software">Custom Software</option>
                <option value="backend">Backend / API</option>
                <option value="it">IT / Technical Support</option>
                <option value="other">Something Else</option>
              </select>
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Tell us about your project
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Tell us what you're trying to build or solve..."
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry →"}
            </button>

            {status && (
              <p className="mt-4 text-center text-sm text-slate-400">
                {status}
              </p>
            )}

            <p className="mt-4 text-center text-xs text-slate-600">
              We'll review your project details and get back to you.
            </p>
          </form>
        </div>
      </div>

           <a
        href="https://wa.me/27713452174?text=Hello%20Avenqora%20Technologies%2C%20I%20would%20like%20to%20make%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Avenqora Technologies on WhatsApp"
       className="fixed bottom-24 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
          aria-hidden="true"
        >
          <path d="M19.11 17.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          <path d="M16.01 3C8.83 3 3 8.83 3 16c0 2.29.6 4.44 1.73 6.33L3 29l6.84-1.69A12.93 12.93 0 0 0 16 29c7.17 0 13-5.83 13-13S23.18 3 16.01 3zm0 23.64c-2.02 0-3.99-.54-5.72-1.57l-.41-.24-4.06 1 1.08-3.95-.27-.42A10.95 10.95 0 1 1 16.01 26.64z" />
        </svg>
      </a>
    </section>
  );
}
