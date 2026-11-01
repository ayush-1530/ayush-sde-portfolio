import { useEffect, useRef } from "react";

export default function HeroPortrait() {
  const portrait = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = portrait.current;
    const section = element?.closest("section");
    if (!element || !section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--gaze-x", "0px");
      element.style.setProperty("--gaze-y", "0px");
    };
    const move = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === "touch") { reset(); return; }
      const hero = section.getBoundingClientRect();
      if (event.clientY < Math.max(hero.top, 0) || event.clientY > Math.min(hero.bottom, window.innerHeight)) { reset(); return; }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width * 618 / 1254);
        const dy = event.clientY - (bounds.top + bounds.height * 462 / 1254);
        const distance = Math.hypot(dx, dy, 160);
        // Offsets use the portrait's original coordinates: under 2px on screen.
        element.style.setProperty("--gaze-x", `${dx / distance * 5.8}px`);
        element.style.setProperty("--gaze-y", `${dy / distance * 3.8}px`);
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);
    preference.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", reset);
    };
  }, []);

  return <span ref={portrait} className="hero-portrait">
    <img src="/images/ayush-avatar-mono.png" alt="Monochrome cartoon portrait of Ayush Negi, with swept-up hair and a striped shirt" width={1254} height={1254} draggable={false} />
    <svg className="portrait-eyes" viewBox="0 0 1254 1254" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="hero-eye-left"><path d="M478 472 Q517 432 562 472 Q523 493 478 472Z" /></clipPath>
        <clipPath id="hero-eye-right"><path d="M669 468 Q710 432 756 467 Q715 489 669 468Z" /></clipPath>
      </defs>
      <g clipPath="url(#hero-eye-left)">
        <path d="M478 472 Q517 432 562 472 Q523 493 478 472Z" fill="#fff" />
        <g className="portrait-pupil"><circle cx="526" cy="463" r="20" fill="#101010" /><circle cx="526" cy="458" r="4.5" fill="#fff" /></g>
      </g>
      <g clipPath="url(#hero-eye-right)">
        <path d="M669 468 Q710 432 756 467 Q715 489 669 468Z" fill="#fff" />
        <g className="portrait-pupil"><circle cx="711" cy="459" r="20" fill="#101010" /><circle cx="710" cy="454" r="4.5" fill="#fff" /></g>
      </g>
    </svg>
  </span>;
}
