import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../hooks/motion";

const DURATION = 1900;
const ease = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Boot screen: a counter while a CSS hypercube unfolds, then it wipes away.
 * Skipped entirely for reduced motion, and capped so it can never hang.
 */
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? "gone" : "loading"));

  useEffect(() => {
    if (phase === "gone") {
      onDone();
      return undefined;
    }
    if (phase !== "loading") return undefined;

    let raf;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(ease(t) * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else setPhase("leaving");
    };
    raf = requestAnimationFrame(step);
    // background tabs pause rAF; never keep the page behind the loader
    const safety = setTimeout(() => setPhase("leaving"), DURATION + 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [phase, onDone]);

  useEffect(() => {
    if (phase !== "leaving") return undefined;
    onDone();
    const t = setTimeout(() => setPhase("gone"), 1100);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  if (phase === "gone") return null;

  return (
    <div className={`loader${phase === "leaving" ? " is-leaving" : ""}`} role="status" aria-label="Loading">
      <div className="loader__cube" aria-hidden="true">
        <div className="cube cube--outer">
          {["f", "b", "l", "r", "t", "d"].map((f) => (
            <span key={f} className={`cube__face cube__face--${f}`} />
          ))}
        </div>
        <div className="cube cube--inner">
          {["f", "b", "l", "r", "t", "d"].map((f) => (
            <span key={f} className={`cube__face cube__face--${f}`} />
          ))}
        </div>
      </div>
      <p className="loader__label">
        <span>Entering the fourth dimension</span>
        <span className="loader__count">{String(count).padStart(3, "0")}</span>
      </p>
      <div className="loader__bar" style={{ "--p": count / 100 }} />
    </div>
  );
}
