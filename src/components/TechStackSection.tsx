"use client";

import { assetUrl } from "@/lib/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const apps = [
  {
    logo: "/mimir-apps/scan.png",
    name: "Mimir Scan",
    outcome: "OCR และอ่านเอกสาร",
  },
  { logo: "/mimir-apps/bridge.png", name: "Mimir Bridge", outcome: "แปลภาษา" },
  { logo: "/mimir-apps/echo.png", name: "Mimir Echo", outcome: "ถอดเสียง" },
  {
    logo: "/mimir-apps/ledger.png",
    name: "Mimir Ledger",
    outcome: "เตรียมข้อมูลก่อนทำบัญชี",
  },
  { logo: "/mimir-apps/well.png", name: "Mimir Well", outcome: "ความรู้บริษัท" },
  {
    logo: "/mimir-apps/chat.png",
    name: "Mimir Chat",
    outcome: "สนทนา ค้นหา และร่างงาน",
  },
  { logo: "/mimir-apps/still.png", name: "Mimir Still", outcome: "สร้างภาพ" },
];

export default function TechStackSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <Image
            src={assetUrl("/mimir-suite-logo.png")}
            alt=""
            width={84}
            height={56}
            className="mx-auto mb-4 h-14 w-auto object-contain"
          />
          <h1 className="text-3xl md:text-5xl font-black text-[#f0f4f8] mb-4">
            แอป Mimir สำหรับงานจริง
          </h1>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            พนักงานใช้แอปใน Mimir Suites, ส่วน Ollama และ ComfyUI ถูกจัดเตรียมบน AI
            machine ระหว่างการติดตั้งและไม่ใช่หน้าจอสำหรับพนักงาน
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl bg-[#111827] border border-[#1e293b] p-5"
            >
              <Image
                src={app.logo}
                alt=""
                width={48}
                height={48}
                className="mb-4 size-12 object-contain"
              />
              <h2 className="font-bold text-[#f0f4f8] mb-1">{app.name}</h2>
              <p className="text-sm text-[#94a3b8]">{app.outcome}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-[#64748b] mt-8">
          ข้อมูลอยู่ในองค์กรของคุณ, ออกแบบการใช้งานให้สอดคล้องกับ PDPA
        </p>
      </div>
    </section>
  );
}
