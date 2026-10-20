import type { CSSProperties } from "react";
import { Cpu, Monitor, Server } from "lucide-react";
import { withMotionConfig } from "@/components/motion-config";

const tiers = [
  { icon: Monitor, title: "Spark-class desk box", price: "เริ่มต้น ฿179,900", fit: "จุดเริ่มต้นสำหรับองค์กรที่ต้องการ Local AI", color: "#00e5ff" },
  { icon: Cpu, title: "Dual Spark", price: "เริ่มต้น ฿399,900", fit: "สำหรับงานที่ต้องการทรัพยากรมากขึ้น", color: "#00ff88" },
  { icon: Cpu, title: "RTX 5090 workstation", price: "เริ่มต้น ฿219,900", fit: "เวิร์กสเตชัน GPU สำหรับงานเฉพาะทาง", color: "#8b5cf6" },
  { icon: Server, title: "GPU server", price: "เริ่มต้น ฿1,190,000", fit: "ติดตั้งระดับองค์กรและโครงสร้างพื้นฐานที่ออกแบบตามหน้างาน", color: "#ec4899" },
];

function Comparison() {
  return <section className="py-20 lg:py-24 relative"><div className="max-w-6xl mx-auto px-6"><div data-reveal className="reveal-on-scroll text-center mb-12"><h2 className="text-h2 font-bold text-[#f0f4f8] mb-5">เปรียบเทียบจุดเริ่มต้น</h2><p className="lead mx-auto">ความสามารถที่เหมาะสมยืนยันจาก workload จริง ก่อนเสนอระบบ</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{tiers.map((tier, index) => <div key={tier.title} data-reveal style={{ "--i": index, "--tint": tier.color } as CSSProperties} className="reveal-on-scroll surface rounded-2xl bg-[#111827] p-5"><tier.icon size={20} className="mb-4 text-(--tint)" /><h3 className="font-bold text-[#f0f4f8] mb-2">{tier.title}</h3><p className="text-lg font-bold mb-3 text-(--tint)">{tier.price}</p><p className="text-xs text-[#94a3b8] leading-relaxed">{tier.fit}</p></div>)}</div></div></section>;
}

export default withMotionConfig(Comparison);
