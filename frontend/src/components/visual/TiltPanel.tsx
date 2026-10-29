import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

type TiltPanelProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export default function TiltPanel({
  children,
  className = "",
  max = 8,
}: TiltPanelProps) {
  const panel = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const element = panel.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.transform = `perspective(1100px) rotateY(${(x - 0.5) * max * 2}deg) rotateX(${(0.5 - y) * max * 2}deg)`;
    if (glow.current)
      glow.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(240,152,68,0.16), transparent 60%)`;
  };

  const reset = () => {
    if (panel.current)
      panel.current.style.transform =
        "perspective(1100px) rotateY(0deg) rotateX(0deg)";
    if (glow.current) glow.current.style.background = "transparent";
  };

  return (
    <div
      ref={panel}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
      }}
    >
      <div
        ref={glow}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
      />
      {children}
    </div>
  );
}
