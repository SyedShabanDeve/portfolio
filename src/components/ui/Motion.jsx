import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { finePointer, prefersReducedMotion } from "../../hooks/motion";

/** Pulls toward the pointer while hovered, springs back on leave. */
export function Magnetic({ as: Tag = "a", strength = 0.35, className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReducedMotion()) return undefined;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.4)" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

const GLYPHS = "!<>-_/[]{}=+*^?#01ABCDEF";

/** Cycles through words with a decode / scramble transition. */
export function Scramble({ words, interval = 2800 }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return undefined;
    let index = 0;
    let raf;
    const run = (from, to) => {
      const len = Math.max(from.length, to.length);
      const queue = Array.from({ length: len }, (_, k) => {
        const start = Math.floor(Math.random() * 18);
        return { from: from[k] || "", to: to[k] || "", start, end: start + 6 + Math.floor(Math.random() * 18), ch: "" };
      });
      let frame = 0;
      const step = () => {
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            done += 1;
            out += q.to;
          } else if (frame >= q.start) {
            if (!q.ch || Math.random() < 0.3) q.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            out += q.ch;
          } else {
            out += q.from;
          }
        }
        setText(out);
        if (done < queue.length) {
          frame += 1;
          raf = requestAnimationFrame(step);
        }
      };
      step();
    };
    const timer = setInterval(() => {
      const from = words[index];
      index = (index + 1) % words.length;
      run(from, words[index]);
    }, interval);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [words, interval]);

  return (
    <>
      <span className="scramble" aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}

/** Text split into per-character spans for staggered entrances. */
export function SplitChars({ text, className = "" }) {
  const words = text.split(" ");
  const offsets = words.map((_, w) => words.slice(0, w).join("").length);
  return (
    <span className={`split ${className}`} aria-label={text} role="text">
      {words.map((word, w) => (
        // words stay whole so lines only ever break between them
        <span key={w} className="split__word" aria-hidden="true">
          {[...word].map((c, i) => (
            <span key={i} className="char" style={{ "--i": offsets[w] + i }}>
              {c}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/** Text split into words; [data-words] blocks light up word by word on scroll. */
export function SplitWords({ text }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="word">
      {w}{" "}
    </span>
  ));
}
