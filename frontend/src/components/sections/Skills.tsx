import { useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useInView } from "framer-motion";

const layers = [
  {
    layer: "AI & MACHINE LEARNING",
    depth: "L0 — INTELLIGENCE",
    techs: [
      "RAG",
      "Multi-Agent Systems",
      "LangGraph",
      "LLMs",
      "RAGAS Evaluation",
      "Deep Learning",
      "CNNs",
      "ANNs",
      "Computer Vision",
      "OpenCV",
      "PyTorch",
    ],
    color: "#F5A55C",
  },
  {
    layer: "LANGUAGES",
    depth: "L1 — FOUNDATION",
    techs: ["Python", "JavaScript", "SQL", "C", "HTML", "CSS"],
    color: "#E8873A",
  },
  {
    layer: "BACKEND & API DESIGN",
    depth: "L2 — INTERFACE",
    techs: [
      "FastAPI",
      "Flask",
      "Django",
      "Pydantic",
      "RESTful APIs",
      "Microservices",
      "Concurrency",
    ],
    color: "#D98238",
  },
  {
    layer: "DISTRIBUTED SYSTEMS",
    depth: "L3 — TRANSPORT",
    techs: ["Apache Kafka", "RabbitMQ", "Event-Driven Architecture"],
    color: "#C57634",
  },
  {
    layer: "DATABASES & CACHING",
    depth: "L4 — PERSISTENCE",
    techs: ["PostgreSQL", "Oracle", "MongoDB", "Redis", "InfluxDB"],
    color: "#B06A2F",
  },
  {
    layer: "CLOUD & DEVOPS",
    depth: "L5 — PLATFORM",
    techs: [
      "OpenStack",
      "AWS",
      "MinIO",
      "Docker",
      "Kubernetes",
      "Helm",
      "Linux",
      "GitLab CI/CD",
      "Git",
      "Prometheus",
      "Grafana",
    ],
    color: "#9A5E2B",
  },
  {
    layer: "TESTING & PRACTICES",
    depth: "L6 — PROCESS",
    techs: [
      "PyTest",
      "Postman",
      "Swagger/OpenAPI",
      "Agile",
      "Scrum",
      "Code Review",
    ],
    color: "#845226",
  },
  {
    layer: "TOOLS",
    depth: "L7 — WORKBENCH",
    techs: ["VS Code", "PyCharm", "Jupyter Notebook", "K9s"],
    color: "#6E4622",
  },
];
function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section id="systems" className="bg-[#07070F] py-32 px-8 md:px-14">
      <div className="max-w-[1100px] mx-auto">
        <div ref={ref}>
          <div className="flex items-center gap-4 mb-14">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.35em] text-[#E8873A]"
            >
              03
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              SYSTEMS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-[clamp(34px,5vw,64px)] text-[#EFECE3] leading-tight"
            >
              Technical
              <br />
              <em className="not-italic text-[#C2BDB2]">Architecture</em>
            </h2>
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs text-[#C2BDB2] leading-relaxed self-end max-w-sm"
            >
              Eight layers — from AI and machine learning to backend,
              distributed systems and tooling. Each represents a domain of
              expertise built across real production systems at national scale.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="mb-10 hidden md:block"
            style={{ perspective: "800px" }}
          >
            <div
              style={{
                transform: "rotateX(32deg) rotateZ(-3deg)",
                transformStyle: "preserve-3d",
              }}
              className="relative h-12"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 border border-[#E8873A] rounded-sm"
                  style={{
                    transform: `translateZ(${i * 8}px)`,
                    opacity: 0.04 + i * 0.04,
                    background: `rgba(232,135,58,${8e-3 + i * 6e-3})`,
                  }}
                />
              ))}
            </div>
          </motion.div>
          <div className="space-y-1">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
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
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="skill-layer group relative overflow-hidden border border-[#1A1928] hover:border-[#7A4015] transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(232,135,58,0.06)]"
                style={
                  {
                    background: `linear-gradient(90deg, rgba(232,135,58,0.03) 0%, transparent 50%)`,
                    "--layer-offset": `${i * 14 + 18}px`,
                  } as CSSProperties
                }
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3 py-4 pr-5">
                  <div className="flex items-center gap-4 min-w-0 md:min-w-[260px]">
                    <div
                      className="w-px h-7 flex-shrink-0"
                      style={{
                        background: layer.color,
                        opacity: 0.7,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: layer.color,
                        }}
                        className="text-[13px] tracking-widest mb-0.5 opacity-80"
                      >
                        {layer.depth}
                      </div>
                      <div
                        style={{ fontFamily: "var(--font-mono)" }}
                        className="text-[12px] tracking-wider text-[#EFECE3]"
                      >
                        {layer.layer}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.techs.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          borderColor: `${layer.color}40`,
                          color: layer.color,
                        }}
                        className="max-w-full break-words text-[11px] sm:text-[13px] tracking-wide sm:tracking-widest border px-2 py-1 opacity-60 group-hover:opacity-100 transition-opacity"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:w-1 transition-all"
                  style={{ background: layer.color }}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="w-6 h-px bg-[#1A1928]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-widest text-[#9A94A8]"
            >
              {`${layers.length} ENGINEERING LAYERS · 35+ TECHNOLOGIES · PRODUCTION SYSTEMS`}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
