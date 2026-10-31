import { useEffect, useState } from "react";
import { BriefcaseBusiness, FlaskConical, Home, Layers, Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const chapters = [
  { id: "intro", label: "HOME", title: "Home", icon: Home },
  { id: "built", label: "WORK", title: "Work", icon: BriefcaseBusiness },
  { id: "experiments", label: "EXPERIMENTS", title: "Experiments", icon: FlaskConical },
  { id: "thinking", label: "ABOUT", title: "About", icon: UserRound },
  { id: "systems", label: "STACK", title: "Stack", icon: Layers },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("intro");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = chapters.filter(chapter => {
          const section = document.getElementById(chapter.id);
          return section && section.getBoundingClientRect().top < innerHeight * 0.45;
        }).at(-1);
        setActive(current?.id ?? "intro");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { window.removeEventListener("scroll", update); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <header className="floating-header">
        <nav className="icon-dock glass" aria-label="Main navigation">
          {chapters.map(({ id, label, title, icon: Icon }) => (
            <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? "location" : undefined} className={`dock-item ${active === id ? "is-active" : ""}`}>
              <Icon size={17} strokeWidth={1.65} aria-hidden="true" />
              <span className="dock-tooltip">{title}</span>
            </a>
          ))}
        </nav>
        <button className="theme-toggle glass" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          {theme === "dark" ? <Sun size={18} strokeWidth={1.6} /> : <Moon size={18} strokeWidth={1.6} />}
        </button>
        <a className="contact-pill" href="#connect" aria-label="CONTACT ME"><span className="orbit-icon" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} />)}</span><span className="contact-pill-label">Contact me</span></a>
      </header>
      <nav className="chapter-rail" aria-label="Page sections">
        {chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`} aria-label={chapter.title} aria-current={active === chapter.id ? "location" : undefined}><span /><span className="rail-tooltip">{chapter.title}</span></a>)}
      </nav>
    </>
  );
}
