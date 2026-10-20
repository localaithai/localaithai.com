import type { CSSProperties } from "react";
import { assetUrl } from "@/lib/assets";

const machines = [
  { name: "MSI EdgeXpert", image: "/msi-edgexpert.png" },
  { name: "Acer Veriton GN100", image: "/acer-gn100.jpg" },
  { name: "ASUS Ascent GX10", image: "/asus-gx10.png" },
  { name: "Lenovo ThinkStation PGX", image: "/lenovo-pgx.png" },
] as const;

export default function MachineOptions() {
  return (
    <section className="mx-auto mb-10 max-w-6xl" aria-label="ตัวเลือกเครื่อง AI ตั้งโต๊ะ GB10">
      <p data-reveal className="reveal-on-scroll mx-auto mb-4 max-w-3xl text-center text-sm leading-relaxed text-[#94a3b8]">
        ตัวอย่างเครื่อง AI ตั้งโต๊ะ GB10 จริง 4 รุ่น โดยเลือกรุ่นสุดท้ายตาม workload ของคุณ
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {machines.map((machine, index) => (
          <figure
            key={machine.name}
            data-reveal
            style={{ "--i": index } as CSSProperties}
            className="reveal-on-scroll surface overflow-hidden rounded-2xl bg-[#060a14] p-3"
          >
            <div className="relative aspect-[4/3] w-full">
              <img
                src={assetUrl(machine.image)}
                alt={machine.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-contain text-transparent"
              />
            </div>
            <figcaption className="pt-2 text-center text-xs font-medium leading-5 text-[#f0f4f8] sm:text-sm">
              {machine.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
