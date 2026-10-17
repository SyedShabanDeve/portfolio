import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { EXPERIENCE } from "../data/site";
import { prefersReducedMotion } from "../hooks/motion";

export default function Experience() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline__progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section experience" ref={root}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>03</span> Experience
        </p>
        <h2 className="title" data-reveal>
          Where the work <em>happens</em>
        </h2>

        <ol className="timeline">
          <span className="timeline__line" aria-hidden="true">
            <span className="timeline__progress" />
          </span>
          {EXPERIENCE.map((job) => (
            <li key={job.role + job.period} className="job" data-reveal="tilt">
              <span className={`job__node${job.current ? " is-current" : ""}`} aria-hidden="true" />
              <div className="job__meta">
                <span className="job__period">{job.period}</span>
                <span className="job__type">{job.type}</span>
              </div>
              <div className="job__card glass">
                <h3>
                  {job.role} <span>@ {job.company}</span>
                </h3>
                <p className="job__where">{job.location}</p>
                <ul className="job__bullets">
                  {job.bullets.map((b) => (
                    <li key={b.slice(0, 30)}>{b}</li>
                  ))}
                </ul>
                <ul className="chips chips--sm">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
