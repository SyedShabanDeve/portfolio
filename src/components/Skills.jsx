import { useEffect, useRef } from "react";
import { SKILL_GROUPS, SPHERE_SKILLS } from "../data/site";
import { prefersReducedMotion } from "../hooks/motion";

/** Tags laid out on a Fibonacci sphere, spun by the pointer, drawn with CSS 3D. */
function SkillSphere({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const tags = [...el.querySelectorAll(".sphere__tag")];
    const n = tags.length;
    const pts = tags.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * Math.PI * (3 - Math.sqrt(5));
      return [Math.cos(th) * r, y, Math.sin(th) * r];
    });

    let vx = 0.0022;
    let vy = 0.0045;
    let tx = vx;
    let ty = vy;
    let raf;
    let visible = true;
    const reduced = prefersReducedMotion();

    const draw = () => {
      const radius = el.clientWidth * 0.4;
      const cx = Math.cos(vx);
      const sx = Math.sin(vx);
      const cy = Math.cos(vy);
      const sy = Math.sin(vy);
      pts.forEach((p, i) => {
        // rotate around X, then Y
        const y1 = p[1] * cx - p[2] * sx;
        const z1 = p[1] * sx + p[2] * cx;
        const x2 = p[0] * cy + z1 * sy;
        const z2 = -p[0] * sy + z1 * cy;
        p[0] = x2;
        p[1] = y1;
        p[2] = z2;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        const t = tags[i];
        t.style.transform = `translate(-50%, -50%) translate3d(${x2 * radius}px, ${y1 * radius}px, 0) scale(${0.55 + depth * 0.7})`;
        t.style.opacity = String(0.18 + depth * 0.82);
        t.style.zIndex = String(Math.round(depth * 100));
        t.style.filter = depth < 0.35 ? "blur(1.5px)" : "none";
      });
    };

    const loop = () => {
      vx += (tx - vx) * 0.05;
      vy += (ty - vy) * 0.05;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      ty = ((e.clientX - r.left) / r.width - 0.5) * 0.05;
      tx = -((e.clientY - r.top) / r.height - 0.5) * 0.05;
    };
    const onLeave = () => {
      tx = 0.0022;
      ty = 0.0045;
    };

    if (reduced) {
      vx = 0;
      vy = 0;
      draw();
      return undefined;
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="sphere" ref={ref} data-cursor="Spin" aria-hidden="true">
      <div className="sphere__core" />
      {items.map((s) => (
        <span key={s} className="sphere__tag">
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>02</span> Skills
        </p>
        <h2 className="title" data-reveal>
          The stack I work in <em>every day</em>
        </h2>

        <div className="skills__grid">
          <SkillSphere items={SPHERE_SKILLS} />
          <div className="skills__groups">
            {SKILL_GROUPS.map((g, i) => (
              <article key={g.id} className="group glass" data-reveal="tilt">
                <header>
                  <span className="group__num">0{i + 1}</span>
                  <h3>{g.label}</h3>
                </header>
                <ul className="chips">
                  {g.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
