import { site } from "@/lib/site";
import { plans, planRows, type PlanCell } from "@/lib/plans";
import { AvailabilityBadge } from "./AvailabilityBadge";

function contactHref(subject: string) {
  return `mailto:${site.contact.sales}?subject=${encodeURIComponent(subject)}`;
}

/** One cell: its values in order, each with its label when it is not live. */
function Values({ cell, center = false }: { cell: PlanCell; center?: boolean }) {
  return (
    <ul className="space-y-1.5">
      {cell.map((value) => (
        <li
          key={value.text}
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${
            center ? "justify-center" : ""
          }`}
        >
          <span>{value.text}</span>
          {value.availability && value.availability !== "live" && (
            <AvailabilityBadge value={value.availability} />
          )}
        </li>
      ))}
    </ul>
  );
}

const onboarding = planRows.find((row) => row.label === "Onboarding");
const contract = planRows.find((row) => row.label === "Contract");

/**
 * The three plans as cards. There is no price on them by decision (see
 * lib/plans.ts), so each card says who it is for, how long onboarding takes
 * and how it is contracted, and leads to a conversation. Business is the
 * highlighted plan, as the brief asks.
 *
 * The buttons are mail links with the plan in the subject: there is no form on
 * this site yet (the reasoning is in PartnerCta.tsx and on /privacy).
 */
export function PlanCards() {
  return (
    <div className="reveal-stack grid gap-4 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <div
          key={plan.name}
          className={`flex flex-col rounded-lg border p-6 transition-colors sm:p-7 ${
            plan.recommended
              ? "border-blue/45 bg-panel-blue"
              : "border-line bg-panel hover:border-line-strong"
          }`}
        >
          <h2 className="text-ink text-[24px] font-bold tracking-[-0.025em]">
            {plan.name}
          </h2>
          <p className="text-blue-pale mt-2 text-[14.5px] font-semibold">
            {plan.audience}
          </p>

          <dl className="border-line mt-6 mb-8 space-y-4 border-t pt-6 text-[14.5px]">
            {[onboarding, contract].map((row) =>
              row ? (
                <div key={row.label}>
                  <dt className="text-ink-dim text-[12.5px] font-medium">
                    {row.label}
                  </dt>
                  <dd className="text-ink mt-1 font-medium">
                    <Values cell={row.values[index]} />
                  </dd>
                </div>
              ) : null,
            )}
          </dl>

          <a
            href={contactHref(`${site.name}: ${plan.name}`)}
            className={`mt-auto rounded-full px-6 py-3 text-center text-[15px] font-semibold transition-colors ${
              plan.recommended
                ? "bg-blue hover:bg-blue-hover text-white"
                : "border-line-strong text-ink hover:bg-panel-high border"
            }`}
          >
            {plan.cta}
          </a>
        </div>
      ))}
    </div>
  );
}

/**
 * The comparison. Below `lg` it stacks: three columns of qualifiers cannot
 * compress to a phone, and a sideways-scrolling table loses the row label. One
 * data source feeds both layouts, so they cannot disagree.
 */
export function PlanTable() {
  return (
    <>
      <div className="reveal-stack border-line divide-line divide-y border-y lg:hidden">
        {planRows.map((row) => (
          <div key={row.label} className="py-5">
            <p className="text-ink text-[15px] font-semibold">{row.label}</p>
            <dl className="mt-3 space-y-3">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`grid grid-cols-[6.5rem_1fr] gap-3 rounded-md px-3 py-2.5 text-[14px] ${
                    plan.recommended ? "bg-panel-blue/70" : "bg-panel/60"
                  }`}
                >
                  <dt className="text-ink-dim font-medium">{plan.name}</dt>
                  <dd className="text-ink">
                    <Values cell={row.values[index]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="reveal border-line hidden overflow-hidden rounded-lg border lg:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            {site.name} plans compared across chat and form, routing,
            follow-up, appointments, integration, onboarding and contract.
          </caption>
          <thead>
            <tr className="border-line bg-panel border-b">
              <th scope="col" className="text-ink-dim px-5 py-4 text-[13px] font-medium">
                Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className={`border-line text-ink w-[26%] border-l px-5 py-4 text-center text-[17px] font-bold tracking-[-0.02em] ${
                    plan.recommended ? "bg-panel-blue" : ""
                  }`}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planRows.map((row) => (
              <tr key={row.label} className="border-line border-b last:border-b-0">
                <th
                  scope="row"
                  className="text-ink px-5 py-4 align-top text-[14px] font-medium"
                >
                  {row.label}
                </th>
                {row.values.map((cell, index) => (
                  <td
                    key={plans[index].name}
                    className={`border-line text-ink-muted border-l px-5 py-4 text-center align-top text-[13.5px] leading-[1.5] ${
                      plans[index].recommended ? "bg-panel-blue/60" : ""
                    }`}
                  >
                    <Values cell={cell} center />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
