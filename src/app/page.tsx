import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Comparison from "@/components/Comparison";
import CloudCTA from "@/components/CloudCTA";
import WhyUs from "@/components/WhyUs";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <Navbar />
        <main id="content" tabIndex={-1}>
          <Hero />
          <ScrollAnimation />
          <HowItWorks />
          <Packages />
          <Comparison />
          <CloudCTA />
          <WhyUs />
          <Partners />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
