import { assetUrl } from "@/lib/assets";
import { mimirScopeNotice } from "@/lib/suite-scope";
import { motion } from "framer-motion";
import { withMotionConfig } from "@/components/motion-config";

const apps = [
  {
    logo: "/mimir-apps/scan.png",
    name: "Mimir Scan",
    outcome: "OCR และอ่านเอกสาร",
  },
  { logo: "/mimir-apps/translate.png", name: "Mimir Translate", outcome: "แปลภาษา" },
  { logo: "/mimir-apps/transcribe.png", name: "Mimir Transcribe", outcome: "ถอดเสียง" },
  {
    logo: "/mimir-apps/ledger.png",
    name: "Mimir Ledger",
    outcome: "เตรียมข้อมูลก่อนทำบัญชี",
  },
  { logo: "/mimir-apps/second-brain.png", name: "Mimir Second Brain", outcome: "ความรู้บริษัท" },
  {
    logo: "/mimir-apps/chat.png",
    name: "Mimir Chat",
    outcome: "สนทนา ค้นหา และร่างงาน",
  },
];

function TechStackSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <img
            src={assetUrl("/mimir-suite-logo.png")}
            alt=""
            width={84}
            height={56}
            loading="lazy"
            decoding="async"
            className="mx-auto mb-4 h-14 w-auto object-contain text-transparent"
          />
          <h1 className="text-3xl md:text-5xl font-black text-[#f0f4f8] mb-4">
            แอป Mimir สำหรับงานจริง
          </h1>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            พนักงานใช้แอปใน Mimir Suites, ส่วน Ollama ใช้จัดเตรียมโมเดลบน AI
            machine ระหว่างการติดตั้งและไม่ใช่หน้าจอสำหรับพนักงาน
          </p>
          <p className="text-sm leading-relaxed text-[#94a3b8] max-w-2xl mx-auto mt-4">
            {mimirScopeNotice}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl bg-[#111827] border border-[#1e293b] p-5"
            >
              <img
                src={app.logo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="mb-4 size-12 object-contain text-transparent"
              />
              <h2 className="font-bold text-[#f0f4f8] mb-1">{app.name}</h2>
              <p className="text-sm text-[#94a3b8]">{app.outcome}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-[#94a3b8] mt-8">
          ข้อมูลอยู่ในองค์กรของคุณ, ออกแบบการใช้งานให้สอดคล้องกับ PDPA
        </p>
      </div>
    </section>
  );
}

export default withMotionConfig(TechStackSection);
