import Link from "next/link";
import { site } from "@/lib/site";
import { audit } from "@/lib/audit";
import { Highlight } from "./Section";
import { HeroStory } from "./HeroStory";

/**
 * The hero as the website brief lays it out (p.15): the claim on the left
 * (category, headline, subheadline, the audit and the demo) and the story on
 * the right, with its four steps across the full width under both. See
 * HeroStory for how the story is built and why it never shows an empty or
 * half-finished frame. On a phone the story follows the claim.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="measure-grid @container relative overflow-hidden"
    >
      {/*
        Two decorative layers, both behind the content and neither of them a
        shadow: a blue wash standing in for elevation, and a faint rule grid
        that gives the ground a texture at the measure's own rhythm.
      */}
      <div
        className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-[48rem]"
        aria-hidden
      />
      <div className="ruled pointer-events-none absolute inset-0" aria-hidden />

      <div className="border-line relative mx-auto w-full max-w-6xl lg:border-x">
        <div className="px-5 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12">
          {/*
            The first screen: the claim beside the story, the four steps under
            both, then a way down to the next section pinned to the bottom of
            the viewport. Any height the viewport has spare collects above that
            link. The height leaves room for the sticky header and the
            section's own top padding.
          */}
          <div className="flex min-h-[calc(100svh-6.5rem)] flex-col sm:min-h-[calc(100svh-7.5rem)]">
            <HeroStory
              intro={
                /*
                  The category label, subheadline and buttons from the website
                  brief (Drive, November 3, 2026, p.15), as written, and
                  nothing the brief's hero does not have. The headline's
                  second sentence is the team's own (November 6, 2026); the
                  brief has "Make sure it becomes an appointment."

                  "See a 2-minute demo" goes to the video section below, which
                  holds the product video until the 2-minute demo exists.
                */
                <div className="intro">
                  <div>
                    <p className="eyebrow text-blue-pale">{site.category}</p>
                    <h1 className="text-ink mt-4 text-[30px] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[40px] lg:text-[44px]">
                      Your brand creates the demand.{" "}
                      <Highlight>LeadHanger turns it into an appointment.</Highlight>
                    </h1>
                  </div>

                  <div className="mt-6">
                    <p className="text-ink-muted max-w-[34rem] text-[15px] leading-[1.6] sm:text-[17px]">
                      LeadHanger routes every inquiry to the right dealer, lets
                      the dealer text or call from your brand&apos;s number,
                      moves late leads to the next dealer, and reports what
                      happened back to the brand.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/audit"
                        className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
                      >
                        {audit.title}
                      </Link>
                      <a
                        href="#video"
                        className="border-line-strong text-ink hover:bg-panel-high rounded-full border px-6 py-3 text-[15px] font-semibold transition-colors"
                      >
                        See a 2-minute demo
                      </a>
                    </div>
                  </div>
                </div>
              }
            />

            <a
              href="#video"
              className="group text-ink-muted hover:text-ink mx-auto mt-auto flex flex-col items-center gap-1.5 pt-10 pb-2 text-[13px] font-medium transition-colors"
            >
              Explore more
              <svg
                viewBox="0 0 24 24"
                className="explore-bob size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
