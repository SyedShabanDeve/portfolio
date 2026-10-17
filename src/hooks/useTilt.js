import { useEffect, useRef } from "react";
import { finePointer, prefersReducedMotion } from "./motion";

/** Pointer-driven 3D tilt with a moving highlight, via CSS custom properties. */
export function useTilt(max = 10) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReducedMotion()) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.classList.add("is-tilting");
    };
    const leave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}
