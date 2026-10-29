import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const orbEnter = (label: string) => () =>
  window.dispatchEvent(new CustomEvent("cursor:enter", { detail: label }));
const orbLeave = () => window.dispatchEvent(new CustomEvent("cursor:leave"));
const NCX_URL = "https://lnkd.in/p/g-36dawV";
const PAPER_URL = "https://ijirt.org/publishedpaper/IJIRT173688_PAPER.pdf";
function Research() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      id="research"
      className="bg-[#0D0D1C] py-32 px-8 md:px-14 border-t border-[#1A1928]"
    >
      <div className="max-w-[1100px] mx-auto">
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
              07
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              RESEARCH
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[clamp(34px,5vw,64px)] text-[#EFECE3] leading-tight mb-20"
          >
            Achievements &amp;
            <br />
            <em className="not-italic text-[#C2BDB2]">Research</em>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1A1928]">
          <motion.a
            href={NCX_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#1A1928] group hover:bg-[#0F0F22] transition-colors cursor-none"
            onMouseEnter={orbEnter("VIEW POST")}
            onMouseLeave={orbLeave}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-5 border border-[#E8873A]/50 flex items-center justify-center">
                <div
                  className="w-1.5 h-1.5 bg-[#E8873A]"
                  style={{ boxShadow: "0 0 4px #E8873A" }}
                />
              </div>
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[13px] tracking-widest text-[#E8873A]"
              >
                NATIONAL RECOGNITION
              </span>
            </div>
            <div
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-widest text-[#9A94A8] mb-3"
            >
              2025
            </div>
            <h3
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl md:text-3xl text-[#EFECE3] mb-2 leading-tight"
            >
              NCX 2025
            </h3>
            <div
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-[13px] text-[#C2BDB2] tracking-wider mb-6"
            >
              National Cyber Exercise — India
            </div>
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-[15px] text-[#C2BDB2] leading-relaxed mb-8"
            >
              Invited as developer representative of Zindagi Technologies at
              India's premier national-level cyber defense simulation — a
              recognition of engineering contribution to national cybersecurity
              infrastructure.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "CYBERSECURITY",
                "NATIONAL SCALE",
                "DEFENCE SIM",
                "REPRESENTATIVE",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[7px] tracking-widest text-[#9A94A8] border border-[#1A1928] px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
          <motion.a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.35,
            }}
            className="p-10 md:p-12 group hover:bg-[#0F0F22] transition-colors cursor-none"
            onMouseEnter={orbEnter("VIEW PAPER")}
            onMouseLeave={orbLeave}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-5 border border-[#E8873A]/50 flex items-center justify-center">
                <div
                  className="w-1.5 h-1.5 bg-[#E8873A]"
                  style={{ boxShadow: "0 0 4px #E8873A" }}
                />
              </div>
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[13px] tracking-widest text-[#E8873A]"
              >
                ACADEMIC PUBLICATION
              </span>
            </div>
            <div className="relative mb-6 border border-[#1A1928] bg-[#09091A] h-36 flex items-center justify-center overflow-hidden">
              <div className="text-center z-10">
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[13px] tracking-widest text-[#9A94A8] mb-2"
                >
                  IJIRT173688
                </div>
                <div
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-lg text-[#EFECE3]/10 italic"
                >
                  Blockchain Technology
                </div>
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[7px] tracking-widest text-[#9A94A8] mt-2"
                >
                  [ UPLOAD PAPER IMAGE ]
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#E8873A 0.5px, transparent 0.5px), linear-gradient(90deg, #E8873A 0.5px, transparent 0.5px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
            <div
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-widest text-[#9A94A8] mb-3"
            >
              IJIRT — INTERNATIONAL JOURNAL
            </div>
            <h3
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl md:text-3xl text-[#EFECE3] mb-2 leading-tight"
            >
              Blockchain Technology
            </h3>
            <div
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-[13px] text-[#C2BDB2] tracking-wider mb-6"
            >
              Peer-reviewed Academic Publication
            </div>
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-[15px] text-[#C2BDB2] leading-relaxed mb-8"
            >
              Published academic research on Blockchain Technology — exploring
              distributed ledger principles, consensus mechanisms, and their
              implications for secure data systems.
            </p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default Research;
