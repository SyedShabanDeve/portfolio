import { NAV, PROFILE } from "../data/site";
import Icon from "./ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  const go = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="brand">
              <span className="brand__mark" aria-hidden="true">
                SA
              </span>
              <span className="brand__text">
                <span className="brand__name">{PROFILE.fullName}</span>
                <span className="brand__role">
                  {PROFILE.title} · {PROFILE.subtitle}
                </span>
              </span>
            </span>
            <p className="footer__blurb">
              Building production web applications from Lahore for clients in Pakistan, the UAE and
              the United States. {PROFILE.availability}.
            </p>
          </div>

          <div>
            <h4>Navigate</h4>
            <div className="footer__list">
              {NAV.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Elsewhere</h4>
            <div className="footer__list">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <a href={`${import.meta.env.BASE_URL}${PROFILE.resume}`} download>
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {PROFILE.fullName} · {PROFILE.location}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="code" size={13} />
            Hand-built with React &amp; Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
