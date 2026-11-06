"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { site } from "@/lib/site";
import {
  audit,
  auditIndustries,
  auditLocations,
  auditRoles,
  isPersonalEmail,
  labelOf,
  parseAuditRequest,
  type AuditRequest,
} from "@/lib/audit";
import { MediaPlaceholder } from "./MediaPlaceholder";

/**
 * The /audit form, as the website brief (p.17) lays it out: say what the
 * buyer gets, ask three qualifying questions, take the website and a work
 * email, then move to a calendar rather than a thank-you page.
 *
 * Step 2 is a placeholder until the booking tool is chosen (open item). The
 * request goes to /api/audit; when that cannot take it (it is not connected
 * to anything yet in production), the form offers to send the same details
 * by email, so a request is never silently lost.
 *
 * A link from a vertical page can choose the role and industry in advance
 * (`/audit?role=brand&industry=tires`, built by `auditHref`). The query is
 * read after hydration, so the page itself stays static.
 */

type Field = "role" | "industry" | "locations" | "website" | "email";
type Choices = Partial<Record<"role" | "industry" | "locations", string>>;

const noSubscription = () => () => {};

/** Moves focus to the second step's heading when it appears. Stable, so it runs once. */
const focusOnMount = (node: HTMLElement | null) => node?.focus();

function useSearch() {
  return useSyncExternalStore(
    noSubscription,
    () => window.location.search,
    () => "",
  );
}

function prefilled(search: string): Choices {
  const query = new URLSearchParams(search);
  const role = query.get("role");
  const industry = query.get("industry");
  return {
    role: auditRoles.some((option) => option.value === role) ? role! : undefined,
    industry: auditIndustries.some((option) => option.value === industry)
      ? industry!
      : undefined,
  };
}

function mailBody(request: Partial<AuditRequest>) {
  return [
    "I would like a free Lead Response Audit.",
    "",
    `I am a: ${labelOf(auditRoles, request.role ?? "")}`,
    `Industry: ${labelOf(auditIndustries, request.industry ?? "")}`,
    `Dealer locations: ${request.locations ?? ""}`,
    `Website to audit: ${request.website ?? ""}`,
    `Work email: ${request.email ?? ""}`,
  ].join("\n");
}

function mailHref(request: Partial<AuditRequest>) {
  const subject = encodeURIComponent("Free Lead Response Audit request");
  return `mailto:${site.contact.sales}?subject=${subject}&body=${encodeURIComponent(mailBody(request))}`;
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-rose-lift mt-2 text-[13.5px]">
      {children}
    </p>
  );
}

function Choice({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: Field;
  legend: string;
  options: readonly { value: string; label: string }[];
  value: string | undefined;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-ink text-[15px] font-semibold">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, index) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              id={index === 0 ? name : undefined}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="border-line-strong text-ink-muted hover:border-ink-dim hover:text-ink peer-checked:border-blue-pale peer-checked:bg-panel-blue peer-checked:text-ink peer-focus-visible:outline-blue-pale block cursor-pointer rounded-full border px-4 py-2 text-[15px] font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </fieldset>
  );
}

const inputClass =
  "border-line-strong bg-panel text-ink placeholder:text-ink-dim focus:border-blue-pale mt-3 block w-full rounded-md border px-4 py-3 text-[16px] outline-none transition-colors aria-invalid:border-rose";

