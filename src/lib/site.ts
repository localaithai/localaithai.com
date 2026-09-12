export const SITE_URL = "https://www.localaithai.com";
export const SITE_NAME = "LocalAI Thailand";
export const SITE_TAGLINE = "ติดตั้ง AI ส่วนตัวสำหรับธุรกิจในประเทศไทย";
export const SITE_TITLE = "Local AI Thailand | AI ส่วนตัวสำหรับธุรกิจ";
export const SITE_DESCRIPTION =
  "LocalAI Thailand คือบริการติดตั้ง AI ส่วนตัวในองค์กร ข้อมูลไม่ออกจากองค์กร เลือกสเปกตาม workload และรองรับ PDPA.";
export const REVIEWED_DATE = "2026-09-13";

export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`;

export const isProductionDeployment = () =>
  process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

type PageData = {
  path: string;
  label: string;
  title: string;
  description: string;
  priority: number;
  serviceName?: string;
};

export const PAGES = {
  services: {
    path: "/services",
    label: "Services",
    title: "Services",
    description:
      "See Local AI services for installation, Mimir apps, training, and specific workflows.",
    priority: 0.7,
    serviceName: "บริการ Mimir สำหรับทีมในองค์กร",
  },
  packages: {
    path: "/packages",
    label: "Packages",
    title: "Packages",
    description:
      "Explore Local AI starting points before hardware, capacity, and cost are sized for work.",
    priority: 0.8,
    serviceName: "บริการกำหนดสเปก Local AI",
  },
  "tech-stack": {
    path: "/tech-stack",
    label: "แอป Mimir สำหรับ Local AI",
    title: "แอป Mimir สำหรับ Local AI",
    description:
      "Mimir Scan, Bridge, Echo, Ledger, Well, Chat และ Still สำหรับงานของทีมในองค์กร.",
    priority: 0.7,
    serviceName: "บริการ Local AI พร้อม Mimir Suites",
  },
  cloud: {
    path: "/cloud",
    label: "Mimir Suites Cloud",
    title: "Mimir Suites Cloud",
    description:
      "Mimir Suites Cloud ติดตั้งบนเครื่องพนักงานและใช้โมเดลจากผู้ให้บริการคลาวด์โดยไม่ต้องมี AI hardware.",
    priority: 0.7,
    serviceName: "บริการ Mimir Suites Cloud",
  },
  support: {
    path: "/support",
    label: "Support",
    title: "Support",
    description:
      "Review Local AI maintenance, repairs, support, training, and planned upgrades.",
    priority: 0.7,
    serviceName: "บริการดูแลระบบ AI ส่วนตัว",
  },
  "how-it-works": {
    path: "/how-it-works",
    label: "How it works",
    title: "How it works",
    description:
      "See how Local AI indexes documents, answers Thai questions, and cites source material.",
    priority: 0.7,
    serviceName: "บริการ Local AI สำหรับค้นเอกสาร",
  },
  shop: {
    path: "/shop",
    label: "ร้านค้า Hardware AI",
    title: "ร้านค้า Hardware AI",
    description:
      "ดู Hardware สำหรับ AI ส่วนตัว เช่น Mac Mini, Mac Studio, GPU, NAS และ UPS พร้อมการติดตั้ง.",
    priority: 0.7,
    serviceName: "บริการ Hardware สำหรับ AI ส่วนตัว",
  },
  privacy: {
    path: "/privacy",
    label: "นโยบายความเป็นส่วนตัว",
    title: "นโยบายความเป็นส่วนตัว",
    description: "การเก็บ ใช้ และคุ้มครองข้อมูลบนเว็บไซต์ LocalAI Thailand ตาม PDPA.",
    priority: 0.3,
  },
  hardware: {
    path: "/hardware",
    label: "Hardware",
    title: "Hardware",
    description:
      "Compare AI hardware from Mac Mini and DGX Spark to GPU servers, storage, and backup power.",
    priority: 0.8,
    serviceName: "บริการเลือก Hardware สำหรับ AI ส่วนตัว",
  },
  contact: {
    path: "/contact",
    label: "Contact",
    title: "Contact",
    description:
      "Request a Local AI demo for workload, sensitive data, hardware, and deployment needs.",
    priority: 0.7,
    serviceName: "บริการปรึกษา Local AI",
  },
} as const satisfies Record<string, PageData>;

export const SITELINK_PAGES = [
  "how-it-works",
  "packages",
  "hardware",
  "services",
  "support",
  "contact",
] as const;
export type SitelinkPage = (typeof SITELINK_PAGES)[number];

export const STATIC_ROUTES = [
  { path: "/", priority: 1 },
  ...Object.values(PAGES).map(({ path, priority }) => ({ path, priority })),
] as const;
