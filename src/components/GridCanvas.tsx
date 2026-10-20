import { useEffect, useRef } from "react";

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const SPACING = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes.length = 0;
      for (let x = 0; x < canvas.width; x += SPACING) {
        for (let y = 0; y < canvas.height; y += SPACING) {
          nodes.push({ x, y, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const alpha = dist < maxDist ? 0.08 + (1 - dist / maxDist) * 0.25 : 0.04;
        const size = dist < maxDist ? 1.5 + (1 - dist / maxDist) * 2 : 1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw connections near mouse
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const dxm = mouse.x - a.x;
        const dym = mouse.y - a.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm > 200) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < SPACING * 1.5) {
            const alpha = (1 - dm / 200) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
