import Navbar from "@/components/Navbar";
import HardwareSection from "@/components/HardwareSection";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";
import { PageJsonLd } from "@/components/seo";
import { SitelinkTrail } from "@/components/SitelinkTrail";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.hardware;
export const metadata = pageMetadata(page);

export default function HardwarePage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <SitelinkTrail page="hardware" />
        <div className="pt-24" />
        <HardwareSection />
        <Footer />
      </div>
    </main>
  );
}
