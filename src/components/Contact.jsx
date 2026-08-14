import { useState } from "react";
import { PROFILE } from "../data/site";
import ContactForm from "./ContactForm";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

/**
 * The value stays a real link (so mailto/tel still work); copying is its own
 * button rather than a nested control inside the anchor.
 */
function ContactRow({ icon, label, value, href, copyable = false }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the link beside it still works */
    }
  };

  return (
    <div className="contact__row">
      <a className="contact__row-main" href={href}>
        <span className="contact__row-icon">
          <Icon name={icon} size={15} />
        </span>
        <span>
          <span className="contact__row-label">{label}</span>
          <span className="contact__row-value">{value}</span>
        </span>
      </a>

      {copyable && (
        <button type="button" className="contact__copy" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? (
            <>
              <Icon name="check" size={12} /> Copied
            </>
          ) : (
            "Copy"
          )}
        </button>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHead
          index="05"
          eyebrow="Contact"
          title="Let's build something"
          lede={`${PROFILE.availability}. Freelance projects welcome too — tell me what you need and I will come back with a plan.`}
        />

        <div className="contact__grid">
          <Reveal className="contact__panel">
            <span className="badge">
              <span className="dot" />
              {PROFILE.responseTime}
            </span>

            <div className="contact__rows">
              <ContactRow
                icon="mail"
                label="Email"
                value={PROFILE.email}
                href={`mailto:${PROFILE.email}`}
                copyable
              />
              <ContactRow
                icon="phone"
                label="Phone"
                value={PROFILE.phone}
                href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                copyable
              />
              <div className="contact__row">
                <span className="contact__row-main">
                  <span className="contact__row-icon">
                    <Icon name="pin" size={15} />
                  </span>
                  <span>
                    <span className="contact__row-label">Location</span>
                    <span className="contact__row-value">{PROFILE.location} · Remote friendly</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="contact__socials">
              <a
                className="icon-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Icon name="github" size={17} />
              </a>
              <a
                className="icon-btn"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Icon name="linkedin" size={17} />
              </a>
              <a
                className="icon-btn"
                href={`${import.meta.env.BASE_URL}${PROFILE.resume}`}
                download
                aria-label="Download my CV"
              >
                <Icon name="download" size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
