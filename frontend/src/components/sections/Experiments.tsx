import { ArrowUpRight, Bot, Braces, Timer } from "lucide-react";
import { projects } from "../../data/content";
const experiments = [{ index: 0, icon: Braces }, { index: 1, icon: Bot }, { index: 5, icon: Timer }];

export default function Experiments() {
  return (
    <section id="experiments" className="experiments-section section-shell">
      <div className="section-heading"><h2>AI Experiments</h2><span>Curiosity, turned into code.</span></div>
      <div className="experiment-grid">{experiments.map(({ index, icon: Icon }) => {
        const project = projects[index];
        return <article className="experiment-card" key={project.title}><div className={`experiment-visual experiment-visual-${index}`}><Icon size={62} strokeWidth={0.8} /><div className="experiment-orbit" /><span>EXPERIMENT / {project.index}</span></div><h3>{project.title}</h3><p>{project.description}</p><a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-link">Explore the code <ArrowUpRight size={16} /></a></article>;
      })}</div>
    </section>
  );
}
