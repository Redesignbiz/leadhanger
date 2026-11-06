import Link from "next/link";
import { audit, auditHref, type AuditIndustry } from "@/lib/audit";
import { Section } from "./Section";

/**
 * The close the website brief gives most pages: the free Lead Response
 * Audit, in the brief's own words (lib/audit.ts), and one button.
 */
export function AuditCall({ industry }: { industry?: AuditIndustry }) {
  return (
    <Section className="border-line border-t" pad="tight">
      <div className="reveal flex flex-col items-center gap-4 text-center">
        <h2 className="text-ink text-[24px] leading-tight font-bold tracking-[-0.02em] sm:text-[28px]">
          {audit.title}
        </h2>
        <p className="text-ink-muted max-w-xl text-[15px] leading-[1.65]">{audit.intro}</p>
        <Link
          href={auditHref({ industry })}
          className="bg-blue hover:bg-blue-hover mt-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
        >
          {audit.cta}
        </Link>
      </div>
    </Section>
  );
}
