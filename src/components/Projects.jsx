import { useMemo, useState } from "react";
import { FILTERS, PROFILE, PROJECTS } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

const STOP_WORDS = new Set(["the", "of", "and", "a", "an", "for", "r"]);

/** Monogram for the featured panel — stop words would only add noise. */
const initials = (name) => {
  const words = name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word) && !STOP_WORDS.has(word.toLowerCase()));
  return (words.length ? words : name.split(/\s+/))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

function ProjectCard({ project, delay }) {
  const featured = Boolean(project.featured);
  const body = (
    <div className="pcard__body">
      <div className="pcard__top">
        <span className="pcard__kind">{project.kind}</span>
        <span className="pcard__year">{project.year}</span>
      </div>

      <h3 className="pcard__name">{project.name}</h3>
      <p className="pcard__summary">{project.summary}</p>

      <div className="pcard__tags">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="pcard__links">
        {project.url && (
          <a
            className="plink"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the live ${project.name} site`}
          >
            Live site
            <Icon name="external" size={13} />
          </a>
        )}
        {project.repo && (
          <a
            className="plink plink--muted"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View the ${project.name} source on GitHub`}
          >
            <Icon name="github" size={14} />
            Source code
          </a>
        )}
        {!project.repo && (
          <span className="plink--none" title="Built under contract — the repository stays with the client">
            Private repo
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Reveal
      className={`card card--hover pcard t-${project.accent}${featured ? " pcard--featured" : ""}`}
      delay={delay}
    >
      {featured ? (
        <>
          {body}
          <div className="pcard__visual" aria-hidden="true">
            <span className="pcard__flag">Featured</span>
            <span className="pcard__initials">{initials(project.name)}</span>
          </div>
        </>
      ) : (
        body
      )}
    </Reveal>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <SectionHead
          index="04"
          eyebrow="Projects"
          title="Selected work"
          lede="Client platforms running in production alongside open-source builds you can read line by line. Where a repository is private, it is because the code belongs to the client."
        />

        <Reveal className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={filter === item.id}
              className={`filter${filter === item.id ? " is-active" : ""}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </Reveal>

        <div className="projects__grid" aria-live="polite">
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={60 * i} />
          ))}
        </div>

        <Reveal className="projects__cta">
          <a className="btn btn--outline" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={15} />
            All repositories on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
