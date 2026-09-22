"use client";

import { assetUrl } from "@/lib/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    logos: [assetUrl("/mimir-apps/scan.png")],
    title: "อ่านเอกสารด้วย Mimir Scan",
    desc: "จัดการ OCR และเอกสารให้พร้อมค้นหา",
  },
  {
    logos: [assetUrl("/mimir-apps/translate.png")],
    title: "แปลด้วย Mimir Translate",
    desc: "ช่วยทีมแปลภาษาในงานประจำ",
  },
  {
    logos: [assetUrl("/mimir-apps/transcribe.png")],
    title: "ถอดเสียงด้วย Mimir Transcribe",
    desc: "เปลี่ยนเสียงเป็นข้อความสำหรับการทำงานต่อ",
  },
  {
    logos: [assetUrl("/mimir-apps/ledger.png")],
    title: "เตรียมบัญชีด้วย Mimir Ledger",
    desc: "ช่วยจัดเตรียมข้อมูลก่อนส่งต่อทีมบัญชี",
  },
  {
    logos: [assetUrl("/mimir-apps/second-brain.png")],
    title: "ความรู้บริษัทด้วย Mimir Second Brain",
    desc: "ค้นหาความรู้จากเอกสารองค์กร",
  },
  {
    logos: [assetUrl("/mimir-apps/chat.png"), assetUrl("/mimir-apps/image-studio.png")],
    title: "ทำงานกับ Mimir Chat และ Image Studio",
    desc: "สนทนา ร่างงาน และสร้างภาพผ่าน Suite",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-20 bg-[#0c1220]/50 relative">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#f0f4f8] mb-4">
            งานที่ Mimir ช่วยทีมได้
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            เลือกแอปจากงานของทีม, แล้วจัดสเปก Local AI ให้เหมาะกับการใช้งานจริง
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-5"
            >
              <div className="mb-4 flex -space-x-2">
                {service.logos.map((logo) => (
                  <Image
                    key={logo}
                    src={logo}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 object-contain"
                  />
                ))}
              </div>
              <h2 className="text-sm font-bold text-[#f0f4f8] mb-2">
                {service.title}
              </h2>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
