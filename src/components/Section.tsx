import type { ReactNode } from "react";

/** One measure for the whole page: content width and vertical rhythm live here. */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** `dark` is for the one section that sits on the inverse surface. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p
          className={`eyebrow mb-3 ${dark ? "text-primary-fixed-dim" : "text-primary"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl ${
          dark ? "text-inverse-ink" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-inverse-ink-muted" : "text-ink-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
