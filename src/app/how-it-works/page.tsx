import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import Footer from "@/components/Footer";
import { PageJsonLd } from "@/components/seo";
import { SitelinkTrail } from "@/components/SitelinkTrail";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES["how-it-works"];
export const metadata = pageMetadata(page);

export default function HowItWorksPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <SitelinkTrail page="how-it-works" />
        <div className="pt-20" />
        <ScrollAnimation />
        <HowItWorks />
        <DataFlowDiagram />
        <Footer />
      </div>
    </main>
  );
}
