import { useEffect } from "react";
import { NAV, PROFILE } from "../data/site";
import Icon from "./ui/Icon";

const RESUME_URL = `${import.meta.env.BASE_URL}${PROFILE.resume}`;

export default function Navbar({ active, stuck, theme, onToggleTheme, open, onOpenChange }) {
  // Close the drawer on Escape and once the viewport is wide enough again.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => e.key === "Escape" && onOpenChange(false);
    const onResize = () => window.innerWidth > 920 && onOpenChange(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onOpenChange]);

  const go = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    onOpenChange(false);
  };

  const links = NAV.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={`nav__link${active === item.id ? " is-active" : ""}`}
      aria-current={active === item.id ? "true" : undefined}
      onClick={(e) => go(e, item.id)}
    >
      {item.label}
    </a>
  ));

  return (
    <>
      <header className={`nav${stuck ? " is-stuck" : ""}`}>
        <div className="container nav__inner">
          <a className="brand" href="#home" onClick={(e) => go(e, "home")} aria-label="Back to top">
            <span className="brand__mark" aria-hidden="true">
              SA
            </span>
            <span className="brand__text">
              <span className="brand__name">{PROFILE.fullName}</span>
              <span className="brand__role">{PROFILE.title}</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {links}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
            </button>

            <a className="btn btn--primary btn--sm" href="#contact" onClick={(e) => go(e, "contact")}>
              Hire me
              <Icon name="arrowRight" size={14} />
            </a>

            <button
              type="button"
              className={`nav__toggle${open ? " is-open" : ""}`}
              onClick={() => onOpenChange(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`drawer${open ? " is-open" : ""}`}>
        {links}
        <div className="drawer__cta">
          <a className="btn btn--primary" href="#contact" onClick={(e) => go(e, "contact")}>
            Hire me
            <Icon name="arrowRight" size={14} />
          </a>
          <a className="btn btn--outline" href={RESUME_URL} download>
            <Icon name="download" size={15} />
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}
