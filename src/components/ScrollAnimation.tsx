"use client";

import { desktopFrameUrls, mobileFrameUrls } from "@/lib/assets";
import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 180;

const phases = [
  {
    range: [0, 0.22],
    label: "STEP 1",
    title: "รวบรวมเอกสารทั้งหมด",
    subtitle: "PDF, Word, Excel, อีเมล, นำเข้าระบบ AI ได้หมด",
  },
  {
    range: [0.25, 0.47],
    label: "STEP 2",
    title: "ตัดแบ่ง & แปลงเป็นภาษา AI",
    subtitle: "ระบบตัดเอกสารเป็นชิ้นเล็กๆ แล้วแปลงให้ AI เข้าใจได้",
  },
  {
    range: [0.5, 0.72],
    label: "STEP 3",
    title: "ถามคำถาม → ค้นหาเอกสาร",
    subtitle: "พิมพ์คำถามภาษาไทย ระบบหาเอกสารที่เกี่ยวข้องทันที",
  },
  {
    range: [0.75, 1],
    label: "STEP 4",
    title: "AI อ่านเอกสาร → ตอบคำถาม",
    subtitle: "ได้คำตอบเป็นภาษาไทย พร้อมอ้างอิงเอกสารต้นทาง",
  },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const FRAME_WIDTH = isMobile ? 780 : 1920;
  const FRAME_HEIGHT = isMobile ? 1400 : 1080;
  const frameUrls = isMobile ? mobileFrameUrls : desktopFrameUrls;

  // Preload all frames
  useEffect(() => {
    if (reducedMotion) return;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    loadedRef.current = new Array(TOTAL_FRAMES).fill(false);
    setLoaded(false);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrls[i];
      img.onload = () => {
        loadedCount++;
        loadedRef.current[i] = true;
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [frameUrls, reducedMotion]);

  // Scroll tracking
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(scrolled / sectionHeight, 1));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  // Draw current frame to canvas
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    const img = imagesRef.current[frameIndex];
    if (img && loadedRef.current[frameIndex]) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [progress]);

  useEffect(() => {
    if (reducedMotion) return;
    const raf = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(raf);
  }, [drawFrame, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="bg-[#030810] py-20" aria-labelledby="how-it-works-motion-title">
        <div className="mx-auto max-w-4xl px-6">
          <h2 id="how-it-works-motion-title" className="text-center text-2xl font-bold text-[#f0f4f8] sm:text-3xl">
            ดูวิธีทำงานของ AI ส่วนตัว
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[#94a3b8]">
            ตั้งแต่นำเอกสารเข้าระบบ จนถึงได้คำตอบที่อ้างอิงข้อมูลของคุณ
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {phases.map((phase) => (
              <li key={phase.label} className="rounded-xl border border-[#1e293b] bg-[#0c1220] p-5">
                <p className="text-xs font-semibold tracking-wider text-[#00e5ff]">{phase.label}</p>
                <h3 className="mt-2 text-lg font-bold text-[#f0f4f8]">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">{phase.subtitle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: isMobile ? "250vh" : "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#030810]">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1e293b] z-20">
          <div
            className="h-full bg-gradient-to-r from-[#00e5ff] to-[#00ff88]"
            style={{ width: `${progress * 100}%`, transition: "none" }}
          />
        </div>

        {/* Canvas - fits viewport, no crop */}
        <canvas
          ref={canvasRef}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          style={{
            width: `min(100vw, ${100 * (FRAME_WIDTH / FRAME_HEIGHT)}vh)`,
            height: `min(100vh, ${100 * (FRAME_HEIGHT / FRAME_WIDTH)}vw)`,
          }}
        />

        {/* Loading indicator */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#060a14] z-30">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#94a3b8]">กำลังโหลด...</p>
            </div>
          </div>
        )}

        {/* Intro overlay, shows before scrolling */}
        {progress < 0.05 && loaded && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: 1 - progress * 20 }}
          >
            {/* Animated ring */}
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff]/30 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-[#00e5ff]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f0f4f8] mb-3">
              ดูวิธีทำงานของ AI ส่วนตัว
            </h2>
            <p className="text-sm text-[#94a3b8] mb-8 max-w-md">
              เลื่อนลงเพื่อดูแต่ละขั้นตอน ตั้งแต่รวบรวมเอกสาร จนถึง AI ตอบคำถาม
            </p>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-[#00e5ff]/40 flex justify-center pt-2">
                <div className="w-1.5 h-3 rounded-full bg-[#00e5ff] animate-pulse" />
              </div>
              <span className="text-xs text-[#00e5ff] font-medium tracking-wider">SCROLL</span>
            </div>
          </div>
        )}

        {/* Small scroll hint (shows when partially scrolled) */}
        {progress >= 0.05 && progress < 0.1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
            <span className="text-xs text-[#64748b]">เลื่อนต่อ...</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[#64748b]"
            >
              <path
                d="M10 4v12m0 0l-4-4m4 4l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
