"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

/* ─── Nav structure: top-level links + dropdowns ─── */
interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
  desc?: string;
}

interface NavGroup {
  label: string;
  children: NavLink[];
}

type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const navItems: NavItem[] = [
  {
    label: "Solutions",
    children: [
      { href: "/packages", label: "Packages", desc: "เริ่มต้นจาก workload ของคุณ" },
    ],
  },
  {
    label: "Hardware",
    children: [
      { href: "/hardware", label: "Hardware", desc: "สเปค Benchmark ทุกเครื่อง" },
      { href: "/shop", label: "ร้านค้า", desc: "ซื้อ Hardware ราคาปลีก" },
      { href: "/tech-stack", label: "แอป Mimir", desc: "งานที่ทีมใช้ได้จริง" },
    ],
  },
  {
    label: "บริการ",
    children: [
      { href: "/services", label: "Services", desc: "ดูบริการทุกรูปแบบ" },
      { href: "https://www.cloudaithai.com", label: "Mimir Suites Cloud", desc: "cloudaithai.com" },
      { href: "/support", label: "Support", desc: "Maintenance & Support" },
      { href: "/how-it-works", label: "How it works", desc: "Local AI ทำงานอย่างไร" },
    ],
  },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

/* ─── Desktop Dropdown ─── */
function DesktopDropdown({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isChildActive = group.children.some((c) => pathname === c.href);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          isChildActive
            ? "text-[#00e5ff]"
            : "text-[#94a3b8] hover:text-[#00e5ff]"
        }`}
      >
        {group.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl overflow-hidden p-1"
            style={{
              background: "rgba(12,18,32,0.95)",
              backdropFilter: "blur(60px) saturate(180%)",
              WebkitBackdropFilter: "blur(60px) saturate(180%)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(30,41,59,0.8), 0 0 30px rgba(0,229,255,0.08), inset 0 0.5px 0 rgba(255,255,255,0.06)",
            }}
          >
            {group.children.map((child) => {
              const isActive = pathname === child.href;
              return (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#00e5ff]/8"
                      : "hover:bg-[#1e293b]/50"
                  }`}
                >
                  <span
                    className={`text-[13px] font-medium block ${
                      isActive
                        ? "text-[#00e5ff]"
                        : child.highlight
                          ? "text-[#ec4899]"
                          : "text-[#f0f4f8]"
                    }`}
                  >
                    {child.label}
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00e5ff] ml-2 align-middle" />
                    )}
                  </span>
                  {child.desc && (
                    <span className="text-[11px] text-[#64748b] block mt-0.5">
                      {child.desc}
                    </span>
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Accordion Group ─── */
function MobileGroup({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isChildActive = group.children.some((c) => pathname === c.href);

  return (
    <div className="border-b border-[#1e293b]/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-4 px-2 text-[15px] font-medium transition-colors ${
          isChildActive
            ? "text-[#00e5ff]"
            : "text-[#94a3b8] active:text-[#00e5ff]"
        }`}
      >
        <span>{group.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-3 pr-1 pb-3 space-y-0.5">
              {group.children.map((child) => {
                const isActive = pathname === child.href;
                return (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className={`block py-3 px-4 rounded-xl transition-colors min-h-[44px] ${
                      isActive
                        ? "text-[#00e5ff] bg-[#00e5ff]/5"
                        : child.highlight
                          ? "text-[#ec4899] active:bg-[#ec4899]/5"
                          : "text-[#94a3b8] active:text-[#f0f4f8] active:bg-[#1e293b]/30"
                    }`}
                  >
                    <span className="text-sm font-medium block">
                      {isActive && "→ "}
                      {child.label}
                    </span>
                    {child.desc && (
                      <span className="text-[11px] text-[#64748b] block mt-0.5">
                        {child.desc}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-[#f0f4f8] px-4 py-3 text-sm font-semibold text-[#060a14] shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-offset-2 focus:ring-offset-[#060a14]"
      >
        ข้ามไปเนื้อหา
      </a>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060a14]/90 backdrop-blur-xl border-b border-[#1e293b]"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/icon.svg"
            alt="LocalAI"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text-cyan">Local</span>
            <span className="text-[#f0f4f8]">AI</span>
            <span className="text-[#64748b] text-xs ml-1.5 font-normal hidden sm:inline">
              Thailand
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item, i) =>
            isGroup(item) ? (
              <DesktopDropdown
                key={item.label}
                group={item}
                pathname={pathname}
              />
            ) : (
              <a
                key={item.href + item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === item.href
                    ? "text-[#00e5ff]"
                    : item.highlight
                      ? "text-[#ec4899] hover:text-[#ec4899]/80"
                      : "text-[#94a3b8] hover:text-[#00e5ff]"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00e5ff] rounded-full" />
                )}
              </a>
            )
          )}
          <a
            href="/contact"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] hover:opacity-90 transition-opacity"
          >
            ขอใบเสนอราคา
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#94a3b8] p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden overscroll-contain"
          >
            <div
              className="border-b border-[#1e293b] px-6 pb-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
              style={{
                background: "rgba(12,18,32,0.97)",
                backdropFilter: "blur(60px) saturate(180%)",
                WebkitBackdropFilter: "blur(60px) saturate(180%)",
              }}
            >
              {navItems.map((item) =>
                isGroup(item) ? (
                  <MobileGroup
                    key={item.label}
                    group={item}
                    pathname={pathname}
                    onNavigate={() => setOpen(false)}
                  />
                ) : (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-4 px-2 min-h-[44px] text-[15px] font-medium transition-colors border-b border-[#1e293b]/50 ${
                      pathname === item.href
                        ? "text-[#00e5ff]"
                        : item.highlight
                          ? "text-[#ec4899]"
                          : "text-[#94a3b8] active:text-[#00e5ff]"
                    }`}
                  >
                    {pathname === item.href && "→ "}
                    {item.label}
                  </a>
                )
              )}
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="block mt-5 text-center text-[15px] font-semibold px-5 py-3.5 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] min-h-[44px] active:opacity-90"
              >
                ขอใบเสนอราคา
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>
    </>
  );
}
