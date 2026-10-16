import { Highlight, Section } from "./Section";
import { site } from "@/lib/site";

/**
 * The close. No embedded form: there is no backend in this project and no form
 * handler to submit to, and a form that silently drops submissions is worse
 * than an address. The mail link sits on top of the visible address, so the
 * section still works for anyone without a mail client configured.
 *
 * `pad="wide"` is the page drawing breath before the ask. It is the only
 * section that opens wider than its neighbours, which is the whole reason the
 * rhythm is adjustable rather than fixed.
 *
 * When a scheduling link or a real form endpoint exists, this is the one place
 * that needs to change.
 */
export function Demo() {
  return (
    <Section id="demo" pad="wide">
      <div className="reveal border-blue/30 bg-panel-blue relative overflow-hidden rounded-lg border">
        {/* The hero's wash, reprised at the close so the page opens and shuts
            on the same note. */}
        <div
          className="hero-wash pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
        />

        <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:p-14">
          <div>
            <p className="eyebrow text-blue-pale">Next step</p>
            <h2 className="text-ink mt-5 text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
              Take your first step with a <Highlight>1-on-1 demo.</Highlight>
            </h2>
            <p className="text-ink-muted mt-6 max-w-xl text-[16px] leading-[1.65] sm:text-[17px]">
              Discover how LeadHanger can streamline your B2B2C lead
              generation. See our platform in action and unlock growth with a
              personalized demo.
            </p>

            <a
              href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
                "LeadHanger demo request",
              )}`}
              className="bg-blue hover:bg-blue-hover group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
            >
              {site.cta}
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <p className="text-ink-muted mt-5 text-[14px]">
              Or write to{" "}
              <a
                href={`mailto:${site.contact.sales}`}
                className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
              >
                {site.contact.sales}
              </a>
            </p>
          </div>

          {/* The three terms of the demo, as published on the corporate site. */}
          <ul className="border-line-strong divide-line-strong self-start divide-y border-t">
            {["30-day free trial", "No credit card required", "15-minute free demo"].map(
              (term) => (
                <li
                  key={term}
                  className="text-ink flex items-center gap-3 py-5 text-[16px] font-semibold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="text-blue-pale size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  {term}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </Section>
  );
}
