import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import WeatherScene from "../visual/WeatherScene";
import HeroPortrait from "../visual/HeroPortrait";

const roles = ["Software Engineer", "Backend & Systems Engineer", "AI & ML Enthusiast"];
const introductions = [
  { title: "Hi, I’m Ayush Negi", text: "I build secure, scalable systems and turn complex workflows into reliable software — from national-scale cybersecurity infrastructure at Zindagi Technologies." },
  { title: "I build secure, scalable systems", text: "Software Developer focused on building secure and scalable backend systems, with exposure to cybersecurity simulation and system-level design." },
  { title: "AI is my after-hours curiosity", text: "Outside work, I'm an AI enthusiast building AI systems as a personal passion." },
];

export default function Hero() {
  const [role, setRole] = useState(0);
  const [introduction, setIntroduction] = useState(0);
  const [holding, setHolding] = useState(false);
  const [hello, setHello] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => setRole(value => (value + 1) % roles.length), 4200);
    return () => clearInterval(interval);
  }, [reducedMotion]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const goToAbout = () => { document.getElementById("thinking")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" }); };
  const cancelHold = () => { clearTimeout(timer.current); setHolding(false); };
  const startHold = () => { setHolding(true); timer.current = setTimeout(() => { setHolding(false); goToAbout(); }, 650); };

  return (
    <section id="intro" className="hero-section">
      <WeatherScene />
      <div className="hero-inner">
        <div className="hero-role">
          <h1 className="sr-only">Ayush Negi</h1>
          <div className="role-stage" aria-label="Software engineer, backend and systems engineer, AI and ML enthusiast">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={role} initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>{roles[role]}</motion.p>
            </AnimatePresence>
          </div>
          <div className="hero-actions">
            <button className={`pill-button hold-button ${holding ? "is-holding" : ""}`} type="button" onPointerDown={startHold} onPointerUp={cancelHold} onPointerLeave={cancelHold} onPointerCancel={cancelHold} onClick={goToAbout}><span>{holding ? "Keep holding" : "About me"}</span></button>
            <a className="pill-button glow-button" href="#built" aria-label="VIEW MY WORK">See my work <ArrowUpRight size={16} /></a>
          </div>
          <a className="resume-link" href="/ayush-ai_cv.pdf" download="ayush-ai_cv.pdf" target="_blank" rel="noopener noreferrer"><Download size={13} /> DOWNLOAD RESUME</a>
        </div>
        <div className="avatar-stage">
          <button type="button" className={`avatar-button ${hello ? "is-waving" : ""}`} aria-label="Say hello to illustrated Ayush" onClick={() => setHello(value => !value)}>
            <HeroPortrait />
          </button>
          <span className={`avatar-hello ${hello ? "is-visible" : ""}`} role="status">Hey there. Nice to meet you! ↗</span>
        </div>
        <div className="hero-introductions">
          {introductions.map((item, index) => <div key={item.title} className={`intro-item ${introduction === index ? "is-open" : ""}`}>
            <button type="button" aria-expanded={introduction === index} aria-controls={`intro-panel-${index}`} onClick={() => setIntroduction(index)}>{item.title}</button>
            <AnimatePresence initial={false}>{introduction === index && <motion.div id={`intro-panel-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}><p>{item.text}</p></motion.div>}</AnimatePresence>
          </div>)}
          <div className="hero-location"><span className="availability-dot" />{portfolioData.header.location} · AVAILABLE</div>
        </div>
      </div>
      <a className="hero-scroll" href="#overview" aria-label="Scroll to introduction"><ArrowDown size={16} />Scroll to explore</a>
    </section>
  );
}
