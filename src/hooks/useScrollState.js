import { useEffect, useState } from "react";

/**
 * One scroll listener for the whole page: how far down we are (0–1) and
 * whether we have moved past the fold.
 */
export function useScrollState(stuckAfter = 40) {
  const [state, setState] = useState({ progress: 0, stuck: false, past: false });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        progress: max > 0 ? Math.min(scrolled / max, 1) : 0,
        stuck: scrolled > stuckAfter,
        past: scrolled > window.innerHeight * 0.85,
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stuckAfter]);

  return state;
}
