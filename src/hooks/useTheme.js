import { useCallback, useEffect, useState } from "react";
import { THEMES } from "../data/site";

const STORAGE_KEY = "ssa-theme";
const IDS = THEMES.map((t) => t.id);

/** Older visits stored "dark" / "light"; map them onto the new themes. */
const normalise = (value) => {
  if (value === "dark") return "nebula";
  if (value === "light") return "daylight";
  return IDS.includes(value) ? value : null;
};

const readStored = () => {
  try {
    return normalise(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

/**
 * Reads the theme the inline boot script in index.html already applied, and
 * keeps <html data-theme>, the browser chrome colour and storage in sync.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(
    () => normalise(document.documentElement.dataset.theme) || readStored() || "nebula"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg || "#05050a");
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (!IDS.includes(next)) return;
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private browsing: the choice just will not persist */
    }
  }, []);

  return [theme, setTheme];
}
