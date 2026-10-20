import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  BatteryCharging,
  HardDrive,
  Server,
  Shield,
  Check,
  AlertTriangle,
} from "lucide-react";
import { withMotionConfig } from "@/components/motion-config";

const categories = [
  {
    icon: BatteryCharging,
    title: "ระบบสำรองไฟ (UPS)",
    subtitle: "Eaton & Schneider Electric",
    color: "#00ff88",
    whyNeed:
      "ถ้าไฟดับกะทันหัน ข้อมูลอาจเสียหายได้ UPS ช่วยให้เครื่องทำงานต่อได้ และปิดตัวอย่างปลอดภัย",
    items: [
      {
        name: "สำหรับเครื่องตั้งโต๊ะ",
        desc: "ป้องกันไฟดับ ไฟกระชาก สำหรับ Mac Mini หรือ DGX Spark 1 ตัว",
        price: "฿8,000 - 25,000",
      },
      {
        name: "สำหรับ Rack Server",
        desc: "ติดในตู้ Rack ได้ สำรองไฟให้เซิร์ฟเวอร์ 1-2 ตัวได้หลายชั่วโมง",
        price: "฿45,000 - 180,000",
      },
      {
        name: "สำหรับห้อง Server",
        desc: "ระบบไฟ 3 เฟส สำหรับ Data Center ขนาดเล็ก-กลาง พร้อมตู้แบตเตอรี่",
        price: "฿200,000 - 1,500,000",
      },
    ],
  },
  {
    icon: Server,
    title: "ตู้ Rack & อุปกรณ์",
    subtitle: "Rack, PDU, ระบบระบายความร้อน",
    color: "#00e5ff",
    whyNeed:
      "ตู้ Rack ช่วยจัดเรียงอุปกรณ์ให้เป็นระเบียบ ระบายความร้อนได้ดี และดูแลรักษาง่าย",
    items: [
      {
        name: "ตู้เล็ก 9-15U",
        desc: "สำหรับออฟฟิศเล็ก ใส่เซิร์ฟเวอร์ 1-2 ตัว พร้อม UPS",
        price: "฿5,000 - 15,000",
      },
      {
        name: "ตู้มาตรฐาน 22-42U",
        desc: "ตู้ Server มาตรฐาน 19 นิ้ว พร้อมระบบจัดสาย พัดลม และปลั๊กไฟ",
        price: "฿12,000 - 45,000",
      },
      {
        name: "ห้อง Server สำเร็จรูป",
        desc: "สำหรับองค์กรที่ไม่มีห้อง Server, ตู้ปิดมิด พร้อมระบบทำความเย็นและ UPS ในตัว",
        price: "฿150,000 - 500,000+",
      },
    ],
  },
  {
    icon: HardDrive,
    title: "NAS เก็บข้อมูล",
    subtitle: "Synology / QNAP",
    color: "#8b5cf6",
    whyNeed:
      "NAS คือตู้เก็บไฟล์ส่วนตัว เข้าถึงได้จากทุกเครื่องในออฟฟิศ สำรองข้อมูลอัตโนมัติ ไม่ต้องใช้ Google Drive",
    items: [
      {
        name: "NAS 2 ช่อง (สำหรับ 1-5 คน)",
        desc: "เก็บไฟล์งาน สำรองข้อมูล เปิดดูหนัง/เพลงจากมือถือได้",
        price: "฿8,000 - 20,000",
      },
      {
        name: "NAS 4 ช่อง (สำหรับทีม)",
        desc: "แชร์โฟลเดอร์ในทีม สำรองข้อมูลซ้ำซ้อน ถ้า HDD พังตัวนึงข้อมูลยังอยู่",
        price: "฿15,000 - 45,000",
      },
      {
        name: "NAS Rack 8-12 ช่อง (สำหรับองค์กร)",
        desc: "เก็บข้อมูลขนาดใหญ่ เชื่อมต่อเร็วสุด ใช้เก็บไฟล์สำหรับ AI ฝึกเรียนรู้",
        price: "฿50,000 - 200,000+",
      },
    ],
  },
];

function Infrastructure() {
  return (
    <section id="infrastructure" className="py-16 lg:py-20 bg-[#0c1220]/50 relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#060a14] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            อุปกรณ์เสริมที่ต้องมี
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base leading-relaxed">
            เหมือนซื้อบ้าน ต้องมีระบบไฟ ตู้เก็บของ และเซฟ
            <br />
            AI ก็เหมือนกัน, ต้องมีไฟสำรอง ตู้ Rack และที่เก็บข้อมูล
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
              className="rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden"
            >
              {/* Header */}
              <div
                className="px-6 pt-6 pb-4 border-b border-[#1e293b] bg-[linear-gradient(135deg,var(--tint-08),transparent)]"
                style={
                  {
                    "--tint": cat.color,
                    "--tint-08": `${cat.color}08`,
                    "--tint-15": `${cat.color}15`,
                  } as CSSProperties
                }
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-(--tint-15)">
                  <cat.icon size={20} className="text-(--tint)" />
                </div>
                <h3 className="text-lg font-bold text-[#f0f4f8]">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">{cat.subtitle}</p>
              </div>

              {/* Why you need this */}
              <div className="px-6 py-4 border-b border-[#1e293b] bg-[#0c1220]/50">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={14}
                    className="mt-0.5 shrink-0 text-(--tint)"
                    style={{ "--tint": cat.color } as CSSProperties}
                  />
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {cat.whyNeed}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div
                className="p-6 space-y-5"
                style={
                  { "--tint": cat.color, "--tint-40": `${cat.color}40` } as CSSProperties
                }
              >
                {cat.items.map((item) => (
                  <div key={item.name} className="border-l-2 border-(--tint-40) pl-4">
                    <h4 className="text-sm font-semibold text-[#f0f4f8] mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#94a3b8] mb-2 leading-relaxed">
                      {item.desc}
                    </p>
                    <p className="text-sm font-bold text-(--tint)">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-6 md:p-8 text-center"
        >
          <Shield size={24} className="text-[#00ff88] mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[#f0f4f8] mb-2">
            จัดโครงสร้างพื้นฐานพร้อม Local AI
          </h3>
          <p className="text-sm text-[#94a3b8] max-w-lg mx-auto mb-4">
            เลือก UPS, Rack และ NAS ตามความต้องการของระบบ
            และให้ทีมติดตั้งพร้อมกันได้
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              "ติดตั้งครบจบ ไม่ต้องหาหลายเจ้า",
              "ประกันจากผู้ผลิตโดยตรง",
              "ออกใบกำกับภาษีได้",
            ].map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 text-[#f0f4f8]"
              >
                <Check size={12} className="text-[#00ff88]" />
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default withMotionConfig(Infrastructure);
