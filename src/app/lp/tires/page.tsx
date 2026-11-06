import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { site } from "@/lib/site";
import { homeShareImage } from "@/lib/share";
import { audit } from "@/lib/audit";
import { landingBySlug } from "@/lib/landing";

const landing = landingBySlug("tires");

export const metadata: Metadata = {
  title: landing.headline,
  description: `${landing.headline}. ${audit.intro}`,
  alternates: { canonical: "/lp/tires" },
  openGraph: {
    type: "website",
    url: `${site.url}/lp/tires`,
    title: `${landing.headline} · ${site.name}`,
    images: [homeShareImage],
  },
  // Ad traffic only: organic search lands on the vertical pages (brief, p.18).
  robots: { index: false, follow: true },
};

/** Content in lib/landing.ts; layout and open items in LandingPage.tsx. */
export default function LandingTires() {
  return <LandingPage landing={landing} />;
}
