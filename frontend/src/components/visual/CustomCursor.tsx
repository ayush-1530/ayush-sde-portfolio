import { useRef, useState, useEffect } from "react";

function CustomCursor() {
  const posRef = useRef({
    x: -200,
    y: -200,
  });
  const orbPos = useRef({
    x: -200,
    y: -200,
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("VIEW PROJECT");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const onMove = (e: MouseEvent) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    const onEnter = (e: Event) => {
      setLabel((e as CustomEvent<string>).detail || "VIEW PROJECT");
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("cursor:enter", onEnter);
    window.addEventListener("cursor:leave", onLeave);
    let raf = 0;
    let rx = 0,
      ry = 0;
    const loop = () => {
      const o = orbPos.current,
        p = posRef.current;
      const vx = (p.x - o.x) * 0.14,
        vy = (p.y - o.y) * 0.14;
      o.x += vx;
      o.y += vy;
      rx += (Math.max(-40, Math.min(40, -vy * 2.2)) - rx) * 0.15;
      ry += (Math.max(-40, Math.min(40, vx * 2.2)) - ry) * 0.15;
      if (wrapRef.current)
        wrapRef.current.style.transform = `translate3d(${o.x}px, ${o.y}px, 0)`;
      if (tiltRef.current)
        tiltRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (coreRef.current)
        coreRef.current.style.backgroundPosition = `${50 + ry}% ${50 + rx}%`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("cursor:enter", onEnter);
      window.removeEventListener("cursor:leave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden="true"
      data-custom-cursor
      ref={wrapRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2"
        style={{
          perspective: 500,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.2)",
          transition:
            "opacity 0.25s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div
          ref={tiltRef}
          className="relative w-[112px] h-[112px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,135,58,0.55), transparent 70%)",
              filter: "blur(14px)",
              transform: "translateZ(-30px) scale(1.2)",
            }}
          />
          <div
            ref={coreRef}
            className="absolute inset-0 rounded-full flex flex-col items-center justify-center text-[#07070F] text-center"
            style={{
              background:
                "radial-gradient(circle at 32% 26%, #FFD9A8 0%, #F09844 38%, #C4631A 76%, #7A3A0C 100%)",
              backgroundSize: "140% 140%",
              boxShadow:
                "0 18px 36px -8px rgba(232,135,58,0.75), inset 0 -10px 18px rgba(80,30,0,0.45), inset 0 6px 12px rgba(255,235,210,0.65)",
              transform: "translateZ(30px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                transform: "translateZ(20px)",
              }}
              className="text-[12px] font-bold tracking-widest leading-tight px-3"
            >
              {label}
            </span>
            <span className="text-xl leading-none mt-1">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCursor;