export function AuditForm() {
  const search = useSearch();
  const [choices, setChoices] = useState<Choices>({});
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [sent, setSent] = useState<AuditRequest | null>(null);

  // A choice the visitor makes wins over the one the link brought.
  const chosen: Choices = { ...prefilled(search), ...choices };
  const draft = { ...chosen, website: website.trim(), email: email.trim() } as Partial<AuditRequest> & {
    website: string;
    email: string;
  };

  function choose(field: keyof Choices, value: string) {
    setChoices((now) => ({ ...now, [field]: value }));
    setErrors((now) => ({ ...now, [field]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found: Partial<Record<Field, string>> = {};
    if (!chosen.role) found.role = "Choose the one that fits best.";
    if (!chosen.industry) found.industry = "Choose an industry.";
    if (!chosen.locations) found.locations = "Choose a range.";
    if (draft.website.length < 4 || !draft.website.includes("."))
      found.website = "Enter the address of the site, for example www.samplewindows.com.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
      found.email = "Enter an email address, for example jane@samplewindows.com.";

    setErrors(found);
    const first = (["role", "industry", "locations", "website", "email"] as const).find(
      (field) => found[field],
    );
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    const request = parseAuditRequest(draft);
    if (!request) return;

    setStatus("sending");
    const fax = new FormData(event.currentTarget).get("fax");
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, fax }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(request);
      setStatus("idle");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="reveal">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="eyebrow text-blue-pale shrink-0">
            Step {sent ? 2 : 1} of 2
          </span>
          <span className="bg-line h-px flex-1" aria-hidden />
        </div>

        <h1 className="text-ink mt-8 text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
          {audit.title}
        </h1>
        <p className="text-ink-muted mt-6 text-[15px] leading-[1.65] sm:text-[17px]">
          {audit.intro}
        </p>
      </div>

      {sent ? (
        <div className="mt-12">
          <h2
            ref={focusOnMount}
            tabIndex={-1}
            className="text-ink text-[22px] leading-tight font-bold tracking-[-0.02em] outline-none sm:text-[26px]"
          >
            Pick a time for a 20-minute call
          </h2>
          <p className="text-ink-muted mt-4 text-[15px] leading-[1.65]">
            We received your request to audit{" "}
            <span className="text-ink font-medium">{sent.website}</span>.
          </p>
          <div className="mt-8">
            <MediaPlaceholder kind="calendar" label="Open times for a 20-minute call" />
          </div>
          <p className="text-ink-dim mt-4 text-[14px] leading-[1.6]">
            Until booking opens here, we write to{" "}
            <span className="text-ink-muted">{sent.email}</span> to agree on a
            time.
          </p>
        </div>
      ) : (
        <form noValidate onSubmit={submit} className="mt-12 space-y-9">
          <Choice
            name="role"
            legend="I am a"
            options={auditRoles}
            value={chosen.role}
            error={errors.role}
            onChange={(value) => choose("role", value)}
          />
          <Choice
            name="industry"
            legend="Industry"
            options={auditIndustries}
            value={chosen.industry}
            error={errors.industry}
            onChange={(value) => choose("industry", value)}
          />
          <Choice
            name="locations"
            legend="Dealer locations"
            options={auditLocations}
            value={chosen.locations}
            error={errors.locations}
            onChange={(value) => choose("locations", value)}
          />

          <div>
            <label htmlFor="website" className="text-ink text-[15px] font-semibold">
              Website to audit
            </label>
            <input
              id="website"
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="www.samplewindows.com"
              value={website}
              onChange={(event) => {
                setWebsite(event.target.value);
                setErrors((now) => ({ ...now, website: undefined }));
              }}
              aria-invalid={errors.website ? true : undefined}
              aria-describedby={errors.website ? "website-error" : undefined}
              className={inputClass}
            />
            {errors.website && <FieldError id="website-error">{errors.website}</FieldError>}
          </div>

          <div>
            <label htmlFor="email" className="text-ink text-[15px] font-semibold">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@samplewindows.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((now) => ({ ...now, email: undefined }));
              }}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={
                errors.email ? "email-error" : isPersonalEmail(email) ? "email-note" : undefined
              }
              className={inputClass}
            />
            {errors.email ? (
              <FieldError id="email-error">{errors.email}</FieldError>
            ) : (
              isPersonalEmail(email) && (
                <p id="email-note" className="text-ink-muted mt-2 text-[13.5px] leading-[1.5]">
                  This looks like a personal address. If you can, use your work
                  email, so we know which company the audit is for.
                </p>
              )
            )}
          </div>

          {/* Not shown to people. A bot that fills in every field fills this one too. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Fax
              <input name="fax" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div>
            <p className="text-ink-dim text-[13.5px] leading-[1.6]">
              By submitting, you agree that {site.company.legalName} may contact
              you about this request. We do not share your information.
            </p>

            {status === "failed" && (
              <div
                role="alert"
                className="border-line bg-panel mt-6 rounded-lg border p-5 text-[14.5px] leading-[1.6]"
              >
                <p className="text-ink">
                  We could not send your request. Send the same details by email
                  and we will reply to agree on a time.
                </p>
                <a
                  href={mailHref(draft)}
                  className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale mt-3 inline-block font-semibold underline underline-offset-[4px] transition-colors"
                >
                  Send by email to {site.contact.sales}
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-blue hover:bg-blue-hover mt-6 cursor-pointer rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Continue: pick a time"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
