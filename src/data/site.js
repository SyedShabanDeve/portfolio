/**
 * Single source of truth for every piece of content on the site.
 * Components read from here; nothing is hard-coded in the markup.
 * Keep it in step with the CV and the LinkedIn profile.
 */

export const PROFILE = {
  firstName: "Syed",
  middleName: "Shaban",
  lastName: "Ahmad",
  fullName: "Syed Shaban Ahmad",
  title: "Full Stack Developer",
  subtitle: "MERN Stack, Shopify & WordPress",
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
  photo: "syed-shaban-ahmad.webp",
  available: true,
  availability: "Open to full-time roles, remote or on-site",
  whatsapp: "https://wa.me/923079415512",
  tagline:
    "I build web applications with React, Node and Express on MongoDB, Shopify stores that sell, and WordPress sites when a CMS is the right fit.",
  roles: ["Full Stack Developer", "MERN Stack Developer", "Shopify Developer", "React Developer", "WordPress Developer"],
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { value: 2022, label: "Freelancing since" },
  { value: 2024, label: "Full-time MERN since" },
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 3, label: "Countries served" },
];

export const ABOUT = {
  statement:
    "I build web applications, online stores and client websites, mostly in React, Node and Express with MongoDB behind them, on Shopify when it is a store, and in WordPress when a CMS is the right fit.",
  body: [
    "I work full time at Sani IT-Consultant in Lahore. I started there as a frontend intern in 2023 and moved into the MERN developer role in 2024. Day to day that means React front ends, REST APIs, JWT authentication with role-based access, and going back into endpoints that got slow once the data grew.",
    "Alongside that I have been freelancing since 2022 for clients in Pakistan, the UAE and the United States, most recently rebuilding a Shopify store section by section. That work covers the parts that are not code as well: scoping with a client who is not technical, hosting and DNS, migrations, and being the person who answers when something breaks after handover.",
  ],
  highlights: [
    { icon: "layers", title: "Brief to handover", text: "Scoping, build, deployment, hosting and DNS. The fixes after launch too." },
    { icon: "shield", title: "Auth done properly", text: "JWT authentication with role-based route protection for admin, editor and user roles." },
    { icon: "gauge", title: "Lean bundles", text: "Inner routes behind React.lazy, code splitting, and slow endpoints reworked." },
    { icon: "globe", title: "Remote clients", text: "Live work for businesses in Pakistan, the UAE and the United States." },
  ],
};

export const SKILL_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React 19", "JavaScript ES6+", "TypeScript", "React Router", "Context API", "Tailwind CSS", "Bootstrap 5", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT Auth", "Role-based access", "Schema design"],
  },
  {
    id: "cms",
    label: "E-commerce & CMS",
    items: ["Shopify", "Liquid", "Online Store 2.0", "WordPress", "WooCommerce", "Elementor", "Plugin configuration", "Payment gateways", "Brilliant Directory"],
  },
  {
    id: "tooling",
    label: "Tooling & Deploy",
    items: ["Git & GitHub", "Vite", "npm", "Postman", "ESLint", "GitHub Actions", "Netlify", "cPanel", "Electron"],
  },
];

/** Tags that orbit in the skills sphere. */
export const SPHERE_SKILLS = [
  "React", "Node.js", "Express", "MongoDB", "TypeScript", "JavaScript", "Tailwind", "Shopify",
  "WordPress", "WooCommerce", "Liquid", "REST", "JWT", "Mongoose", "Vite", "Git", "HTML5", "CSS3",
  "Bootstrap", "Elementor", "Postman", "Netlify", "cPanel", "Electron", "Router", "Context API", "npm", "GitHub",
];

