// All portfolio content lives here — edit this file to update anything on the site
const DATA = {
  name: "Mark Joseph Batinga",
  role: "Freelance Fullstack Developer",
  location: "San Narciso, Zambales, PH",
  email: "batingamarkjoseph@gmail.com",
  facebook: "https://www.facebook.com/markjoseph.batinga/",
  github: "markjosephbatinga",
  linkedin: "mark-joseph-batinga-047745229",
  resume: "Batinga-MarkJoseph-Resume.pdf",

  tagline: "From UI to API — I build, deploy, and ship complete web applications. Freelance, remote-ready, Philippines.",
  intro: [
    "I'm a freelance fullstack developer from the Philippines with 3+ years shipping production systems — RESTful APIs on Laravel & Node, React frontends, relational & NoSQL data layers, and the deploy scripts nobody wants to write.",
    "Available for hire. Currently building & maintaining fullstack systems for Customised Group (Melbourne, remote), previously led development teams at DevstrucMedia and KODIT. I care about boring technology, clear contracts, and writing code that the next person can actually read."
  ],

  facts: [
    ["status",        "open to new work",          true],
    ["timezone",      "PHT / UTC+8"],
    ["experience",    "3+ years production"],
    ["education",     "BS IT — Cum Laude (91.37)"],
    ["certification", "PhilNITS IT Passport"],
    ["languages",     "English, Filipino"],
  ],

  stack: [
    { title: "languages",    items: ["PHP", "JavaScript", "Python", "Java", "C#"] },
    { title: "backend",      items: ["Laravel", "CodeIgniter", "Node.js / Express", "ASP.NET MVC", "REST APIs"] },
    { title: "data",         items: ["MySQL", "MS SQL Server", "MongoDB", "Mongoose", "Redis"] },
    { title: "infra & cloud", items: ["AWS (EC2, S3, ELB)", "Datadog", "Docker", "Git / Bitbucket", "Firebase"] },
    { title: "frontend",     items: ["React", "Redux", "Material UI", "Bootstrap", "AJAX"] },
    { title: "integrations", items: ["Stripe", "Mapbox", "Machship", "GoHighLevel", "FedEx / Aramex"] },
    { title: "practices",    items: ["Agile / Scrum", "Code review", "OOP & MVC", "Documentation", "Mentorship"] },
    { title: "tools",        items: ["Postman", "JIRA", "Figma", "Elementor", "GitHub Actions"] },
  ],

  experience: [
    {
      role: "Backend Developer",
      company: "Customised Group Pty Ltd",
      location: "Melbourne, AU · Remote",
      from: "Sep 2024", to: "Present", current: true,
      bullets: [
        "Build & maintain RESTful APIs in Laravel/PHP deployed to AWS; tune MySQL schemas and queries for data integrity and latency.",
        "Own server monitoring, domain security, and on-call debugging for production backend systems.",
        "Ship in a Scrum cadence with code review, pairing, and docs that front-end can actually integrate against.",
      ],
      tags: ["Laravel", "PHP", "MySQL", "AWS", "Datadog", "REST"],
    },
    {
      role: "Team Leader",
      company: "DevstrucMedia",
      location: "Remote",
      from: "May 2024", to: "Aug 2024",
      bullets: [
        "Led rebuild of a procurement system with a modern stack and email automation for thousands of users via GoHighLevel.",
        "Shipped Live Webinar automation through ArchieBot + GHL API integrations end-to-end.",
        "Mentored the dev team, ran code reviews, assigned work by strengths, and kept project docs honest.",
      ],
      tags: ["Laravel", "MySQL", "GHL", "Stripe", "Mentorship"],
    },
    {
      role: "Web Developer",
      company: "DevstrucMedia",
      location: "Remote",
      from: "Sep 2023", to: "May 2024",
      bullets: [
        "Maintained an international procurement system — hardened error handling and integrated Stripe, RevenueCat, GHL, FedEx, and Aramex.",
        "Built the iSingHawaii karaoke-bar site with room booking, payments, and an admin dashboard; shipped a dental clinic site.",
        "Owned precision on financial modules — payment, reconciliation, and reporting math that couldn't drift.",
      ],
      tags: ["Laravel", "WordPress", "Elementor", "Stripe", "API integrations"],
    },
    {
      role: "Junior System Developer",
      company: "KODIT IT Consultancy",
      location: "On-site",
      from: "Jun 2023", to: "May 2024",
      bullets: [
        "Built a new LMS — enrollment, evaluation, admissions, payroll, attendance, payment collection.",
        "Shipped financial system modules: automated expense summary, cashflow, employee benefits, withholding tax, balance sheets.",
        "Introduced an E-Library with MARC cataloging and QR-code lookup for records.",
      ],
      tags: ["CodeIgniter", "PHP", "MySQL", "AJAX", "Bootstrap"],
    },
    {
      role: "Back-end Developer Intern",
      company: "DICT Region 1",
      location: "Internship",
      from: "Mar 2023", to: "May 2023",
      bullets: [
        "Project lead on a regional procurement system; led a small module team.",
        "Designed the data layer with MongoDB + Mongoose and centralized app state with Redux.",
        "Built passwordless login with Firebase Magic Link authentication.",
      ],
      tags: ["Node.js", "Express", "MongoDB", "React", "Redux", "Firebase"],
    },
  ],

  projects: [
    {
      id: "01",
      title: "Customised Group — Order Platform API",
      desc: "RESTful order, fulfillment and reporting APIs for a custom-apparel platform. Laravel + MySQL on AWS with Datadog monitoring.",
      stack: ["Laravel", "MySQL", "AWS EC2", "S3", "Datadog"],
      status: "live",
      links: { live: "#", repo: null },
      scale: "Millions of rows / month",
    },
    {
      id: "02",
      title: "Procurement System (DevstrucMedia)",
      desc: "International procurement platform with Stripe billing, RevenueCat subscriptions, shipping via FedEx + Aramex, and GHL automation.",
      stack: ["Laravel", "MySQL", "Stripe", "FedEx", "Aramex", "GHL"],
      status: "live",
      links: { live: "#", repo: null },
      scale: "Thousands of active users",
    },
    {
      id: "03",
      title: "KODIT LMS",
      desc: "Full learning management system aligned with the latest curriculum — enrollment, evaluation, payroll, attendance, payment collection.",
      stack: ["CodeIgniter", "PHP", "MySQL", "AJAX", "Bootstrap"],
      status: "live",
      links: { live: null, repo: "#" },
      scale: "Institutional scale",
    },
    {
      id: "04",
      title: "DICT R1 Procurement (Intern Lead)",
      desc: "Regional procurement tool with passwordless Magic-Link auth, centralized Redux state, and a MongoDB data layer.",
      stack: ["Node.js", "Express", "MongoDB", "React", "Redux", "Firebase"],
      status: "archived",
      links: { live: null, repo: "#" },
      scale: "Gov. regional pilot",
    },
    {
      id: "05",
      title: "E-Butos — SBO / SO Voting",
      desc: "Tamper-resistant student-body election platform with live tallies, auditable logs, and role-based admin.",
      stack: ["PHP", "MySQL", "JavaScript"],
      status: "live",
      links: { live: null, repo: "#" },
      scale: "Campus elections",
    },
    {
      id: "06",
      title: "BFPMMS — Masterlist Management",
      desc: "Internal masterlist and records system for the Bureau of Fire Protection — personnel, equipment, and incident tracking.",
      stack: ["PHP", "MySQL"],
      status: "live",
      links: { live: null, repo: "#" },
      scale: "Regional deployment",
    },
    {
      id: "07",
      title: "FastArc Car Rental",
      desc: "Rental booking system with fleet availability, pricing rules, and admin dashboards built in ASP.NET MVC.",
      stack: ["C#", "ASP.NET MVC", "MS SQL Server"],
      status: "archived",
      links: { live: null, repo: "#" },
      scale: "SME rental business",
    },
    {
      id: "08",
      title: "NHRMMS — LGU HR Platform",
      desc: "HR management tool for LGU Naguilian — employee records, leave, payroll exports, and reporting.",
      stack: ["PHP", "MySQL"],
      status: "live",
      links: { live: null, repo: "#" },
      scale: "Local government unit",
    },
  ],

  services: [
    {
      num: "01",
      title: "Fullstack web app development",
      desc: "End-to-end web applications — React frontends, Laravel or Node backends, database design, and cloud deploy. One freelance developer, whole product.",
    },
    {
      num: "02",
      title: "API design & build",
      desc: "Clean, documented REST APIs in Laravel or Node. Versioning, auth, pagination, idempotency — the parts the tutorials skip.",
    },
    {
      num: "03",
      title: "Frontend development",
      desc: "React UIs that connect cleanly to the API layer. Responsive layouts, state management with Redux, and component libraries that scale.",
    },
    {
      num: "04",
      title: "Integrations & automation",
      desc: "Stripe, shipping, CRM, webinar, bespoke third-party APIs. Retries, idempotency keys, and failure paths you can actually debug.",
    },
    {
      num: "05",
      title: "AWS deploy & monitoring",
      desc: "EC2, S3, load balancers, Datadog dashboards, sensible alerting. No mystery 2 AM pages.",
    },
    {
      num: "06",
      title: "Legacy rescue & refactor",
      desc: "Taking over a codebase nobody wants to touch. Stabilize, document, introduce tests, then move.",
    },
  ],

  writing: [
    { date: "2026-03-18", title: "Designing idempotent webhook receivers in Laravel",        tag: "engineering",   read: "8 min" },
    { date: "2026-02-02", title: "Migrating a CodeIgniter LMS to Laravel without downtime",  tag: "migration",     read: "12 min" },
    { date: "2025-11-04", title: "Query budgets: how I stop N+1 before code review",         tag: "performance",   read: "6 min" },
    { date: "2025-09-21", title: "Shipping Magic-Link auth with Firebase & Express",          tag: "auth",          read: "9 min" },
    { date: "2025-07-10", title: "The integration checklist I run before touching a third-party API", tag: "integrations", read: "5 min" },
  ],

  stats: {
    totalRepos: 42,
    totalCommits: 2184,
    totalPRs: 316,
    totalStars: 128,
    languages: [
      { name: "PHP",        pct: 38, color: "#8993be" },
      { name: "JavaScript", pct: 22, color: "#f1e05a" },
      { name: "TypeScript", pct: 12, color: "#3178c6" },
      { name: "C#",         pct: 10, color: "#178600" },
      { name: "Python",     pct: 8,  color: "#3572a5" },
      { name: "Other",      pct: 10, color: "#5b666d" },
    ],
  },
};

window.DATA = DATA;
