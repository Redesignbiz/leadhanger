import { Section } from "./Section";
import { site } from "@/lib/site";

/**
 * The close. No embedded form: there is no backend in this project and no form
 * handler to submit to, and a form that silently drops submissions is worse
 * than an address. The mail link sits on top of the visible address, so the
 * section still works for anyone without a mail client configured.
 *
 * When a scheduling link or a real form endpoint exists, this is the one place
 * that needs to change.
 */
export function Demo() {
  return (
    <Section id="demo" className="border-t border-outline-variant">
      <div className="rounded-lg border border-outline-variant bg-surface-lowest p-7 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="eyebrow mb-3 text-primary">Next step</p>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
              See it running on your own funnel
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              Tell us what you sell and how your network is organized. Twenty
              minutes is enough to walk through the flow end to end, from the
              conversation on your site to the dealer report your team would be
              reading.
            </p>

            <a
              href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
                "LeadHanger demo request",
              )}`}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
            >
              {site.cta}
              <svg
                viewBox="0 0 24 24"
                className="size-4"
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

            <p className="mt-4 text-[14px] text-ink-muted">
              Or write to{" "}
              <a
                href={`mailto:${site.contact.sales}`}
                className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-bright"
              >
                {site.contact.sales}
              </a>
            </p>
          </div>

          <dl className="grid gap-px self-start overflow-hidden rounded-DEFAULT border border-outline-variant bg-outline-variant">
            {site.offices.map((office) => (
              <div key={office.city} className="bg-surface-low px-5 py-4">
                <dt className="text-[15px] font-semibold text-ink">
                  {office.city}
                </dt>
                <dd className="mt-0.5 text-[13px] text-ink-muted">
                  {office.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
