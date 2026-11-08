import type { MouseEvent } from "react";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import Experiments from "./Experiments";

function updateCursorPosition(event: MouseEvent<HTMLAnchorElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--research-pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--research-pointer-y", `${event.clientY - bounds.top}px`);
}

export default function Research() {
  return (
    <section id="research" className="research-section section-shell" aria-labelledby="research-title">
      <div className="section-heading"><h2 id="research-title">Researches</h2><span>Published ideas. Practical experiments.</span></div>
      <div className="research-grid">
        <a
          className="research-card research-paper"
          href="https://ijirt.org/publishedpaper/IJIRT173688_PAPER.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Review paper: A Review of the Non-Fungible Token (NFT) Generator (PDF, opens in a new tab)"
          onMouseMove={updateCursorPosition}
        >
          <div className="research-card-top"><FileText size={26} strokeWidth={1.2} aria-hidden="true" /><span>FEATURED PUBLICATION / IJIRT</span><ArrowUpRight size={20} aria-hidden="true" /></div>
          <h3>Blockchain<br />Technology</h3>
          <p className="research-paper-title">A Review of the Non-Fungible Token (NFT) Generator</p>
          <p>Co-authored research exploring NFT generation, blockchain integration and digital ownership, with a review of the challenges around accessibility, scalability and sustainability.</p>
          <div className="project-tech">{["BLOCKCHAIN", "NFTs", "DIGITAL OWNERSHIP"].map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="publication-meta"><span>March 2025 · Volume 11, Issue 10</span><span>IJIRT173688 · 9 pages</span></div>
          <div className="publication-action"><span>Review paper <ArrowUpRight size={17} aria-hidden="true" /></span><small>OPEN FULL PAPER · PDF</small></div>
          <div className="research-cursor" aria-hidden="true">Review<br />paper<ArrowUpRight size={20} /></div>
        </a>
        <a
          className="research-card"
          href="https://lnkd.in/p/g-36dawV"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View post: NCX 2025 (opens in a new tab)"
          onMouseMove={updateCursorPosition}
        >
          <div className="research-card-top"><ShieldCheck size={24} strokeWidth={1.2} aria-hidden="true" /><span>NATIONAL RECOGNITION / 2025</span><ArrowUpRight size={19} aria-hidden="true" /></div>
          <h3>NCX 2025</h3>
          <span>National Cyber Exercise — India</span>
          <p>Invited as developer representative of Zindagi Technologies at India's premier national-level cyber defense simulation — a recognition of engineering contribution to national cybersecurity infrastructure.</p>
          <div className="project-tech">{["CYBERSECURITY", "NATIONAL SCALE", "DEFENCE SIM", "REPRESENTATIVE"].map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="research-cursor" aria-hidden="true">View<br />post<ArrowUpRight size={20} /></div>
        </a>
      </div>
      <Experiments />
    </section>
  );
}
