import { type CSSProperties, useState } from "react";
import { motion } from "framer-motion";
import { Check, Cpu, Monitor, Server } from "lucide-react";
import { withMotionConfig } from "@/components/motion-config";

const systems = [
  { id: "spark", icon: Monitor, name: "Spark-class desk box", price: "เริ่มต้น ฿179,900", color: "#00e5ff" },
  { id: "dual-spark", icon: Cpu, name: "Dual Spark", price: "เริ่มต้น ฿399,900", color: "#00ff88" },
  { id: "rtx-5090", icon: Cpu, name: "RTX 5090 workstation", price: "เริ่มต้น ฿219,900", color: "#8b5cf6" },
  { id: "gpu-server", icon: Server, name: "GPU server", price: "เริ่มต้น ฿1,190,000", color: "#ec4899" },
];

function SystemBuilder() {
  const [selectedId, setSelectedId] = useState(systems[0].id);
  const selected = systems.find((system) => system.id === selectedId) ?? systems[0];
  return <section id="system-builder" className="py-16 lg:py-20 relative overflow-hidden"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-10"><h2 className="text-3xl md:text-5xl font-bold text-[#f0f4f8] mb-4">เริ่มคุยจาก workload ของคุณ</h2><p className="text-[#94a3b8]">เลือกจุดเริ่มต้นเพื่อคุยกับทีม, เราจะกำหนดสเปกจริงพร้อมแอป Mimir ที่เหมาะกับงาน</p></div><div className="grid lg:grid-cols-2 gap-6"><div className="space-y-3">{systems.map((system) => <button key={system.id} onClick={() => setSelectedId(system.id)} className={`w-full text-left rounded-xl border p-4 transition-colors bg-[#111827] ${selectedId === system.id ? "border-(--tint-70)" : "border-[#1e293b]"}`} style={{ "--tint": system.color, "--tint-70": `${system.color}70` } as CSSProperties}><div className="flex items-center gap-3"><system.icon size={19} className="text-(--tint)" /><div><p className="font-bold text-[#f0f4f8]">{system.name}</p><p className="text-sm text-(--tint)">{system.price}</p></div></div></button>)}</div><motion.div key={selected.id} initial={false} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#111827] border border-[#1e293b] p-6" style={{ "--tint": selected.color } as CSSProperties}><selected.icon size={28} className="mb-4 text-(--tint)" /><h3 className="text-xl font-bold text-[#f0f4f8] mb-2">{selected.name}</h3><p className="text-xl font-bold mb-5 text-(--tint)">{selected.price}</p><ul className="space-y-3 text-sm text-[#94a3b8]"><li className="flex gap-2"><Check size={15} className="text-(--tint)" />ประเมินจำนวนผู้ใช้และรูปแบบงานก่อนระบุความสามารถ</li><li className="flex gap-2"><Check size={15} className="text-(--tint)" />เลือก Mimir Scan, Bridge, Echo, Ledger, Well, Chat หรือ Still ตามความต้องการ</li><li className="flex gap-2"><Check size={15} className="text-(--tint)" />สเปกสุดท้ายและราคาเสนอเป็นรายดีล</li></ul><a href="#contact" className="inline-block mt-6 px-5 py-3 rounded-xl font-bold text-[#060a14] bg-(--tint)">ขอประเมินระบบ</a></motion.div></div></div></section>;
}

export default withMotionConfig(SystemBuilder);
