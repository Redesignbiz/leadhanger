import { JsonLd } from "./JsonLd";

/**
 * Questions and answers, with the matching FAQPage structured data, so the
 * answers can be quoted in search results and AI answers (a website brief
 * requirement).
 *
 * Collapsed by default. A closed `details` is still in the DOM, so the answers
 * are indexed either way.
 */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <div className="reveal-stack space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group border-line bg-panel hover:border-line-strong rounded-lg border transition-colors"
          >
            <summary className="flex cursor-pointer list-none items-start gap-4 p-5 sm:p-6">
              <h3 className="text-ink flex-1 text-[16px] leading-snug font-semibold tracking-[-0.01em] sm:text-[17px]">
                {item.q}
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
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
