import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { PageJsonLd } from "@/components/seo";
import { SitelinkTrail } from "@/components/SitelinkTrail";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.services;
export const metadata = pageMetadata(page);
export default function ServicesPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <SitelinkTrail page="services" />
        <div className="pt-24" />
        <Services />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
