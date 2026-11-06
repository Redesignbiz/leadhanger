import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";
import { site } from "@/lib/site";
import { homeShareImage } from "@/lib/share";
import { dealerApp } from "@/lib/product";

export const metadata: Metadata = {
  title: dealerApp.name,
  description: dealerApp.description,
  alternates: { canonical: "/dealer-app" },
  openGraph: {
    type: "website",
    url: `${site.url}/dealer-app`,
    title: `${dealerApp.name} · ${site.name}`,
    images: [homeShareImage],
  },
  robots: { index: true, follow: true },
};

/** Content and its open items live in lib/product.ts. */
export default function DealerApp() {
  return <ProductPage surface={dealerApp} />;
}
