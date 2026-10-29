import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const projects = [
  {
    index: "01",
    title: "MR Review Agent",
    subtitle: "Multi-Agent AI Pull Request Reviewer",
    year: "2025",
    category: "AGENTIC AI / LLM / RAG",
    description:
      "An orchestrator sends a code diff to specialised security, logic and performance agents; a critic agent synthesises one review and posts it to GitHub.",
    problem:
      "Manual review misses security and performance issues, and single-prompt LLM reviews lack repository context.",
    approach:
      "Indexed the repo into ChromaDB for RAG, ran agents concurrently (agent-stage latency cut ~58%, ~32s to ~13.5s, verified with per-agent timing), and fixed a silent RAG retrieval bug. Now refactoring orchestration to LangGraph.",
    outcome:
      "An end-to-end agentic pipeline that posts consolidated, context-aware reviews to pull requests.",
    tech: [
      "Multi-Agent LLM",
      "RAG",
      "LangGraph",
      "ChromaDB",
      "FastAPI",
      "Python",
    ],
    github: "https://github.com/ayush-1530/MR-Review-Agent",
    image: "/images/project-review.jpg",
  },
  {
    index: "02",
    title: "Production RAG Chatbot",
    subtitle: "Agentic-AI · Evaluated with RAGAS",
    year: "2025",
    category: "RAG / EVALUATION",
    description:
      "A production Retrieval-Augmented Generation chatbot, instrumented with RAGAS to measure faithfulness, answer relevance and context precision/recall.",
    problem:
      "Informal spot-checks cannot show whether retrieval and chunking choices actually improve answers.",
    approach:
      "Instrumented the pipeline with RAGAS metrics to compare retrieval and chunking strategies quantitatively.",
    outcome: "Evidence-based tuning of the RAG pipeline instead of guesswork.",
    tech: ["RAG", "RAGAS", "LLMs", "Python"],
    github: "https://github.com/ayush-1530/Agentic-AI",
    image: "/images/project-rag.jpg",
  },
  {
    index: "03",
    title: "Heart Disease Prediction",
    subtitle: "Flask Web App · ML Risk Model",
    year: "2024",
    category: "MACHINE LEARNING / HEALTHCARE",
    description:
      "A Flask web app and ML model that predicts heart disease from patient inputs, with a printable report to track condition over time.",
    problem:
      "Cardiovascular diseases cause 32% of global deaths (WHO, 2019); early risk screening matters.",
    approach:
      "Trained and compared Logistic Regression, SVM, Decision Tree, Random Forest and KNN, with data work in NumPy, Pandas and Matplotlib.",
    outcome:
      "A usable web tool that turns clinical inputs into a risk prediction.",
    tech: ["Python", "Flask", "scikit-learn", "Pandas", "JavaScript"],
    github: "https://github.com/ayush-1530/Heart-Disease-Predicton-",
    image: "/images/project-heart.jpg",
  },
  {
    index: "04",
    title: "TalentScout Chatbot",
    subtitle: "LLM Hiring Assistant",
    year: "2025",
    category: "CONVERSATIONAL AI / LLM",
    description:
      "A conversational hiring assistant built for the PG-AGI assignment that screens candidates through a guided chat.",
    problem:
      "First-round screening is repetitive and needs consistent, structured question flows.",
    approach:
      "Designed an LLM-prompted conversation that collects candidate details and tailors technical questions to their stack.",
    outcome: "Automated first-round screening conversations.",
    tech: ["Python", "LLMs", "Prompt Engineering"],
    github: "https://github.com/ayush-1530/talentscout-chatbot",
    image: "/images/project-talent.jpg",
  },
  {
    index: "05",
    title: "Real-Time Surveillance Vision",
    subtitle: "Computer Vision System · DRDO",
    year: "2024",
    category: "COMPUTER VISION / DEEP LEARNING",
    description:
      "A real-time computer vision surveillance system using CNNs, OpenCV, LLMs and object detection in PyTorch.",
    problem:
      "Surveillance feeds need automated, real-time detection with low latency.",
    approach:
      "Built the full pipeline: preprocessing, model inference and performance optimisation.",
    outcome:
      "Delivered during a software internship at DRDO, Ministry of Defence (source not public).",
    tech: ["PyTorch", "CNNs", "OpenCV", "Object Detection"],
    image: "/images/project-vision.jpg",
  },
  {
    index: "06",
    title: "Atomic Clock Drift",
    subtitle: "Neural Network Time Correction",
    year: "2024",
    category: "DEEP LEARNING / PHYSICS",
    description:
      "An ANN that models and corrects cesium-133 clock drift with synthetic noise, reaching ~99.99% accuracy on simulated data.",
    problem:
      "Cesium-133 oscillators drift systematically; noise modelling is essential for precision.",
    approach:
      "Trained ANNs on synthetic drift data with controlled noise injection and applied correction from the predictions.",
    outcome: "~99.99% correction accuracy on simulated drift datasets.",
    tech: ["Python", "ANN", "NumPy"],
    github: "https://github.com/ayush-1530/Atomic-Clock",
    image: "/images/project-clock.jpg",
  },
];
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-60px",
  });
  const [expanded, setExpanded] = useState(false);
  const onEnter = () => {
    if (project.github)
      window.dispatchEvent(
        new CustomEvent("cursor:enter", { detail: "VIEW PROJECT" }),
      );
  };
  const open = () => {
    if (project.github)
      window.open(project.github, "_blank", "noopener,noreferrer");
  };
  const onLeave = () => window.dispatchEvent(new CustomEvent("cursor:leave"));
  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 40,
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
        duration: 0.8,
        delay: (index % 2) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex flex-col border border-[#2A2840] hover:border-[#E8873A] bg-[#0B0B17] group transition-colors ${project.github ? "project-link-card" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={open}
    >
      <div className="relative h-44 overflow-hidden bg-[#0D0D1C]">
        <img
          src={project.image}
          loading="lazy"
          width={800}
          height={500}
          alt={project.title}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B17] via-transparent to-transparent" />
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="absolute top-3 left-3 bg-[#E8873A] text-[#07070F] text-[12px] font-semibold tracking-widest px-2.5 py-1"
        >
          {project.index}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] tracking-widest text-[#E8873A]"
          >
            {project.category}
          </span>
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] tracking-widest text-[#9A94A8]"
          >
            {project.year}
          </span>
        </div>
        <h3
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-2xl text-[#EFECE3] leading-tight mb-1"
        >
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <div
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-[13px] text-[#F09844] mb-3"
        >
          {project.subtitle}
        </div>
        <p
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-[14px] text-[#C2BDB2] leading-relaxed mb-4"
        >
          {project.description}
        </p>
        {!project.github && (
          <div
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[12px] tracking-widest text-[#9A94A8] mb-4"
          >
            DRDO · SOURCE NOT PUBLIC
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-wider text-[#C2BDB2] border border-[#2A2840] px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Read"} case study: ${project.title}`}
          aria-expanded={expanded}
          aria-controls={`case-study-${project.index}`}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          style={{ fontFamily: "var(--font-mono)" }}
          className="self-start text-[12px] tracking-widest text-[#F09844] hover:text-[#EFECE3] transition-colors flex items-center gap-2 mb-3"
        >
          <span
            className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          >
            →
          </span>
          {expanded ? "COLLAPSE" : "CASE STUDY"}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              id={`case-study-${project.index}`}
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#2A2840] pt-4 mb-3 space-y-3">
                {[
                  ["PROBLEM", project.problem],
                  ["APPROACH", project.approach],
                  ["OUTCOME", project.outcome],
                ].map(([l, t]) => (
                  <div key={l}>
                    <div
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-[12px] tracking-widest text-[#E8873A] mb-1"
                    >
                      {l}
                    </div>
                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[13px] text-[#C2BDB2] leading-relaxed"
                    >
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section id="built" className="bg-[#07070F] py-28 px-8 md:px-14">
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
          <div className="flex items-center gap-4 mb-12">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.35em] text-[#E8873A]"
            >
              04
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              BUILT
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-[clamp(34px,5vw,64px)] text-[#EFECE3] leading-tight"
            >
              Selected
              <br />
              <em className="not-italic text-[#C2BDB2]">Projects</em>
            </h2>
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-[15px] text-[#C2BDB2] leading-relaxed self-end max-w-sm"
            >
              AI systems, machine learning models and computer vision, built
              alongside production backend engineering.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
