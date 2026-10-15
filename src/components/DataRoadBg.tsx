import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  lane: number;
  size: number;
  color: string;
  alpha: number;
  trail: number;
}

const COLORS = ["#00e5ff", "#00ff88", "#8b5cf6", "#ec4899", "#3b82f6"];

export default function DataRoadBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const LANE_COUNT = 12;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 768;
      const particleCount = isMobile ? 20 : 60;

      for (let i = 0; i < particleCount; i++) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const isHorizontal = lane < LANE_COUNT / 2;
        particles.push({
          x: isHorizontal ? Math.random() * w : ((lane - LANE_COUNT / 2) / (LANE_COUNT / 2)) * w,
          y: isHorizontal ? (lane / (LANE_COUNT / 2)) * h : Math.random() * h,
          speed: 0.3 + Math.random() * 1.2,
          lane,
          size: 1 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.15 + Math.random() * 0.25,
          trail: 30 + Math.random() * 80,
        });
      }
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Fade previous frame
      ctx.fillStyle = "rgba(6, 10, 20, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Draw road grid lines (very subtle)
      ctx.strokeStyle = "rgba(0, 229, 255, 0.015)";
      ctx.lineWidth = 1;
      for (let i = 0; i < LANE_COUNT / 2; i++) {
        const y = (i / (LANE_COUNT / 2)) * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let i = 0; i < LANE_COUNT / 2; i++) {
        const x = (i / (LANE_COUNT / 2)) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw particles with trails
      for (const p of particles) {
        const isHorizontal = p.lane < LANE_COUNT / 2;

        if (isHorizontal) {
          // Trail
          const grad = ctx.createLinearGradient(
            p.x - p.trail,
            p.y,
            p.x,
            p.y
          );
          grad.addColorStop(0, "transparent");
          grad.addColorStop(1, p.color);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.trail, p.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Head dot
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Glow
          ctx.globalAlpha = p.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 4
          );
          glow.addColorStop(0, p.color);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fill();

          // Move
          p.x += p.speed;
          if (p.x > w + p.trail) {
            p.x = -p.trail;
            p.y =
              (p.lane / (LANE_COUNT / 2)) * h + (Math.random() - 0.5) * 20;
          }
        } else {
          const laneIdx = p.lane - LANE_COUNT / 2;

          // Trail
          const grad = ctx.createLinearGradient(
            p.x,
            p.y - p.trail,
            p.x,
            p.y
          );
          grad.addColorStop(0, "transparent");
          grad.addColorStop(1, p.color);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.trail);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Head dot
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Glow
          ctx.globalAlpha = p.alpha * 0.3;
          const glow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 4
          );
          glow.addColorStop(0, p.color);
          glow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Move
          p.y += p.speed;
          if (p.y > h + p.trail) {
            p.y = -p.trail;
            p.x =
              (laneIdx / (LANE_COUNT / 2)) * w + (Math.random() - 0.5) * 20;
          }
        }
      }

      ctx.globalAlpha = 1;

      // Draw intersection nodes where lanes cross
      for (let i = 0; i < LANE_COUNT / 2; i++) {
        for (let j = 0; j < LANE_COUNT / 2; j++) {
          const x = (j / (LANE_COUNT / 2)) * w;
          const y = (i / (LANE_COUNT / 2)) * h;

          // Check if any particle is near
          let nearestDist = Infinity;
          let nearestColor = "#00e5ff";
          for (const p of particles) {
            const px = p.lane < LANE_COUNT / 2 ? p.x : p.x;
            const py = p.lane < LANE_COUNT / 2 ? p.y : p.y;
            const d = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
            if (d < nearestDist) {
              nearestDist = d;
              nearestColor = p.color;
            }
          }

          const proximity = Math.max(0, 1 - nearestDist / 150);
          if (proximity > 0) {
            ctx.globalAlpha = proximity * 0.15;
            ctx.beginPath();
            ctx.arc(x, y, 2 + proximity * 3, 0, Math.PI * 2);
            ctx.fillStyle = nearestColor;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    initParticles();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
