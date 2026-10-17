import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

/** Scroll to a section id (or the top) through Lenis when it is running. */
export function scrollToId(id) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: id === "top" ? 0 : -70, duration: 1.4 });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

/** Velocity of the last scroll frame, for effects that react to speed. */
export function scrollVelocity() {
  return lenis ? lenis.velocity : 0;
}

/**
 * Lenis drives the scroll, GSAP's ticker drives Lenis, and ScrollTrigger
 * listens to Lenis, so every scroll-linked animation runs on one clock.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // same-page anchors go through Lenis too
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      event.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
