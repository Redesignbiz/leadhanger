import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Surfaces } from "@/components/Surfaces";
import { Results } from "@/components/Results";
import { Industries } from "@/components/Industries";
import { Plans } from "@/components/Plans";
import { Faq } from "@/components/Faq";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";

/**
 * Section order follows the buying question, not the feature list: what is
 * broken (Problem), what happens instead (HowItWorks), what my team actually
 * touches (Surfaces), does it work (Results), is it for me (Industries), what
 * would I be buying (Plans), what am I still unsure about (Faq), then the ask.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Surfaces />
        <Results />
        <Industries />
        <Plans />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </>
  );
}
