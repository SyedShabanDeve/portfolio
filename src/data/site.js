/**
 * Single source of truth for every piece of content on the site.
 * Components read from here — nothing is hard-coded in the markup.
 */

export const PROFILE = {
  firstName: "Syed",
  middleName: "Shaban",
  lastName: "Ahmad",
  fullName: "Syed Shaban Ahmad",
  title: "Full Stack Developer",
  subtitle: "MERN Stack & WordPress",
  location: "Lahore, Pakistan",
  email: "syedshaban785@gmail.com",
  phone: "+92 307 941 5512",
  github: "https://github.com/SyedShabanDeve",
  githubHandle: "SyedShabanDeve",
  linkedin: "https://www.linkedin.com/in/syedshaban785",
  linkedinHandle: "syedshaban785",
  site: "https://syedshabandeve.github.io/portfolio/",
  resume: "Syed-Shaban-Ahmad-CV.pdf",
  resumeDocx: "Syed-Shaban-Ahmad-CV.docx",
  available: true,
  availability: "Open to full-time roles — remote or Lahore-based",
  responseTime: "Usually replies within a few hours",
  tagline:
    "I build production web applications end to end — React front ends, secure Node and Express APIs on MongoDB, and custom WordPress and WooCommerce platforms.",
  roles: [
    "MERN Stack Developer",
    "React Engineer",
    "WordPress Specialist",
    "Full Stack Developer",
  ],
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { value: "3+", label: "Years building" },
  { value: "10+", label: "Projects shipped" },
  { value: "3", label: "Countries served" },
  { value: "3.4", label: "CGPA / 4.0" },
];

export const ABOUT = {
  lead:
    "Full stack developer with three years of professional and freelance experience across the MERN stack and WordPress.",
  body: [
    "I take client projects from the first brief all the way through to deployment and maintenance — scoping the work, building the front end and the API behind it, putting it live, and staying on for the fixes that follow launch.",
    "Most of what I build runs in production today: a news publication with a role-based editorial dashboard, WooCommerce stores with bespoke child themes and payment gateways, and corporate sites tuned for speed. Clients have been based in Pakistan, the UAE and the United States.",
    "I am currently in the final semester of a BS in Computer Science at Riphah International University, Lahore.",
  ],
  highlights: [
    {
      icon: "layers",
      title: "End-to-end delivery",
      text: "Brief, build, deploy, maintain. Hosting, DNS and migrations included — not handed off.",
    },
    {
      icon: "shield",
      title: "Secure by default",
      text: "JWT authentication, role-based route protection and validated API surfaces on every build.",
    },
    {
      icon: "gauge",
      title: "Performance minded",
      text: "Route-level code splitting, lean bundles and MongoDB query tuning where it actually counts.",
    },
    {
      icon: "globe",
      title: "International clients",
      text: "Shipped for businesses across Pakistan, the UAE and the United States, working remotely.",
    },
  ],
};

export const SKILL_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "code",
    blurb: "Component systems, state and the interfaces users actually touch.",
    items: [
      "React 19",
      "JavaScript ES6+",
      "TypeScript",
      "React Router",
      "Context API",
      "Tailwind CSS",
      "Bootstrap 5",
      "HTML5",
      "CSS3",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    blurb: "APIs, data models and the auth layer that guards them.",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
      "JWT Auth",
      "Role-based access",
      "Schema design",
      "Query optimisation",
    ],
  },
  {
    id: "cms",
    label: "CMS & Platforms",
    icon: "wordpress",
    blurb: "Custom WordPress work that goes past themes and page builders.",
    items: [
      "WordPress",
      "WooCommerce",
      "Child themes",
      "Plugin configuration",
      "Payment gateways",
      "Brilliant Directory",
      "PHP",
    ],
  },
  {
    id: "tooling",
    label: "Tooling & Deploy",
    icon: "terminal",
    blurb: "How the work gets built, checked and put in front of people.",
    items: [
      "Git & GitHub",
      "Vite",
      "ESLint",
      "GitHub Actions",
      "GitHub Pages",
      "Netlify",
      "cPanel",
      "DNS & migrations",
    ],
  },
];

/** The stack I reach for first — shown as a spotlight row. */
export const CORE_STACK = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  "WooCommerce",
];

