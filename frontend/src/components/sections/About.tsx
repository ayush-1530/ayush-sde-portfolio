import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Tilt3D from "../visual/Tilt3D";

const principles = [
  {
    num: "I",
    title: "Systems over features",
    body: "Good software is not a collection of features — it is a coherent system. Every architectural decision shapes how reliably the whole works under pressure.",
  },
  {
    num: "II",
    title: "Latency is a product decision",
    body: "Performance is not an afterthought. Reducing API latency 35–40% through database redesign changes the experience for users at national scale.",
  },
  {
    num: "III",
    title: "Security by design",
    body: "In cybersecurity infrastructure, correctness is not enough. Systems must be designed with threat models in mind — compliance, access control, and audit trails are not features to add later.",
  },
  {
    num: "IV",
    title: "Code is communication",
    body: "Code reviews, documentation, and API contracts are acts of communication with future engineers. Clarity in code is a form of engineering respect.",
  },
];
function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      id="thinking"
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
              05
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              THINKING
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 mb-20">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-[clamp(34px,5vw,64px)] text-[#EFECE3] leading-tight"
            >
              The Engineer
              <br />
              <em className="not-italic text-[#C2BDB2]">Behind the Systems</em>
            </h2>
            <div className="self-end">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontStyle: "italic",
                }}
                className="text-sm text-[#C2BDB2] leading-relaxed max-w-lg mb-3"
              >
                {
                  '"Software Developer focused on building secure and scalable backend systems, with exposure to cybersecurity simulation and system-level design."'
                }
              </p>
              <div
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[13px] tracking-widest text-[#9A94A8]"
              >
                — AYUSH NEGI
              </div>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1928]">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
              }}
              className="bg-[#0D0D1C]"
            >
              <Tilt3D
                intensity={7}
                className="p-8 md:p-10 h-full group hover:bg-[#0F0F22] transition-colors"
              >
                <div
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-5xl text-[#1A1928] group-hover:text-[#7A4015] transition-colors mb-5 italic"
                >
                  {p.num}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-xl text-[#EFECE3] mb-3 leading-tight"
                >
                  {p.title}
                </h3>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-[15px] text-[#C2BDB2] leading-relaxed"
                >
                  {p.body}
                </p>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
