import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PageJsonLd } from "@/components/seo";
import { pageMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/site";

const page = PAGES.privacy;
export const metadata = pageMetadata(page);

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#060a14] text-[#f0f4f8]">
      <PageJsonLd {...page} />
      <Navbar />
      <article className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <p className="text-sm font-semibold text-[#00e5ff]">PDPA</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          นโยบายความเป็นส่วนตัว
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#94a3b8]">
          ประกาศนี้อธิบายข้อมูลที่เราเก็บเมื่อคุณใช้เว็บไซต์หรือติดต่อ LocalAI Thailand
        </p>
        <p className="mt-3 text-sm text-[#64748b]">ปรับปรุงล่าสุด 7 กันยายน 2026</p>
        <div className="mt-14 grid gap-10 text-base leading-8 text-[#cbd5e1]">
          <section>
            <h2 className="text-2xl font-semibold text-white">ข้อมูลติดต่อ</h2>
            <p className="mt-3">
              แบบฟอร์มส่งชื่อ ช่องทางติดต่อ บริษัท
              และรายละเอียดงานที่คุณกรอกไปยังระบบลูกค้าสัมพันธ์ของเรา
              เพื่อให้ทีมงานตอบกลับและจัดทำข้อเสนอ เราไม่ส่งค่าที่กรอกไปยังเครื่องมือวิเคราะห์
              ติดต่อเรื่องข้อมูลส่วนบุคคลได้ที่{" "}
              <a data-cta="email" className="underline" />{" "}
              ผู้ดำเนินการเว็บไซต์เป็นผู้ควบคุมข้อมูลตาม PDPA
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">
              Analytics แบบไม่ใช้คุกกี้
            </h2>
            <p className="mt-3">
              เราใช้ PostHog ในโปรเจกต์ LocalAIThailand ที่โฮสต์ในสหรัฐอเมริกา
              เพื่อวัดหน้าเว็บ แหล่งอ้างอิง แคมเปญ ประเภทอุปกรณ์ การกดช่องทางติดต่อ
              และการเลื่อนถึง 50% หรือ 90% ของหน้า URL จะเหลือเฉพาะโดเมนและ path
              และเราไม่สร้างโปรไฟล์บุคคล
            </p>
            <p className="mt-3">
              PostHog ทำงานแบบไม่ใช้คุกกี้ตลอดเวลา ไม่เก็บข้อมูลใน local storage หรือ
              session storage ไม่บันทึกภาพการใช้งาน และไม่แสดงกล่องขอความยินยอม
              ระบบนับผู้ชมด้วย hash ที่คำนวณบนเซิร์ฟเวอร์ และไม่รับค่าที่กรอกในแบบฟอร์ม
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">
              วัตถุประสงค์ ผู้รับ และการโอนข้อมูล
            </h2>
            <p className="mt-3">
              เราใช้ข้อมูลติดต่อเพื่อดำเนินการตามคำขอก่อนเข้าทำสัญญา
              และใช้สถิติรวมเพื่อปรับปรุงเว็บไซต์ ผู้รับข้อมูลมีเฉพาะทีมงาน ผู้ให้บริการ CRM และ
              PostHog ในสหรัฐอเมริกา เราใช้ข้อกำหนดคุ้มครองข้อมูลกับผู้ประมวลผลและไม่ขายข้อมูล
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">
              ระยะเวลาและสิทธิของคุณ
            </h2>
            <p className="mt-3">
              ข้อมูล Analytics เก็บไม่เกิน 12 เดือน ข้อมูลติดต่อที่ไม่เกิดสัญญาเก็บไม่เกิน 2 ปี
              ส่วนเอกสารลูกค้าเก็บตามกฎหมาย คุณขอเข้าถึง แก้ไข ลบ ระงับ คัดค้าน โอนย้าย
              หรือถอนความยินยอม และร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลได้
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">
              ข้อมูลในระบบ Local AI
            </h2>
            <p className="mt-3">
              การวัดเว็บไซต์แยกจากข้อมูลที่ระบบ Local AI ของลูกค้าประมวลผล
              ข้อมูลในระบบที่ติดตั้งในสถานที่ของลูกค้ายังคงอยู่ในขอบเขตที่ตกลงไว้ และไม่ถูกส่งให้
              PostHog
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
