import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

const EMAIL    = "syedshaban785@gmail.com";
const PHONE    = "+92 307 941 5512";
const GITHUB   = "https://github.com/SyedShabanDeve";
const LINKEDIN = "https://www.linkedin.com/in/syedshaban785";

const SKILLS = [
  { cat: "Frontend", items: [
    { name: "React.js",      pct: 90 },
    { name: "JavaScript ES6+", pct: 88 },
    { name: "TypeScript",    pct: 72 },
    { name: "Tailwind CSS",  pct: 92 },
    { name: "Bootstrap 5",   pct: 90 },
    { name: "HTML5 / CSS3",  pct: 95 },
  ]},
  { cat: "Backend", items: [
    { name: "Node.js",       pct: 85 },
    { name: "Express.js",    pct: 85 },
    { name: "REST APIs",     pct: 88 },
    { name: "JWT Auth",      pct: 86 },
    { name: "MongoDB",       pct: 80 },
    { name: "Git / GitHub",  pct: 87 },
  ]},
  { cat: "CMS & More", items: [
    { name: "WordPress",         pct: 93 },
    { name: "WooCommerce",       pct: 90 },
    { name: "Brilliant Directory", pct: 85 },
    { name: "Plugin Dev",        pct: 82 },
    { name: "Child Themes",      pct: 90 },
    { name: "Performance Tuning", pct: 80 },
  ]},
];

const EXPERIENCE = [
  {
    period: "Jan 2024 – Present",
    role: "MERN Stack Developer",
    company: "Private Firm",
    type: "Full-time",
    bullets: [
      "Architect production React apps with reusable component systems",
      "Build secure RESTful APIs — JWT auth, RBAC, refresh-token blacklisting",
      "MongoDB schema design, query optimisation, Axios interceptor patterns",
      "Lead code reviews and drive performance improvements across the stack",
    ],
  },
  {
    period: "Jun 2023 – Dec 2023",
    role: "Web Development Intern",
    company: "Sani IT Consultant",
    type: "Internship",
    bullets: [
      "Six-month programme covering HTML/CSS/JS and introductory React",
      "Contributed to live client projects under senior developer supervision",
      "WordPress theme customisation and plugin configuration",
      "Received official internship certification on completion",
    ],
  },
  {
    period: "2022 – Present",
    role: "Independent Web Developer",
    company: "Freelance",
    type: "Freelance",
    bullets: [
      "Custom WordPress child-themes, bespoke plugins, WooCommerce stores",
      "Brilliant Directory membership & directory platform setups",
      "React / Tailwind / Bootstrap frontend builds for international clients",
      "End-to-end delivery — scoping, development, deployment, handoff",
    ],
  },
];

/* Live client work — shipped and in production. Source is client-owned/private. */
const PROJECTS = [
  {
    idx: "01",
    name: "The Times of New York",
    type: "Full-Stack News Platform",
    desc: "Production news publication with ReactQuill editor, JWT admin dashboard, role-based access, SEO scoring, draft management, and full CRUD for posts, categories, and users.",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    url: "https://www.thetimesofnewyork.com",
    color: "#e63946",
  },
  {
    idx: "02",
    name: "UFO R UAE",
    type: "WordPress · E-Commerce",
    desc: "UAE-based WooCommerce store with bespoke child-theme, custom plugin integrations, payment gateways, and performance-tuned product catalogue.",
    tags: ["WordPress", "WooCommerce", "PHP", "CSS"],
    url: "https://www.uforuae.com",
    color: "#457b9d",
  },
  {
    idx: "03",
    name: "United States of Dollars",
    type: "WordPress · Finance",
    desc: "Custom WordPress build with bespoke theme development, third-party API connections, order workflows, and extensive front-end performance tuning.",
    tags: ["WordPress", "JS", "CSS", "Plugins"],
    url: "https://www.unitedstatesofdollars.com",
    color: "#2d6a4f",
  },
  {
    idx: "04",
    name: "Sani IT Consultant",
    type: "Corporate · Agency",
    desc: "Corporate website for a Pakistani IT consultancy, built and maintained through the internship period and beyond with ongoing updates.",
    tags: ["WordPress", "HTML", "CSS", "JS"],
    url: "https://saniitconsultant.com",
    color: "#7b2d8b",
  },
];

