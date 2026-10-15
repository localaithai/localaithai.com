import { motion } from "framer-motion";
import { ArrowRight, Cloud, Laptop, ShieldCheck, Users } from "lucide-react";
import { withMotionConfig } from "@/components/motion-config";

const facts = [
  { icon: Laptop, title: "Suite บนเครื่องพนักงาน", text: "ติดตั้ง Mimir Suites แยกบนเครื่องของแต่ละคน, หนึ่ง seat คือหนึ่งการติดตั้ง" },
  { icon: Cloud, title: "โมเดลจากผู้ให้บริการคลาวด์", text: "ไม่ต้องซื้อ AI hardware, ใช้โมเดลผ่านผู้ให้บริการคลาวด์" },
  { icon: Users, title: "ข้อมูลแยกกัน", text: "แต่ละ seat มีข้อมูลในเครื่องของตนเอง, ไม่แชร์ข้อมูลระหว่างกัน" },
  { icon: ShieldCheck, title: "ข้อมูลเอกสาร", text: "ข้อความเอกสารถูกส่งไปยังผู้ให้บริการโมเดล โดยปกปิด PII เป็นค่าเริ่มต้น" },
];

function CloudSection() {
  return <section className="py-16 lg:py-20"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-10"><span className="text-4xl block mb-4">☁️</span><h1 className="text-3xl md:text-5xl font-black text-[#f0f4f8] mb-4">Mimir Suites Cloud</h1><p className="text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">สำหรับองค์กรที่ไม่จำเป็นต้องเก็บข้อมูลไว้ในอาคาร, ใช้ Suite เดียวกันบนเครื่องพนักงาน โดยไม่ต้องมี AI machine</p></div><div className="grid sm:grid-cols-2 gap-4 mb-8">{facts.map((fact, index) => <motion.div key={fact.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-2xl bg-[#111827] border border-[#1e293b] p-5"><fact.icon size={21} className="text-[#00e5ff] mb-3" /><h2 className="font-bold text-[#f0f4f8] mb-2">{fact.title}</h2><p className="text-sm text-[#94a3b8] leading-relaxed">{fact.text}</p></motion.div>)}</div><div className="rounded-2xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 p-7 text-center"><p className="text-sm text-[#94a3b8] mb-5">ดูรายละเอียด Mimir Suites Cloud และตัดสินใจจากแนวทางจัดการข้อมูลของคุณ</p><a href="https://www.cloudaithai.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] text-[#060a14] font-bold">ไปที่ CloudAIThai.com <ArrowRight size={16} /></a></div></div></section>;
}

export default withMotionConfig(CloudSection);
