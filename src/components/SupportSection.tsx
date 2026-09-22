"use client";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Shield,
  Wrench,
  RefreshCw,
  HeadphonesIcon,
  GraduationCap,
  TrendingUp,
  Clock,
  AlertTriangle,
  Zap,
  Calendar,
  HardDrive,
  Cpu,
} from "lucide-react";

function GlowCard({ children, color = "#00e5ff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`} style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}>
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

const problems = [
  {
    emoji: "😰",
    title: "AI ตอบช้าลงเรื่อยๆ",
    desc: "ใช้ไปนานๆ model cache เต็ม RAM ไม่พอ ต้อง optimize",
    color: "#f87171",
  },
  {
    emoji: "🔄",
    title: "Model เก่า ไม่ฉลาดเท่าที่ควร",
    desc: "โมเดลใหม่ออกทุกเดือน ถ้าไม่อัพเดท AI จะตามไม่ทันคู่แข่ง",
    color: "#f59e0b",
  },
  {
    emoji: "💥",
    title: "ระบบล่ม ใช้งานไม่ได้",
    desc: "ระบบ AI ขัดข้องในวันที่ต้องใช้งานด่วน",
    color: "#f87171",
  },
  {
    emoji: "🔋",
    title: "UPS battery เสื่อม ไม่รู้ตัว",
    desc: "battery อายุ 2-3 ปี เสื่อมเงียบๆ ไฟดับจริงอาจสำรองไม่ได้",
    color: "#f59e0b",
  },
  {
    emoji: "💾",
    title: "HDD ใน NAS ใกล้พัง",
    desc: "HDD มี SMART warning แต่ไม่มีใครดู, พังวันไหน ข้อมูลหาย",
    color: "#f87171",
  },
  {
    emoji: "👤",
    title: "พนักงานใหม่ ไม่รู้จะใช้ยังไง",
    desc: "คนเก่าลาออก คนใหม่มา ไม่มีใครสอนใช้ AI",
    color: "#f59e0b",
  },
];

const services = [
  {
    icon: RefreshCw,
    title: "Preventive Maintenance",
    subtitle: "บำรุงรักษาเชิงป้องกัน",
    color: "#00e5ff",
    desc: "ตรวจสุขภาพระบบทุกเดือน แก้ปัญหาก่อนที่จะเกิด",
    items: [
      "ตรวจ CPU, RAM, GPU utilization, ใช้มากไปไหม",
      "ตรวจ HDD/SSD health (SMART), ใกล้พังหรือยัง",
      "ตรวจ UPS battery, ยังสำรองไฟได้ไหม",
      "Clear cache & temp files, คืนพื้นที่",
      "ตรวจ Docker containers, healthy ทุกตัว",
      "ตรวจ log files, มี error ซ่อนอยู่ไหม",
      "ตรวจ backup, Restic ทำงานปกติไหม",
      "Report สรุปสถานะระบบทุกเดือน",
    ],
  },
  {
    icon: Zap,
    title: "Model Update & Optimization",
    subtitle: "อัพเดทโมเดล AI ให้ฉลาดขึ้น",
    color: "#00ff88",
    desc: "อัพเดท AI model ใหม่ ปรับ performance ให้เร็วขึ้น",
    items: [
      "อัพเดท Qwen, Llama, DeepSeek เวอร์ชันใหม่",
      "ทดสอบ model ใหม่ vs เก่า (benchmark)",
      "ปรับ quantization ให้เหมาะกับ RAM",
      "อัพเดท embedding model สำหรับ RAG",
      "ปรับ system prompt ให้ตอบดีขึ้น",
      "เพิ่ม model ใหม่ตามความต้องการ",
      "อัพเดท Mimir Suite และการตั้งค่า AI machine",
      "ทดสอบทุกอย่างก่อน deploy จริง",
    ],
  },
  {
    icon: Wrench,
    title: "Repair & Troubleshooting",
    subtitle: "ซ่อม แก้ปัญหา กู้ระบบ",
    color: "#f87171",
    desc: "ระบบล่ม AI ไม่ทำงาน แก้ให้กลับมาใช้ได้",
    items: [
      "AI ตอบช้า / ค้าง / crash → วิเคราะห์ + แก้ไข",
      "Docker container ล่ม → restart + fix config",
      "RAG ค้นไม่เจอ / ตอบผิด → re-index + ปรับ pipeline",
      "เครื่องร้อนผิดปกติ → ตรวจ + ทำความสะอาด",
      "HDD พัง → เปลี่ยน + restore จาก backup",
      "UPS battery เสื่อม → เปลี่ยน + ทดสอบ",
      "Network issue → debug + fix",
      "กู้ข้อมูลจาก backup (Restic)",
    ],
  },
  {
    icon: GraduationCap,
    title: "Training & Onboarding",
    subtitle: "อบรมทีมงาน สอนพนักงานใหม่",
    color: "#8b5cf6",
    desc: "สอนใช้ AI ให้คุ้มค่า ทั้งทีมเก่าและคนใหม่",
    items: [
      "Workshop ใช้งาน Mimir Suite (ครึ่งวัน)",
      "สอน prompt engineering, ถามยังไงให้ได้คำตอบดี",
      "สอน RAG, upload เอกสาร ค้นหา ถามคำถาม",
      "สอนสร้างรูปด้วย Mimir Image Studio",
      "สอน admin, จัดการ user, model, settings",
      "Onboarding พนักงานใหม่ (1-2 ชม.)",
      "เอกสาร user guide ภาษาไทย",
      "Video tutorial สำหรับดูย้อนหลัง",
    ],
  },
  {
    icon: TrendingUp,
    title: "Upgrade & Expansion",
    subtitle: "อัพเกรดระบบ เพิ่มความสามารถ",
    color: "#ec4899",
    desc: "ธุรกิจโตขึ้น ต้องการมากขึ้น อัพเกรดให้",
    items: [
      "เพิ่ม RAM → รัน model ใหญ่กว่า",
      "เพิ่ม NAS storage → เก็บข้อมูลมากขึ้น",
      "อัพเกรด Mac Mini → Mac Studio",
      "เพิ่ม user accounts → รองรับทีมใหญ่ขึ้น",
      "เพิ่มแอป Mimir ตามสิทธิ์ใช้งาน",
      "ปรับการใช้งานตาม workflow ของทีม",
      "ย้ายจาก Compact → Server tier",
      "วางแผน infrastructure สำหรับอนาคต",
    ],
  },
];

const plans = [
  {
    name: "Basic",
    emoji: "🛡️",
    price: "฿9,900",
    period: "/เดือน",
    color: "#00e5ff",
    gradient: "from-[#00e5ff] to-[#00ff88]",
    bestFor: "ทีมเล็ก ใช้ AI ไม่ซับซ้อน",
    features: [
      "Remote support ผ่าน LINE/Zoom",
      "Response time ภายใน 24 ชม.",
      "Model update 1 ครั้ง/เดือน",
      "Preventive check 1 ครั้ง/เดือน",
      "สูงสุด 2 ชม./เดือน",
    ],
    notIncluded: [
      "Onsite visit",
      "Emergency 24/7",
      "Training",
    ],
  },
  {
    name: "Pro",
    emoji: "⚡",
    badge: "แนะนำ",
    price: "฿29,900",
    period: "/เดือน",
    color: "#00ff88",
    gradient: "from-[#00ff88] to-[#00e5ff]",
    bestFor: "ทีมกลาง ใช้ AI ทุกวัน",
    features: [
      "ทุกอย่างใน Basic +",
      "Response time ภายใน 8 ชม.",
      "Onsite visit 1 ครั้ง/เดือน",
      "Model update 2 ครั้ง/เดือน",
      "Preventive maintenance เต็มรูปแบบ",
      "New feature development 2 ชม./เดือน",
      "สูงสุด 4 ชม./เดือน",
      "Uptime guarantee 95%",
    ],
    notIncluded: [
      "Emergency 24/7",
    ],
  },
  {
    name: "Enterprise",
    emoji: "🏢",
    price: "฿59,900",
    period: "/เดือน",
    color: "#8b5cf6",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    bestFor: "องค์กรที่ AI เป็น mission-critical",
    features: [
      "ทุกอย่างใน Pro +",
      "Response time ภายใน 4 ชม. (ทุกวัน)",
      "Dedicated engineer ประจำ",
      "Onsite visit 2 ครั้ง/เดือน",
      "Model update ไม่จำกัด",
      "New feature development 4 ชม./เดือน",
      "Training ทีมงาน ไม่จำกัด",
      "Uptime guarantee 99%",
      "Penalty ถ้า downtime > SLA",
      "Remote support ไม่จำกัดชั่วโมง",
    ],
    notIncluded: [],
  },
];

export default function SupportSection() {
  return (
    <section className="relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🛡️</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f0f4f8] mb-4">
            ดูแลระบบ AI ของคุณ
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg">
            ติดตั้งแล้ว ไม่ทิ้ง, เราดูแลให้ทำงานได้ดีตลอดเวลา
            <br />
            อัพเดท model, แก้ปัญหา, สอนใช้, อัพเกรด ครบจบ
          </p>
        </div>
      </div>

      {/* Problems */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mb-3">
            ปัญหาที่เกิดขึ้นเมื่อไม่มีคนดูแล
          </h2>
          <p className="text-sm text-[#94a3b8]">ซื้อเครื่องมาแล้ว แต่ไม่มีคนดูแล = เสียเงินฟรี</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <GlowCard color={p.color}>
                <div className="p-5">
                  <span className="text-2xl block mb-3">{p.emoji}</span>
                  <h4 className="text-sm font-bold text-[#f0f4f8] mb-1">{p.title}</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{p.desc}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mb-3">
            บริการดูแลครบวงจร
          </h2>
        </div>
        <div className="space-y-4">
          {services.map((svc, i) => (
            <motion.div key={svc.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <GlowCard color={svc.color}>
                <div className="p-5 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: svc.color + "15" }}>
                      <svc.icon size={20} style={{ color: svc.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#f0f4f8]">{svc.title}</h3>
                      <p className="text-xs text-[#64748b]">{svc.subtitle}</p>
                      <p className="text-sm text-[#94a3b8] mt-1">{svc.desc}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5 ml-15">
                    {svc.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                        <Check size={11} className="mt-0.5 shrink-0" style={{ color: svc.color }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f0f4f8] mb-3">
            แพ็คเกจดูแลรายเดือน
          </h2>
          <p className="text-sm text-[#94a3b8]">เลือกตามขนาดทีมและความสำคัญของระบบ</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="relative rounded-2xl p-[1.5px] h-full" style={{ background: `linear-gradient(135deg, ${plan.color}50, transparent 40%, ${plan.color}30)` }}>
                <div className="rounded-2xl bg-[#0c1220] p-5 sm:p-6 h-full flex flex-col">
                  {plan.badge && (
                    <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${plan.gradient}`}>
                      {plan.badge}
                    </div>
                  )}
                  <span className="text-3xl mb-3">{plan.emoji}</span>
                  <h4 className="text-lg font-black text-[#f0f4f8] mb-1">{plan.name}</h4>
                  <p className="text-xs text-[#64748b] mb-4">{plan.bestFor}</p>

                  <div className="border-t border-[#1e293b] pt-4 mb-4">
                    <span className="text-3xl font-black" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-sm text-[#64748b]">{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-4 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#64748b]">
                        <span className="mt-0.5 shrink-0 text-[#64748b]">✗</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="/contact" className={`block text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition-opacity shadow-lg`} style={{ boxShadow: `0 4px 15px ${plan.color}25` }}>
                    เลือกแพ็คเกจ {plan.name} <ArrowRight size={14} className="inline ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SLA Comparison */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mb-3">เปรียบเทียบ SLA</h2>
        </div>
        <div className="relative">
        <GlowCard color="#00e5ff">
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-xs min-w-[480px]">
              <thead>
                <tr className="border-b border-[#1e293b]">
                  <th className="text-left py-3 px-3 text-[#64748b]"></th>
                  <th className="text-center py-3 px-3 text-[#00e5ff]">Basic</th>
                  <th className="text-center py-3 px-3 text-[#00ff88] font-bold">Pro</th>
                  <th className="text-center py-3 px-3 text-[#8b5cf6]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "ราคา/เดือน", basic: "฿9,900", pro: "฿29,900", enterprise: "฿59,900" },
                  { label: "Response time", basic: "24 ชม.", pro: "8 ชม.", enterprise: "4 ชม." },
                  { label: "ช่องทาง", basic: "LINE, Zoom", pro: "+ โทรศัพท์", enterprise: "+ Dedicated Slack" },
                  { label: "Remote support", basic: "2 ชม./เดือน", pro: "4 ชม./เดือน", enterprise: "ไม่จำกัด" },
                  { label: "Onsite visit", basic: "ไม่รวม", pro: "1 ครั้ง/เดือน", enterprise: "2 ครั้ง/เดือน" },
                  { label: "Model update", basic: "1 ครั้ง/เดือน", pro: "2 ครั้ง/เดือน", enterprise: "ไม่จำกัด" },
                  { label: "Preventive check", basic: "Basic", pro: "Full", enterprise: "Full + report" },
                  { label: "Feature development", basic: "ไม่รวม", pro: "2 ชม./เดือน", enterprise: "4 ชม./เดือน" },
                  { label: "Training", basic: "ไม่รวม", pro: "ไม่รวม", enterprise: "ไม่จำกัด" },
                  { label: "Uptime guarantee", basic: "ไม่มี", pro: "95%", enterprise: "99%" },
                  { label: "Dedicated engineer", basic: "ไม่มี", pro: "ไม่มี", enterprise: "✓" },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-[#0c1220]/50" : ""}>
                    <td className="py-2 px-3 text-[#94a3b8] font-medium">{row.label}</td>
                    <td className="py-2 px-3 text-center text-[#f0f4f8]">{row.basic}</td>
                    <td className="py-2 px-3 text-center text-[#f0f4f8] bg-[#00ff88]/5">{row.pro}</td>
                    <td className="py-2 px-3 text-center text-[#f0f4f8]">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#060a14] to-transparent pointer-events-none md:hidden rounded-r-2xl" />
        </div>
      </div>

      {/* Why support matters */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <GlowCard color="#00ff88">
          <div className="p-8 text-center">
            <span className="text-3xl block mb-4">💡</span>
            <h3 className="text-xl font-black text-[#f0f4f8] mb-3">ทำไมต้องมีคนดูแล?</h3>
            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xl mx-auto mb-4">
              AI ไม่ใช่เครื่องใช้ไฟฟ้าที่เสียบปลั๊กแล้วลืมได้, model ต้องอัพเดท, HDD มีอายุ, battery เสื่อม, software มี bug
              เหมือนรถยนต์, ซื้อมาแล้วต้องเปลี่ยนน้ำมัน เช็คเบรค เปลี่ยนยาง
            </p>
            <p className="text-sm text-[#00ff88] font-semibold">
              ฿9,900/เดือน = ฿330/วัน ถูกกว่าจ้าง IT staff มาดูแล AI โดยเฉพาะ
            </p>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
