import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { site } from "./site";

/**
 * The share card: the image LinkedIn, Slack, iMessage and email clients show
 * when a link to the site is shared (Open Graph). The home page's card and
 * the vertical pages' own cards (website brief, p.26) are drawn here, so they
 * share one look.
 *
 * Generated rather than shipped as PNGs, so a card can never drift out of
 * sync with the copy it shows. ImageResponse renders through satori, which
 * supports flexbox but NOT grid, and only a subset of CSS: every element with
 * more than one child is `display: flex`. No custom font is loaded: fetching
 * one at build time is a network dependency the site does not need.
 * Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md
 */
export const cardSize = { width: 1200, height: 630 };

const color = {
  ground: "#0b101b",
  ink: "#f5f6f8",
  muted: "#c0d3ea",
  pale: "#85c8ff",
  blue: "#144ee4",
  line: "#282e3b",
};

export function shareCard({
  eyebrow,
  title,
  lead,
  footer,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  footer: ReactNode;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: color.ground,
          padding: "64px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{ width: 36, height: 36, borderRadius: 4, background: color.blue, display: "flex" }}
            />
            <div style={{ fontSize: 30, fontWeight: 700, color: color.ink, display: "flex" }}>
              {site.name}
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: color.pale,
              display: "flex",
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: color.ink,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>

          {lead && (
            <div
              style={{
                marginTop: 24,
                fontSize: 26,
                lineHeight: 1.45,
                color: color.muted,
                maxWidth: 960,
                display: "flex",
              }}
            >
              {lead}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `1px solid ${color.line}`,
            paddingTop: 24,
          }}
        >
          {footer}
        </div>
      </div>
    ),
    cardSize,
  );
}

/**
 * The footer most cards use: the page's address on the left, the reference
 * line on the right. One element, not a fragment: satori lays out a
 * fragment's children as if they were one.
 */
export function addressFooter(path: string) {
  return (
    <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "flex-end" }}>
      <div style={{ fontSize: 24, color: color.pale, display: "flex" }}>
        {`${site.url.replace(/^https?:\/\//, "")}${path}`}
      </div>
      <div style={{ fontSize: 22, color: color.muted, display: "flex" }}>
        {`Running at ${site.reference.name} since ${site.reference.since}`}
      </div>
    </div>
  );
}

/** The four published metrics, for the home page's card. */
export function metricsFooter() {
  return (
    <div style={{ display: "flex", gap: 56 }}>
      {site.metrics.map((metric) => (
        <div key={metric.short} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 38, fontWeight: 700, color: color.pale, display: "flex" }}>
            {metric.value}
          </div>
          <div style={{ marginTop: 4, fontSize: 20, color: color.muted, display: "flex" }}>
            {metric.short}
          </div>
        </div>
      ))}
    </div>
  );
}
