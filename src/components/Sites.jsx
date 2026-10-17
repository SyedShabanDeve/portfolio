import { SITES } from "../data/site";
import { useTilt } from "../hooks/useTilt";
import Icon from "./ui/Icon";

const BASE = import.meta.env.BASE_URL;

/** A live client site in a browser frame; tall screenshots scroll on hover. */
function SiteCard({ site, index }) {
  const tilt = useTilt(6);

  return (
    <article className="site" data-reveal="tilt" style={{ "--h": site.hue ?? 230 }}>
      <a
        className={`site__frame${site.tall ? " is-tall" : ""}`}
        href={site.url}
        target="_blank"
        rel="noreferrer"
        ref={tilt}
        data-cursor="Visit"
        aria-label={`Open ${site.domain} in a new tab`}
      >
        <span className="site__bar" aria-hidden="true">
          <span className="site__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="site__url">
            <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
              <path d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            {site.domain}
          </span>
          <Icon name="external" size={13} />
        </span>
        <span className="site__screen">
          {site.image ? (
            <img src={`${BASE}${site.image}`} alt={`Screenshot of ${site.domain}`} loading="lazy" decoding="async" width="800" />
          ) : (
            <span className="site__art" aria-hidden="true">
              <span className="site__art-name">{site.name}</span>
              <span className="site__art-tag">Relaunching soon</span>
            </span>
          )}
        </span>
        <span className="site__glare" aria-hidden="true" />
      </a>

      <div className="site__meta">
        <p className="site__kind">
          <span>{String(index + 1).padStart(2, "0")}</span> {site.kind} · {site.year}
        </p>
        <h3 className="site__name">{site.name}</h3>
        <p className="site__summary">{site.summary}</p>
        <div className="site__foot">
          <ul className="chips chips--sm">
            {site.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <a className="site__visit" href={site.url} target="_blank" rel="noreferrer" data-cursor="Visit">
            {site.domain} <Icon name="external" size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Sites() {
  return (
    <section id="websites" className="section sites">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>04</span> Live websites
        </p>
        <div className="sites__head">
          <h2 className="title" data-reveal>
            Client sites you can <em>open right now</em>
          </h2>
          <p className="sites__lead" data-reveal>
            Real domains, real clients in Pakistan, the UAE and the United States. Hover a frame to scroll the page.
          </p>
        </div>
        <div className="sites__grid">
          {SITES.map((s, i) => (
            <SiteCard key={s.id} site={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
