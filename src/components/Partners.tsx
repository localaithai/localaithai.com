import Image from "next/image";

const partners = [
  { name: "Ingram Micro", logo: "/partners/ingram-micro.svg", className: "brightness-0 invert" },
  { name: "TD SYNNEX", logo: "/partners/td-synnex.svg", className: "brightness-0 invert" },
  { name: "SiS Distribution", logo: "/partners/sis.png", className: "brightness-0 invert" },
  { name: "Ascenti", logo: "/partners/ascenti.png", className: "" },
  { name: "Eaton", logo: "/partners/eaton.svg", className: "brightness-0 invert" },
  { name: "Schneider Electric", logo: "/partners/schneider-electric.svg", className: "brightness-0 invert" },
  { name: "VST ECS", logo: "/partners/vst-ecs.png", className: "brightness-0 invert" },
] as const;

export default function Partners() {
  return (
    <section aria-labelledby="partners-heading" className="relative border-y border-[#1e293b] bg-[#0c1220]/80 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,28rem)_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#00e5ff]">Delivery network</p>
            <h2 id="partners-heading" className="text-3xl font-bold text-[#f0f4f8] md:text-5xl">พาร์ทเนอร์ที่ช่วยให้ระบบพร้อมใช้จริง</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#94a3b8] lg:text-lg">ตั้งแต่เครื่อง AI, UPS, rack ไปจนถึงการรับประกัน เราประสานเครือข่ายพาร์ทเนอร์เพื่อส่งมอบอุปกรณ์แท้และออกแบบระบบให้เหมาะกับหน้างาน</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#1e293b] bg-[#111827] sm:grid-cols-3 lg:grid-cols-7">
          {partners.map((partner) => (
            <li key={partner.name} className="group flex min-h-28 items-center justify-center border-b border-r border-[#1e293b] px-5 py-6">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={180}
                height={64}
                className={`h-10 w-full object-contain opacity-70 transition duration-300 group-hover:opacity-100 sm:h-11 ${partner.className ?? ""}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
