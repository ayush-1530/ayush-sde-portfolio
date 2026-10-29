import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const stats = [
  {
    value: "1.6+",
    label: "YEARS EXPERIENCE",
    sub: "DRDO · NIC · Zindagi Technologies",
  },
  {
    value: "B.Tech",
    label: "COMPUTER SCIENCE",
    sub: "First Division · 2021 – 2025",
  },
  {
    value: "AI + ML",
    label: "LLMs · RAG · VISION",
    sub: "Multi-agent systems, CNNs, PyTorch",
  },
  {
    value: "Backend",
    label: "SYSTEMS ENGINEER",
    sub: "National Cyber Range Platform, Govt. of India",
  },
];
function Hero() {
  return (
    <section
      id="intro"
      className="relative min-h-screen bg-[#07070F] overflow-hidden pt-28 pb-16 px-8 md:px-14"
    >
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(42,30,90,0.45) 0%, transparent 65%)",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center min-h-[calc(100vh-11rem)]">
        <div>
          <motion.div
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[14px] tracking-[0.3em] text-[#E8873A] mb-5"
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease,
            }}
          >
            SOFTWARE ENGINEER · AI &amp; SYSTEMS · NEW DELHI, INDIA
          </motion.div>
          <motion.h1
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[clamp(64px,10vw,140px)] leading-[0.9] text-[#EFECE3] mb-8 tracking-tight"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 1,
              ease,
            }}
          >
            {"Ayush "}
            <span className="text-[#E8873A]">Negi</span>
          </motion.h1>
          <motion.p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[18px] text-[#D6D1C6] max-w-[540px] leading-relaxed mb-10"
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.9,
              ease,
            }}
          >
            I build secure, scalable systems and turn complex workflows into
            reliable software — from national-scale cybersecurity infrastructure
            at{" "}
            <span className="text-[#EFECE3] font-medium">
              Zindagi Technologies
            </span>
            . Outside work, I'm an AI enthusiast building AI systems as a
            personal passion.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.9,
            }}
          >
            <a
              href="#built"
              style={{ fontFamily: "var(--font-mono)" }}
              className="bg-[#E8873A] hover:bg-[#F09844] text-[#07070F] font-semibold text-[13px] tracking-widest px-8 py-4 transition-colors no-underline shadow-[0_8px_30px_-8px_rgba(232,135,58,0.7)]"
            >
              VIEW MY WORK →
            </a>
            <a
              href="#connect"
              style={{ fontFamily: "var(--font-mono)" }}
              className="border-2 border-[#E8873A] text-[#F09844] hover:bg-[#E8873A] hover:text-[#07070F] font-semibold text-[13px] tracking-widest px-8 py-4 transition-colors no-underline"
            >
              CONTACT ME ↗
            </a>
            <a
              href="https://github.com/ayush-1530"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)" }}
              className="inline-flex items-center justify-center gap-2.5 border border-[#4A4660] text-[#EFECE3] hover:border-[#E8873A] hover:text-[#F09844] text-[13px] tracking-widest px-6 py-4 transition-colors no-underline"
            >
              <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-negi-15oct/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)" }}
              className="inline-flex items-center justify-center gap-2.5 border border-[#4A4660] text-[#EFECE3] hover:border-[#E8873A] hover:text-[#F09844] text-[13px] tracking-widest px-6 py-4 transition-colors no-underline"
            >
              <Linkedin className="w-4 h-4 shrink-0" aria-hidden="true" />
              LINKEDIN ↗
            </a>
          </motion.div>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 1.1,
            ease,
          }}
        >
          <div className="absolute -top-4 -right-4 w-full h-full border border-[#E8873A]/60" />
          <div className="relative aspect-[3/4] overflow-hidden bg-[#0D0D1C]">
            <img
              src="/images/ayush-formal.jpeg"
              width={840}
              height={1120}
              alt="Ayush Negi, Software Developer Engineer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07070F]/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <div>
                <div
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-2xl text-[#EFECE3] leading-none"
                >
                  Ayush Negi
                </div>
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[12px] tracking-widest text-[#F09844] mt-2"
                >
                  SDE · ZINDAGI TECHNOLOGIES
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 border-2 border-[#E8873A] bg-[#0D0D1C] shadow-[0_0_60px_-20px_rgba(232,135,58,0.5)]"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.9,
          ease,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-6 ${i > 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-[#E8873A]/20`}
          >
            <div
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-[clamp(34px,4vw,52px)] leading-none text-[#E8873A] mb-3"
            >
              {s.value}
            </div>
            <div
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-widest text-[#EFECE3] mb-1"
            >
              {s.label}
            </div>
            <div
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-[13px] text-[#C2BDB2]"
            >
              {s.sub}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;
