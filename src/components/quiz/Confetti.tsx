import { useEffect, useRef } from 'react';

const COLORS = ['#0066FF', '#00875A', '#7C3AED', '#DC2626', '#B45309', '#BE185D'];

// Lightweight canvas confetti — 60 particles, ~2.5s, no library.
export default function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * 60,
      y: h * 0.3,
      vx: (Math.random() - 0.5) * 7,
      vy: -Math.random() * 7 - 3,
      size: Math.random() * 5 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
    }));

    let frame = 0;
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - frame / 150);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      frame++;
      if (frame < 150) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