export const EXPERIENCE = [
  {
    period: "Jan 2024 — Present",
    current: true,
    role: "MERN Stack Developer",
    company: "Private Firm",
    location: "Lahore, Pakistan",
    type: "Full-time",
    bullets: [
      "Build React front ends with reusable component systems and Context API state.",
      "Write and maintain Express REST APIs over MongoDB, including schema design and reworking slow endpoints.",
      "Implement JWT authentication with role-based route protection across the app.",
      "Cut first-load weight on multi-page builds by moving inner routes behind React.lazy.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    period: "Jun 2023 — Dec 2023",
    role: "Web Development Intern",
    company: "Sani IT Consultant",
    location: "Lahore, Pakistan",
    type: "Internship",
    bullets: [
      "Six-month frontend programme covering HTML, CSS, JavaScript and early React.",
      "Contributed to live client websites under a senior developer's review.",
      "Customised WordPress themes and configured plugins against client requirements.",
      "Awarded an official internship certificate on completion.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "React", "WordPress"],
  },
  {
    period: "2022 — Present",
    role: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    type: "Freelance",
    bullets: [
      "Built custom WordPress websites for clients in Pakistan, the UAE and the United States.",
      "Delivered WooCommerce stores end to end: catalogue setup, payment gateways and order handling.",
      "Set up Brilliant Directory platforms for membership and listing-based businesses.",
      "Handled hosting, DNS, migrations and post-launch fixes directly with clients.",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "React", "cPanel"],
  },
];

export const EDUCATION = {
  degree: "BS Computer Science",
  school: "Riphah International University",
  location: "Lahore, Pakistan",
  period: "2023 — 2026",
  detail: "Final semester · expected graduation 2026",
  grade: "3.4 / 4.0",
};

export const CERTIFICATIONS = [
  {
    name: "Web Development Internship Certificate",
    issuer: "Sani IT Consultant",
    year: "2023",
  },
];

export const LANGUAGES = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

export const FILTERS = [
  { id: "all", label: "All work" },
  { id: "fullstack", label: "Full stack" },
  { id: "wordpress", label: "WordPress" },
  { id: "oss", label: "Open source" },
];

/**
 * `repo` present  → source is public.
 * `repo` absent   → built under contract, repository stays with the client.
 */
export const PROJECTS = [
  {
    id: "nexora",
    name: "Nexora",
    kind: "Desktop · Multi-agent AI",
    year: "2026",
    featured: true,
    categories: ["oss", "fullstack"],
    summary:
      "A desktop workspace you talk to. Four specialised AI agents share one machine — reading files, running commands and reporting back out loud — with parallel execution, a voice-first interface and security gates on every file or system change.",
    tags: ["Electron", "React 19", "TypeScript", "Three.js", "Vite"],
    repo: "https://github.com/SyedShabanDeve/nexora",
    accent: "violet",
  },
  {
    id: "times",
    name: "The Times of New York",
    kind: "Full-stack news platform",
    year: "2025",
    featured: true,
    categories: ["fullstack"],
    summary:
      "Production news publication with a ReactQuill editor, JWT admin dashboard, role-based access, draft workflow, SEO scoring and full CRUD across posts, categories and users.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    url: "https://www.thetimesofnewyork.com",
    accent: "crimson",
  },
  {
    id: "catchy",
    name: "Catchy Storefront",
    kind: "React · E-commerce",
    year: "2026",
    categories: ["oss", "fullstack"],
    summary:
      "Multi-page storefront with a variant-aware persistent cart, nested category routing, product detail pages, a checkout flow and a homepage content admin panel — built on React 19 and Context state.",
    tags: ["React 19", "React Router 7", "Context API", "Tailwind"],
    url: "https://syedshabandeve.github.io/catchy-storefront/",
    repo: "https://github.com/SyedShabanDeve/catchy-storefront",
    accent: "gold",
  },
  {
    id: "uforuae",
    name: "UFO R UAE",
    kind: "WordPress · WooCommerce",
    year: "2025",
    categories: ["wordpress"],
    summary:
      "UAE-based WooCommerce store with a bespoke child theme, plugin integrations, configured payment gateways and a performance-tuned product catalogue.",
    tags: ["WordPress", "WooCommerce", "PHP", "CSS"],
    url: "https://www.uforuae.com",
    accent: "azure",
  },
  {
    id: "sani-react",
    name: "Sani Corporate Website",
    kind: "React · Corporate",
    year: "2026",
    categories: ["oss"],
    summary:
      "Seven-page corporate site where every inner page is lazy-loaded into its own chunk, with hash-aware scroll restoration on navigation and an SPA redirect config for Netlify.",
    tags: ["React 19", "React Router 7", "Code splitting", "Netlify"],
    repo: "https://github.com/SyedShabanDeve/sani-corporate-website",
    accent: "azure",
  },
  {
    id: "usd",
    name: "United States of Dollars",
    kind: "WordPress · Finance",
    year: "2024",
    categories: ["wordpress"],
    summary:
      "Custom WordPress build delivered from theme development through to handover, with third-party API connections, order workflows and front-end performance tuning.",
    tags: ["WordPress", "PHP", "JavaScript", "CSS"],
    url: "https://www.unitedstatesofdollars.com",
    accent: "emerald",
  },
  {
    id: "directory",
    name: "Directory Landing Redesign",
    kind: "React · Landing page",
    year: "2026",
    categories: ["oss"],
    summary:
      "Conversion-focused landing page redesign for a business directory product — a composite search bar, staggered motion on scroll and a mobile-first layout throughout.",
    tags: ["React 18", "Framer Motion", "Tailwind", "Vite"],
    repo: "https://github.com/SyedShabanDeve/directory-landing-redesign",
    accent: "emerald",
  },
  {
    id: "sani-wp",
    name: "Sani IT Consultant",
    kind: "WordPress · Agency",
    year: "2023",
    categories: ["wordpress"],
    summary:
      "WordPress build for a Dubai-based marketing agency: service pages, lead capture forms and ongoing maintenance carried on past the internship period.",
    tags: ["WordPress", "HTML5", "CSS3", "JavaScript"],
    url: "https://saniitconsultant.com",
    accent: "violet",
  },
];

export const SERVICES = [
  {
    icon: "code",
    title: "Web applications",
    text: "React front ends backed by Express and MongoDB, with authentication, dashboards and role-aware access built in.",
  },
  {
    icon: "wordpress",
    title: "WordPress & WooCommerce",
    text: "Custom child themes, plugin work, payment gateways and stores set up to be handed over and run without me.",
  },
  {
    icon: "rocket",
    title: "Launch & maintenance",
    text: "Hosting, DNS, migrations and the post-launch fixes — the part most builds quietly need and rarely include.",
  },
];
