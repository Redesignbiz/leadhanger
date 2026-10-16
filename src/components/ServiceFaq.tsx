/**
 * Package questions, for /our-solution.
 *
 * This replaces the old home-page FAQ, which was deleted: four of its seven
 * answers were a prose restatement of the comparison table, and the whole of it
 * derived from an internal Drive sheet that was never cleared for publication.
 * The five below are the copy Selen supplied on 2026-09-15.
 *
 * They live here rather than on the home page because every one of them is a
 * question about the packages. The home page no longer carries an FAQ at all.
 *
 * "Leadhanger" in the supplied text is set as "LeadHanger" throughout, matching
 * `site.name` and the rest of the site.
 */
const faqs = [
  {
    q: "What's the main difference between the Lite, Pro, and Custom packages?",
    a: "The Lite package focuses on basic lead capture and location-based matching, Pro offers industry-specific data and advanced reporting, while Custom provides fully tailored solutions with AI-powered lead matching and branded integration.",
  },
  {
    q: "How are leads transferred to dealers in each package?",
    a: "In the Lite package, leads are sent via email; Pro delivers leads through the LeadHanger app; Custom uses a white-label version of the app tailored to your brand.",
  },
  {
    q: "Can I customize the information collected from leads?",
    a: "Yes, the Custom package allows full customization of the data collected based on your business needs.",
  },
  {
    q: "Is reporting included in all packages?",
    a: "Yes, but the level varies: Lite includes downloadable reports, Pro offers industry-specific insights, and Custom provides personalized, in-depth reporting.",
  },
  {
    q: "How does lead matching work in each package?",
    a: "Lite matches leads by location, Pro matches them based on your preferences, and Custom uses AI and multiple smart factors for optimal dealer pairing.",
  },
];

export function ServiceFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      {/*
        `<` is escaped to its unicode form: JSON.stringify does not sanitize,
        and this payload goes into the document as raw HTML.
        Source: node_modules/next/dist/docs/01-app/02-guides/json-ld.md
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/*
        Collapsed by default, which the chevron in the supplied design already
        implies. It also keeps five answers from sprawling directly under a
        thirteen-row table — and a closed `details` is still in the DOM, so the
        answers are indexed either way.
      */}
      <div className="reveal-stack space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group border-line bg-panel hover:border-line-strong rounded-lg border transition-colors"
          >
            <summary className="flex cursor-pointer list-none items-start gap-4 p-5 sm:p-6">
              <h3 className="text-ink flex-1 text-[16px] leading-snug font-semibold tracking-[-0.01em] sm:text-[17px]">
                {faq.q}
              </h3>
              <svg
                viewBox="0 0 24 24"
                className="text-ink-dim group-hover:text-ink group-open:text-blue-pale mt-0.5 size-4 shrink-0 transition-transform duration-200 group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </summary>
            <p className="text-ink-muted max-w-3xl px-5 pb-5 text-[14.5px] leading-[1.7] sm:px-6 sm:pb-6">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
