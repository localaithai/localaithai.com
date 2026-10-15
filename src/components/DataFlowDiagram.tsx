import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Scissors,
  Database,
  Search,
  Cpu,
  MessageSquareText,
  ArrowDown,
  ArrowRight,
  User,
  Braces,
  Layers,
  Sparkles,
  Check,
} from "lucide-react";
import { withMotionConfig } from "@/components/motion-config";

// Animated flowing dots between steps
function FlowDots({
  direction = "down",
  color,
  active = true,
}: {
  direction?: "down" | "right";
  color: string;
  active?: boolean;
}) {
  if (!active) return <div className="h-6" />;
  const isDown = direction === "down";
  return (
    <div
      className={`flex ${isDown ? "flex-col" : "flex-row"} items-center gap-1 ${isDown ? "py-1" : "px-1"}`}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.1, 0.7] }}
          transition={{
            duration: 1.2,
            delay: i * 0.25,
            repeat: Infinity,
          }}
        />
      ))}
      {isDown ? (
        <ArrowDown size={12} style={{ color }} />
      ) : (
        <ArrowRight size={12} style={{ color }} />
      )}
    </div>
  );
}

// Step box
function StepBox({
  icon: Icon,
  step,
  title,
  desc,
  details,
  color,
  delay,
  active = true,
}: {
  icon: typeof FileText;
  step: string;
  title: string;
  desc: string;
  details?: string[];
  color: string;
  delay: number;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-xl border p-4 transition-[background-color,border-color,color,box-shadow] duration-300 ${active ? "bg-[#111827] border-[#1e293b]" : "bg-[#0c1220]/50 border-[#1e293b]/50 opacity-50"}`}
      style={
        active
          ? { borderColor: color + "30", boxShadow: `0 0 20px ${color}08` }
          : {}
      }
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: color + "15" }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: color + "20", color }}
            >
              {step}
            </span>
            <span className="text-sm font-bold text-[#f0f4f8]">{title}</span>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">{desc}</p>
          {details && active && (
            <div className="mt-2 space-y-1">
              {details.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-1.5 text-[10px] text-[#94a3b8]"
                >
                  <Check size={8} style={{ color }} />
                  {d}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Diagram: RAG Pipeline ───
function RAGPipeline() {
  return (
    <div className="space-y-1">
      <StepBox
        icon={FileText}
        step="1"
        title="รวบรวมเอกสาร"
        desc="นำไฟล์ทั้งหมดของบริษัทเข้าระบบ, PDF, Word, Excel, อีเมล, รูปภาพ"
        details={[
          "สแกนโฟลเดอร์อัตโนมัติ เจอไฟล์ใหม่ดึงเข้าเอง",
          "อ่านได้ทั้งไทย อังกฤษ จีน ญี่ปุ่น",
          "รองรับหลายไฟล์ตามพื้นที่จัดเก็บและสเปก",
        ]}
        color="#00e5ff"
        delay={0}
      />
      <FlowDots color="#00e5ff" />

      <StepBox
        icon={Scissors}
        step="2"
        title="ตัดแบ่งเป็นชิ้นเล็กๆ (Chunking)"
        desc="ระบบตัดเอกสารยาวๆ เป็นท่อนสั้นๆ ที่ AI อ่านเข้าใจได้ง่าย, เหมือนตัดหนังสือเป็นบทๆ"
        details={[
          "ตัดอัจฉริยะ ไม่ตัดกลางประโยค",
          "จำหน้า จำบท จำตาราง ได้หมด",
          "ปรับขนาดได้ตามประเภทเอกสาร",
        ]}
        color="#00ff88"
        delay={0.1}
      />
      <FlowDots color="#00ff88" />

      <StepBox
        icon={Braces}
        step="3"
        title="แปลงเป็นภาษาที่ AI เข้าใจ (Embedding)"
        desc={'แปลงข้อความเป็น "พิกัด" ในมิติพิเศษ, ข้อความที่คล้ายกันจะอยู่ใกล้กัน เช่น "สัญญา" กับ "Contract" อยู่ใกล้กัน'}
        details={[
          "ใช้โมเดล Embedding ที่รองรับภาษาไทย",
          "ทำงานในเครื่องของคุณ ไม่ส่งข้อมูลออก",
          "สร้างดัชนีครั้งแรก แล้วอัปเดตเฉพาะเอกสารที่เพิ่มหรือเปลี่ยน",
        ]}
        color="#8b5cf6"
        delay={0.2}
      />
      <FlowDots color="#8b5cf6" />

      <StepBox
        icon={Database}
        step="4"
        title="เก็บใน Vector Database"
        desc={'เก็บ "พิกัด" ทั้งหมดไว้ในฐานข้อมูลพิเศษ, เมื่อมีคำถาม ระบบจะหาเอกสารที่เกี่ยวข้องที่สุดได้ในเสี้ยววินาที'}
        details={[
          "ค้นหาจากความหมาย ไม่ใช่แค่คำ",
          'ถามว่า "ค่าใช้จ่ายปีนี้" หาได้ แม้เอกสารเขียนว่า "งบประมาณประจำปี"',
          "อัพเดทอัตโนมัติเมื่อมีเอกสารใหม่",
        ]}
        color="#ec4899"
        delay={0.3}
      />
    </div>
  );
}

// ─── Query Flow: What happens when user asks ───
function QueryFlow() {
  return (
    <div className="space-y-1">
      <StepBox
        icon={User}
        step="A"
        title="คุณพิมพ์คำถาม"
        desc='ถามเป็นภาษาไทยธรรมดาได้เลย เช่น "สัญญากับบริษัท XYZ ที่เซ็นเมื่อเดือนที่แล้วมีเงื่อนไขอะไรบ้าง?"'
        color="#00e5ff"
        delay={0}
      />
      <FlowDots color="#00e5ff" />

      <StepBox
        icon={Search}
        step="B"
        title="ค้นหาเอกสารที่เกี่ยวข้อง"
        desc="ระบบแปลงคำถามเป็นพิกัด แล้วค้นหาในฐานข้อมูลว่ามีเอกสารไหนเกี่ยวข้อง, เจอ 5-10 ชิ้นที่ตรงที่สุด"
        details={[
          "ค้นจากความหมาย ไม่ใช่แค่ keyword",
          "ใช้เวลาไม่ถึง 1 วินาที",
          "เอาทั้งตาราง รูปภาพ ข้อความ มาให้",
        ]}
        color="#00ff88"
        delay={0.1}
      />
      <FlowDots color="#00ff88" />

      <StepBox
        icon={Cpu}
        step="C"
        title="AI อ่านเอกสาร + ตอบคำถาม"
        desc='LLM (เช่น Llama, Qwen) อ่านเอกสารที่เจอ แล้วตอบคำถามของคุณ, "สัญญากับ XYZ เซ็นวันที่ 15 ม.ค. มีเงื่อนไข 3 ข้อ คือ..."'
        details={[
          "ตอบจากเอกสารจริง ไม่แต่งเอง",
          "บอกได้ว่าคำตอบมาจากเอกสารไหน หน้าไหน",
          "เข้าใจบริบท ตอบได้ยาวหรือสรุปก็ได้",
        ]}
        color="#8b5cf6"
        delay={0.2}
      />
      <FlowDots color="#8b5cf6" />

      <StepBox
        icon={MessageSquareText}
        step="D"
        title="แสดงคำตอบ + อ้างอิงเอกสาร"
        desc="คุณได้คำตอบเป็นภาษาไทยอ่านง่าย พร้อมลิงก์ไปเอกสารต้นทาง เพื่อตรวจสอบความถูกต้องได้"
        details={[
          "คลิกดูเอกสารต้นทางได้เลย",
          "ถามต่อเพื่อเจาะลึกได้",
          "บันทึกเป็นรายงานได้",
        ]}
        color="#ec4899"
        delay={0.3}
      />
    </div>
  );
}

// ─── LLM Inference: How the AI brain works ───
function LLMInference() {
  return (
    <div className="space-y-1">
      <StepBox
        icon={MessageSquareText}
        step="1"
        title="รับคำสั่ง (Prompt)"
        desc={'คำถามของคุณ + เอกสารที่เกี่ยวข้อง ถูกรวมเป็น "คำสั่ง" ส่งให้ AI ประมวลผล'}
        details={[
          'ตัวอย่าง: "จากเอกสารนี้ [เอกสาร] ตอบคำถาม [คำถาม]"',
          "ระบบจัดรูปแบบให้อัตโนมัติ คุณแค่พิมพ์คำถาม",
        ]}
        color="#00e5ff"
        delay={0}
      />
      <FlowDots color="#00e5ff" />

      <StepBox
        icon={Layers}
        step="2"
        title="AI ประมวลผลทีละคำ (Token Generation)"
        desc='LLM อ่านคำสั่งแล้วสร้างคำตอบทีละคำ เหมือนคนคิดทีละประโยค, คำแรก "สัญญา" → "กับ" → "บริษัท" → "XYZ"...'
        details={[
          "ความเร็วขึ้นกับขนาดเครื่อง (8-60 คำ/วินาที)",
          "AI ฉลาดขึ้นถ้าเครื่องใหญ่ขึ้น (โมเดลใหญ่ = ฉลาดกว่า)",
          "ทำงาน 100% บน GPU ในเครื่องของคุณ",
        ]}
        color="#00ff88"
        delay={0.1}
      />
      <FlowDots color="#00ff88" />

      <StepBox
        icon={Sparkles}
        step="3"
        title="คำตอบไหลออกมาแบบ Streaming"
        desc="คุณเห็นคำตอบพิมพ์ออกมาทีละคำแบบ Real-time ไม่ต้องรอจนเสร็จ, เหมือนคุยกับคนจริงๆ"
        details={[
          "เริ่มเห็นคำตอบในไม่กี่วินาที",
          "ตอบได้ยาวหลายหน้าก็ได้",
          "หยุดกลางทางได้ ถ้าได้คำตอบแล้ว",
        ]}
        color="#8b5cf6"
        delay={0.2}
      />
    </div>
  );
}

// ─── Main component ───
const tabs = [
  {
    id: "rag",
    label: "การเตรียมเอกสาร",
    sublabel: "RAG Pipeline",
    color: "#00e5ff",
  },
  {
    id: "query",
    label: "เมื่อคุณถามคำถาม",
    sublabel: "Query Flow",
    color: "#00ff88",
  },
  {
    id: "inference",
    label: "AI คิดยังไง",
    sublabel: "LLM Inference",
    color: "#8b5cf6",
  },
];

function DataFlowDiagram() {
  const [activeTab, setActiveTab] = useState("rag");

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f0f4f8] mb-3">
            เบื้องหลังระบบ AI ทำงานยังไง?
          </h2>
          <p className="text-sm text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
            ไม่ต้องเป็นโปรแกรมเมอร์ก็เข้าใจได้, ดูทีละขั้นตอน
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex rounded-xl bg-[#0c1220] border border-[#1e293b] p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-[background-color,border-color,color,box-shadow] whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#060a14]"
                    : "text-[#94a3b8] hover:text-[#f0f4f8]"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: tab.color }
                    : {}
                }
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.sublabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "rag" && <RAGPipeline />}
            {activeTab === "query" && <QueryFlow />}
            {activeTab === "inference" && <LLMInference />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default withMotionConfig(DataFlowDiagram);
