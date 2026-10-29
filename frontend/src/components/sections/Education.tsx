import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
  {
    institution: "B.Tech Computer Science Engineering",
    type: "INDERPRASTHA ENGINEERING COLLEGE · AKTU",
    period: "2021 – 2025",
    detail: "First Division",
    note: "Foundation in algorithms, distributed systems, and software engineering principles",
  },
  {
    institution: "Hansraj Smarak Senior Secondary",
    type: "SECONDARY EDUCATION",
    period: "July 2021",
    detail: "Science Stream",
    note: "Mathematics, Physics, Computer Science",
  },
];
const certifications = [
  {
    title: "Intelligent by Design: Build an AI Agent",
    issuer: "IBM SkillsBuild",
    issued: "AI Agents",
    badge: "IBM",
    link: "https://www.linkedin.com/in/ayush-negi-15oct/",
    domain: "ARTIFICIAL INTELLIGENCE",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    issued: "June 2024",
    badge: "CISCO",
    link: "https://www.credly.com/badges/12e265d0-28fb-4e44-a70e-4a7bbda97a33/public_url",
    domain: "SECURITY",
  },
  {
    title: "Data Science Master Course",
    issuer: "Coding Blocks",
    issued: "November 2023",
    badge: "CB",
    link: "https://online.codingblocks.com/app/certificates/CBOL-290945-f90eca52",
    domain: "DATA SCIENCE",
  },
];
function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section id="foundation" className="bg-[#07070F] py-32 px-8 md:px-14">
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
              06
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              FOUNDATION
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[clamp(34px,5vw,64px)] text-[#EFECE3] leading-tight mb-20"
          >
            Education &amp;
            <br />
            <em className="not-italic text-[#C2BDB2]">Credentials</em>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-widest text-[#9A94A8] mb-7"
            >
              ACADEMIC BACKGROUND
            </div>
            {education.map((e, i) => (
              <motion.div
                key={i}
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
                  duration: 0.7,
                  delay: i * 0.15,
                }}
                className="border-t border-[#1A1928] py-8 group"
              >
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[13px] tracking-widest text-[#E8873A] mb-2"
                >
                  {e.type}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-3xl text-[#EFECE3] mb-2"
                >
                  {e.institution}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-[13px] text-[#F09844] font-medium"
                  >
                    {e.period}
                  </span>
                  <span className="text-[#9A94A8]">·</span>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-[12px] text-[#C2BDB2]"
                  >
                    {e.detail}
                  </span>
                </div>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-[13px] text-[#9A94A8] group-hover:text-[#C2BDB2] transition-colors"
                >
                  {e.note}
                </p>
              </motion.div>
            ))}
          </div>
          <div>
            <div
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-widest text-[#9A94A8] mb-7"
            >
              CERTIFICATIONS
            </div>
            <div className="space-y-4">
              {certifications.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    x: 16,
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
                    duration: 0.7,
                    delay: 0.2 + i * 0.12,
                  }}
                  className="block border border-[#1A1928] hover:border-[#E8873A] p-6 group transition-colors no-underline"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        style={{ fontFamily: "var(--font-mono)" }}
                        className="text-[13px] tracking-widest text-[#E8873A] mb-2"
                      >
                        {c.domain}
                      </div>
                      <h4
                        style={{ fontFamily: "var(--font-serif)" }}
                        className="text-2xl text-[#EFECE3] mb-1"
                      >
                        {c.title}
                      </h4>
                      <div
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="text-[13px] text-[#C2BDB2]"
                      >
                        {c.issuer}
                      </div>
                      <div
                        style={{ fontFamily: "var(--font-mono)" }}
                        className="text-[12px] text-[#9A94A8] mt-2"
                      >
                        {c.issued === "AI Agents"
                          ? "AI AGENTS"
                          : `ISSUED ${c.issued}`}
                      </div>
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="w-11 h-11 border border-[#1A1928] group-hover:border-[#E8873A] flex items-center justify-center text-[13px] tracking-widest text-[#9A94A8] group-hover:text-[#E8873A] transition-all flex-shrink-0"
                    >
                      {c.badge}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-[13px] tracking-widest text-[#9A94A8] group-hover:text-[#E8873A] transition-colors"
                    >
                      VIEW CREDENTIAL ↗
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
