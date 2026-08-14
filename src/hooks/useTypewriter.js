import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Types each word out, holds it, deletes it, moves to the next. */
export function useTypewriter(words, { typeSpeed = 78, deleteSpeed = 34, hold = 1900 } = {}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [still] = useState(prefersReducedMotion);

  useEffect(() => {
    if (still) return undefined;

    const word = words[wordIndex];
    const atEnd = charCount === word.length;
    const delay = deleting ? deleteSpeed : atEnd ? hold : typeSpeed;

    const timer = setTimeout(() => {
      if (!deleting && !atEnd) {
        setCharCount((c) => c + 1);
      } else if (!deleting && atEnd) {
        setDeleting(true);
      } else if (deleting && charCount > 0) {
        setCharCount((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, deleting, wordIndex, words, typeSpeed, deleteSpeed, hold, still]);

  if (still) return words[0];
  return words[wordIndex].slice(0, charCount);
}
