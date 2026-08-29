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
    </section>
  );
}