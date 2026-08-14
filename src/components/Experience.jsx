import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead
          index="03"
          eyebrow="Experience"
          title="Where I have worked"
          lede="Three years across a full-time role, a frontend internship and freelance delivery that has never stopped."
        />

        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <Reveal
              className={`tl-item${job.current ? " is-current" : ""}`}
              key={`${job.company}-${job.role}`}
              delay={70 * i}
            >
              <div className="card tl-card">
                <div className="tl-head">
                  <span className="tl-period">{job.period}</span>
                  <span className="tl-type">{job.type}</span>
                </div>

                <h3 className="tl-role">{job.role}</h3>
                <p className="tl-company">
                  {job.company} <em>· {job.location}</em>
                </p>

                <ul className="tl-list">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="tl-stack">
                  {job.stack.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="edu-grid">
          <Reveal className="card edu-card edu-card--accent">
            <span className="eyebrow">
              <Icon name="cap" size={14} />
              Education
            </span>
            <h3>
              {EDUCATION.degree} — {EDUCATION.school}
            </h3>
            <p>
              {EDUCATION.location} · {EDUCATION.period}
              <br />
              {EDUCATION.detail} · CGPA <strong>{EDUCATION.grade}</strong>
            </p>
          </Reveal>

          <Reveal className="card edu-card" delay={80}>
            <span className="eyebrow">
              <Icon name="award" size={14} />
              Certification
            </span>
            <ul className="edu-list">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name}>
                  <span>
                    {cert.name}
                    <br />
                    <em style={{ color: "var(--text-3)", fontStyle: "normal" }}>{cert.issuer}</em>
                  </span>
                  <span>{cert.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
