import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { projects } from "../../data/content";
import ProjectPreview from "../visual/ProjectPreview";

const filters = ["Show all", "AI and Agentics", "Machine Learning", "Computer Vision"];
const matchesFilter = (index: number, filter: string) => filter === "Show all" ||
  (filter === "AI and Agentics" && [0, 1, 3].includes(index)) ||
  (filter === "Machine Learning" && [2, 5].includes(index)) ||
  (filter === "Computer Vision" && index === 4);

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="work-project">
      <div className="work-project-heading"><h3>{project.title}<span>{project.subtitle}</span></h3><div className="project-hashtags">{project.category.split(" / ").map(category => <span key={category}>#{category.replaceAll(" ", "")}</span>)}</div></div>
      <div className="project-bento">
        <ProjectPreview index={index} />
        <div className="project-story">
          <div className="project-story-inner">
            <p className="project-description">{project.description}</p>
            <div className="project-tech">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="project-details"><span>{project.category}</span><span>Year: {project.year}</span></div>
            <div className="project-actions">
              <button className="pill-button" type="button" aria-label={`${expanded ? "Collapse" : "Read"} case study: ${project.title}`} aria-expanded={expanded} aria-controls={`case-study-${project.index}`} onClick={() => setExpanded(value => !value)}>{expanded ? "COLLAPSE" : "CASE STUDY"}<ArrowDown size={15} className={expanded ? "rotate-180" : ""} /></button>
              {project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-repository" aria-label={`View repository: ${project.title}`}><Github size={15} />GitHub <ArrowUpRight size={14} /></a> : <span className="private-source">DRDO · SOURCE NOT PUBLIC</span>}
            </div>
          </div>
          <div className="project-story-label"><span>{project.title}</span><ArrowUpRight size={16} /></div>
        </div>
      </div>
      <AnimatePresence initial={false}>{expanded && <motion.div className="case-study-details" id={`case-study-${project.index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}><div className="case-study-grid">{[["PROBLEM", project.problem], ["APPROACH", project.approach], ["OUTCOME", project.outcome]].map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div></motion.div>}</AnimatePresence>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("Show all");
  const visible = projects.map((project, index) => ({ project, index })).filter(({ index }) => matchesFilter(index, filter));
  return (
    <section id="built" className="work-section section-shell">
      <div className="section-heading"><h2>Works.</h2><span>AI, systems &amp; everything in between.</span></div>
      <div className="work-filters" role="group" aria-label="Filter projects">{filters.map(item => <button type="button" key={item} className={`pill-button ${filter === item ? "is-selected" : ""}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <p className="filter-count" role="status">Showing {visible.length} of {projects.length} projects</p>
      <div className="work-list">{visible.map(({ project, index }) => <ProjectCard key={project.index} project={project} index={index} />)}</div>
    </section>
  );
}
