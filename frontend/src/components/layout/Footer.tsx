import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
const menu = [{ label: "Home page", href: "#intro" }, { label: "Works", href: "#built" }, { label: "Experiments", href: "#experiments" }, { label: "About me", href: "#thinking" }, { label: "Experience", href: "#journey" }, { label: "Education", href: "#foundation" }, { label: "Stack", href: "#systems" }];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner"><div className="footer-identity"><span className="availability-dot" /><span>Ayush Negi<br /><small>SOFTWARE DEVELOPER ENGINEER</small></span></div><div className="footer-link-groups"><nav aria-label="Footer navigation"><span>Menu</span>{menu.map(link => <a href={link.href} key={link.label}>{link.label}<ArrowUpRight size={13} /></a>)}</nav><nav aria-label="Contact links"><span>Contact</span><a href={`mailto:${portfolioData.header.email}`}>Email<ArrowUpRight size={13} /></a><a href={portfolioData.header.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={13} /></a><a href={portfolioData.header.links.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={13} /></a><a href="/ayush-ai_cv.pdf" download="ayush-ai_cv.pdf">Resume<ArrowUpRight size={13} /></a></nav></div></div>
      <div className="footer-credit">NEW DELHI, INDIA · {new Date().getFullYear()} <span>Engineered by Ayush Negi</span></div>
      <div className="footer-wordmark" aria-hidden="true">ayush</div>
    </footer>
  );
}
