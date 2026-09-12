import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/TechStackSection";
import { PageJsonLd } from "@/components/seo";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES["tech-stack"];
export const metadata = pageMetadata(page);
export default function TechStackPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <TechStackSection />
        <Footer />
      </div>
    </main>
  );
}
