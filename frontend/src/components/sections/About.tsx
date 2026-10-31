import { ArrowUpRight } from "lucide-react";
import { principles } from "../../data/content";
import { portfolioData } from "../../data/portfolio";

export default function About() {
  return (
    <section id="thinking" className="about-section section-shell">
      <div className="section-heading"><h2>The engineer behind the systems.</h2><span>About me</span></div>
      <div className="about-intro"><div className="about-portrait"><img src="/images/ayush-avatar-mono.png" alt="Illustrated portrait of Ayush Negi" loading="lazy" width={1254} height={1254} /><span>AYUSH NEGI / NEW DELHI</span></div><div><h3>Secure systems.<br />A curious mind.</h3><p>Software Developer focused on building secure and scalable backend systems, with exposure to cybersecurity simulation and system-level design.</p><p>Outside work, I'm an AI enthusiast building AI systems as a personal passion.</p><nav className="social-links" aria-label="Social media"><a href={portfolioData.header.links.github} target="_blank" rel="noopener noreferrer">GITHUB<ArrowUpRight size={15} /></a><a href={portfolioData.header.links.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN<ArrowUpRight size={15} /></a></nav></div></div>
      <div className="principles-grid">{principles.map(principle => <article key={principle.num}><span>{principle.num}</span><h3>{principle.title}</h3><p>{principle.body}</p></article>)}</div>
    </section>
  );
}
