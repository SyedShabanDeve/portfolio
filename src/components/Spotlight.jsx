import { SPOTLIGHT } from "../data/site";
import { useTilt } from "../hooks/useTilt";
import Icon from "./ui/Icon";
import { Magnetic } from "./ui/Motion";

const BASE = import.meta.env.BASE_URL;

/**
 * The newest build as a case study: the live store in a browser frame that
 * pans through the whole homepage on its own, the phone views beside it, and
 * what was built. Sits at #work, so "See the work" lands here first.
 */
export default function Spotlight() {
  const frame = useTilt(6);
  const s = SPOTLIGHT;

  return (
    <section id="work" className="section spotlight" aria-labelledby="spotlight-title">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>04</span> Work
        </p>
        <h2 className="title" id="spotlight-title" data-reveal>
          Latest build: <em>{s.name}</em>
        </h2>

        <div className="spotlight__grid">
          <div className="spotlight__stage" data-reveal="tilt">
            <a
              className="site__frame spotlight__frame"
              href={s.url}
              target="_blank"
              rel="noreferrer"
              ref={frame}
              data-cursor="Visit"
              aria-label={`Open the live ${s.name} store in a new tab`}
            >
              <span className="site__bar" aria-hidden="true">
                <span className="site__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="site__url">
                  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
                    <path d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {s.domain}
                </span>
              </span>
              <span className="site__screen spotlight__screen">
                <img
                  src={`${BASE}${s.image}`}
                  alt={`The ${s.name} homepage, from the hero down to the order steps`}
                  width="800"
                  height="2300"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="site__glare" aria-hidden="true" />
            </a>

            {s.phones.map((src, i) => (
              <figure key={src} className={`spotlight__phone spotlight__phone--${i}`} aria-hidden="true">
                <span className="spotlight__island" />
                <img src={`${BASE}${src}`} alt="" width="390" height="844" loading="lazy" decoding="async" />
              </figure>
            ))}

            <p className="spotlight__live" aria-hidden="true">
              <span className="pulse" />
              Live on Shopify
            </p>
          </div>

          <div className="spotlight__info">
            <p className="spotlight__kind" data-reveal>
              <Icon name="shopify" size={15} />
              {s.kind} · {s.year}
              <span className="spotlight__new">New</span>
            </p>
            <p className="spotlight__summary" data-reveal>
              {s.summary}
            </p>

            <dl className="spotlight__numbers" data-reveal>
              {s.numbers.map((n) => (
                <div key={n.label}>
                  <dt>{n.label}</dt>
                  <dd>{n.value}</dd>
                </div>
              ))}
            </dl>

            <ol className="spotlight__built" data-reveal>
              {s.built.map((item, i) => (
                <li key={item}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>

            <ul className="chips chips--sm" data-reveal>
              {s.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="spotlight__cta" data-reveal>
              <Magnetic className="btn btn--primary" href={s.url} target="_blank" rel="noreferrer" data-cursor="Visit">
                Visit the live store <Icon name="external" size={15} />
              </Magnetic>
              <span className="spotlight__role">{s.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
