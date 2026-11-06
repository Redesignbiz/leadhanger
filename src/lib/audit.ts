/**
 * The free Lead Response Audit request, from the website brief (Drive,
 * November 3, 2026, p.17): three qualifying questions, the website to audit
 * and a work email, then a time for a 20-minute call. No phone number: a US
 * buyer does not want to give one.
 *
 * The page (app/audit), the form (components/AuditForm.tsx) and the route that
 * receives it (app/api/audit) all read these lists, so an option added here
 * appears in the form and passes the server's check at the same time.
 *
 * Where a submission goes is an open item (docs/leadhanger-us-brief.md): the
 * route forwards it to AUDIT_FORWARD_URL, which nobody has set yet. Until then
 * the form offers to send the same details by email.
 */

export const audit = {
  /** The header's main button and the vertical pages' closing call. */
  cta: "Get a free audit",
  title: "Get a free Lead Response Audit",
  intro:
    "We send 3 test inquiries through your site and dealers, then share a one-page result within a week.",
} as const;

export const auditRoles = [
  { value: "brand", label: "Brand / manufacturer" },
  { value: "dealer-group", label: "Dealer group" },
  { value: "retail-chain", label: "Retail chain" },
] as const;

export const auditIndustries = [
  { value: "windows-and-doors", label: "Windows & doors" },
  { value: "tires", label: "Tires" },
  { value: "other", label: "Other" },
] as const;

export const auditLocations = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "200+", label: "200+" },
] as const;

export type AuditRole = (typeof auditRoles)[number]["value"];
export type AuditIndustry = (typeof auditIndustries)[number]["value"];
export type AuditLocations = (typeof auditLocations)[number]["value"];

export type AuditRequest = {
  role: AuditRole;
  industry: AuditIndustry;
  locations: AuditLocations;
  website: string;
  email: string;
};

/** A link to /audit with the role and industry already chosen. */
export function auditHref(prefill: { role?: AuditRole; industry?: AuditIndustry } = {}) {
  const query = new URLSearchParams();
  if (prefill.role) query.set("role", prefill.role);
  if (prefill.industry) query.set("industry", prefill.industry);
  const search = query.toString();
  return search ? `/audit?${search}` : "/audit";
}

/**
 * Personal mailbox domains. The brief asks for a gentle warning on these, not
 * a refusal: the request still goes through.
 */
const personalDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
]);

export function isPersonalEmail(email: string) {
  const domain = email.trim().toLowerCase().split("@")[1];
  return domain ? personalDomains.has(domain) : false;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function oneOf<T extends string>(options: readonly { value: T }[], value: unknown): T | null {
  return options.find((option) => option.value === value)?.value ?? null;
}

/** Checks a submission. Returns the cleaned request, or null if anything is missing or malformed. */
export function parseAuditRequest(input: unknown): AuditRequest | null {
  if (typeof input !== "object" || input === null) return null;
  const body = input as Record<string, unknown>;

  const role = oneOf(auditRoles, body.role);
  const industry = oneOf(auditIndustries, body.industry);
  const locations = oneOf(auditLocations, body.locations);
  const website = typeof body.website === "string" ? body.website.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!role || !industry || !locations) return null;
  if (website.length < 4 || website.length > 200 || !website.includes(".")) return null;
  if (email.length > 254 || !emailPattern.test(email)) return null;

  return { role, industry, locations, website, email };
}

export function labelOf(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}
