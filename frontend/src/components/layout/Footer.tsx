import { useEffect, useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";

const menu = [
  { label: "Home page", href: "#intro" },
  { label: "Works", href: "#built" },
  { label: "Experiments", href: "#experiments" },
  { label: "About me", href: "#thinking" },
  { label: "Experience", href: "#journey" },
  { label: "Education", href: "#foundation" },
  { label: "Stack", href: "#systems" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash !== "#footer") return;
    let cancelled = false;
    const scrollToFooter = () => {
      if (!cancelled) footer.current?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const frame = requestAnimationFrame(scrollToFooter);
    // Font loading can change the height of the sections above the footer.
    void document.fonts.ready.then(scrollToFooter);
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);

  return (
    <footer ref={footer} id="footer" className="site-footer">
      <div className="footer-inner">
        <div className="footer-contact-intro">
          <div className="footer-identity">
            <span className="availability-dot" />
            <span>Ayush Negi<br /><small>SOFTWARE DEVELOPER ENGINEER</small></span>
          </div>
        </div>
        <div className="footer-link-groups">
          <nav aria-label="Footer navigation">
            <span>Explore</span>
            {menu.map(link => (
              <a href={link.href} key={link.label}>
                {link.label}<ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <nav aria-label="Footer resources">
            <span>More</span>
            <a href="#connect">Contact<ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href="#research">Research<ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href="/ayush-ai_cv.pdf" download="ayush-ai_cv.pdf">
              Resume<Download size={13} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
      <div className="footer-credit">
        NEW DELHI, INDIA · {new Date().getFullYear()}
        <span>Engineered by Ayush Negi</span>
      </div>
      <div className="footer-wordmark" aria-hidden="true">ayush</div>
    </footer>
  );
}
