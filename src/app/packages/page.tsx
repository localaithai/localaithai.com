import Comparison from "@/components/Comparison";
import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Infrastructure from "@/components/Infrastructure";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import SystemBuilder from "@/components/SystemBuilder";
import { PageJsonLd } from "@/components/seo";
import { SitelinkTrail } from "@/components/SitelinkTrail";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.packages;
export const metadata = pageMetadata(page);
export default function PackagesPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <SitelinkTrail page="packages" />
        <div className="pt-20" />
        <Packages />
        <Comparison />
        <SystemBuilder />
        <Infrastructure />
        <Footer />
      </div>
    </main>
  );
}
