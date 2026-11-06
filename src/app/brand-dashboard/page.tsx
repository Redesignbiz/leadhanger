import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";
import { site } from "@/lib/site";
import { homeShareImage } from "@/lib/share";
import { brandDashboard } from "@/lib/product";

export const metadata: Metadata = {
  title: brandDashboard.name,
  description: brandDashboard.description,
  alternates: { canonical: "/brand-dashboard" },
  openGraph: {
    type: "website",
    url: `${site.url}/brand-dashboard`,
    title: `${brandDashboard.name} · ${site.name}`,
    images: [homeShareImage],
  },
  robots: { index: true, follow: true },
};

/** Content and its open items live in lib/product.ts. */
export default function BrandDashboard() {
  return <ProductPage surface={brandDashboard} />;
}
