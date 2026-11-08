import { useState } from "react";
import { ArrowUpRight, BrainCircuit, Cloud, Code2, Container, Database, GitBranch, Layers3, Network, Pause, Play, Sparkles, Workflow, Zap } from "lucide-react";
import { layers } from "../../data/content";
import NeuralNetwork, { skillPositions } from "../visual/NeuralNetwork";
import "./Skills.css";

const technologies = [
  { name: "Python", mark: "Py", layer: 1, category: "LANGUAGE" },
  { name: "FastAPI", icon: Zap, layer: 2, category: "BACKEND" },
  { name: "PyTorch", mark: "◉", layer: 0, category: "DEEP LEARNING" },
  { name: "LangGraph", icon: Workflow, layer: 0, category: "AGENTIC AI" },
  { name: "RAG", icon: BrainCircuit, layer: 0, category: "AI SYSTEMS" },
  { name: "LLMs", icon: Sparkles, layer: 0, category: "GENERATIVE AI" },
  { name: "PostgreSQL", icon: Database, layer: 4, category: "DATABASE" },
  { name: "Docker", icon: Container, layer: 5, category: "CONTAINERS" },
  { name: "Kubernetes", icon: Network, layer: 5, category: "ORCHESTRATION" },
  { name: "AWS", icon: Cloud, layer: 5, category: "CLOUD" },
  { name: "OpenStack", icon: Layers3, layer: 5, category: "CLOUD" },
  { name: "GitLab CI/CD", icon: GitBranch, layer: 5, category: "DELIVERY" },
];

const layerIcons = [BrainCircuit, Code2, Zap, Network, Database, Cloud, GitBranch, Workflow];
const layerTitles = ["AI + Machine Learning", "Languages", "Backend + API Design", "Distributed Systems", "Databases + Caching", "Cloud + DevOps", "Testing + Practices", "Tools"];
const descriptions = [
  "Building intelligent systems with retrieval, collaborating agents, and deep learning — from context-aware LLM applications to real-time computer vision.",
  "The foundations I use to turn ideas into working software, from Python services and Java applications to the interfaces that bring them to life.",
  "Designing clear API contracts and concurrent backend services that connect applications, data, and AI models.",
  "Connecting independent services with event-driven architecture, message queues, and asynchronous communication.",
  "Giving applications a reliable memory with relational databases, document stores, time-series data, and fast caching.",
  "Taking AI and backend services into production with cloud infrastructure, containers, automated delivery, and observability.",
  "Keeping systems dependable with automated tests, API validation, thoughtful code review, and iterative delivery.",
  "The everyday tools I use to write, explore, debug, and operate software across development and production.",
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const selected = layers[active];
  const technologyCount = new Set(layers.flatMap(layer => layer.techs)).size;

  return (
    <section id="systems" className="skills-section section-shell">
      <div className="section-heading"><h2>My Stack</h2><span>Eight layers. One coherent system.</span></div>

      <div className="stack-banner-heading">
        <span className="small-label">AI, SOFTWARE & CLOUD</span>
        <button className="stack-motion-toggle" type="button" aria-label={paused ? "Play technology banner" : "Pause technology banner"} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
      <div className={`stack-marquee ${paused ? "is-paused" : ""}`} role="region" aria-label="Technology stack, scrolling left to right" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.scrollLeft = 0; }}>
        <div className="stack-marquee-track">
          {[0, 1].map(copy => (
            <div className="stack-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {technologies.map(technology => {
                const Icon = technology.icon;
                return (
                  <a className="stack-tech" href={`#stack-layer-${technology.layer}`} key={technology.name} aria-label={`${technology.name} ${technology.category.toLowerCase()}`} tabIndex={copy === 1 ? -1 : undefined} onClick={() => setActive(technology.layer)} onFocus={event => { if (event.currentTarget.matches(":focus-visible")) event.currentTarget.scrollIntoView?.({ block: "nearest", inline: "center", behavior: "instant" }); }}>
                    <span className="stack-tech-mark" aria-hidden="true">{Icon ? <Icon size={26} strokeWidth={1.5} /> : technology.mark}</span>
                    <span><strong>{technology.name}</strong><small>{technology.category}</small></span>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="neural-panel">
        <div className="neural-panel-heading"><span className="small-label"><span className="neural-status-dot" /> THE CONNECTED STACK</span><span>Explore the connections</span></div>
        <div className="skill-neural-scene" role="group" aria-label="Interactive 3D skill network">
          <NeuralNetwork active={active} />
          <div className="neural-hub" aria-hidden="true"><span>ENGINEERING</span><strong>Connected by design.</strong></div>
          {layers.map((layer, index) => {
            const Icon = layerIcons[index];
            return (
              <button key={layer.layer} type="button" className={`neural-skill-node ${active === index ? "is-active" : ""}`} style={{ left: `clamp(50px, ${skillPositions[index].x}%, calc(100% - 50px))`, top: `${skillPositions[index].y}%` }} aria-label={`Explore ${layer.layer.toLowerCase()}`} aria-pressed={active === index} aria-controls="neural-skill-details" onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                <span className="neural-node-orb"><Icon size={17} strokeWidth={1.5} /></span>
                <span className="neural-node-name">{layerTitles[index]}</span>
                <small>{layer.techs.slice(0, 2).join(" · ")}</small>
              </button>
            );
          })}
          <p className="neural-caption"><span className="neural-status-dot" />Hover a node. Discover its layer.</p>
        </div>
        <div id="neural-skill-details" className="neural-details" role="region" aria-label="Selected skill details" aria-live="polite" aria-atomic="true">
          <div className="neural-details-copy" key={active}>
            <span className="small-label">{selected.depth}</span>
            <h3>{layerTitles[active]}</h3>
            <p>{descriptions[active]}</p>
          </div>
          <div className="neural-details-tech"><div className="project-tech">{selected.techs.map(tech => <span key={tech}>{tech}</span>)}</div><a href={`#stack-layer-${active}`}>Explore this layer <ArrowUpRight size={13} /></a></div>
        </div>
      </div>

      <div className="skills-list">{layers.map((layer, index) => <div id={`stack-layer-${index}`} key={layer.layer} className={`skill-row ${active === index ? "is-active" : ""}`}><button type="button" onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="neural-skill-details"><span className="small-label">{layer.depth}</span><strong>{layer.layer}</strong></button><div className="project-tech">{layer.techs.map(tech => <span key={tech}>{tech}</span>)}</div></div>)}</div>
      <p className="stack-footnote">{layers.length} ENGINEERING LAYERS · {technologyCount} TECHNOLOGIES · PRODUCTION SYSTEMS</p>
    </section>
  );
}
