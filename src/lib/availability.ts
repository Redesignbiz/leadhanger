/**
 * Whether a feature or a connection works today. Anything not live says so in
 * words, on /plans and /integrations alike, so the two pages never disagree and
 * nothing planned reads as live (a website brief rule).
 *
 * The two dated labels come from the website brief's confirmation list (Drive,
 * November 3, 2026): text messages and masked calling launch with the US demo in
 * December; the REST API, webhooks and Salesforce arrive with the integration
 * guide in January 2027. When one ships, change its label to "live" where it is
 * used and nowhere else.
 */
export type Availability =
  | "live"
  | "planned"
  | "december"
  | "january"
  | "on-request";

export const availabilityLabel: Record<Availability, string> = {
  live: "Live",
  planned: "Planned",
  december: "Launching December",
  january: "January 2027",
  "on-request": "On request",
};
