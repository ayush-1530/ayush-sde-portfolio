import { ArrowUpRight, AudioLines, Braces, Code2, Download, Globe2, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { experiences } from "../../data/content";

export default function Overview() {
  return (
    <section id="overview" className="overview-section section-shell">
      <div className="employers">
        <p>Engineering experience at</p>
        <div className="employer-logos">
          {experiences.map(experience => (
            <div className="employer-brand" key={experience.company}>
              <span className="organisation-logo"><img src={experience.logo} alt="" width="40" height="40" /></span>
              <div><strong>{experience.company}</strong>{experience.affiliation && <small>{experience.affiliation}</small>}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="statement">I build secure, scalable systems and turn complex workflows into <span>reliable software.</span></p>
      <div className="overview-bento">
        <div className="bento-tile experience-tile"><span className="tile-kicker">THE ENGINEERING JOURNEY</span><strong>1.6<span>+</span></strong><span>YEARS EXPERIENCE</span><p>DRDO · NIC · Zindagi Technologies</p><a href="#journey" className="tile-link">Explore the journey <ArrowUpRight size={16} /></a></div>
        <div className="bento-tile code-tile"><div className="tile-topline"><span><Braces size={16} /> WHAT I BUILD</span><Code2 size={17} /></div><div className="code-lines"><span>class <b>SoftwareEngineer</b>:</span><span>  focus = <i>"secure systems"</i></span><span>  curiosity = <i>"AI + ML"</i></span><span>  location = <i>"New Delhi"</i></span></div><span className="tile-fineprint">SYSTEMS OVER FEATURES.</span></div>
        <a href="#systems" className="bento-tile ai-tile"><Sparkles size={25} strokeWidth={1.2} /><strong>AI + ML</strong><span>LLMs · RAG · VISION</span><p>Multi-agent systems, CNNs, PyTorch</p><ArrowUpRight className="tile-corner" size={19} /></a>
        <a href="/ayush-ai_cv.pdf" download="ayush-ai_cv.pdf" target="_blank" rel="noopener noreferrer" className="bento-tile resume-tile"><span className="resume-sheet"><span>AYUSH NEGI</span><i /><i /><i /><i /><i /><i /></span><span>THE DETAILS, ON PAPER.</span><span className="inline-link">Download resume <Download size={15} /></span></a>
        <div className="bento-tile location-tile"><span className="tile-kicker">BASED IN</span><div className="location-orbit"><Globe2 size={100} strokeWidth={0.5} /><span className="availability-dot" /></div><strong>{portfolioData.header.location}</strong><span className="location-subtitle">BUILDING FOR NATIONAL SCALE.</span></div>
        <a href="#foundation" className="bento-tile education-tile"><AudioLines size={26} strokeWidth={1} /><strong>B.Tech</strong><span>COMPUTER SCIENCE</span><p>First Division · 2021 – 2025</p><ArrowUpRight className="tile-corner" size={19} /></a>
        <a href="#journey" className="bento-tile backend-tile"><span className="tile-kicker">BACKEND · SYSTEMS ENGINEER</span><div className="mini-flow"><span>API</span><i /><span>EVENTS</span><i /><span>DATA</span></div><p>National Cyber Range Platform, Govt. of India</p><span className="inline-link">Zindagi Technologies <ArrowUpRight size={14} /></span></a>
      </div>
    </section>
  );
}
