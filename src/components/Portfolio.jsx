import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

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
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.75rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: p.color,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Visit Live Site
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </Reveal>
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

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── GLOBAL STYLES injected once ── */
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
      :root {
        --c-bg:       #09090b;
        --c-bg2:      #111113;
        --c-bg3:      #18181b;
        --c-card:     #141416;
        --c-card-hover:#18181d;
        --c-chip:     #1e1e22;
        --c-line:     rgba(255,255,255,0.08);
        --c-line2:    rgba(255,255,255,0.14);
        --c-text:     #f0ede6;
        --c-text2:    rgba(240,237,230,0.55);
        --c-text3:    rgba(240,237,230,0.32);
        --c-accent:   #e63946;
        --c-accent2:  #ff6b6b;
        --c-gold:     #d4a853;
      }
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: var(--c-bg); color: var(--c-text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
      ::selection { background: var(--c-accent); color: #fff; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: var(--c-bg); }
      ::-webkit-scrollbar-thumb { background: var(--c-accent); border-radius: 10px; }

      @keyframes fadeUp   { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      @keyframes blink    { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes grain    { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,1%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(2%,-2%)} 50%{transform:translate(-3%,3%)} }

      .grain::before {
        content: '';
        position: fixed; inset: -50%; z-index: 0; pointer-events: none;
        width: 200%; height: 200%;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
        opacity: 0.025;
        animation: grain 8s steps(10) infinite;
      }

      .hero-glow {
        position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
      }
      .cursor-blink { animation: blink 1s step-end infinite; }
      .nav-pill {
        padding: 6px 16px; border-radius: 100px; font-size: 0.78rem; letter-spacing: 0.08em;
        text-transform: uppercase; font-weight: 500; cursor: pointer; border: none;
        transition: all 0.2s;
        font-family: 'DM Mono', monospace;
        background: transparent; color: rgba(240,237,230,0.55);
      }
      .nav-pill:hover { color: var(--c-text); }
      .nav-pill.active { background: var(--c-accent); color: #fff; }
      .skill-tab {
        padding: 8px 20px; border-radius: 100px; font-size: 0.75rem; letter-spacing: 0.1em;
        text-transform: uppercase; font-weight: 500; cursor: pointer; border: 1px solid var(--c-line2);
        transition: all 0.25s; font-family: 'DM Mono', monospace; background: transparent;
        color: var(--c-text2);
      }
      .skill-tab:hover { border-color: var(--c-accent); color: var(--c-accent); }
      .skill-tab.active { background: var(--c-accent); border-color: var(--c-accent); color: #fff; }
      .tl-dot {
        width: 12px; height: 12px; border-radius: 50%;
        background: var(--c-accent); border: 2px solid var(--c-bg);
        position: absolute; left: -6px; top: 6px; flex-shrink: 0;
        box-shadow: 0 0 0 4px rgba(230,57,70,0.2);
      }
      .contact-input {
        width: 100%; background: var(--c-bg3); border: 1px solid var(--c-line2);
        border-radius: 10px; padding: 14px 18px; color: var(--c-text);
        font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
        outline: none; transition: border-color 0.2s;
      }
      .contact-input:focus { border-color: var(--c-accent); }
      .contact-input::placeholder { color: var(--c-text3); }
      .btn-accent {
        background: var(--c-accent); color: #fff; border: none;
        padding: 14px 36px; border-radius: 10px; font-size: 0.85rem;
        letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500;
        cursor: pointer; font-family: 'DM Mono', monospace;
        transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
      }
      .btn-accent:hover { background: #c8102e; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(230,57,70,0.35); }
      .social-link {
        display: flex; align-items: center; justify-content: center;
        width: 44px; height: 44px; border-radius: 10px;
        border: 1px solid var(--c-line2); color: var(--c-text2);
        text-decoration: none; transition: all 0.2s;
      }
      .social-link:hover { border-color: var(--c-accent); color: var(--c-accent); background: rgba(230,57,70,0.08); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  /* ── RENDER ── */
  return (
    <div className="grain" style={{ minHeight: "100vh", position: "relative" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: "60px",
        background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--c-line)",
      }}>
        <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} aria-label="Home">
          <img src="/logo.svg" alt="SA" style={{ width: 36, height: 36, display: 'block' }} />
        </a>
        <div style={{ display: "flex", gap: "4px" }}>
          {NAV.map(n => (
            <button
              key={n}
              className={`nav-pill${activeSection === n.toLowerCase() ? " active" : ""}`}
              onClick={() => scrollTo(n.toLowerCase())}
            >{n}</button>
          ))}
        </div>
        <a href="mailto:syedshaban785@gmail.com" style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--c-accent)", textDecoration: "none",
          border: "1px solid var(--c-accent)", padding: "6px 14px", borderRadius: "100px",
          transition: "all 0.2s",
        }}>Hire Me</a>
      </nav>

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
      <section id="skills" style={{ padding: "6rem 2rem", background: "var(--c-bg2)" }}>
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
      <section id="experience" style={{ padding: "6rem 2rem", background: "var(--c-bg)" }}>
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
      <section id="projects" style={{ padding: "6rem 2rem", background: "var(--c-bg2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.5rem" }}>// 004 Portfolio</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "3rem", lineHeight: 1.1 }}>Live Projects</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.idx} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "var(--c-bg)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.5rem" }}>// 005 Get In Touch</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.1 }}>Let's Work Together</h2>
            <p style={{ fontSize: "0.95rem", color: "var(--c-text2)", lineHeight: 1.8, marginBottom: "3rem" }}>Open to full-time roles and freelance projects. I typically respond within a few hours.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              background: "var(--c-bg3)", border: "1px solid var(--c-line)",
              borderRadius: "20px", padding: "2.5rem",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text3)", marginBottom: "8px" }}>Name</label>
                  <input className="contact-input" type="text" placeholder="Your name" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text3)", marginBottom: "8px" }}>Email</label>
                  <input className="contact-input" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text3)", marginBottom: "8px" }}>Subject</label>
                <input className="contact-input" type="text" placeholder="Project enquiry / Job offer / Collab..." />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text3)", marginBottom: "8px" }}>Message</label>
                <textarea className="contact-input" rows={5} placeholder="Tell me about your project..." style={{ resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <a href="https://www.linkedin.com/in/syedshaban785" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="https://github.com/SyedShabanDeve" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                  <a href="tel:+923079415512" className="social-link" aria-label="Phone">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  </a>
                </div>
                <button className="btn-accent" onClick={() => window.open("mailto:syedshaban785@gmail.com")}>Send Message →</button>
              </div>
            </div>
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