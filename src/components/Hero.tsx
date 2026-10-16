import { Highlight } from "./Section";
import { HeroStory } from "./HeroStory";

/**
 * The hero is the story: see HeroStory for how it is built and why it never
 * shows an empty or half-finished frame. The claim sits above it, headline on
 * the left and the explanation on the right, so the first screen says what
 * the product does and then shows it.
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
            The first screen: the claim, the story, then a way down to the next
            section pinned to the bottom of the viewport. The story sits close
            under the claim and any height the viewport has spare collects
            below it, so the steps and their caption have room. The height
            leaves room for the sticky header and the section's own top
            padding.
          */}
          <div className="flex min-h-[calc(100svh-6.5rem)] flex-col sm:min-h-[calc(100svh-7.5rem)]">
            <div className="intro grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
              <h1 className="text-ink text-[30px] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[40px]">
                Boost Your <br />
                <Highlight>B2B2C Sell-outs.</Highlight>
              </h1>

              <p className="text-ink-muted max-w-[17rem] lg:justify-self-end text-[13px] leading-[1.6] sm:text-[14px]">
                LeadHanger qualifies the visitors on your website in real time
                and connects each one to the right dealer.
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-start pt-6 sm:pt-8">
              <HeroStory />
            </div>

            <a
              href="#video"
              className="group text-ink-muted hover:text-ink mx-auto flex flex-col items-center gap-1.5 pt-10 pb-2 text-[13px] font-medium transition-colors"
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
