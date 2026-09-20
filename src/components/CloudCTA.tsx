"use client";

import { assetUrl } from "@/lib/assets";
import { ArrowRight, Cloud, Laptop, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CloudCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="rounded-2xl p-[1px]"
          style={{
            background:
              "linear-gradient(135deg, #00e5ff40, #8b5cf620, #00ff8830)",
          }}
        >
          <div className="rounded-2xl bg-[#0c1220] p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src={assetUrl("/mimir-suite-logo.png")}
                alt=""
                width={72}
                height={48}
                className="h-12 w-auto object-contain"
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mt-3 mb-3">
                ไม่ต้องมี AI machine?
                <br />
                <span className="gradient-text-cyan">
                  ใช้ Mimir Suites Cloud
                </span>
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                Suite ติดตั้งบนเครื่องพนักงานแต่ละคน ใช้โมเดลจากผู้ให้บริการคลาวด์ โดยไม่ต้องซื้อ
                hardware
              </p>
              <a
                href="https://www.cloudaithai.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] text-[#060a14] font-bold text-sm"
              >
                ดู Mimir Suites Cloud <ArrowRight size={16} />
              </a>
            </div>
            <div className="space-y-3">
              {[
                { icon: Laptop, text: "หนึ่ง seat คือหนึ่งการติดตั้งบนเครื่องพนักงาน" },
                { icon: ShieldCheck, text: "ข้อมูลของแต่ละ seat แยกจากกัน" },
                {
                  icon: Cloud,
                  text: "ข้อความเอกสารถูกส่งไปยังผู้ให้บริการคลาวด์ โดยปกปิด PII เป็นค่าเริ่มต้น",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex gap-3 rounded-xl bg-[#111827] border border-[#1e293b] p-4"
                >
                  <item.icon size={18} className="text-[#00e5ff] shrink-0" />
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
