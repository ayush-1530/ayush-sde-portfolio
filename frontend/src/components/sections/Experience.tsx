import { experiences } from "../../data/content";

export default function Experience() {
  return (
    <section id="journey" className="journey-section section-shell">
      <div className="section-heading"><h2>Journey</h2><span>The engineering story.</span></div>
      <p className="section-description">From defence labs to government infrastructure to national-scale cybersecurity platforms — a progression built on distributed systems and precision engineering.</p>
      <div className="journey-list">
        {experiences.map(experience => (
          <article className="journey-entry" key={experience.company}>
            <div className="journey-date">
              <span>{experience.period}</span>
              <small>{experience.type}</small>
              {experience.active && <span className="current-tag"><i className="availability-dot" />CURRENT</span>}
            </div>
            <div className="journey-content">
              <div className="journey-employer">
                <span className="organisation-logo"><img src={experience.logo} alt="" width="40" height="40" loading="lazy" /></span>
                <div><h3>{experience.company}</h3><p className="journey-role">{experience.role}</p></div>
              </div>
              <p className="journey-context">{experience.description}</p>
              <ul>{experience.points.map(point => <li key={point}>{point}</li>)}</ul>
              <div className="project-tech">{experience.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
