import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Video } from "@/components/Video";
import { PartnerCta } from "@/components/PartnerCta";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Results } from "@/components/Results";
import { Industries } from "@/components/Industries";
import { Footer } from "@/components/Footer";

/**
 * Section order follows the corporate site for the sections carried over from
 * it (Hero, Video, Problem, HowItWorks), and the page closes on PartnerCta,
 * the one ask, just above the footer. Surfaces, Results and
 * Industries keep their earlier places until the page is reviewed as a whole.
 *
 * /our-solution page shows a plan comparison for those interested in pricing and content of our solutions.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Video />
        <Problem />
        <HowItWorks />
        {/* Hidden for now; the component is kept. Restore the nav entries
            in Header.tsx and Footer.tsx along with it. */}
        {/* <Surfaces /> */}
        <Results />
        <Industries />
        <PartnerCta />
      </main>
      <Footer />
    </>
  );
}
