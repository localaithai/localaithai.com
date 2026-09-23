"use client";
import { motion } from "framer-motion";
import { Check, Cpu, Monitor, Server, Sparkles } from "lucide-react";
import MachineOptions from "@/components/MachineOptions";

const tiers = [
  { icon: Monitor, title: "เครื่องตั้งโต๊ะ Spark-class", hardware: "AI machine ขนาดตั้งโต๊ะ", price: "เริ่มต้น ฿179,900", color: "#00e5ff", outcomes: ["Mimir Scan อ่านเอกสารและ OCR", "Mimir Translate แปลภาษา", "Mimir Chat ช่วยค้นหาและร่างงาน"] },
  { icon: Cpu, title: "Spark สองเครื่อง", hardware: "AI machine สองเครื่องสำหรับงานที่ต้องการทรัพยากรมากขึ้น", price: "เริ่มต้น ฿399,900", color: "#00ff88", outcomes: ["รองรับงานของทีมตามผลการประเมิน", "Mimir Transcribe ถอดเสียง", "Mimir Image Studio สร้างภาพผ่านแอปของ Mimir"] },
  { icon: Cpu, title: "RTX 5090 workstation", hardware: "เวิร์กสเตชัน GPU สำหรับงาน AI ในองค์กร", price: "เริ่มต้น ฿219,900", color: "#8b5cf6", outcomes: ["Mimir Second Brain สำหรับความรู้บริษัท", "Mimir Ledger ช่วยเตรียมข้อมูลบัญชี", "เลือกแอปตามงานที่ต้องการ"] },
  { icon: Server, title: "GPU server", hardware: "เซิร์ฟเวอร์ GPU สำหรับการติดตั้งระดับองค์กร", price: "เริ่มต้น ฿1,190,000", color: "#ec4899", outcomes: ["ออกแบบระบบสำหรับหน้างาน", "กำหนดการสำรองข้อมูลและโครงสร้างพื้นฐาน", "ติดตั้ง Suite บนเครื่องพนักงานตามสิทธิ์ใช้งาน"] },
];

export default function Packages() {
  return (
    <section id="packages" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#f0f4f8] md:text-5xl lg:text-6xl">
            เริ่มจากขนาดที่เหมาะกับงาน
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#94a3b8]">
            ราคาเป็นจุดเริ่มต้น, สเปกและราคาสุดท้ายออกแบบตามปริมาณงาน ข้อมูล และจำนวนผู้ใช้ของคุณ
          </p>
        </div>
        <MachineOptions />
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col rounded-2xl border border-[#1e293b] bg-[#111827] p-5 transition-transform hover:-translate-y-1 sm:p-6"
              style={{ boxShadow: `0 0 28px ${tier.color}10` }}
            >
              <div
                className="mb-5 flex size-11 items-center justify-center rounded-xl"
                style={{ background: `${tier.color}15` }}
              >
                <tier.icon size={21} style={{ color: tier.color }} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#f0f4f8]">{tier.title}</h3>
              <p className="mb-4 text-xs text-[#94a3b8]">{tier.hardware}</p>
              <p className="mb-5 text-xl font-bold" style={{ color: tier.color }}>
                {tier.price}
              </p>
              <ul className="mb-6 flex-1 space-y-3">
                {tier.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: tier.color }} />
                    {outcome}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block rounded-lg border py-2.5 text-center text-sm font-semibold"
                style={{ borderColor: `${tier.color}60`, color: tier.color }}
              >
                ขอประเมินสเปก
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 p-6 text-center">
          <Sparkles size={22} className="mx-auto mb-3 text-[#00e5ff]" />
          <p className="mb-4 text-sm text-[#94a3b8]">
            ทุกระบบใช้ Mimir Suites บนเครื่องพนักงาน และ AI machine ติดตั้งในองค์กรของคุณ
          </p>
          <a
            href="#contact"
            className="inline-flex rounded-xl bg-[#00e5ff] px-5 py-2.5 text-sm font-bold text-[#060a14]"
          >
            ยังไม่แน่ใจ ติดต่อเรา
          </a>
        </div>
      </div>
    </section>
  );
}
