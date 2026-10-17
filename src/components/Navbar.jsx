import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV, PROFILE, THEMES } from "../data/site";
import Icon from "./ui/Icon";
import Logo from "./ui/Logo";

const BASE = import.meta.env.BASE_URL;

function ThemeDots({ theme, onChange }) {
  return (
    <div className="themes" role="radiogroup" aria-label="Colour theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          aria-label={`${t.label} theme`}
          title={t.label}
          className={`themes__dot${theme === t.id ? " is-on" : ""}`}
          style={{ "--a": t.swatch[0], "--b": t.swatch[1] }}
          onClick={() => onChange(t.id)}
        />
      ))}
    </div>
  );
}

export default function Navbar({ active, theme, onTheme }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stuck, setStuck] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setStuck(self.scroll() > 40);
        setHidden(self.direction === 1 && self.scroll() > 600);
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    menuRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`nav${stuck ? " is-stuck" : ""}${hidden && !open ? " is-hidden" : ""}`}>
      <div className="nav__inner">
        <a className="nav__logo" href="#home" aria-label={`${PROFILE.fullName}, back to top`} data-cursor="Top">
          <Logo size={40} className="nav__mark" />
          <span className="nav__word">
            <span className="nav__name">Syed Shaban Ahmad</span>
            <span className="nav__role">Full Stack Developer</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} className={active === item.id ? "is-active" : ""}>
              <span className="nav__num">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <ThemeDots theme={theme} onChange={onTheme} />
          <a className="btn btn--ghost btn--sm nav__cv" href={`${BASE}${PROFILE.resume}`} download data-cursor="CV">
            <Icon name="download" size={14} /> CV
          </a>
          <button
            type="button"
            className={`nav__burger${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="menu" ref={menuRef} className={`menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} style={{ "--i": i }}>
              <span className="nav__num">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <ThemeDots theme={theme} onChange={onTheme} />
          <a href={`${BASE}${PROFILE.resume}`} download className="btn btn--primary">
            <Icon name="download" size={15} /> Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
