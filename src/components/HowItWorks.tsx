"use client";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  Cpu,
  MessageSquareText,
  Search,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "นำเอกสาร & ข้อมูลของคุณเข้าระบบ",
    desc: "ไม่ว่าจะเป็นไฟล์ Word, PDF, Excel, อีเมล หรือข้อมูลลูกค้า, เราใส่เข้าระบบ AI ให้คุณ เหมือนสอนพนักงานใหม่ให้รู้จักบริษัท",
    icon: FileText,
    color: "#00e5ff",
  },
  {
    num: "02",
    title: "AI เรียนรู้ & เข้าใจข้อมูลของคุณ",
    desc: "ระบบจะจัดระเบียบและทำความเข้าใจข้อมูลทั้งหมด ทำงานอยู่ในเครื่องของคุณตลอดเวลา ไม่ส่งข้อมูลออกไปข้างนอก",
    icon: Cpu,
    color: "#00ff88",
  },
  {
    num: "03",
    title: "ถาม พิมพ์ สั่ง, ได้คำตอบทันที",
    desc: "ถาม AI เป็นภาษาไทยได้เลย เช่น \"สรุปยอดขายเดือนนี้\" หรือ \"ร่างอีเมลตอบลูกค้า\", ได้คำตอบใน 2-3 วินาที",
    icon: MessageSquareText,
    color: "#8b5cf6",
  },
];

