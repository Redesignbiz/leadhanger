import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Generated rather than shipped as a PNG, so the card can never drift out of
 * sync with the metrics in site.ts.
 *
 * ImageResponse renders through satori, which supports flexbox but NOT grid,
 * and only a subset of CSS. Every layout here is flex on purpose. No custom
 * font is loaded: fetching one at build time is a network dependency this page
 * does not need, and satori's bundled face is perfectly legible at this size.
 * Source: node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14161f",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#3765ef",
                display: "flex",
              }}
            />
            <div style={{ fontSize: 34, fontWeight: 700, color: "#eef0f8" }}>
              {site.name}
            </div>
          </div>

          <div
            style={{
              marginTop: 56,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              maxWidth: 900,
              display: "flex",
            }}
          >
            Turn website visitors into dealer sales
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.45,
              color: "#a9b0c4",
              maxWidth: 820,
              display: "flex",
            }}
          >
            Real-time lead qualification, consent and routing for brands that
            sell through a dealer network.
          </div>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          {site.metrics.map((metric) => (
            <div
              key={metric.short}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontSize: 40, fontWeight: 700, color: "#b6c5ff" }}>
                {metric.value}
              </div>
              <div style={{ marginTop: 6, fontSize: 20, color: "#a9b0c4" }}>
                {metric.short}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
