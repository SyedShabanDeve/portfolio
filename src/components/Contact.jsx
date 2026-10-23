import { useState } from "react";
import { PROFILE } from "../data/site";
import ContactForm from "./ContactForm";
import Icon from "./ui/Icon";
import { Magnetic, SplitChars } from "./ui/Motion";

const BASE = import.meta.env.BASE_URL;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const links = [
    { icon: "linkedin", label: "LinkedIn", value: `in/${PROFILE.linkedinHandle}`, href: PROFILE.linkedin },
    { icon: "whatsapp", label: "WhatsApp", value: PROFILE.phone, href: PROFILE.whatsapp },
    { icon: "github", label: "GitHub", value: PROFILE.githubHandle, href: PROFILE.github },
    { icon: "phone", label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
    { icon: "download", label: "CV", value: "PDF, one page", href: `${BASE}${PROFILE.resume}`, download: true },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>06</span> Contact
        </p>
        <h2 className="contact__title" data-reveal>
          <SplitChars text="Let's build" />
          <br />
          <SplitChars text="something real." className="outline" />
        </h2>

        <div className="contact__grid">
          <div className="contact__left" data-reveal>
            <p className="contact__lead">
              Hiring for a full stack, MERN, Shopify or WordPress role, or need a site or store built? Email or WhatsApp is the fastest way to reach me.
            </p>
            <div className="contact__email">
              <Magnetic className="contact__mail" href={`mailto:${PROFILE.email}`} data-cursor="Mail">
                {PROFILE.email}
              </Magnetic>
              <button type="button" className="btn btn--ghost btn--sm" onClick={copy} aria-live="polite">
                <Icon name={copied ? "check" : "copy"} size={14} /> {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <ul className="contact__links">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.download ? { download: true } : { target: l.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" })}
                    className="glass"
                  >
                    <Icon name={l.icon} size={18} />
                    <span>
                      <small>{l.label}</small>
                      {l.value}
                    </span>
                    <Icon name="arrowRight" size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="contact__form glass" data-reveal="tilt">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
