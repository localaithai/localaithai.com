"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import GridCanvas from "./GridCanvas";

const benefits = [
  "ประมวลผลในเครื่อง",
  "เลือกเครื่องให้พอดีกับงาน",
  "ดูแลหลังส่งมอบ",
];

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => setMotionAllowed(!reducedMotion), [reducedMotion]);

  return (
    <section className="relative isolate overflow-hidden bg-[#060a14] px-6 text-[#f0f4f8]">
      {motionAllowed ? (
        <div aria-hidden="true">
          <GridCanvas />
        </div>
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 pt-28 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pt-32"
      >
        <div>
          <h1 className="mb-5 text-[clamp(2.2rem,4vw,4rem)] font-bold leading-[1.2] text-[#f0f4f8]">
            ติดตั้ง AI ส่วนตัว
            <br />
            สำหรับธุรกิจในประเทศไทย
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#c8d5e3] sm:text-xl">
            AI ส่วนตัวบนเครื่องในออฟฟิศ สำหรับงานเอกสารและข้อมูลของธุรกิจคุณ
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#94a3b8]">
            เราช่วยเลือกเครื่อง ติดตั้งระบบ และสอนทีมให้พร้อมใช้งาน
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="min-h-11 w-full rounded-lg bg-[#00e5ff] px-8 py-3.5 text-center text-base font-bold text-[#060a14] transition-opacity hover:opacity-90 sm:w-auto"
            >
              Request a Demo
            </a>
            <a
              href="#how-it-works"
              className="min-h-11 w-full rounded-lg border border-[#1e293b] px-8 py-3.5 text-center text-base font-semibold text-[#f0f4f8] transition-colors hover:border-[#00e5ff] hover:text-[#00e5ff] sm:w-auto"
            >
              ดูว่า AI ส่วนตัวทำอะไรได้บ้าง
            </a>
          </div>
          <ul className="mt-7 divide-y divide-[#1e293b] border-y border-[#1e293b]">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex min-h-11 items-center py-2.5 text-sm font-medium text-[#c8d5e3]"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <figure className="min-w-0">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[#1e293b] bg-[#111827]">
            <picture className="block h-full">
              <source
                media="(max-width: 767px)"
                srcSet={assetUrl("/photography/hero-mobile.webp")}
              />
              <Image
                src={assetUrl("/photography/hero.webp")}
                alt="เครื่อง AI บนโต๊ะทำงานในออฟฟิศ"
                width={1440}
                height={810}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover object-[70%_center]"
              />
            </picture>
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-[#94a3b8]">
            ภาพจำลองการใช้งาน · AI ในออฟฟิศของคุณ
          </figcaption>
        </figure>
      </motion.div>
    </section>
  );
}
