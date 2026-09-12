import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PageJsonLd } from "@/components/seo";
import { SitelinkTrail } from "@/components/SitelinkTrail";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.contact;
export const metadata = pageMetadata(page);

export default function ContactPage() {
  return (
    <main className="relative">
      <PageJsonLd {...page} />
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <SitelinkTrail page="contact" />
        <div className="pt-20" />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
