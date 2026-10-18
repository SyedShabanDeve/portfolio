import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PROJECTS, PROFILE } from "../data/site";
import Icon from "./ui/Icon";
import { useTilt } from "../hooks/useTilt";

const BASE = import.meta.env.BASE_URL;

function initials(name) {
  return name
    .replace(/[^A-Za-z& ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function ProjectCard({ project, index }) {
  const tilt = useTilt(12);
  const primary = project.url || project.repo;

  return (
    <article className="card" style={{ "--h": project.hue }}>
      <div className="card__inner" ref={tilt}>
        <a
          className={`card__art${project.image ? " has-shot" : ""}`}
          href={primary}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          tabIndex={-1}
          aria-hidden="true"
        >
          {project.image ? (
            <img src={`${BASE}${project.image}`} alt="" loading="lazy" decoding="async" width="800" height="500" />
          ) : (
            <>
              <span className="card__glyph">{initials(project.name)}</span>
              <span className="card__orb" />
              <span className="card__grid" />
            </>
          )}
          <span className="card__index">{String(index + 1).padStart(2, "0")}</span>
        </a>
        <div className="card__body">
          <p className="card__kind">
            {project.kind} <span>· {project.year}</span>
          </p>
          <h3 className="card__name">
            <a href={primary} target="_blank" rel="noreferrer" data-cursor={project.url ? "Live" : "Code"}>
              {project.name}
            </a>
          </h3>
          <p className="card__summary">{project.summary}</p>
          <ul className="chips chips--sm">
            {project.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <div className="card__links">
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" data-cursor="Live">
                Live demo <Icon name="external" size={14} />
                <span className="sr-only"> for {project.name} (opens in a new tab)</span>
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" data-cursor="Code">
                <Icon name="github" size={14} /> Code
                <span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        <span className="card__shine" aria-hidden="true" />
      </div>
    </article>
  );
}

export default function Work() {
  const section = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.current.scrollWidth - window.innerWidth;
      const scroll = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.utils.toArray(".card", track.current).forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -32, z: -160, opacity: 0.35 },
          {
            rotateY: 0,
            z: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left 100%", end: "left 45%", scrub: true },
          }
        );
      });
      gsap.to(".work__bar i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="work" ref={section}>
      <div className="work__head container">
        <div>
          <p className="eyebrow">
            <span>05</span> Projects
          </p>
          <h2 className="title">
            Products and <em>open source</em>
          </h2>
        </div>
        <p className="work__hint">
          Things I built on my own time, with the code public. More on{" "}
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>

      <div className="work__viewport">
        <div className="work__track" ref={track}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          <a className="card card--more" href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="GitHub">
            <span>All repositories</span>
            <Icon name="github" size={42} />
            <span className="card--more__arrow">
              <Icon name="arrowRight" size={22} />
            </span>
          </a>
        </div>
      </div>
      <div className="work__bar container" aria-hidden="true">
        <i />
      </div>
    </section>
  );
}
