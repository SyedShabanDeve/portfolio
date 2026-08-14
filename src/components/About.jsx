import { ABOUT, LANGUAGES, SERVICES } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" eyebrow="About" title="Who you would be hiring" />

        <div className="about__grid">
          <Reveal className="about__body">
            <p className="about__lead">{ABOUT.lead}</p>
            {ABOUT.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}

            <div className="about__meta">
              {LANGUAGES.map((language) => (
                <span className="chip" key={language.name}>
                  <Icon name="globe" size={13} />
                  {language.name} — {language.level}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="hl-grid">
            {ABOUT.highlights.map((item, i) => (
              <Reveal className="card card--hover hl" key={item.title} delay={80 * i}>
                <span className="hl__icon">
                  <Icon name={item.icon} size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="services">
          {SERVICES.map((service, i) => (
            <Reveal className="service" key={service.title} delay={80 * i}>
              <p className="service__no">0{i + 1} / What I do</p>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
