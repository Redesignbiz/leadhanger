import Link from "next/link";
import { audit } from "@/lib/audit";
import type { ReactNode } from "react";

/**
 * The ask the hero story ends on, after the Mosey hero's closing card. It
 * takes the stage once the last chapter ends, centred where the story was:
 * the heading, one line, and the two actions.
 *
 * `clock` is the story's timer for this scene, an invisible element; when it
 * runs out the story starts again. It pauses while the pointer is on the card
 * or focus is inside it, so nobody loses the button while reaching for it.
 *
 * The story ends on the brand's report, so the ask is the free Lead Response
 * Audit, in the website brief's own words (p.17, kept in lib/audit.ts): the
 * primary button goes to /audit, the secondary one to the plans.
 */
export function HeroCta({ clock }: { clock: ReactNode }) {
  return (
    <div className="story-cta border-line bg-panel relative w-full max-w-[40rem] rounded-lg border p-6 text-center sm:p-8 lg:p-12">
      {clock}
      <div>
        <h2 className="text-ink text-[26px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[32px]">
          {audit.title}
        </h2>
        <p className="text-ink-muted mx-auto mt-5 max-w-md text-[15px] leading-[1.65]">
          {audit.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/audit"
            className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
          >
            {audit.cta}
          </Link>
          <Link
            href="/plans"
            className="text-ink hover:text-blue-pale text-[15px] font-semibold transition-colors"
          >
            View plans
          </Link>
        </div>
      </div>
    </div>
  );
}
