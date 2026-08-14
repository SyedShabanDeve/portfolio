import { useEffect, useState } from "react";

/**
 * Reports whichever section id is closest to the top of the viewport, so the
 * nav highlight stays correct even for short sections a threshold would miss.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.35;
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // Anchor to the last section once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [ids]);

  return active;
}
