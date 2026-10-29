import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  {
    label: "EMAIL",
    value: "ayushnegiuk@gmail.com",
    href: "mailto:ayushnegiuk@gmail.com",
    copy: true,
  },
  {
    label: "GITHUB",
    value: "github.com/ayush-1530",
    href: "https://github.com/ayush-1530",
    copy: false,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/ayush-negi-15oct",
    href: "https://www.linkedin.com/in/ayush-negi-15oct/",
    copy: false,
  },
  {
    label: "PHONE",
    value: "+91 9899505862",
    href: "tel:+919899505862",
    copy: false,
  },
];
function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copyEmail = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText("ayushnegiuk@gmail.com");
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };
  return (
    <section
      id="connect"
      className="bg-[#07070F] py-32 px-8 md:px-14 min-h-screen flex flex-col justify-between"
    >
      <div className="w-full min-w-0 max-w-[1100px] mx-auto flex-1 flex flex-col justify-between">
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-14">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.35em] text-[#E8873A]"
            >
              08
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              CONNECT
            </span>
          </div>
        </motion.div>
        <div className="flex-1 flex flex-col justify-center py-12">
          <div
            className="absolute left-0 w-[500px] h-[400px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(42,30,90,0.35) 0%, transparent 70%)",
            }}
          />
          <motion.h2
            initial={{
              opacity: 0,
              y: 56,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[clamp(48px,9vw,128px)] text-[#EFECE3] leading-[0.88] mb-6 relative z-10"
          >
            Have a System
            <br />
            <em className="not-italic text-[#C2BDB2]">Worth Building?</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-xs text-[#C2BDB2] max-w-md mt-6 mb-16 leading-relaxed"
          >
            Open to backend engineering roles, distributed systems challenges,
            and collaborations in cybersecurity infrastructure.
          </motion.p>
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            <div className="space-y-0">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.55 + i * 0.08,
                  }}
                >
                  {link.copy ? (
                    <button
                      type="button"
                      aria-label="Copy email address"
                      onClick={copyEmail}
                      className="w-full flex items-center justify-between py-5 border-t border-[#1A1928] hover:border-[#E8873A] group transition-colors text-left"
                    >
                      <div className="min-w-0 flex-1 flex items-center gap-3 sm:gap-6">
                        <span
                          style={{ fontFamily: "var(--font-mono)" }}
                          className="text-[11px] sm:text-[13px] tracking-widest text-[#9A94A8] w-14 sm:w-20 shrink-0"
                        >
                          {link.label}
                        </span>
                        <span
                          style={{ fontFamily: "var(--font-sans)" }}
                          className="min-w-0 break-words text-xs sm:text-sm text-[#C2BDB2] group-hover:text-[#EFECE3] transition-colors"
                        >
                          {link.value}
                        </span>
                      </div>
                      <span
                        aria-live="polite"
                        style={{ fontFamily: "var(--font-mono)" }}
                        className="ml-3 shrink-0 text-[11px] sm:text-[13px] tracking-widest text-[#9A94A8] group-hover:text-[#E8873A] transition-colors"
                      >
                        {copied ? "COPIED ✓" : "COPY"}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : void 0}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : void 0
                      }
                      className="flex items-center justify-between py-5 border-t border-[#1A1928] hover:border-[#E8873A] group transition-colors no-underline"
                    >
                      <div className="min-w-0 flex-1 flex items-center gap-3 sm:gap-6">
                        <span
                          style={{ fontFamily: "var(--font-mono)" }}
                          className="text-[11px] sm:text-[13px] tracking-widest text-[#9A94A8] w-14 sm:w-20 shrink-0"
                        >
                          {link.label}
                        </span>
                        <span
                          style={{ fontFamily: "var(--font-sans)" }}
                          className="min-w-0 break-words text-xs sm:text-sm text-[#C2BDB2] group-hover:text-[#EFECE3] transition-colors"
                        >
                          {link.value}
                        </span>
                      </div>
                      <span className="text-[#9A94A8] group-hover:text-[#E8873A] transition-colors">
                        ↗
                      </span>
                    </a>
                  )}
                </motion.div>
              ))}
              {copyError && (
                <p role="status" className="text-sm text-[#F09844] py-3">
                  Couldn’t copy automatically.{" "}
                  <a className="underline" href="mailto:ayushnegiuk@gmail.com">
                    Email ayushnegiuk@gmail.com
                  </a>{" "}
                  or select the address above.
                </p>
              )}
            </div>
            <aside className="hidden lg:block relative">
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-[#E8873A]/60" />
              <img
                src="/images/ayush-casual.jpeg"
                loading="lazy"
                width={600}
                height={750}
                alt="Ayush Negi"
                className="relative w-full aspect-[4/5] object-cover object-top"
              />
            </aside>
          </div>
          <motion.a
            href="mailto:ayushnegiuk@gmail.com"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            style={{ fontFamily: "var(--font-mono)" }}
            className="inline-block self-start mt-12 text-[13px] font-semibold tracking-widest bg-[#E8873A] hover:bg-[#F09844] text-[#07070F] px-10 py-5 transition-colors no-underline"
          >
            SEND MESSAGE →
          </motion.a>
        </div>
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: 1.1,
          }}
          className="border-t border-[#1A1928] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        >
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-widest text-[#9A94A8]"
          >
            AYUSH NEGI — SOFTWARE DEVELOPER ENGINEER
          </span>
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-widest text-[#9A94A8]"
          >
            {`NEW DELHI, INDIA · ${new Date().getFullYear()}`}
          </span>
        </motion.footer>
      </div>
    </section>
  );
}

export default Contact;
