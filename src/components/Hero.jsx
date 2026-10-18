import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { PROFILE, STATS } from "../data/site";
import { prefersReducedMotion } from "../hooks/motion";
import Icon from "./ui/Icon";
import { Magnetic, Scramble, SplitChars } from "./ui/Motion";

const BASE = import.meta.env.BASE_URL;

export default function Hero({ ready }) {
  const root = useRef(null);
  const reduced = prefersReducedMotion();

  // hide the entrance targets before the first paint, behind the loader
  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.set(".hero .char", { yPercent: 115, rotateX: -80, opacity: 0 });
      gsap.set("[data-hero]", { y: 40, opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!ready || reduced) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(".hero .char", {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.035,
      }).to("[data-hero]", { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08 }, "-=0.9");

      // count the stats up once they are on screen
      root.current.querySelectorAll("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: end > 1000 ? end - 30 : 0 };
        tl.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.v);
          },
        }, "<0.05");
      });

      // the name drifts apart a little as the hero scrolls away
      gsap.to(".hero__line--a", { xPercent: -8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__line--b", { xPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section id="home" className="hero" ref={root} aria-label="Introduction">
      <div className="container hero__grid">
        <p className="hero__status" data-hero>
          <span className="pulse" aria-hidden="true" />
          {PROFILE.availability} · {PROFILE.location}
        </p>

        <h1 className="hero__name">
          <span className="hero__line hero__line--a">
            <SplitChars text={PROFILE.firstName} />
            <SplitChars text={PROFILE.middleName} />
          </span>
          <span className="hero__line hero__line--b">
            <SplitChars text={PROFILE.lastName} className="outline" />
            <span className="hero__role" data-hero>
              <span className="hero__role-label">currently</span>
              <Scramble words={PROFILE.roles} />
            </span>
          </span>
        </h1>

        <p className="hero__tagline" data-hero>
          {PROFILE.tagline}
        </p>

        <div className="hero__cta" data-hero>
          <Magnetic className="btn btn--primary btn--lg" href="#work" data-cursor="Go">
            See the work <Icon name="arrowRight" size={16} />
          </Magnetic>
          <Magnetic className="btn btn--ghost btn--lg" href={`${BASE}${PROFILE.resume}`} download data-cursor="PDF">
            <Icon name="download" size={16} /> Download CV
          </Magnetic>
        </div>

        <dl className="hero__stats" data-hero>
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd>
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <p className="hero__caption" data-hero aria-hidden="true">
          <span>fig. 01</span> Tesseract: a 4D hypercube rotating through the xw, yw and zw planes, projected into 3D in real time. Move the mouse, then scroll.
        </p>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to About" data-hero>
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
