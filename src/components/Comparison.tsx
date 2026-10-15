import { motion } from "framer-motion";
import { Cpu, Monitor, Server } from "lucide-react";
import { withMotionConfig } from "@/components/motion-config";

const tiers = [
  { icon: Monitor, title: "Spark-class desk box", price: "เริ่มต้น ฿179,900", fit: "จุดเริ่มต้นสำหรับองค์กรที่ต้องการ Local AI", color: "#00e5ff" },
  { icon: Cpu, title: "Dual Spark", price: "เริ่มต้น ฿399,900", fit: "สำหรับงานที่ต้องการทรัพยากรมากขึ้น", color: "#00ff88" },
  { icon: Cpu, title: "RTX 5090 workstation", price: "เริ่มต้น ฿219,900", fit: "เวิร์กสเตชัน GPU สำหรับงานเฉพาะทาง", color: "#8b5cf6" },
  { icon: Server, title: "GPU server", price: "เริ่มต้น ฿1,190,000", fit: "ติดตั้งระดับองค์กรและโครงสร้างพื้นฐานที่ออกแบบตามหน้างาน", color: "#ec4899" },
];

function Comparison() {
  return <section className="py-16 lg:py-20 relative"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-10"><h2 className="text-3xl md:text-5xl font-bold text-[#f0f4f8] mb-4">เปรียบเทียบจุดเริ่มต้น</h2><p className="text-[#94a3b8] text-sm">ความสามารถที่เหมาะสมยืนยันจาก workload จริง ก่อนเสนอระบบ</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{tiers.map((tier, index) => <motion.div key={tier.title} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-[#1e293b] bg-[#111827] p-5"><tier.icon size={20} style={{ color: tier.color }} className="mb-4" /><h3 className="font-bold text-[#f0f4f8] mb-2">{tier.title}</h3><p className="text-lg font-bold mb-3" style={{ color: tier.color }}>{tier.price}</p><p className="text-xs text-[#94a3b8] leading-relaxed">{tier.fit}</p></motion.div>)}</div></div></section>;
}

export default withMotionConfig(Comparison);
