import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GridCanvas from "./GridCanvas";
import { useStaticMotion, withMotionConfig } from "@/components/motion-config";

const benefits = ["ประมวลผลในเครื่อง", "เลือกเครื่องให้พอดีกับงาน", "ดูแลหลังส่งมอบ"];

function Hero() {
  const reducedMotion = useStaticMotion();
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => setMotionAllowed(!reducedMotion), [reducedMotion]);

  return (
    <section className="relative isolate overflow-hidden bg-[#060a14] px-6 text-[#f0f4f8]">
      {motionAllowed ? (
        <div aria-hidden="true">
          <GridCanvas />
        </div>
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_24%_52%,rgba(6,10,20,0.82),rgba(6,10,20,0.35)_55%,transparent_80%)]"
      />
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center pt-36 pb-20 lg:pt-44"
      >
        <div className="max-w-3xl">
          <h1 className="mb-5 text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.2] text-[#f0f4f8]">
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
              className="btn min-h-11 w-full rounded-lg bg-[#00e5ff] px-8 py-3.5 text-center text-base font-bold text-[#060a14] hover:opacity-90 sm:w-auto"
            >
              Request a Demo
            </a>
            <a
              href="#how-it-works"
              className="btn min-h-11 w-full rounded-lg border border-[#1e293b] bg-[#060a14]/40 px-8 py-3.5 text-center text-base font-semibold text-[#f0f4f8] hover:border-[#00e5ff] hover:text-[#00e5ff] sm:w-auto"
            >
              ดูว่า AI ส่วนตัวทำอะไรได้บ้าง
            </a>
          </div>
          <ul className="mt-9 grid gap-3 border-t border-[#1e293b] pt-3 sm:grid-cols-3">
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
      </motion.div>
    </section>
  );
}

export default withMotionConfig(Hero);
