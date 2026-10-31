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
  { id: "ai", label: "AI" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "problems", label: "Problems" },
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
    items: ["React 19", "Next.js", "JavaScript ES6+", "TypeScript", "React Router", "Context API", "Tailwind CSS", "Bootstrap 5", "HTML5", "CSS3", "Framer Motion"],
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
    items: ["Git & GitHub", "Vite", "npm", "Postman", "ESLint", "Playwright", "GitHub Actions", "Vercel", "Netlify", "cPanel", "Electron"],
  },
  {
    id: "ai",
    label: "AI & Prompt Engineering",
    items: ["Prompt engineering", "Claude & Claude Code", "ChatGPT", "Gemini", "GitHub Copilot", "Cursor", "LLM tool calling", "Multi-agent systems", "Prompt injection defence", "Ollama"],
  },
];

/** Tags that orbit in the skills sphere. */
export const SPHERE_SKILLS = [
  "React", "Node.js", "Express", "MongoDB", "TypeScript", "JavaScript", "Tailwind", "Shopify",
  "WordPress", "WooCommerce", "Liquid", "REST", "JWT", "Mongoose", "Vite", "Git", "HTML5", "CSS3",
  "Bootstrap", "Elementor", "Postman", "Netlify", "cPanel", "Electron", "Router", "Context API", "npm", "GitHub",
  "Next.js", "Prompts", "Claude", "Playwright",
];

export const EXPERIENCE = [
  {
    period: "Jan 2024 - Present",
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
    period: "Jun 2023 - Dec 2023",
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
    period: "Jan 2022 - Present",
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
    period: "2026 - 2028",
    detail: "In progress, alongside full-time work",
    grade: "CGPA 3.4 / 4.0",
  },
  {
    degree: "Associate Degree in Information Technology",
    school: "Riphah International University, Lahore",
    period: "2023 - 2025",
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
    repo: "https://github.com/SyedShabanDeve/style-and-carry",
    kind: "E-commerce store",
    year: "2026",
    summary: "Online store for wallets, watches and bags in Pakistan: category browsing, search, order tracking, wishlist and cart, with cash on delivery.",
    tags: ["JavaScript", "E-commerce", "Netlify"],
    image: "shots/styleandcarry.webp",
  },
  {
    id: "toolsfluent",
    name: "Toolsfluent",
    domain: "toolsfluent.com",
    url: "https://www.toolsfluent.com",
    kind: "Own product · Calculators",
    year: "2026",
    summary: "Over 100 free tools built for Pakistan: solar payback, income tax, bijli bill, MDCAT aggregate, Marla to Kanal and more, all on local rules and PKR values, running in the browser.",
    tags: ["Next.js", "React", "Vercel", "SEO"],
    image: "shots/toolsfluent.webp",
    tall: true,
  },
  {
    id: "socialvids",
    name: "SocialVids",
    domain: "socialvids.net",
    url: "https://www.socialvids.net",
    kind: "Own product · Web tool",
    year: "2026",
    summary: "Video and image downloader for TikTok, Instagram, Pinterest, X, Facebook and Reddit: paste a link and save the file, with no account and no watermark.",
    tags: ["Next.js", "React", "Vercel"],
    image: "shots/socialvids.webp",
    tall: true,
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

/** How AI fits into my work: what it does, and what I still do myself. */
export const AI_USE = {
  intro:
    "I use AI the way I use any other tool on a project: for the parts it is good at, and never as a replacement for reading the code. Claude and Claude Code, ChatGPT, Gemini, GitHub Copilot and Cursor are all part of a normal week.",
  items: [
    {
      icon: "layers",
      title: "Scoping a brief",
      text: "Before a build I talk the brief through with Claude or ChatGPT to find the questions I have not asked the client yet. The plan itself I write and own.",
    },
    {
      icon: "code",
      title: "Writing code with an assistant",
      text: "Copilot and Cursor take the boilerplate. Claude Code handles larger refactors and scripted jobs, like the Node scripts that pushed every Elite Zone release to a preview theme. I read every diff before it ships.",
    },
    {
      icon: "gauge",
      title: "Testing in a real browser",
      text: "I pair Claude Code with Playwright to load pages at phone, tablet and desktop widths and catch layout breaks before a client does. Elite Zone was checked on ten viewports per release this way.",
    },
    {
      icon: "terminal",
      title: "Prompt engineering",
      text: "For Nexora I wrote the system prompts for four agents, each with its own role, tools and limits, and taught them to treat file contents as data, not as instructions.",
    },
    {
      icon: "server",
      title: "Building on LLM APIs",
      text: "Nexora talks to Claude, Gemini and local Ollama models through one interface, with tool calling, streamed replies and a history format each backend can read.",
    },
    {
      icon: "shield",
      title: "Where I draw the line",
      text: "Client passwords and private data never go into a model, and nothing goes live because a model said it works. If I cannot explain a piece of code, it does not ship.",
    },
  ],
};

/** Real problems from real projects: what broke, what I did, what changed. */
export const CHALLENGES = [
  {
    project: "Elite Zone · Shopify",
    problem: "Shopify would only render the two original sections of the collection template, whatever the JSON said, so a new category bar never showed up.",
    fix: "I added the bar to a section that already rendered in the footer group and moved it into place with a small inline script.",
    result: "Category chips and search on every collection page, without forking the theme.",
  },
  {
    project: "Elite Zone · Shopify",
    problem: "Category names were hard coded in five places: the hero, the menu, the mobile drawer, the footer and the homepage title.",
    fix: "I rebuilt all five to read from the store's live collections.",
    result: "The owner adds a collection and it appears everywhere, with no theme edit.",
  },
  {
    project: "Elite Zone · Shopify",
    problem: "Scroll progress and reveal effects worked on phones but not on desktop, because the theme scrolls a wrapper element there instead of the window.",
    fix: "One shared helper that finds whichever element is actually scrolling.",
    result: "A single code path for every screen size.",
  },
  {
    project: "Nexora · AI desktop app",
    problem: "An agent that can read and write files can be talked into deleting things by a poisoned document. That is prompt injection.",
    fix: "Every change to the machine waits for approval showing the exact path or command, credential stores are always refused, and the prompts tell agents that file contents are data.",
    result: "Broad file access that stays safe to use.",
  },
  {
    project: "Catchy Storefront · React",
    problem: "Adding a medium and a large of the same shirt overwrote each other in the cart.",
    fix: "Cart lines are keyed by product, size and colour together, and the cart is saved on every change.",
    result: "Variants never collide, and a refresh keeps the cart.",
  },
  {
    project: "Sani Corporate · React",
    problem: "Visitors downloaded all seven pages of the site just to see the homepage.",
    fix: "Every inner page moved behind React.lazy into its own chunk.",
    result: "Only the homepage ships in the first load.",
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
