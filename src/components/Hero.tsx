import { site } from "@/lib/site";
import { Highlight } from "./Section";
import { HeroStory } from "./HeroStory";
import { Tally } from "./Tally";

/**
 * The hero is the story: see HeroStory for how it is built and why it never
 * shows an empty or half-finished frame. The claim sits above it, headline on
 * the left and the explanation on the right, so the first screen says what
 * the product does and then shows it.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
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
            The first screen: the claim, the story, then a way down pinned to
            the bottom of the viewport. Whatever height the viewport has spare
            is split above and below the story, so it sits in the middle of
            the space it has rather than hugging the claim. The height leaves
            room for the sticky header and the section's own top padding.
          */}
          <div className="flex min-h-[calc(100svh-6.5rem)] flex-col sm:min-h-[calc(100svh-7.5rem)]">
            <div className="intro grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <h1 className="text-ink text-[32px] leading-[1.06] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
                Boost Your <Highlight>B2B2C Sell-outs.</Highlight>
              </h1>

              <p className="text-ink-muted max-w-lg text-[15px] leading-[1.6] sm:text-[16px]">
                LeadHanger is an intelligent lead qualification and
                distribution platform that engages website visitors in real
                time and seamlessly connects them with the right dealers for
                B2B2C companies.
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-center pt-8 sm:pt-10">
              <HeroStory />
            </div>

            <a
              href="#overview"
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

          {/*
            A teaser, not the proof itself. The same four figures get full
            labels and room to breathe in the Results section; repeating them at
            full size in both places just reads as padding.

            The cells are separated by rules rather than by filled tiles,
            because a filled tile here would punch an opaque hole in the wash
            and the grid behind it. Two columns on a phone, four in a row above
            `sm`, which is why the border classes are computed per index.
          */}
          <dl
            id="overview"
            className="reveal-stack border-line mt-12 grid grid-cols-2 border-t sm:mt-16 sm:grid-cols-4"
          >
            {site.metrics.map((metric, index) => (
              <div
                key={metric.short}
                className={[
                  "border-line py-6",
                  index % 2 === 1 && "border-l pl-5",
                  index >= 2 && "border-t",
                  "sm:border-t-0",
                  index > 0 ? "sm:border-l sm:pl-5" : "sm:border-l-0 sm:pl-0",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <dt className="text-blue-pale text-[24px] leading-none font-medium tracking-[-0.02em] tabular-nums sm:text-[28px]">
                  <Tally value={metric.value} />
                </dt>
                <dd className="text-ink-muted mt-3 text-[13px] leading-5">
                  {metric.short}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
