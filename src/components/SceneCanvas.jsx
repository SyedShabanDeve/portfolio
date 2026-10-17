import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../hooks/motion";

const readColors = () => {
  const css = getComputedStyle(document.documentElement);
  const v = (name) => css.getPropertyValue(name).trim();
  return { bg: v("--bg"), a: v("--c1"), b: v("--c2"), light: v("--scene-light") === "1" };
};

/**
 * Fixed full-screen WebGL layer. three.js is imported lazily, so the page is
 * readable before the scene has even downloaded; without WebGL the CSS
 * gradient behind it is the fallback.
 */
export default function SceneCanvas({ theme }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let trigger;
    const onPointer = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      sceneRef.current?.setPointer(x, y);
    };

    import("../three/HyperScene.js")
      .then(({ HyperScene }) => {
        if (disposed || !canvasRef.current) return;
        const scene = new HyperScene(canvasRef.current, { reducedMotion: prefersReducedMotion() });
        scene.setTheme(readColors());
        sceneRef.current = scene;
        canvasRef.current.classList.add("is-live");
        trigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => scene.setScroll(self.progress, self.getVelocity()),
        });
      })
      .catch(() => {
        /* no WebGL: the CSS background stays */
      });

    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      disposed = true;
      window.removeEventListener("pointermove", onPointer);
      trigger?.kill();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    // wait one frame so the new theme's CSS variables are applied
    const id = requestAnimationFrame(() => sceneRef.current?.setTheme(readColors()));
    return () => cancelAnimationFrame(id);
  }, [theme]);

  return (
    <div className="scene" aria-hidden="true">
      <canvas ref={canvasRef} className="scene__canvas" />
      <div className="scene__vignette" />
      <div className="scene__grain" />
    </div>
  );
}