/* Open-source builds — full source on GitHub so the code can be read directly. */
const OSS_PROJECTS = [
  {
    idx: "05",
    name: "Catchy Storefront",
    type: "React · E-Commerce",
    desc: "Multi-page storefront with a persistent cart (variant-aware by size and colour), category routing, product detail pages, checkout flow, and a content admin panel — all on React 19 and Context state.",
    tags: ["React 19", "React Router", "Context API", "Tailwind"],
    url: "https://syedshabandeve.github.io/catchy-storefront/",
    repo: "https://github.com/SyedShabanDeve/catchy-storefront",
    color: "#d4a853",
  },
  {
    idx: "06",
    name: "Sani Corporate Website",
    type: "React · Corporate",
    desc: "Seven-page corporate site with route-level code splitting via React.lazy and Suspense, scroll and hash restoration on navigation, and a Netlify SPA redirect config.",
    tags: ["React 19", "React Router", "Code Splitting", "Netlify"],
    repo: "https://github.com/SyedShabanDeve/sani-corporate-website",
    color: "#457b9d",
  },
  {
    idx: "07",
    name: "Directory Landing Redesign",
    type: "React · Landing Page",
    desc: "Conversion-focused landing page redesign for a business directory product — animated hero, listings grid, and a how-it-works flow built with Framer Motion.",
    tags: ["React", "Framer Motion", "Tailwind", "Vite"],
    repo: "https://github.com/SyedShabanDeve/directory-landing-redesign",
    color: "#2d6a4f",
  },
];

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useTypewriter(words, speed = 100, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setText(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, charIdx, deleting, wordIdx, words, speed, pause]);
  return text;
}

