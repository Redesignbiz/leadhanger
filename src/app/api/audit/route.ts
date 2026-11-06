import { parseAuditRequest } from "@/lib/audit";

/**
 * POST /api/audit: the free Lead Response Audit request from /audit.
 *
 * OPEN ITEM (docs/leadhanger-us-brief.md): where requests go. The brief's
 * interim plan is an email to the team and a row in a table, until the intake
 * API on the US demo account can take them as LeadHanger leads. This route
 * forwards each request, as JSON, to the one address in AUDIT_FORWARD_URL, so
 * whichever service does that work can be swapped without touching the form.
 *
 * While AUDIT_FORWARD_URL is not set:
 *   - in development the route logs the request and answers as if it had
 *     been forwarded, so the second step can be seen locally;
 *   - in production it answers 503, and the form offers to send the same
 *     details by email instead. Nothing is lost, but nothing is stored either.
 *
 * Whatever AUDIT_FORWARD_URL points at must be named in /privacy, under
 * "Disclosure of information", before it receives anything.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // The form carries a field people never see. A bot fills it in; answer as if
  // the request went through, and drop it.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).fax) {
    return Response.json({ ok: true });
  }

  const auditRequest = parseAuditRequest(body);
  if (!auditRequest) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const target = process.env.AUDIT_FORWARD_URL;
  if (!target) {
    if (process.env.NODE_ENV === "development") {
      console.info("[audit] AUDIT_FORWARD_URL is not set; not forwarded:", auditRequest);
      return Response.json({ ok: true });
    }
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...auditRequest, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`status ${response.status}`);
  } catch (error) {
    // The request itself is not logged: it carries a person's email address.
    console.error("[audit] forwarding failed:", error);
    return Response.json({ ok: false, error: "forward_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
