import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";
import { PageJsonLd } from "@/components/seo";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.shop;
export const metadata = pageMetadata(page);

export default function ShopPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <ShopSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
