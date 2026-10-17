import { CERTIFICATIONS, EDUCATION, LANGUAGES } from "../data/site";
import Icon from "./ui/Icon";

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>06</span> Education
        </p>
        <div className="edu__grid">
          {EDUCATION.map((e) => (
            <article key={e.degree} className="edu glass" data-reveal="tilt">
              <Icon name="cap" size={26} />
              <p className="edu__period">{e.period}</p>
              <h3>{e.degree}</h3>
              <p className="edu__school">{e.school}</p>
              <p className="edu__detail">
                {e.detail} <span>{e.grade}</span>
              </p>
            </article>
          ))}
          <article className="edu glass" data-reveal="tilt">
            <Icon name="award" size={26} />
            <p className="edu__period">Certifications & languages</p>
            <ul className="edu__list">
              {CERTIFICATIONS.map((c) => (
                <li key={c.name}>
                  <strong>{c.name}</strong>
                  <span>
                    {c.issuer}, {c.year}
                  </span>
                </li>
              ))}
              {LANGUAGES.map((l) => (
                <li key={l.name}>
                  <strong>{l.name}</strong>
                  <span>{l.level}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
