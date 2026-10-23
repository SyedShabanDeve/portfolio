import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../hooks/motion";

const ROWS = [
  ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind"],
  ["Shopify", "WordPress", "WooCommerce", "REST APIs", "JWT Auth", "Vite", "Git"],
];

/** Two counter-running bands whose speed and skew follow the scroll. */
export default function Marquee() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const inners = gsap.utils.toArray(".marquee__inner");
      const loops = inners.map((el, i) =>
        gsap.fromTo(el, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 })
      );
      const skew = gsap.quickTo(".marquee__row", "skewX", { duration: 0.4, ease: "power3" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const speed = 1 + Math.min(6, Math.abs(v) / 250);
          loops.forEach((l) => gsap.to(l, { timeScale: speed * (v < 0 ? -1 : 1), duration: 0.3, overwrite: true }));
          skew(gsap.utils.clamp(-12, 12, v / -220));
          clearTimeout(root.current?._settle);
          if (root.current) {
            root.current._settle = setTimeout(() => {
              loops.forEach((l) => gsap.to(l, { timeScale: 1, duration: 0.8 }));
              skew(0);
            }, 140);
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      {ROWS.map((row, r) => (
        <div key={r} className={`marquee__row marquee__row--${r}`}>
          <div className="marquee__inner">
            {[...row, ...row, ...row, ...row].map((word, i) => (
              <span key={i} className={i % 2 ? "outline" : ""}>
                {word}
                <b>✦</b>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