/* ─── COMPONENTS ────────────────────────────────────────────── */

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, pct, delay }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "0.78rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", color: "var(--c-text2)" }}>{name}</span>
        <span style={{ fontSize: "0.72rem", fontFamily: "'DM Mono', monospace", color: "var(--c-accent)" }}>{pct}%</span>
      </div>
      <div style={{ height: "3px", background: "var(--c-line)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, var(--c-accent), var(--c-accent2))",
          borderRadius: "2px",
          width: visible ? `${pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ p, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={idx * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "var(--c-card-hover)" : "var(--c-card)",
          border: `1px solid ${hovered ? p.color + "55" : "var(--c-line)"}`,
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-8px)" : "none",
          boxShadow: hovered ? `0 24px 48px ${p.color}22` : "none",
          cursor: "default",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Card top bar */}
        <div style={{
          height: "4px",
          background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
        }} />
        <div style={{ padding: "1.6rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3rem",
              fontWeight: 900,
              color: p.color,
              opacity: 0.18,
              lineHeight: 1,
            }}>{p.idx}</span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--c-text3)",
              background: "var(--c-chip)",
              padding: "4px 10px",
              borderRadius: "100px",
            }}>{p.type}</span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--c-text)",
            marginBottom: "0.6rem",
            lineHeight: 1.2,
          }}>{p.name}</h3>
          <p style={{
            fontSize: "0.83rem",
            color: "var(--c-text2)",
            lineHeight: 1.75,
            marginBottom: "1.2rem",
            flex: 1,
          }}>{p.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                padding: "3px 8px",
                borderRadius: "4px",
                border: `1px solid ${p.color}44`,
                color: p.color,
                letterSpacing: "0.06em",
              }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.1rem", alignItems: "center" }}>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                style={{ color: p.color }}
                aria-label={`Visit the live ${p.name} site`}
              >
                Live Site
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                style={{ color: "var(--c-text2)" }}
                aria-label={`View the ${p.name} source code on GitHub`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.82 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
                </svg>
                Source Code
              </a>
            )}
            {!p.repo && p.url && (
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--c-text3)",
                }}
                title="Source belongs to the client and is not public"
              >
                Private repo
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const LABEL_STYLE = {
  display: "block",
  fontFamily: "'DM Mono', monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--c-text3)",
  marginBottom: "8px",
};

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
    setErrors(err => (err[field] ? { ...err, [field]: undefined } : err));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please tell me your name";
    if (!values.email.trim()) next.email = "An email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = "That email address looks invalid";
    if (!values.message.trim()) next.message = "Please add a short message";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.getElementById(`contact-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }

    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`;
    const body = [
      values.message.trim(),
      "",
      "—",
      `Name:  ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "Sent from syedshabandeve.github.io/portfolio",
    ].join("\r\n");

    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "var(--c-bg3)",
        border: "1px solid var(--c-line)",
        borderRadius: "20px",
        padding: "clamp(1.5rem, 5vw, 2.5rem)",
      }}
    >
      <div className="contact-grid">
        <div>
          <label style={LABEL_STYLE} htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            className={`contact-input${errors.name ? " invalid" : ""}`}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && <span className="field-error" id="err-name">{errors.name}</span>}
        </div>
        <div>
          <label style={LABEL_STYLE} htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            className={`contact-input${errors.email ? " invalid" : ""}`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && <span className="field-error" id="err-email">{errors.email}</span>}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={LABEL_STYLE} htmlFor="contact-subject">Subject <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
        <input
          id="contact-subject"
          className="contact-input"
          type="text"
          name="subject"
          placeholder="Project enquiry / Job offer / Collab..."
          value={values.subject}
          onChange={update("subject")}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={LABEL_STYLE} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          className={`contact-input${errors.message ? " invalid" : ""}`}
          rows={5}
          name="message"
          placeholder="Tell me about your project..."
          style={{ resize: "vertical" }}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && <span className="field-error" id="err-message">{errors.message}</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
          </a>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="social-link" aria-label="Call me">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
          </a>
        </div>
        <button className="btn-accent" type="submit">Send Message →</button>
      </div>

      <p
        role="status"
        style={{
          marginTop: "1.25rem",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          lineHeight: 1.7,
          letterSpacing: "0.04em",
          color: sent ? "var(--c-gold)" : "var(--c-text3)",
        }}
      >
        {sent
          ? `Your email client should now be open with the message ready. If nothing happened, write to ${EMAIL} directly.`
          : `This opens your email app with the message pre-filled — or email ${EMAIL} directly.`}
      </p>
    </form>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState(0);
  const typed = useTypewriter(["MERN Stack Developer", "WordPress Specialist", "Full Stack Engineer", "React Developer"]);

  /* track active section */
  useEffect(() => {
    const ids = NAV.map(n => n.toLowerCase());
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  /* close the mobile drawer on Escape, and when resizing back up to desktop */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── RENDER ── */
  return (
    <div className="grain" style={{ minHeight: "100vh", position: "relative" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(1rem, 4vw, 2rem)", height: "var(--nav-h)",
        background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--c-line)",
      }}>
        <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} aria-label="Home">
          <img src="/logo.svg" alt="SA" style={{ width: 36, height: 36, display: 'block' }} />
        </a>
        <div className="nav-desktop">
          {NAV.map(n => (
            <button
              key={n}
              className={`nav-pill${activeSection === n.toLowerCase() ? " active" : ""}`}
              onClick={() => scrollTo(n.toLowerCase())}
            >{n}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="mailto:syedshaban785@gmail.com?subject=Job%20opportunity%20for%20Syed%20Shaban%20Ahmad" className="nav-cta">Hire Me</a>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE NAV DRAWER ── */}
      <div id="mobile-nav" className={`nav-drawer${menuOpen ? " open" : ""}`}>
        {NAV.map(n => (
          <button
            key={n}
            className={`nav-pill${activeSection === n.toLowerCase() ? " active" : ""}`}
            onClick={() => scrollTo(n.toLowerCase())}
          >{n}</button>
        ))}
        <a
          href="mailto:syedshaban785@gmail.com?subject=Job%20opportunity%20for%20Syed%20Shaban%20Ahmad"
          className="nav-cta"
          style={{ marginTop: "0.6rem", textAlign: "center", padding: "12px 14px" }}
          onClick={() => setMenuOpen(false)}
        >Hire Me</a>
      </div>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: "60px" }}>
        {/* Glows */}
        <div className="hero-glow" style={{ width: "600px", height: "600px", background: "radial-gradient(circle, rgba(230,57,70,0.18) 0%, transparent 70%)", top: "10%", left: "60%" }} />
        <div className="hero-glow" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 70%)", bottom: "20%", left: "5%" }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--c-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-line) 1px, transparent 1px)", backgroundSize: "80px 80px", opacity: 0.4 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "6rem 2rem 4rem", width: "100%" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(230,57,70,0.12)", border: "1px solid rgba(230,57,70,0.25)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "2rem",
            animation: "fadeUp 0.6s ease both",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--c-accent)", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-accent)" }}>
              Available for Hire &mdash; Lahore, Pakistan
            </span>
          </div>

          {/* Name */}
          <div style={{ animation: "fadeUp 0.7s ease 0.15s both" }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}>
              <span style={{ color: "var(--c-text)" }}>Syed</span><br />
              <span style={{ color: "var(--c-text)", fontStyle: "italic" }}>Shaban</span><br />
              <span style={{
                WebkitTextStroke: "1px rgba(240,237,230,0.2)",
                color: "transparent",
                fontStyle: "normal",
              }}>Ahmad</span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div style={{ animation: "fadeUp 0.7s ease 0.3s both", margin: "2rem 0" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              background: "var(--c-bg3)", border: "1px solid var(--c-line2)",
              borderRadius: "10px", padding: "12px 20px",
            }}>
              <span style={{ color: "var(--c-accent)", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>&gt;_</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", color: "var(--c-text)", minWidth: "260px" }}>
                {typed}<span className="cursor-blink" style={{ color: "var(--c-accent)" }}>|</span>
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p style={{
            animation: "fadeUp 0.7s ease 0.45s both",
            maxWidth: "540px", fontSize: "1rem", color: "var(--c-text2)",
            lineHeight: 1.8, fontWeight: 300, marginBottom: "2.5rem",
          }}>
            Building production-grade web applications — from secure MERN backends to custom WordPress ecosystems. Three years of real-world delivery across Pakistan and internationally.
          </p>

          {/* Stats row */}
          <div style={{
            animation: "fadeUp 0.7s ease 0.55s both",
            display: "flex", gap: "2.5rem", flexWrap: "wrap",
            padding: "1.5rem 0", borderTop: "1px solid var(--c-line)", borderBottom: "1px solid var(--c-line)",
            marginBottom: "2.5rem",
          }}>
            {[["3+","Years XP"], ["10+","Projects"], ["3.4","GPA /4.0"], ["2","Countries"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 900, color: "var(--c-accent)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-text3)", marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* CTA + socials */}
          <div style={{ animation: "fadeUp 0.7s ease 0.65s both", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <button className="btn-accent" onClick={() => scrollTo("projects")}>View Projects →</button>
            <a href="mailto:syedshaban785@gmail.com" style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.08em",
              color: "var(--c-text2)", textDecoration: "none", borderBottom: "1px solid var(--c-line2)",
              paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
            }}>syedshaban785@gmail.com</a>
            <div style={{ display: "flex", gap: "8px" }}>
              <a href="https://www.linkedin.com/in/syedshaban785" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://github.com/SyedShabanDeve" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Big ghost text */}
        <div style={{
          position: "absolute", right: "-2%", bottom: "0", zIndex: 0,
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(12rem, 24vw, 22rem)", lineHeight: 1,
          color: "rgba(230,57,70,0.04)", userSelect: "none", pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}>DEV</div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "clamp(4rem, 10vw, 6rem) clamp(1.25rem, 5vw, 2rem)", background: "var(--c-bg2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.5rem" }}>// 002 Technical Skills</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "2.5rem", lineHeight: 1.1 }}>What I Build With</h2>
          </Reveal>

          {/* Skill tabs */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "2.5rem", flexWrap: "wrap" }}>
              {SKILLS.map((s, i) => (
                <button key={s.cat} className={`skill-tab${activeSkillCat === i ? " active" : ""}`} onClick={() => setActiveSkillCat(i)}>{s.cat}</button>
              ))}
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {SKILLS[activeSkillCat].items.map((sk, i) => (
              <div key={sk.name} style={{
                background: "var(--c-bg3)", border: "1px solid var(--c-line)",
                borderRadius: "12px", padding: "1.2rem 1.4rem",
              }}>
                <SkillBar name={sk.name} pct={sk.pct} delay={i * 0.08} />
              </div>
            ))}
          </div>

          {/* Tech pill cloud */}
          <Reveal delay={0.2}>
            <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["React.js","Node.js","MongoDB","Express.js","JWT","TypeScript","WordPress","WooCommerce","Tailwind","Bootstrap","REST APIs","Git","Brilliant Dir.","HTML5","CSS3","JavaScript"].map(t => (
                <span key={t} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.08em",
                  padding: "5px 12px", borderRadius: "100px",
                  border: "1px solid var(--c-line2)", color: "var(--c-text2)",
                  transition: "all 0.2s",
                }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "clamp(4rem, 10vw, 6rem) clamp(1.25rem, 5vw, 2rem)", background: "var(--c-bg)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.5rem" }}>// 003 Career History</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "3rem", lineHeight: 1.1 }}>Experience</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.12}>
                <div style={{
                  background: "var(--c-bg3)", border: "1px solid var(--c-line)",
                  borderRadius: "16px", padding: "1.8rem", height: "100%",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, var(--c-accent), transparent)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "var(--c-text3)",
                    }}>{e.period}</span>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", padding: "3px 10px",
                      borderRadius: "100px", border: "1px solid var(--c-line2)", color: "var(--c-text3)",
                    }}>{e.type}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "4px" }}>{e.role}</h3>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "var(--c-accent)", letterSpacing: "0.08em", marginBottom: "1.2rem" }}>{e.company}</p>
                  <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                    {e.bullets.map(b => (
                      <li key={b} style={{ display: "flex", gap: "10px", fontSize: "0.83rem", color: "var(--c-text2)", marginBottom: "0.55rem", lineHeight: 1.65 }}>
                        <span style={{ color: "var(--c-accent)", flexShrink: 0, marginTop: "2px" }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education card */}
          <Reveal delay={0.2}>
            <div style={{
              marginTop: "1.5rem",
              background: "linear-gradient(135deg, rgba(230,57,70,0.08), rgba(212,168,83,0.06))",
              border: "1px solid rgba(230,57,70,0.2)", borderRadius: "16px",
              padding: "1.8rem 2rem",
              display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap",
            }}>
              <div style={{ fontSize: "2.5rem" }}>🎓</div>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "4px" }}>Education</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700 }}>BS Computer Science — Riphah International University</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--c-text2)", marginTop: "4px" }}>GPA: <strong style={{ color: "var(--c-gold)" }}>3.4 / 4.0</strong> &nbsp;·&nbsp; Final Semester &nbsp;·&nbsp; Graduating 2026</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "clamp(4rem, 10vw, 6rem) clamp(1.25rem, 5vw, 2rem)", background: "var(--c-bg2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.5rem" }}>// 004 Portfolio</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.1 }}>Live Projects</h2>
            <p style={{ fontSize: "0.92rem", color: "var(--c-text2)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: "620px" }}>
              Client work currently running in production. These repositories are owned by the clients, so the source stays private &mdash; the live sites are linked below.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.idx} p={p} idx={i} />)}
          </div>

          {/* Open-source work — readable code for anyone reviewing */}
          <Reveal>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 700, marginTop: "4.5rem", marginBottom: "1rem", lineHeight: 1.1 }}>Open Source</h2>
            <p style={{ fontSize: "0.92rem", color: "var(--c-text2)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "620px" }}>
              Builds I own outright, with the full source published on GitHub &mdash; read the components, state handling and routing directly.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {OSS_PROJECTS.map((p, i) => <ProjectCard key={p.idx} p={p} idx={i} />)}
          </div>

          <Reveal delay={0.15}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <a href="https://github.com/SyedShabanDeve" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.82 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
                </svg>
                See all repositories
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "clamp(4rem, 10vw, 6rem) clamp(1.25rem, 5vw, 2rem)", background: "var(--c-bg)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.5rem" }}>// 005 Get In Touch</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.1 }}>Let's Work Together</h2>
            <p style={{ fontSize: "0.95rem", color: "var(--c-text2)", lineHeight: 1.8, marginBottom: "3rem" }}>Open to full-time roles and freelance projects. I typically respond within a few hours.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ textAlign: "center", marginTop: "2rem", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", color: "var(--c-text3)" }}>
              +92 307 941 5512 &nbsp;·&nbsp; syedshaban785@gmail.com &nbsp;·&nbsp; Lahore, Pakistan
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign: "center", padding: "1.5rem",
        background: "var(--c-bg2)", borderTop: "1px solid var(--c-line)",
        fontFamily: "'DM Mono', monospace", fontSize: "0.68rem",
        letterSpacing: "0.1em", color: "var(--c-text3)",
      }}>
        © 2026 &nbsp;·&nbsp; Syed Shaban Ahmad &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; Lahore, Pakistan
      </footer>
    </div>
  );
}
