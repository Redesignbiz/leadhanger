import type { Metadata } from "next";
import { VerticalPage } from "@/components/VerticalPage";
import { site } from "@/lib/site";
import { verticalBySlug } from "@/lib/verticals";

const vertical = verticalBySlug("windows-and-doors");

export const metadata: Metadata = {
  title: vertical.name,
  description: vertical.description,
  alternates: { canonical: `/${vertical.slug}` },
  openGraph: {
    type: "website",
    url: `${site.url}/${vertical.slug}`,
    title: `${vertical.name} · ${site.name}`,
  },
  robots: { index: true, follow: true },
};

/** Content and its open items live in lib/verticals.ts. */
export default function WindowsAndDoors() {
  return <VerticalPage vertical={vertical} />;
}
