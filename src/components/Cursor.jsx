import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { finePointer, prefersReducedMotion } from "../hooks/motion";

const INTERACTIVE = "a, button, [data-cursor], label, summary";

/** Dot plus a lagging ring that grows over anything clickable. Mouse only. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled] = useState(() => finePointer() && !prefersReducedMotion());

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      root.classList.add("cursor-on");
    };
    const over = (e) => {
      const target = e.target.closest?.(INTERACTIVE);
      ring.current?.classList.toggle("is-hover", Boolean(target));
      setLabel(target?.dataset?.cursor || "");
    };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");
    const leave = () => root.classList.remove("cursor-on");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      root.classList.remove("has-cursor", "cursor-on");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className={`cursor-ring${label ? " has-label" : ""}`} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}
