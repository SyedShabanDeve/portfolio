import { PROFILE, STATS } from "../data/site";
import { useTypewriter } from "../hooks/useTypewriter";
import Icon from "./ui/Icon";

const RESUME_URL = `${import.meta.env.BASE_URL}${PROFILE.resume}`;

export default function Hero() {
  const typed = useTypewriter(PROFILE.roles);

  const scrollToProjects = (event) => {
    event.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <span className="glow hero__glow-1" />
      <span className="glow hero__glow-2" />
      <span className="glow hero__glow-3" />
      <span className="grid-overlay" />
      <span className="hero__ghost" aria-hidden="true">
        DEV
      </span>

      <div className="container hero__inner">
        <div>
          <p className="badge rise" style={{ animationDelay: "0.05s" }}>
            <span className="dot" />
            Available for hire — {PROFILE.location}
          </p>

          <h1 className="hero__name rise" style={{ animationDelay: "0.14s" }}>
            <span>{PROFILE.firstName}</span>
            <span className="is-italic">{PROFILE.middleName}</span>
            <span className="is-outline">{PROFILE.lastName}</span>
          </h1>

          <div className="rise" style={{ animationDelay: "0.24s" }}>
            <p className="hero__typer">
              <span className="prompt">&gt;_</span>
              <span className="typed">
                {typed}
                <span className="caret">|</span>
              </span>
            </p>
          </div>

          <p className="hero__tagline rise" style={{ animationDelay: "0.32s" }}>
            {PROFILE.tagline}
          </p>

          <div className="hero__cta rise" style={{ animationDelay: "0.4s" }}>
            <a className="btn btn--primary" href="#projects" onClick={scrollToProjects}>
              View my work
              <Icon name="arrowRight" size={15} />
            </a>
            <a className="btn btn--outline" href={RESUME_URL} download>
              <Icon name="download" size={15} />
              Download CV
            </a>

            <span className="hero__socials">
              <a
                className="icon-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Icon name="github" size={17} />
              </a>
              <a
                className="icon-btn"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Icon name="linkedin" size={17} />
              </a>
              <a className="icon-btn" href={`mailto:${PROFILE.email}`} aria-label="Send an email">
                <Icon name="mail" size={17} />
              </a>
            </span>
          </div>
        </div>

        <div className="hero__card rise" style={{ animationDelay: "0.5s" }}>
          <div className="hero__card-bar">
            <i />
            <i />
            <i />
            <span>developer.json</span>
          </div>

          <div className="hero__card-body">
            <div>
              <span className="k">name</span>
              <span className="c"> : </span>
              <span className="s">&quot;{PROFILE.fullName}&quot;</span>
            </div>
            <div>
              <span className="k">role</span>
              <span className="c"> : </span>
              <span className="s">&quot;{PROFILE.title}&quot;</span>
            </div>
            <div>
              <span className="k">stack</span>
              <span className="c"> : </span>
              <span className="v">[MERN, WordPress]</span>
            </div>
            <div>
              <span className="k">based</span>
              <span className="c"> : </span>
              <span className="s">&quot;{PROFILE.location}&quot;</span>
            </div>
            <div>
              <span className="k">status</span>
              <span className="c"> : </span>
              <span className="v">open_to_work</span>
            </div>
          </div>

          <div className="hero__stats">
            {STATS.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="scroll-hint" aria-hidden="true">
        <i />
        Scroll
      </span>
    </section>
  );
}
