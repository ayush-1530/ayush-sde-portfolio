import { useEffect, useRef } from "react";

export default function AmbientField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (typeof CanvasRenderingContext2D === "undefined") return;
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    let width = 0, height = 0, frame = 0, previous = 0;
    const pointer = { x: -1000, y: -1000 };
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const particles = Array.from({ length: 125 }, (_, i) => ({
      x: ((i * 73.37 + 11) % 100) / 100,
      y: ((i * 47.89 + 7) % 100) / 100,
      size: 0.8 + (i % 4) * 0.55,
      speed: 0.3 + (i % 5) * 0.12,
      streak: i % 3 === 0,
    }));
    const resize = () => {
      width = element.clientWidth;
      height = element.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      const delta = Math.min((time - previous) / 16.67 || 1, 2);
      previous = time;
      context.clearRect(0, 0, width, height);
      const light = document.documentElement.dataset.theme === "light";
      context.fillStyle = light ? "rgba(45,45,45,0.32)" : "rgba(225,225,225,0.3)";
      context.strokeStyle = light ? "rgba(45,45,45,0.2)" : "rgba(225,225,225,0.2)";
      for (const particle of particles) {
        if (!reducedMotion.matches && !document.hidden) particle.y = (particle.y + particle.speed * delta / Math.max(height, 1)) % 1;
        let x = particle.x * width, y = particle.y * height;
        const dx = x - pointer.x, dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (!reducedMotion.matches && distance < 100 && distance > 0) { x += dx / distance * 12; y += dy / distance * 12; }
        context.beginPath();
        if (particle.streak) { context.moveTo(x, y); context.lineTo(x - 2, y + 12); context.stroke(); }
        else { context.arc(x, y, particle.size, 0, Math.PI * 2); context.fill(); }
      }
      if (!document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    };
    const restart = () => { cancelAnimationFrame(frame); previous = 0; draw(performance.now()); };
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const onResize = () => { resize(); restart(); };
    resize(); restart();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", restart);
    reducedMotion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", restart);
      reducedMotion.removeEventListener("change", restart);
    };
  }, []);
  return <canvas ref={canvas} className="ambient-field" aria-hidden="true" />;
}
