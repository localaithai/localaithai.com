import Navbar from "@/components/Navbar";
import SupportSection from "@/components/SupportSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";
import { PageJsonLd } from "@/components/seo";
import { SitelinkTrail } from "@/components/SitelinkTrail";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.support;
export const metadata = pageMetadata(page);

export default function SupportPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <SitelinkTrail page="support" />
        <div className="pt-24" />
        <SupportSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