export const EXPERIENCE = [
  {
    period: "Jan 2024 – Present",
    current: true,
    role: "MERN Stack Developer",
    company: "Sani IT-Consultant",
    location: "Lahore · On-site",
    type: "Full-time",
    bullets: [
      "Build React front ends with reusable components and Context API state management across client projects.",
      "Write and maintain Node.js and Express REST APIs over MongoDB, including schema design, query optimisation and fixing endpoints that slowed down as the data grew.",
      "Implement JWT authentication with role-based route protection for admin, editor and standard user roles.",
      "Cut first-load bundle weight on multi-page builds by moving inner routes behind React.lazy and code splitting.",
      "Debug and refactor existing codebases, and hand over documented work to clients and the internal team.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    period: "Jun 2023 – Dec 2023",
    role: "Web Development Intern",
    company: "Sani IT-Consultant",
    location: "Lahore",
    type: "Internship",
    bullets: [
      "Six-month frontend internship working in HTML5, CSS3, JavaScript and React.",
      "Contributed to live client websites under a senior developer's review.",
      "Customised WordPress themes and configured plugins to match client requirements.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "React", "WordPress"],
  },
  {
    period: "Jan 2022 – Present",
    current: true,
    role: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    type: "Freelance",
    bullets: [
      "Rebuilt the Elite Zone Shopify store section by section: custom theme sections, cash-on-delivery and WhatsApp ordering, and every release staged on a preview theme before going live.",
      "Build and deliver custom WordPress websites for clients in Pakistan, the UAE and the United States.",
      "Deliver WooCommerce stores end to end: catalogue setup, payment gateways, shipping rules and order handling.",
      "Set up Brilliant Directory platforms for membership and listing-based businesses.",
      "Handle hosting, DNS, deployment, migrations and post-launch fixes directly with clients.",
    ],
    stack: ["Shopify", "Liquid", "WordPress", "WooCommerce", "Elementor", "cPanel"],
  },
];

export const EDUCATION = [
  {
    degree: "BS Computer Science",
    school: "Riphah International University, Lahore",
    period: "2026 – 2028",
    detail: "In progress, alongside full-time work",
    grade: "CGPA 3.4 / 4.0",
  },
  {
    degree: "Associate Degree in Information Technology",
    school: "Riphah International University, Lahore",
    period: "2023 – 2025",
    detail: "Completed",
    grade: "CGPA 3.66 / 4.0",
  },
];

export const CERTIFICATIONS = [
  { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", year: "2023" },
  { name: "Web Development Internship Certificate", issuer: "Sani IT-Consultant", year: "2024" },
];

export const LANGUAGES = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

/**
 * Everything in the Work gallery: live client websites first, then my own
 * products. Clicking a card opens the live site; `repo` adds a Code link.
 * `tall` screenshots scroll through the page while hovered.
 * Client sites list what the site is, not the backend behind it.
 */
export const WORK = [
  {
    id: "elitezone",
    name: "Elite Zone",
    domain: "elitezone.zone",
    url: "https://elitezone.zone",
    kind: "Client · Shopify store",
    year: "2026",
    summary: "Shopify store for gadgets across Pakistan: an animated hero with live product cards, cash-on-delivery and WhatsApp ordering, and categories that build themselves.",
    tags: ["Shopify", "Liquid", "Horizon theme"],
    image: "shots/elitezone.webp",
    tall: true,
    isNew: true,
  },
  {
    id: "times",
    name: "The Times of New York",
    domain: "thetimesofnewyork.com",
    url: "https://thetimesofnewyork.com",
    kind: "Client · News & publishing",
    year: "2025",
    summary: "News and publishing site with category sections, an article workflow and an admin dashboard for the editorial team.",
    tags: ["React", "Admin dashboard", "Editorial roles"],
    image: "shots/times.webp",
    tall: true,
  },
  {
    id: "sani-wp",
    name: "Sani IT Consultant",
    domain: "saniitconsultant.com",
    url: "https://saniitconsultant.com",
    kind: "Client · Agency website",
    year: "2023",
    summary: "Website for a Dubai digital marketing agency: service pages, lead capture forms and on-page SEO, maintained after launch.",
    tags: ["WordPress", "Elementor", "SEO"],
    image: "shots/saniwp.webp",
    tall: true,
  },
  {
    id: "usd",
    name: "United States of Dollars",
    domain: "unitedstatesofdollars.com",
    url: "https://unitedstatesofdollars.com",
    kind: "Client · Finance website",
    year: "2024",
    summary: "Site for an investment firm: business deals, certification and FAQ pages, with a live currency ticker across the top.",
    tags: ["Client work", "Live ticker", "Responsive"],
    image: "shots/usd.webp",
  },
  {
    id: "styleandcarry",
    name: "Style & Carry",
    domain: "styleandcarry.netlify.app",
    url: "https://styleandcarry.netlify.app/",
    repo: "https://github.com/SyedShabanDeve/foldandcarry",
    kind: "E-commerce store",
    year: "2026",
    summary: "Online store for wallets, watches and bags in Pakistan: category browsing, search, order tracking, wishlist and cart, with cash on delivery.",
    tags: ["JavaScript", "E-commerce", "Netlify"],
    image: "shots/styleandcarry.webp",
  },
  {
    id: "nexora",
    name: "Nexora",
    domain: "syedshabandeve.github.io/nexora",
    url: "https://syedshabandeve.github.io/nexora/",
    repo: "https://github.com/SyedShabanDeve/nexora",
    kind: "Desktop app · Multi-agent AI",
    year: "2026",
    summary: "A desktop workspace for Windows and macOS. Four agents share the machine: they read files, run commands and answer out loud.",
    tags: ["Electron", "React", "TypeScript"],
    image: "shots/nexora.webp",
  },
  {
    id: "catchy",
    name: "Catchy Storefront",
    domain: "syedshabandeve.github.io/catchy-storefront",
    url: "https://syedshabandeve.github.io/catchy-storefront/",
    repo: "https://github.com/SyedShabanDeve/catchy-storefront",
    kind: "E-commerce storefront",
    year: "2026",
    summary: "React 19 storefront with a variant-aware persistent cart, nested category routing, a checkout flow and a homepage admin panel.",
    tags: ["React 19", "React Router", "Tailwind"],
    image: "shots/catchy.webp",
  },
  {
    id: "sani-react",
    name: "Sani Corporate Website",
    domain: "saniitconsultant.netlify.app",
    url: "https://saniitconsultant.netlify.app/",
    repo: "https://github.com/SyedShabanDeve/sani-corporate-website",
    kind: "Corporate site · React rebuild",
    year: "2026",
    summary: "Multi-page corporate site in React 19. Every inner page is lazy-loaded into its own chunk, with hash-aware scroll restoration.",
    tags: ["React 19", "Code splitting", "Netlify"],
    image: "shots/sani-react.webp",
  },
  {
    id: "directory",
    name: "Directory Landing Redesign",
    domain: "github.com/SyedShabanDeve",
    repo: "https://github.com/SyedShabanDeve/directory-landing-redesign",
    kind: "Landing page",
    year: "2026",
    summary: "Landing page redesign for a business directory: a composite search bar, staggered motion on scroll and a mobile-first layout.",
    tags: ["React", "Framer Motion", "Tailwind"],
    image: "shots/directory.webp",
  },
  {
    id: "uforuae",
    name: "UFO UAE",
    domain: "uforuae.com",
    url: "https://uforuae.com",
    kind: "Client · Business directory",
    year: "2026",
    summary: "Business directory and listings portal for UAE clients, with listings, memberships, and search by category and location. Being relaunched.",
    tags: ["Listings", "Memberships", "Search"],
    hue: 200,
  },
  {
    id: "portfolio",
    name: "This portfolio",
    domain: "syedshabandeve.github.io/portfolio",
    url: "https://syedshabandeve.github.io/portfolio/",
    repo: "https://github.com/SyedShabanDeve/portfolio",
    kind: "WebGL · 4D scene",
    year: "2026",
    summary: "A tesseract rotating through four dimensions and projected into 3D every frame, with GSAP scroll choreography and four themes.",
    tags: ["React 19", "three.js", "GSAP"],
    image: "shots/portfolio.webp",
  },
];

/**
 * The newest build, given its own case study above the gallery. Everything
 * here is what shipped on the live store.
 */
export const SPOTLIGHT = {
  name: "Elite Zone",
  domain: "elitezone.zone",
  url: "https://elitezone.zone",
  kind: "Client · Shopify store",
  year: "2026",
  summary:
    "A gadget and accessories store selling across Pakistan, cash on delivery first. I rebuilt it section by section on Shopify's Horizon theme around how its customers buy: trust signals up front, WhatsApp as a second way to order, and a catalogue the owner can grow without touching code.",
  image: "shots/elitezone.webp",
  phones: ["shots/elitezone-m.webp", "shots/elitezone-product-m.webp"],
  role: "Theme engineering, store setup and SEO",
  numbers: [
    { value: "15", label: "Release rounds, each staged on a preview theme first" },
    { value: "10", label: "Viewports checked per release, 320px to 1920px" },
    { value: "COD", label: "Cash on delivery and WhatsApp ordering on every product" },
  ],
  built: [
    "A custom animated hero: rotating category words and floating product cards with live prices and discount badges.",
    "Product pages built for cash on delivery: a savings badge, delivery and returns promises, and Order on WhatsApp beside Add to cart.",
    "Category circles, the header menu, the mobile drawer and the footer fill themselves from live collections, so a new category needs no theme edit.",
    "Category chips with product counts and an inline search on every collection page, plus quick add on mobile.",
    "SEO groundwork: share image, WebSite and BreadcrumbList structured data, and a homepage title built from the live categories.",
    "Releases scripted end to end: Node scripts generate the theme files and push them to a preview theme through the Admin GraphQL API.",
  ],
  stack: ["Shopify", "Liquid", "Horizon theme", "JavaScript", "CSS", "Admin GraphQL API"],
};

export const THEMES = [
  { id: "nebula", label: "Nebula", swatch: ["#7c5cff", "#22d3ee"] },
  { id: "inferno", label: "Inferno", swatch: ["#ff4d2e", "#ffb020"] },
  { id: "matrix", label: "Matrix", swatch: ["#22ff88", "#00b3ff"] },
  { id: "daylight", label: "Daylight", swatch: ["#4f46e5", "#f43f5e"] },
];
