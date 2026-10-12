
"use client";

import { useState } from "react";

const questions = [
  {
    question: "What services does Avenqora Technologies offer?",
    answer:
      "We offer website and digital experience development, custom software solutions, backend and API development, and IT and technical support.",
  },
  {
    question: "How do I start a project?",
    answer:
      "Submit an inquiry through our contact form. Describe what you need, and we can use that information to understand your goals and discuss the next steps.",
  },
  {
    question: "Can you build software around my business needs?",
    answer:
      "Yes. We can discuss your requirements and explore a suitable solution, from a business website to a custom web application or backend system.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Costs depend on the scope, features, complexity, and requirements. Contact us with your project details so we can better understand what is involved.",
  },
  {
    question: "Do you provide ongoing technical support?",
    answer:
      "Support requirements can be discussed based on your project and needs. Contact us to explain the type of assistance you are looking for.",
  },
  {
    question: "How long does development take?",
    answer:
      "Timelines depend on the size and complexity of the project. Once we understand your requirements, we can discuss a realistic timeframe.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-t border-white/10 bg-slate-950 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Frequently Asked Questions
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Questions?
            <span className="block text-cyan-400">
              We've got answers.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Learn more about our services, project planning, and how to get
            started with Avenqora Technologies.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Ask About Your Project →
          </a>
        </div>

        <div className="space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className="rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="font-semibold text-white">
                    {item.question}
                  </span>

                  <span className="shrink-0 text-xl text-cyan-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6">
                    <p className="leading-7 text-slate-400">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
