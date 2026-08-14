import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ssa-theme";

const readStored = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
};

const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";

/**
 * Reads the theme the inline boot script already applied to <html>, and keeps
 * it in sync with both the toggle and the OS setting.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme || readStored() || systemTheme();
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#fbfaf7" : "#08080b");
  }, [theme]);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!query) return undefined;

    const onChange = (event) => {
      if (!readStored()) setTheme(event.matches ? "light" : "dark");
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private browsing — the choice just will not persist */
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
