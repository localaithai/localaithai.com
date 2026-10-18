import type { CSSProperties } from "react";
import { Check, Cpu, Monitor, Server, Sparkles } from "lucide-react";
import MachineOptions from "@/components/MachineOptions";
import { withMotionConfig } from "@/components/motion-config";

const tiers = [
  { icon: Monitor, title: "เครื่องตั้งโต๊ะ Spark-class", hardware: "AI machine ขนาดตั้งโต๊ะ", price: "เริ่มต้น ฿179,900", color: "#00e5ff", outcomes: ["Mimir Scan อ่านเอกสารและ OCR", "Mimir Translate แปลภาษา", "Mimir Chat ช่วยค้นหาและร่างงาน"] },
  { icon: Cpu, title: "Spark สองเครื่อง", hardware: "AI machine สองเครื่องสำหรับงานที่ต้องการทรัพยากรมากขึ้น", price: "เริ่มต้น ฿399,900", color: "#00ff88", outcomes: ["รองรับงานของทีมตามผลการประเมิน", "Mimir Transcribe ถอดเสียง", "Mimir Write ร่างเอกสารธุรกิจจากแหล่งข้อมูลของคุณ"] },
  { icon: Cpu, title: "RTX 5090 workstation", hardware: "เวิร์กสเตชัน GPU สำหรับงาน AI ในองค์กร", price: "เริ่มต้น ฿219,900", color: "#8b5cf6", outcomes: ["Mimir Second Brain สำหรับความรู้บริษัท", "Mimir Ledger ช่วยเตรียมข้อมูลบัญชี", "เลือกแอปตามงานที่ต้องการ"] },
  { icon: Server, title: "GPU server", hardware: "เซิร์ฟเวอร์ GPU สำหรับการติดตั้งระดับองค์กร", price: "เริ่มต้น ฿1,190,000", color: "#ec4899", outcomes: ["ออกแบบระบบสำหรับหน้างาน", "กำหนดการสำรองข้อมูลและโครงสร้างพื้นฐาน", "ติดตั้ง Suite บนเครื่องพนักงานตามสิทธิ์ใช้งาน"] },
];

function Packages() {
  return (
    <section id="packages" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="mb-12 text-center lg:mb-14">
          <h2 className="mb-5 text-h2 font-bold text-[#f0f4f8]">
            เริ่มจากขนาดที่เหมาะกับงาน
          </h2>
          <p className="lead mx-auto">
            ราคาเป็นจุดเริ่มต้น, สเปกและราคาสุดท้ายออกแบบตามปริมาณงาน ข้อมูล และจำนวนผู้ใช้ของคุณ
          </p>
        </div>
        <MachineOptions />
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.title}
              data-reveal
              className="surface flex flex-col rounded-2xl bg-[#111827] p-5 sm:p-6"
              style={{ "--i": index, boxShadow: `0 0 28px ${tier.color}10` } as CSSProperties}
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
                className="btn flex min-h-11 items-center justify-center rounded-lg border py-2.5 text-center text-sm font-semibold hover:bg-white/[0.04]"
                style={{ borderColor: `${tier.color}60`, color: tier.color }}
              >
                ขอประเมินสเปก
              </a>
            </div>
          ))}
        </div>
        <div data-reveal className="mt-10 rounded-2xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 p-6 text-center">
          <Sparkles size={22} className="mx-auto mb-3 text-[#00e5ff]" />
          <p className="mb-4 text-sm text-[#94a3b8]">
            ทุกระบบใช้ Mimir Suites บนเครื่องพนักงาน และ AI machine ติดตั้งในองค์กรของคุณ
          </p>
          <a
            href="#contact"
            className="btn inline-flex min-h-11 items-center rounded-xl bg-[#00e5ff] px-5 py-2.5 text-sm font-bold text-[#060a14] hover:opacity-90"
          >
            ยังไม่แน่ใจ ติดต่อเรา
          </a>
        </div>
      </div>
    </section>
  );
}

export default withMotionConfig(Packages);
