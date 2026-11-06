import { UnverifiedFigure } from "./DraftNote";

/**
 * One line of proof under a claim, as the website brief's content rules ask
 * (p.25: every section opens with a claim and a proof). `value` is the
 * figure, `text` what it measures, where and when. `verify` marks a figure
 * still to be checked against its source; it shows framed, as "to verify".
 */
export type ProofLine = { value: string; text: string; verify?: boolean };

export function Proof({ proof, className = "" }: { proof: ProofLine; className?: string }) {
  return (
    <p
      className={`border-blue-pale text-ink-muted border-l-2 pl-3 text-[14.5px] leading-[1.55] ${className}`}
    >
      <span className="text-ink font-semibold">
        {proof.verify ? <UnverifiedFigure>{proof.value}</UnverifiedFigure> : proof.value}
      </span>{" "}
      {proof.text}
    </p>
  );
}