const useCases = [
  {
    icon: Search,
    title: "ค้นหาข้อมูลในบริษัท",
    desc: "แทนที่จะเปิดไฟล์ทีละอัน ถาม AI ได้เลยว่า \"สัญญากับบริษัท XYZ อยู่ไหน\"",
    example: "\"หาเอกสารสัญญาที่เซ็นเดือนมกราคม\"",
  },
  {
    icon: MessageSquareText,
    title: "ร่างเอกสาร & ตอบข้อความ",
    desc: "ให้ AI ช่วยเขียนอีเมล ร่างรายงาน หรือตอบข้อความลูกค้าเป็นภาษาไทย",
    example: "\"ร่างอีเมลตอบลูกค้าที่ถามเรื่องราคา\"",
  },
  {
    icon: BarChart3,
    title: "สรุป & วิเคราะห์ข้อมูล",
    desc: "ส่งไฟล์ Excel หรือ PDF ยาวๆ ให้ AI สรุปให้เข้าใจง่ายๆ ใน 1 นาที",
    example: "\"สรุปรายงานประจำปี 50 หน้านี้ให้หน่อย\"",
  },
  {
    icon: FileText,
    title: "ร่างเอกสารจากข้อมูลของคุณ",
    desc: "Mimir Write ช่วยร่างเอกสารธุรกิจจากแหล่งข้อมูลที่คุณให้ แล้วแก้ไขต่อได้",
    example: "\"ร่างข้อเสนอจากข้อมูลสินค้าและเงื่อนไขในเอกสารนี้\"",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            ระบบ AI ส่วนตัวทำงานยังไง?
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            ง่ายมาก, เหมือนมีพนักงานที่รู้ข้อมูลทุกอย่างในบริษัท
            <br />
            แต่ทำงานเร็วกว่า และพร้อมตอบ 24 ชั่วโมง
          </p>
        </div>

        {/* 3-step diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl bg-[#111827] border border-[#1e293b] p-4 sm:p-6"
            >
              {/* Step number */}
              <span
                className="text-5xl font-black absolute top-4 right-5 opacity-10"
                style={{ color: step.color }}
              >
                {step.num}
              </span>

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: step.color + "15" }}
              >
                <step.icon size={20} style={{ color: step.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#f0f4f8] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Arrow flow (desktop) */}
        <div className="hidden md:flex justify-center items-center gap-2 mb-20 text-[#64748b]">
          <span className="text-xs">ใส่ข้อมูล</span>
          <ArrowRight size={14} />
          <span className="text-xs">AI เรียนรู้</span>
          <ArrowRight size={14} />
          <span className="text-xs">ใช้งานได้ทันที</span>
        </div>

        {/* Use cases */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f0f4f8] mb-3">
            ใช้ทำอะไรได้บ้าง?
          </h3>
          <p className="text-[#94a3b8] text-sm">
            ตัวอย่างที่ธุรกิจจริงใช้กันทุกวัน
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5 hover:border-[#00e5ff]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <uc.icon size={18} className="text-[#00e5ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#f0f4f8] mb-1">{uc.title}</h4>
                  <p className="text-sm text-[#94a3b8] mb-3 leading-relaxed">
                    {uc.desc}
                  </p>
                  {/* Example prompt */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0c1220] border border-[#1e293b]">
                    <MessageSquareText size={12} className="text-[#00ff88]" />
                    <span className="text-xs text-[#00ff88] font-mono">
                      {uc.example}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple cost comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden"
        >
          <div className="p-6 md:p-8 text-center border-b border-[#1e293b]">
            <h3 className="text-xl font-bold text-[#f0f4f8] mb-2">
              ทำไม AI ส่วนตัวถึงคุ้มกว่า?
            </h3>
            <p className="text-sm text-[#94a3b8]">
              เปรียบเทียบค่าใช้จ่ายจริงกับบริการคลาวด์
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            {/* Cloud */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#1e293b]">
              <div className="text-sm font-bold text-[#f87171] mb-4">
                ❌ ใช้บริการคลาวด์ (ChatGPT, API)
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8]">
                <li>• ค่า API ประมาณ ฿5,000-50,000/เดือน ขึ้นอยู่กับจำนวนผู้ใช้</li>
                <li>• ข้อมูลของคุณถูกส่งไปประมวลผลบนเซิร์ฟเวอร์ต่างประเทศ</li>
                <li>• ถ้าเน็ตล่ม ใช้งานไม่ได้</li>
                <li>• ยิ่งใช้มาก ยิ่งจ่ายมาก ไม่มีเพดาน</li>
              </ul>
              <div className="mt-4 text-xs text-[#f87171] font-mono">
                ค่าใช้จ่าย 2 ปี: ฿120,000 - 1,200,000
              </div>
            </div>
            {/* Local */}
            <div className="p-6 md:p-8">
              <div className="text-sm font-bold text-[#00ff88] mb-4">
                ✓ AI ส่วนตัว (LocalAI Thailand)
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8]">
                <li>• hardware ซื้อครั้งเดียวตามสเปกที่เลือก</li>
                <li>• ข้อมูลอยู่ในออฟฟิศของคุณ 100%</li>
                <li>• ไม่ต้องพึ่งอินเทอร์เน็ต ทำงานได้ตลอด</li>
                <li>• ติดตั้ง Mimir Suites ตามจำนวนสิทธิ์ใช้งานของทีม</li>
              </ul>
              <div className="mt-4 text-xs text-[#00ff88] font-mono">
                ราคา hardware เริ่มต้นตามสเปกที่เลือก
              </div>
            </div>
          </div>
        </motion.div>
        {/* Why not just pay ฿700/month for ChatGPT? */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#f0f4f8] mb-3">
              แล้วทำไมไม่จ่าย ฿700/เดือน ใช้ ChatGPT ก็พอ?
            </h3>
            <p className="text-sm text-[#94a3b8] max-w-lg mx-auto">
              คำถามที่ทุกคนถาม, นี่คือคำตอบตรงๆ
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. Censorship */}
            <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl shrink-0">🚫</span>
                  <div>
                    <h4 className="text-base font-bold text-[#f0f4f8] mb-1">ChatGPT ปฏิเสธตอบเรื่องที่ธุรกิจคุณต้องการ</h4>
                    <p className="text-sm text-[#94a3b8]">AI คลาวด์มี safety filter ที่บล็อคหลายเรื่อง แม้จะเป็นคำถามที่สมเหตุสมผล</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#f87171]/5 border border-[#f87171]/15 p-4">
                    <p className="text-xs font-bold text-[#f87171] mb-2">❌ ChatGPT ตอบแบบนี้:</p>
                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <p className="italic">{'"สัญญาฉบับนี้มีช่องโหว่อะไรบ้าง?"'}</p>
                      <p className="text-[#f87171]">→ "ขออภัย ผมไม่สามารถให้คำปรึกษาทางกฎหมายได้ กรุณาปรึกษาทนายความ"</p>
                      <p className="italic mt-3">{'"ยานี้ใช้ร่วมกับยาตัวนี้ได้ไหม?"'}</p>
                      <p className="text-[#f87171]">→ "ผมไม่ใช่ผู้เชี่ยวชาญทางการแพทย์ กรุณาปรึกษาแพทย์หรือเภสัชกร"</p>
                      <p className="italic mt-3">{'"เขียน ad copy สำหรับสินค้าเสริมอาหาร"'}</p>
                      <p className="text-[#f87171]">→ "ผมไม่สามารถเขียน claim สุขภาพที่อาจทำให้เข้าใจผิดได้"</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 p-4">
                    <p className="text-xs font-bold text-[#00ff88] mb-2">✓ AI ส่วนตัวตอบได้ทุกอย่าง:</p>
                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <p>✓ วิเคราะห์สัญญาได้ หาช่องโหว่ได้ ร่างสัญญาให้ได้</p>
                      <p>✓ ตอบคำถามทางการแพทย์จาก guideline ได้</p>
                      <p>✓ เขียน ad copy, marketing content ไม่ถูกบล็อค</p>
                      <p>✓ วิเคราะห์คู่แข่ง, ข้อมูล sensitive ได้</p>
                      <p className="text-[#00ff88] font-semibold mt-2">→ คุณเป็นเจ้าของ AI คุณกำหนดกฎเอง ไม่มี OpenAI มาบอกว่าอะไรตอบได้หรือไม่ได้</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Data leak */}
            <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl shrink-0">📤</span>
                  <div>
                    <h4 className="text-base font-bold text-[#f0f4f8] mb-1">ทุกครั้งที่ถาม ChatGPT ข้อมูลบริษัทคุณถูกส่งไปต่างประเทศ</h4>
                    <p className="text-sm text-[#94a3b8]">คิดดูว่าคุณเอาอะไรไปใส่ใน ChatGPT บ้าง</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#f87171]/5 border border-[#f87171]/15 p-4">
                    <p className="text-xs font-bold text-[#f87171] mb-2">❌ ข้อมูลที่คนเอาไปใส่ ChatGPT:</p>
                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <p>• สัญญาลูกค้า ข้อมูลราคา เงื่อนไขพิเศษ</p>
                      <p>• ข้อมูลการเงิน ยอดขาย กำไร</p>
                      <p>• ข้อมูลพนักงาน เงินเดือน ผลประเมิน</p>
                      <p>• ข้อมูลผู้ป่วย ประวัติการรักษา (โรงพยาบาล)</p>
                      <p>• Source code, trade secret, สูตรลับ</p>
                      <p className="text-[#f87171] font-semibold mt-2">⚠️ เรื่องจริง: Samsung วิศวกรเอา source code ไปใส่ ChatGPT → หลุดไปอยู่ใน training data → Samsung แบนการใช้ ChatGPT ทั้งบริษัท</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 p-4">
                    <p className="text-xs font-bold text-[#00ff88] mb-2">✓ AI ส่วนตัว, ข้อมูลไม่ออกจากเครื่อง:</p>
                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <p>✓ ทุกอย่างประมวลผลในเครื่องที่อยู่ในออฟฟิศคุณ</p>
                      <p>✓ ไม่เชื่อมอินเทอร์เน็ต ไม่ส่ง packet ออก</p>
                      <p>✓ ไม่มี telemetry, ไม่มี logging ไปที่ไหน</p>
                      <p>✓ ไม่ถูกเอาไป train ให้คนอื่น</p>
                      <p className="text-[#00ff88] font-semibold mt-2">→ PDPA compliant by design ถ้า สคส. มาตรวจ อธิบายได้ทันที</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Cost */}
            <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl shrink-0">💸</span>
                  <div>
                    <h4 className="text-base font-bold text-[#f0f4f8] mb-1">฿700/เดือน ฟังดูถูก แต่ลองคิดดูดีๆ</h4>
                    <p className="text-sm text-[#94a3b8]">คิดเป็นทีม คิดเป็นปี แพงกว่าที่คิดมาก</p>
                  </div>
                </div>
                <div className="relative">
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-xs min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#1e293b]">
                        <th className="text-left py-2 px-3 text-[#64748b]">สถานการณ์</th>
                        <th className="text-center py-2 px-3 text-[#f87171]">ChatGPT Plus</th>
                        <th className="text-center py-2 px-3 text-[#00ff88]">AI ส่วนตัว</th>
                        <th className="text-center py-2 px-3 text-[#f0f4f8]">ประหยัด</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#0c1220]/50">
                        <td className="py-2 px-3 text-[#94a3b8]">1 คน / 2 ปี</td>
                        <td className="py-2 px-3 text-center text-[#f87171] font-mono">฿16,800</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-mono">฿59,900</td>
                        <td className="py-2 px-3 text-center text-[#f87171]">แพงกว่า ฿43K*</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-[#94a3b8]">3 คน / 2 ปี</td>
                        <td className="py-2 px-3 text-center text-[#f87171] font-mono">฿50,400</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-mono">฿59,900</td>
                        <td className="py-2 px-3 text-center text-[#f0f4f8]">ใกล้เคียง</td>
                      </tr>
                      <tr className="bg-[#0c1220]/50">
                        <td className="py-2 px-3 text-[#94a3b8] font-semibold">5 คน / 2 ปี</td>
                        <td className="py-2 px-3 text-center text-[#f87171] font-mono font-semibold">฿84,000</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-mono font-semibold">฿59,900</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-semibold">ประหยัด ฿24K</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-[#94a3b8] font-semibold">10 คน / 2 ปี</td>
                        <td className="py-2 px-3 text-center text-[#f87171] font-mono font-semibold">฿168,000</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-mono font-semibold">฿109,900</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-semibold">ประหยัด ฿58K</td>
                      </tr>
                      <tr className="bg-[#0c1220]/50">
                        <td className="py-2 px-3 text-[#94a3b8]">10 คน / 5 ปี</td>
                        <td className="py-2 px-3 text-center text-[#f87171] font-mono">฿420,000</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-mono">฿109,900</td>
                        <td className="py-2 px-3 text-center text-[#00ff88] font-bold">ประหยัด ฿310K!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#111827] to-transparent pointer-events-none sm:hidden" />
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#111827] to-transparent pointer-events-none sm:hidden" />
                </div>
                <p className="text-[10px] text-[#64748b] mt-3">
                  * ถ้าใช้คนเดียว บริการคลาวด์อาจมีต้นทุนเริ่มต้นต่ำกว่า, แต่ Local AI เก็บข้อมูลและการประมวลผลไว้ในองค์กร
                  <br />AI machine ติดตั้งในองค์กร และพนักงานใช้ Mimir Suites ตามสิทธิ์ใช้งาน
                </p>
              </div>
            </div>

            {/* 4. Rate limit */}
            <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl shrink-0">⏳</span>
                  <div>
                    <h4 className="text-base font-bold text-[#f0f4f8] mb-1">"You've reached your limit" ตอน 2 ทุ่ม วันส่งงาน</h4>
                    <p className="text-sm text-[#94a3b8]">จ่ายเงินแล้ว แต่ AI เลือกว่าจะให้ใช้เมื่อไหร่</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#f87171]/5 border border-[#f87171]/15 p-4">
                    <p className="text-xs font-bold text-[#f87171] mb-2">❌ สถานการณ์จริงที่เกิดประจำ:</p>
                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <p>• กำลังเขียน proposal ด่วน → โควต้าหมด ต้องรอ 3 ชม.</p>
                      <p>• ทีม 5 คนใช้ ChatGPT ตอนเช้า → คนที่ 3 โดน limit แล้ว</p>
                      <p>• ส่งไฟล์ใหญ่ให้ AI อ่าน → ถูกจำกัดขนาด</p>
                      <p>• ใช้ GPT-4o → ถูกสลับไป GPT-4o-mini (ฉลาดน้อยกว่า) ตอน peak</p>
                      <p>• ตอนเช้าเวลาไทย = peak hour สหรัฐ → ช้ามาก</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 p-4">
                    <p className="text-xs font-bold text-[#00ff88] mb-2">✓ AI ส่วนตัว, ไม่มีค่า token:</p>
                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <p>✓ ใช้งานตามกำลังของ AI machine โดยไม่มีค่า token</p>
                      <p>✓ ส่งไฟล์ใหญ่แค่ไหนก็ได้ (ตาม storage)</p>
                      <p>✓ ทรัพยากรอยู่ในองค์กร ไม่ต้องแย่งกับบริการสาธารณะ</p>
                      <p>✓ ไม่ถูกสลับ model, ได้ model ที่เลือกเสมอ</p>
                      <p className="text-[#00ff88] font-semibold mt-2">→ เหมือนจ้างพนักงานที่ทำงาน 24 ชม. ไม่ลาพัก ไม่ขึ้นเงินเดือน</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Stability + Offline */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-5">
                <span className="text-2xl block mb-3">🔄</span>
                <h4 className="text-sm font-bold text-[#f0f4f8] mb-2">Model เปลี่ยนทุกเดือน ไม่มีใครบอก</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-3">
                  OpenAI เปลี่ยน model เงียบๆ GPT-4 → GPT-4 Turbo → GPT-4o → GPT-4.1
                  prompt ที่เคยใช้ดีมาก วันดีคืนดีตอบแย่ลง ตอบสั้นลง ตอบผิด
                  คุณไม่รู้เลยว่าเปลี่ยนเมื่อไหร่ ไม่สามารถ pin version ได้
                </p>
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15">
                  <span className="text-[#00ff88] text-xs shrink-0">✓</span>
                  <span className="text-xs text-[#00ff88]">AI ส่วนตัว: Qwen 32B วันนี้ = Qwen 32B อีก 5 ปี prompt เดิมทำงานเหมือนเดิมตลอด update เมื่อคุณพร้อม</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-5">
                <span className="text-2xl block mb-3">📡</span>
                <h4 className="text-sm font-bold text-[#f0f4f8] mb-2">เน็ตล่ม / Server ล่ม = หยุดงาน</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-3">
                  OpenAI server ล่มเฉลี่ย 2-3 ครั้ง/เดือน แต่ละครั้ง 1-4 ชม.
                  เน็ตบริษัทมีปัญหา ก็ใช้ไม่ได้
                  ไปถ่ายนอกสถานที่ไม่มี WiFi ก็ใช้ไม่ได้
                  โรงงาน/คลังสินค้าที่เน็ตไม่ถึง ก็ใช้ไม่ได้
                </p>
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15">
                  <span className="text-[#00ff88] text-xs shrink-0">✓</span>
                  <span className="text-xs text-[#00ff88]">AI ส่วนตัว: ทำงาน 100% แม้ไม่มี internet เลย เพราะทุกอย่างอยู่ในเครื่องของคุณ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-block rounded-xl bg-[#111827] border border-[#1e293b] p-6 max-w-2xl">
              <p className="text-base text-[#f0f4f8] font-semibold mb-2">
                สรุป: ChatGPT ดีสำหรับใช้ส่วนตัว
              </p>
              <p className="text-sm text-[#94a3b8] mb-4">
                แต่ถ้าธุรกิจคุณมี ข้อมูลลูกค้า สัญญา ข้อมูลการเงิน หรือใช้ AI ทั้งทีม
                <br />
                AI ส่วนตัวปลอดภัยกว่า ถูกกว่าในระยะยาว และไม่มี restriction
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                ปรึกษาฟรี ว่าเหมาะกับธุรกิจคุณไหม
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
