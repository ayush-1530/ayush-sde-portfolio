import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education, certifications } from "../../data/content";

export default function Education() {
  return (
    <section id="foundation" className="education-section section-shell">
      <div className="section-heading"><h2>Education &amp; credentials</h2><span>The foundation.</span></div>
      <div className="education-grid"><div><h3 className="list-title">Academic background</h3>{education.map(item => <article className="education-entry" key={item.institution}><GraduationCap size={22} strokeWidth={1.3} /><div><span className="small-label">{item.type}</span><h3>{item.institution}</h3><p>{item.period} <span>·</span> {item.detail}</p><p className="muted">{item.note}</p></div></article>)}</div><div><h3 className="list-title">Certifications</h3><div className="certification-list">{certifications.map(certificate => <a key={certificate.title} href={certificate.link} target="_blank" rel="noopener noreferrer" className="certification-card"><span className="cert-badge">{certificate.badge}</span><div><span className="small-label">{certificate.domain}</span><h4>{certificate.title}</h4><p>{certificate.issuer}</p><small>{certificate.issued === "AI Agents" ? "AI AGENTS" : `ISSUED ${certificate.issued}`}</small><span className="credential-label">VIEW CREDENTIAL ↗</span></div><ArrowUpRight size={16} /></a>)}</div></div></div>
    </section>
  );
}
