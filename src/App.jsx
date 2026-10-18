import { useCallback, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./components/About";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import SceneCanvas from "./components/SceneCanvas";
import SideRail from "./components/SideRail";
import Skills from "./components/Skills";
import Work from "./components/Work";
import { NAV } from "./data/site";
import { prefersReducedMotion } from "./hooks/motion";
import { useActiveSection } from "./hooks/useActiveSection";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useTheme } from "./hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

/* Module scope keeps the reference stable across renders. */
const SECTION_IDS = ["home", ...NAV.map((item) => item.id)];

/** Scroll-driven entrances shared by every section. */
function useReveals(ready) {
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const tilt = el.dataset.reveal === "tilt";
        gsap.from(el, {
          opacity: 0,
          y: tilt ? 90 : 50,
          rotateX: tilt ? -38 : 0,
          transformPerspective: 1100,
          transformOrigin: "50% 0%",
          duration: 1.25,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray("[data-words]").forEach((block) => {
        gsap.fromTo(
          block.querySelectorAll(".word"),
          { opacity: 0.1, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: block, start: "top 85%", end: "bottom 50%", scrub: true },
          }
        );
      });

      gsap.utils.toArray(".contact__title .char").forEach((ch, i) => {
        gsap.from(ch, {
          yPercent: 110,
          rotateZ: 8,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          delay: i * 0.025,
          scrollTrigger: { trigger: ".contact__title", start: "top 85%", once: true },
        });
      });
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const [ready, setReady] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const onLoaded = useCallback(() => setReady(true), []);

  useSmoothScroll();
  useReveals(ready);

  return (
    <>
      <Loader onDone={onLoaded} />
      <SceneCanvas theme={theme} />
      <Cursor />

      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <span className="progress" aria-hidden="true" />

      <Navbar active={active} theme={theme} onTheme={setTheme} />
      <SideRail />

      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
