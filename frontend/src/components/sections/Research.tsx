import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="research-section section-shell">
      <div className="section-heading"><h2>Achievements &amp; research</h2><span>Beyond the day-to-day.</span></div>
      <div className="research-grid">
        <a className="research-card" href="https://lnkd.in/p/g-36dawV" target="_blank" rel="noopener noreferrer"><div className="research-card-top"><ShieldCheck size={24} strokeWidth={1.2} /><span>NATIONAL RECOGNITION / 2025</span><ArrowUpRight size={19} /></div><h3>NCX 2025</h3><span>National Cyber Exercise — India</span><p>Invited as developer representative of Zindagi Technologies at India's premier national-level cyber defense simulation — a recognition of engineering contribution to national cybersecurity infrastructure.</p><div className="project-tech">{["CYBERSECURITY", "NATIONAL SCALE", "DEFENCE SIM", "REPRESENTATIVE"].map(tag => <span key={tag}>{tag}</span>)}</div></a>
        <a className="research-card" href="https://ijirt.org/publishedpaper/IJIRT173688_PAPER.pdf" target="_blank" rel="noopener noreferrer"><div className="research-card-top"><FileText size={24} strokeWidth={1.2} /><span>ACADEMIC PUBLICATION / IJIRT</span><ArrowUpRight size={19} /></div><h3>Blockchain Technology</h3><span>Peer-reviewed Academic Publication</span><p>Published academic research on Blockchain Technology — exploring distributed ledger principles, consensus mechanisms, and their implications for secure data systems.</p><div className="publication-id">IJIRT173688 <span>READ THE PUBLICATION ↗</span></div></a>
      </div>
    </section>
  );
}
