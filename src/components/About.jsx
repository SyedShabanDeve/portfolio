import { ABOUT, PROFILE } from "../data/site";
import Icon from "./ui/Icon";
import { SplitWords } from "./ui/Motion";
import { useTilt } from "../hooks/useTilt";

const BASE = import.meta.env.BASE_URL;

export default function About() {
  const photo = useTilt(14);

  return (
    <section id="about" className="section about">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>01</span> About
        </p>

        <p className="statement" data-words>
          <SplitWords text={ABOUT.statement} />
        </p>

        <div className="about__grid">
          <figure className="holo" ref={photo} data-reveal="tilt" data-cursor="Hi">
            <div className="holo__frame">
              <img
                src={`${BASE}${PROFILE.photo}`}
                alt={`Portrait of ${PROFILE.fullName}`}
                width="640"
                height="640"
                loading="lazy"
                decoding="async"
              />
              <span className="holo__shine" aria-hidden="true" />
              <span className="holo__scan" aria-hidden="true" />
            </div>
            <figcaption>
              <span>{PROFILE.fullName}</span>
              <span>{PROFILE.location}</span>
            </figcaption>
          </figure>

          <div className="about__text">
            {ABOUT.body.map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
            <ul className="about__facts" data-reveal>
              {ABOUT.highlights.map((h) => (
                <li key={h.title} className="fact">
                  <Icon name={h.icon} size={20} />
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
