import { useState } from "react";
import { layers } from "../../data/content";

const positions = [
  { x: 28, y: 19 }, { x: 63, y: 13 }, { x: 84, y: 31 }, { x: 85, y: 66 },
  { x: 65, y: 85 }, { x: 30, y: 84 }, { x: 13, y: 63 }, { x: 12, y: 30 },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  return (
    <section id="systems" className="skills-section section-shell">
      <div className="section-heading"><h2>My Stack</h2><span>Eight layers. One coherent system.</span></div>
      <div className="stack-logos" aria-label="Selected technologies">{["Python", "FastAPI", "PyTorch", "PostgreSQL", "Docker", "Kubernetes", "GitLab", "AWS"].map((tech, i) => <a href={`#stack-layer-${[1, 2, 0, 4, 5, 5, 5, 5][i]}`} key={tech}><span>{["Py", "⚡", "◉", "Pg", "▣", "⎈", "◇", "aws"][i]}</span><small>{tech}</small></a>)}</div>
      <div className="skill-constellation">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="constellationGlow"><stop offset="0" stopColor="currentColor" stopOpacity=".08" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient></defs><ellipse cx="500" cy="300" rx="320" ry="250" fill="url(#constellationGlow)" />{positions.map((position, i) => <g key={i} className={active === i ? "graph-connection is-active" : "graph-connection"}><path d={`M500 300 Q${position.x * 10} 300 ${position.x * 10} ${position.y * 6}`} /><circle cx={position.x * 10} cy={position.y * 6} r={active === i ? 4 : 2} /></g>)}{positions.map((position, i) => <path key={`cross-${i}`} className="graph-crosslink" d={`M${position.x * 10} ${position.y * 6} Q500 300 ${positions[(i + 2) % positions.length].x * 10} ${positions[(i + 2) % positions.length].y * 6}`} />)}</svg>
        <div className="stack-hub"><span className="hub-core" /><span>Engineering<br />systems</span></div>
        {layers.map((layer, i) => <button key={layer.layer} type="button" className={`stack-node ${active === i ? "is-active" : ""}`} style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }} aria-pressed={active === i} onClick={() => setActive(i)}><i /><span>{layer.layer.toLowerCase().replaceAll(" & ", " + ")}</span><small>{layer.techs.slice(0, 3).join(" · ")}</small></button>)}
        <div className="graph-caption"><span className="availability-dot" />Select a node to explore its layer.</div>
      </div>
      <div className="skills-list">{layers.map((layer, index) => <div id={`stack-layer-${index}`} key={layer.layer} className={`skill-row ${active === index ? "is-active" : ""}`}><button type="button" onClick={() => setActive(index)} aria-pressed={active === index}><span className="small-label">{layer.depth}</span><strong>{layer.layer}</strong></button><div className="project-tech">{layer.techs.map(tech => <span key={tech}>{tech}</span>)}</div></div>)}</div>
      <p className="stack-footnote">{layers.length} ENGINEERING LAYERS · 35+ TECHNOLOGIES · PRODUCTION SYSTEMS</p>
    </section>
  );
}
