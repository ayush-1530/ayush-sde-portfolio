import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "Zindagi Technologies",
    role: "Software Developer",
    period: "Apr 2025 — Present",
    type: "FULL TIME",
    description: "Government of India's National Cyber Range Platform",
    points: [
      "Architected scalable REST APIs using FastAPI with OOP across distributed, multi-tiered systems handling national-scale cybersecurity workflows",
      "Reduced API latency 30–40% via PostgreSQL redesign; built event-driven microservices with Kafka/RabbitMQ, cutting inter-service latency 35%",
      "Owned CI/CD using GitLab and Kubernetes with Helm deployments and cluster monitoring",
      "Conducted code reviews, enforced Agile/Scrum, mentored 5+ interns; collaborated with product and security teams on regulatory compliance",
    ],
    tags: ["FastAPI", "Kafka", "Kubernetes", "PostgreSQL", "GitLab CI/CD"],
    active: true,
  },
  {
    company: "National Informatics Centre",
    role: "Software Developer Trainee",
    period: "Feb 2025 — Mar 2025",
    type: "GOVERNMENT · GOI",
    description: "Government of India digital infrastructure",
    points: [
      "Modernized a legacy government database using Django & RESTful APIs, cutting query response times 60%",
      "Optimized data retrieval with MongoDB and Redis caching; automated backup and recovery",
    ],
    tags: ["Django", "MongoDB", "Redis", "REST APIs"],
    active: false,
  },
  {
    company: "DRDO",
    role: "Software Developer Intern",
    period: "Jul 2024 — Aug 2024",
    type: "DEFENCE · MOD",
    description: "Ministry of Defence, Government of India",
    points: [
      "Built a real-time computer vision surveillance system using CNNs, OpenCV, LLMs and object detection in PyTorch — preprocessing, model inference and performance optimisation",
      "Atomic Clock Drift Simulation: trained an ANN to predict and correct cesium-133 drift, ~99.99% accuracy on simulated data",
    ],
    tags: ["PyTorch", "OpenCV", "CNNs", "Python"],
    active: false,
  },
];
function ExperienceEntry({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: -24,
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
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 py-10 border-t border-[#1A1928] group"
    >
      <div
        className="hidden md:block absolute left-[179px] top-[3.2rem] w-1.5 h-1.5 rounded-full -translate-x-[3px]"
        style={{
          background: exp.active ? "#E8873A" : "#1A1928",
          boxShadow: exp.active ? "0 0 6px #E8873A" : "none",
        }}
      />
      <div>
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[13px] tracking-widest text-[#E8873A] mb-1.5"
        >
          {exp.type}
        </div>
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[12px] text-[#C2BDB2] leading-relaxed"
        >
          {exp.period}
        </div>
        {exp.active && (
          <div className="flex items-center gap-1.5 mt-2">
            <div
              className="w-1 h-1 rounded-full bg-[#E8873A]"
              style={{ boxShadow: "0 0 4px #E8873A" }}
            />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-widest text-[#E8873A]"
            >
              CURRENT
            </span>
          </div>
        )}
      </div>
      <div>
        <h3
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-2xl md:text-[2rem] text-[#EFECE3] leading-tight mb-1"
        >
          {exp.company}
        </h3>
        <div
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-xs text-[#C2BDB2] mb-3 tracking-wide"
        >
          {exp.role}
        </div>
        <p
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-[13px] text-[#E8873A] tracking-wider mb-4 italic"
        >
          {exp.description}
        </p>
        <ul className="space-y-2 mb-5">
          {exp.points.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[#E8873A] mt-1 flex-shrink-0 text-xs">
                —
              </span>
              <span
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-[15px] text-[#C2BDB2] leading-relaxed"
              >
                {p}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: exp.active ? "rgba(232,135,58,0.3)" : "#1A1928",
              }}
              className="text-[13px] tracking-widest text-[#C2BDB2] border px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  return (
    <section id="journey" className="bg-[#07070F] py-32 px-8 md:px-14">
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
              02
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              JOURNEY
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[clamp(38px,6vw,80px)] text-[#EFECE3] leading-tight mb-4 max-w-xl"
          >
            The Engineering
            <br />
            <em className="not-italic text-[#C2BDB2]">Story</em>
          </h2>
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-xs text-[#C2BDB2] max-w-md mb-20 leading-relaxed"
          >
            From defence labs to government infrastructure to national-scale
            cybersecurity platforms — a progression built on distributed systems
            and precision engineering.
          </p>
        </motion.div>
        <div className="md:pl-8 md:border-l border-[#1A1928]">
          {experiences.map((exp, i) => (
            <ExperienceEntry key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
