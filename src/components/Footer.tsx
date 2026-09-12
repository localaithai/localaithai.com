"use client";
import CrossSiteLink from "./CrossSiteLink";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#1e293b] bg-[#060a14]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10">
          {/* Solutions */}
          <div>
            <p className="text-[12px] font-semibold text-[#f0f4f8] uppercase tracking-wider mb-3">Solutions</p>
            <div className="space-y-0.5 text-[13px] text-[#94a3b8]">
              <a href="/packages" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Packages</a>
            </div>
          </div>

          {/* Hardware */}
          <div>
            <p className="text-[12px] font-semibold text-[#f0f4f8] uppercase tracking-wider mb-3">Hardware</p>
            <div className="space-y-0.5 text-[13px] text-[#94a3b8]">
              <a href="/hardware" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Hardware</a>
              <a href="/shop" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">ร้านค้า</a>
              <a href="/tech-stack" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Tech Stack</a>
            </div>
          </div>

          {/* บริการ */}
          <div>
            <p className="text-[12px] font-semibold text-[#f0f4f8] uppercase tracking-wider mb-3">บริการ</p>
            <div className="space-y-0.5 text-[13px] text-[#94a3b8]">
              <a href="/services" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Services</a>
              <a href="https://www.cloudaithai.com" target="_blank" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Cloud AI →</a>
              <a href="/support" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Support</a>
              <a href="/how-it-works" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">How it works</a>
            </div>
          </div>

          {/* ติดต่อ */}
          <div>
            <p className="text-[12px] font-semibold text-[#f0f4f8] uppercase tracking-wider mb-3">ติดต่อ</p>
            <div className="space-y-0.5 text-[13px] text-[#94a3b8]">
              <a href="/contact" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">Contact</a>
              <a data-cta="tel" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1" />
              <a data-cta="email" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1" />
              <a data-cta="line" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">LINE <span data-cta="lineid" /></a>
              <a href="/privacy" className="block hover:text-[#00e5ff] transition-colors py-2 sm:py-1">นโยบายความเป็นส่วนตัว</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#1e293b] gap-4">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="LocalAI" width={24} height={24} className="rounded-md" />
            <span className="text-[13px] font-semibold text-[#f0f4f8]">LocalAI Thailand</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            &copy; 2026 LocalAI Thailand, บริการติดตั้ง AI ส่วนตัวสำหรับธุรกิจ
            {" | "}
            <CrossSiteLink href="https://www.cloudaithai.com" className="hover:text-[#00e5ff] transition-colors">
              CloudAI Thailand
            </CrossSiteLink>
          </p>
        </div>

        {/* SEO footer text */}
        <div className="mt-8 pt-6 border-t border-[#1e293b]/50 text-center">
          <p className="text-[10px] text-[#64748b]/60 max-w-4xl mx-auto leading-relaxed">
            Local AI Thailand (LocalAI Thailand / โลคอล เอไอ ไทยแลนด์), บริการติดตั้งระบบ AI ส่วนตัว (Private AI / Local AI Thai) สำหรับธุรกิจในประเทศไทย
            ทำงานบนเครื่องของคุณ 100% ไม่ส่งข้อมูลขึ้นคลาวด์ สอดคล้องกับ PDPA
            รองรับภาษาไทย ไม่มีค่า token หรือค่าใช้งานรายเดือนสำหรับ AI
            เหมาะสำหรับ SME, คลินิก, สำนักงานกฎหมาย, โรงพยาบาล, ธนาคาร และหน่วยงานรัฐ
            พร้อมบริการ UPS สำรองไฟ, ตู้ Rack, NAS เก็บข้อมูล ครบวงจร
            ตัวแทนจำหน่าย Ingram Micro, TD Synnex, SIS, Eaton, Schneider Electric
          </p>
        </div>
      </div>
    </footer>
  );
}
