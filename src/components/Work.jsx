import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PROFILE, WORK } from "../data/site";
import { useTilt } from "../hooks/useTilt";
import Icon from "./ui/Icon";

const BASE = import.meta.env.BASE_URL;
const PER_PAGE = 4;

/** One site or project in a browser frame. The frame opens the live site. */
function WorkCard({ item, index }) {
  const tilt = useTilt(8);
  const primary = item.url || item.repo;

  return (
    <article className="wcard" style={{ "--h": item.hue ?? 230 }}>
      <a
        className={`site__frame wcard__frame${item.tall ? " is-tall" : ""}`}
        href={primary}
        target="_blank"
        rel="noreferrer"
        ref={tilt}
        data-cursor={item.url ? "Visit" : "Code"}
        aria-label={`Open ${item.name}${item.url ? "" : " on GitHub"} in a new tab`}
      >
        <span className="site__bar" aria-hidden="true">
          <span className="site__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="site__url">
            <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
              <path d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            {item.domain}
          </span>
        </span>
        <span className="site__screen">
          {item.image ? (
            <img src={`${BASE}${item.image}`} alt={`Screenshot of ${item.name}`} decoding="async" fetchPriority="low" width="800" />
          ) : (
            <span className="site__art" aria-hidden="true">
              <span className="site__art-name">{item.name}</span>
              <span className="site__art-tag">Relaunching soon</span>
            </span>
          )}
        </span>
        <span className="site__glare" aria-hidden="true" />
      </a>

      <div className="wcard__body">
        <p className="wcard__kind">
          <span>{String(index + 1).padStart(2, "0")}</span> {item.kind} · {item.year}
          {item.isNew && <b className="wcard__new">New</b>}
        </p>
        <h3 className="wcard__name">
          <a href={primary} target="_blank" rel="noreferrer" data-cursor={item.url ? "Visit" : "Code"}>
            {item.name}
          </a>
        </h3>
        <p className="wcard__summary">{item.summary}</p>
        <ul className="chips chips--sm">
          {item.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="wcard__links">
          {item.url && (
            <a href={item.url} target="_blank" rel="noreferrer" data-cursor="Visit">
              Live site <Icon name="external" size={13} />
              <span className="sr-only"> for {item.name} (opens in a new tab)</span>
            </a>
          )}
          {item.repo && (
            <a href={item.repo} target="_blank" rel="noreferrer" data-cursor="Code">
              <Icon name="github" size={13} /> Code
              <span className="sr-only"> for {item.name} on GitHub (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const section = useRef(null);
  const track = useRef(null);
  const pageRef = useRef(0);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(WORK.length / PER_PAGE);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray(".wcard", track.current);
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
      // progress values where each group of four starts, so the row snaps 4 by 4
      const stops = () => {
        const d = distance() || 1;
        const pts = [];
        for (let i = 0; i < cards.length; i += PER_PAGE) {
          pts.push(Math.min(1, (cards[i].offsetLeft - cards[0].offsetLeft) / d));
        }
        if (pts[pts.length - 1] < 1) pts.push(1);
        return pts;
      };

      const scroll = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance() * 1.2}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          snap: {
            snapTo: (value) => {
              const pts = stops();
              return pts.reduce((best, p) => (Math.abs(p - value) < Math.abs(best - value) ? p : best), pts[0]);
            },
            duration: { min: 0.35, max: 0.9 },
            ease: "power3.inOut",
            delay: 0.08,
          },
          onUpdate: (self) => {
            const pts = stops();
            let idx = 0;
            pts.forEach((p, i) => {
              if (self.progress >= p - 0.02) idx = i;
            });
            idx = Math.min(idx, pages - 1);
            if (idx !== pageRef.current) {
              pageRef.current = idx;
              setPage(idx);
            }
          },
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -38, z: -220, opacity: 0.25 },
          {
            rotateY: 0,
            z: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left 105%", end: "left 70%", scrub: true },
          }
        );
      });
      gsap.to(".work__bar i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance() * 1.2}`, scrub: true },
      });
    });
    return () => mm.revert();
  }, [pages]);

  return (
    <section id="projects" className="work" ref={section} aria-labelledby="projects-title">
      <div className="work__head container">
        <div>
          <p className="eyebrow">
            <span>04</span> All work
          </p>
          <h2 className="title" id="projects-title">
            Live websites and <em>projects</em>
          </h2>
        </div>
        <div className="work__side">
          <p className="work__hint">
            Client sites and my own products, all live. Click a frame to open the site. More code on{" "}
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
          <p className="work__pager" aria-hidden="true">
            <b>{String(page + 1).padStart(2, "0")}</b> / {String(pages).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="work__viewport">
        <div className="work__track" ref={track}>
          {WORK.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
      <div className="work__bar container" aria-hidden="true">
        <i />
      </div>
    </section>
  );
}
