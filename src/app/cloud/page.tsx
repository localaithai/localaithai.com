import CloudSection from "@/components/CloudSection";
import Contact from "@/components/Contact";
import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PageJsonLd } from "@/components/seo";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.cloud;
export const metadata = pageMetadata(page);
export default function CloudPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <CloudSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
