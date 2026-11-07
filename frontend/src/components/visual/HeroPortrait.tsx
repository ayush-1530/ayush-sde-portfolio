import { useEffect, useId, useRef } from "react";

const portraitSource = "/images/ayush-avatar-mono.png";
// Follow the existing jaw, leaving the neck and striped shirt on the stationary layer.
const headOutline = "M300 0H960V645H835C823 684 805 709 778 734C730 776 679 796 627 794C569 793 514 768 468 726C440 701 423 675 415 645H300Z";

export default function HeroPortrait() {
  const portrait = useRef<HTMLSpanElement>(null);
  const id = useId();
  const ref = (name: string) => `${id}-${name}`;
  const url = (name: string) => `url(#${ref(name)})`;

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
      element.style.setProperty("--head-yaw", "0deg");
      element.style.setProperty("--head-pitch", "0deg");
      element.style.setProperty("--head-roll", "0deg");
      element.style.setProperty("--portrait-light-x", "38%");
    };
    const move = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === "touch") { reset(); return; }
      const hero = section.getBoundingClientRect();
      if (event.clientX < hero.left || event.clientX > hero.right || event.clientY < Math.max(hero.top, 0) || event.clientY > Math.min(hero.bottom, window.innerHeight)) { reset(); return; }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width * 618 / 1254);
        const dy = event.clientY - (bounds.top + bounds.height * 462 / 1254);
        const distance = Math.hypot(dx, dy, 160);
        // Offsets use the portrait's original coordinates: under 2px on screen.
        element.style.setProperty("--gaze-x", `${dx / distance * 5.8}px`);
        element.style.setProperty("--gaze-y", `${dy / distance * 3.8}px`);
        element.style.setProperty("--head-yaw", `${dx / distance * 9}deg`);
        element.style.setProperty("--head-pitch", `${-dy / distance * 6}deg`);
        element.style.setProperty("--head-roll", `${dx / distance * 1.8}deg`);
        element.style.setProperty("--portrait-light-x", `${38 - dx / distance * 12}%`);
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

  return <span ref={portrait} className="hero-portrait" role="img" aria-label="Monochrome cartoon portrait of Ayush Negi, with swept-up hair and a striped shirt">
    <svg className="portrait-body" viewBox="0 0 1254 1254" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <mask id={ref("body")} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}><rect width="1254" height="1254" fill="white" /><path d={headOutline} fill="black" /></mask>
        <mask id={ref("silhouette")} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "alpha" }}><image href={portraitSource} width="1254" height="1254" /></mask>
        <radialGradient id={ref("shirt-volume")} cx="42%" cy="65%" r="58%"><stop offset="0" stopColor="white" stopOpacity=".04" /><stop offset=".6" stopColor="#171c26" stopOpacity=".06" /><stop offset="1" stopColor="#10131c" stopOpacity=".38" /></radialGradient>
        <radialGradient id={ref("neck-shadow")} cx="50%" cy="0%" r="75%"><stop stopColor="#292929" stopOpacity=".16" /><stop offset="1" stopColor="#292929" stopOpacity="0" /></radialGradient>
      </defs>
      <g mask={url("body")}>
        <image href={portraitSource} width="1254" height="1254" />
        <rect width="1254" height="1254" fill={url("shirt-volume")} mask={url("silhouette")} />
      </g>
      <path d="M484 686H784L792 824Q637 891 479 824Z" fill="#f8f8f8" />
      <ellipse cx="637" cy="794" rx="151" ry="79" fill={url("neck-shadow")} />
    </svg>
    <span className="portrait-head">
      <svg viewBox="0 0 1254 1254" fill="none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={ref("head")}><path d={headOutline} /></clipPath>
          <clipPath id={ref("eye-left")}><path d="M478 472 Q517 432 562 472 Q523 493 478 472Z" /></clipPath>
          <clipPath id={ref("eye-right")}><path d="M669 468 Q710 432 756 467 Q715 489 669 468Z" /></clipPath>
          <radialGradient id={ref("face-volume")} cx="50%" cy="47%" r="60%"><stop offset=".15" stopColor="white" stopOpacity=".14" /><stop offset=".65" stopColor="white" stopOpacity=".06" /><stop offset=".88" stopColor="#292929" stopOpacity=".02" /><stop offset="1" stopColor="#292929" stopOpacity=".06" /></radialGradient>
          <radialGradient id={ref("cheek-light")}><stop stopColor="white" stopOpacity=".6" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
          <radialGradient id={ref("face-shadow")}><stop stopColor="#292929" stopOpacity=".025" /><stop offset="1" stopColor="#292929" stopOpacity="0" /></radialGradient>
        </defs>
        <g clipPath={url("head")}>
          <image href={portraitSource} width="1254" height="1254" />
          <g className="portrait-eyes">
            <g clipPath={url("eye-left")}>
              <path d="M478 472 Q517 432 562 472 Q523 493 478 472Z" fill="#fff" />
              <g className="portrait-pupil"><circle cx="526" cy="463" r="20" fill="#101010" /><circle cx="526" cy="458" r="4.5" fill="#fff" /></g>
            </g>
            <g clipPath={url("eye-right")}>
              <path d="M669 468 Q710 432 756 467 Q715 489 669 468Z" fill="#fff" />
              <g className="portrait-pupil"><circle cx="711" cy="459" r="20" fill="#101010" /><circle cx="710" cy="454" r="4.5" fill="#fff" /></g>
            </g>
          </g>
          <g mask={url("silhouette")}>
            <rect width="1254" height="850" fill={url("face-volume")} />
            <ellipse cx="472" cy="570" rx="95" ry="182" fill={url("face-shadow")} />
            <ellipse cx="790" cy="575" rx="95" ry="185" fill={url("face-shadow")} />
            <ellipse cx="551" cy="548" rx="94" ry="90" fill={url("cheek-light")} />
            <ellipse cx="640" cy="736" rx="135" ry="60" fill={url("face-shadow")} />
          </g>
        </g>
      </svg>
      <span className="portrait-light" aria-hidden="true" />
    </span>
  </span>;
}
