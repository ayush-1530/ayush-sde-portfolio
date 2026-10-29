import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const chapters = [
  {
    num: "01",
    label: "INTRO",
    id: "intro",
  },
  {
    num: "02",
    label: "JOURNEY",
    id: "journey",
  },
  {
    num: "03",
    label: "SYSTEMS",
    id: "systems",
  },
  {
    num: "04",
    label: "BUILT",
    id: "built",
  },
  {
    num: "05",
    label: "THINKING",
    id: "thinking",
  },
  {
    num: "06",
    label: "FOUNDATION",
    id: "foundation",
  },
  {
    num: "07",
    label: "RESEARCH",
    id: "research",
  },
  {
    num: "08",
    label: "CONNECT",
    id: "connect",
  },
];
function Navbar() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const [activeChapter, setActiveChapter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = chapters.findIndex((c) => c.id === e.target.id);
            if (idx >= 0) setActiveChapter(idx);
          }
        });
      },
      { threshold: 0.3 },
    );
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-4 bg-[#07070F]/[.85] backdrop-blur border-b border-[#1A1928]">
        <div>
          <div
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] tracking-widest text-[#EFECE3]"
          >
            AYUSH NEGI
          </div>
          <div
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-widest text-[#C2BDB2] mt-0.5"
          >
            SOFTWARE ENGINEER
          </div>
        </div>
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-7"
        >
          {[
            {
              label: "WORK",
              href: "#built",
            },
            {
              label: "EDUCATION",
              href: "#foundation",
            },
            {
              label: "EXPERIENCE",
              href: "#journey",
            },
            {
              label: "CONTACT",
              href: "#connect",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-widest text-[#C2BDB2] hover:text-[#F09844] transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#E8873A]"
            style={{ boxShadow: "0 0 5px rgba(232,135,58,0.8)" }}
          />
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-widest text-[#C2BDB2]"
          >
            AVAILABLE
          </span>
        </div>
        <button
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden text-[#C2BDB2] hover:text-[#EFECE3] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span
              className={`block h-px bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </header>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-[#07070F]/[.96] flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {[
            {
              label: "WORK",
              href: "#built",
            },
            {
              label: "EDUCATION",
              href: "#foundation",
            },
            {
              label: "EXPERIENCE",
              href: "#journey",
            },
            {
              label: "CONTACT",
              href: "#connect",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-sm tracking-widest text-[#EFECE3] no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      <div className="fixed right-5 top-0 bottom-0 z-40 hidden md:flex flex-col items-center">
        <div className="relative flex-1 w-px bg-[#1A1928] my-16">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[#E8873A] origin-top"
            style={{
              scaleY: progressScale,
              height: "100%",
            }}
          />
          {chapters.map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 -translate-x-[1.5px] rounded-full"
              style={{
                top: `${(i / (chapters.length - 1)) * 100}%`,
                background: i <= activeChapter ? "#E8873A" : "#1A1928",
                boxShadow: i <= activeChapter ? "0 0 4px #E8873A" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
