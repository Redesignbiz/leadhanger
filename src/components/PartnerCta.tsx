import { site } from "@/lib/site";
import { Section } from "./Section";

/**
 * The mid-page ask, carried over from the corporate site.
 *
 * A contained box rather than a full-bleed band, so it reads as a pause in the
 * page and not as a section of its own. It sits on `blue-deep`, the same value
 * as the Results section, because flat corporate `blue` over an area this size
 * was too bright on the dark ground.
 *
 * The corporate version shows a dashboard capture on the right. There is no
 * cleared product capture in this project yet (see docs/images.md), so the box
 * is text only until one exists.
 */
export function PartnerCta() {
  return (
    <Section id="partner" pad="tight">
      <div className="reveal bg-blue-deep rounded-lg px-7 py-12 sm:px-12 sm:py-16">
        <h2 className="text-on-blue max-w-xl text-[28px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[38px]">
          Partner with us for smarter lead management
        </h2>
        <a
          href="#demo"
          className="text-blue hover:bg-on-blue-muted mt-8 inline-flex rounded-full bg-white px-6 py-3 text-[15px] font-semibold transition-colors"
        >
          {site.cta}
        </a>
      </div>
    </Section>
  );
}
