import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view, then disconnects so no
 * observer is left running for content the visitor has already passed.
 */
export function useInView({ threshold = 0.16, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  // Without IntersectionObserver everything starts visible rather than hidden.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
