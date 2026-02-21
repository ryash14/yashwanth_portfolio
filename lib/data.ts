export const siteConfig = {
  name: "Yashwanth Reddy R.",
  fullName: "Yashwanth Reddy Reddygari",
  initials: "YR",
  title: "AI & Full Stack Developer",
  subtitle: "Final Year — B.E. CSE, MVSR Engineering College",
  description:
    "Building privacy-first, production-ready AI and full-stack products from research to deployment.",
  email: "ryashwanthreddygari@gmail.com",
  phone: "+91 8309637808",
  github: "https://github.com/ryash14",
  linkedin: "https://linkedin.com/in/yashredd",
  leetcode: "https://leetcode.com/u/Yashwanth1408/",
  resume: "https://drive.google.com/file/d/1QWG0xbtoWojqe-oO3Kl5__xWbCPx8LK7/view?usp=sharing",
  available: true,
  location: "Hyderabad, India",
};

export const stats = [
  { count: 3, label: "Internships" },
  { count: 7, label: "Projects" },
  { count: 8, label: "Certifications" },
];

export const experience = [
  {
    role: "Project Intern — AI Research",
    company: "ISRO — NRSC",
    period: "2025 (Internship)",
    type: "Research Internship · On-site",
    description:
      "Gap-filling missing TROPOMI satellite data across India (2019–2024) for NO₂, SO₂, CO, PM2.5, and PM10 using ML-based imputation to enable continuous air-quality monitoring.",
    highlights: [
      "Built ML pipeline to fill TROPOMI gaps via DINEOF approach — internal cross-validation r = 0.8",
      "Validated aggregated TROPOMI outputs against OMI at matching resolution (r = 0.53)",
      "Identified Indo-Pacific pollution hotspots from multi-year reconstructed time series",
      "Ongoing: downscaling TROPOMI retrievals to fine spatial resolution using deep learning",
    ],
    stack: ["Python", "GIS", "NumPy", "Scikit-learn", "Pandas"],
    logo: "/NRSC.jpg" as string | null,
  },
  {
    role: "Research & Development Intern",
    company: "DLRL — DRDO",
    period: "2024 (Internship)",
    type: "Internship · On-site",
    description:
      "Built an offline AI document QA system for defense use — enabling secure, air-gapped querying of classified PDF and DOCX documents without any external API calls.",
    highlights: [
      "Designed RAG pipeline: PyMuPDF ingestion → ChromaDB vector store → CrossEncoder reranking → LLaMA 3.2 via Ollama",
      "Achieved ~40% retrieval accuracy improvement through chunking strategy and reranking",
      "Reduced document load time by 50% via persistent embedding cache",
      "Delivered Streamlit UI for non-technical defense staff — fully offline, zero data leakage",
    ],
    stack: ["Python", "LangChain", "ChromaDB", "Ollama", "LLaMA 3.2", "Streamlit"],
    logo: "/dlrl.png" as string | null,
  },
  {
    role: "Team Lead — Website Redesign",
    company: "MVSR Engineering College",
    period: "2024",
    type: "Leadership · On-site",
    description:
      "Selected as team lead after winning the internal college hackathon (1st out of 100 teams) to redesign and deploy the official MVSR college website.",
    highlights: [
      "Led redesign using HTML5, Tailwind CSS, and vanilla JS — dark/light mode, sticky announcements",
      "Coordinated a cross-functional team for live rollout to the college community",
    ],
    stack: ["HTML5", "Tailwind CSS", "JavaScript"],
    logo: "/mvsr.png" as string | null,
  },
];

export const projects = [
  {
    num: "01",
    title: "Anantha AI",
    description:
      "AI-powered conversational interface for ARGO ocean data. Enables natural language queries on 23 years of ARGO ocean data using RAG, LLMs, and ChromaDB. Backend built with FastAPI, Redis, PostgreSQL and forecasting/anomaly detection using LSTM. Visualised via interactive Streamlit dashboards.",
    stack: ["FastAPI", "PostgreSQL", "ChromaDB", "LSTM", "Transformers", "RAG", "Streamlit", "Redis"],
    github: "#",
    live: "https://anantha.live",
    tags: ["AI", "Data"],
    image: "/anantha.png",
    gradFrom: "#061728",
    gradTo: "#083047",
    accentColor: "#34D399",
    glowColor: "rgba(52,211,153,0.12)",
  },
  {
    num: "02",
    title: "SmartDocAI",
    description:
      "Privacy-focused document assistant: a RAG-based system that processes PDFs locally and provides accurate, context-aware answers without compromising privacy. Uses Llama 3.2 on Ollama for on-device inference.",
    stack: ["Streamlit", "Ollama (Llama 3.2)", "ChromaDB", "LangChain", "Python"],
    github: "https://github.com/ryash14/SmartDocAI",
    live: "#",
    tags: ["AI", "Privacy-first"],
    image: "/SmartDocAI.png",
    gradFrom: "#0D1117",
    gradTo: "#161B22",
    accentColor: "#7C83FD",
    glowColor: "rgba(124,131,253,0.18)",
  },
  {
    num: "03",
    title: "LearnityX",
    description:
      "AI-driven career accelerator: adaptive mock interviews, resume insights, and personalized practice modules integrated with Google's Gemini API for realistic interview simulations.",
    stack: ["React", "Tailwind CSS", "Firebase", "Gemini API", "Netlify"],
    github: "https://github.com/ryash14/LearnityX",
    live: "https://learnityx.netlify.app/",
    tags: ["AI", "EdTech"],
    image: "/InterviewSprint.png",
    gradFrom: "#0A1F1F",
    gradTo: "#0D3333",
    accentColor: "#2DD4BF",
    glowColor: "rgba(45,212,191,0.12)",
  },
  {
    num: "04",
    title: "UrbanFlow",
    description:
      "AI traffic management system with real-time violation detection, ambulance-aware adaptive signals, auto-challan generation, and prediction-powered traffic control.",
    stack: ["YOLOv8", "ResNet", "Flask", "Python"],
    github: "https://github.com/ryash14/UrbanFlow",
    live: "#",
    tags: ["AI", "Computer Vision"],
    image: "/UrbanFlow.png",
    gradFrom: "#1A1000",
    gradTo: "#2A1A00",
    accentColor: "#F59E0B",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    num: "05",
    title: "ClassForge",
    description:
      "AI-powered education platform where students receive instant AI-generated answers and teachers upload syllabus to auto-generate personalized question papers.",
    stack: ["HTML", "Tailwind", "JavaScript", "Firebase", "Gemini API"],
    github: "https://github.com/ryash14/ClassForge",
    live: "https://classforge.onrender.com/",
    tags: ["AI", "EdTech"],
    image: "/ClassForge.png",
    gradFrom: "#051410",
    gradTo: "#0F2820",
    accentColor: "#34D399",
    glowColor: "rgba(52,211,153,0.12)",
  },
  {
    num: "06",
    title: "Online Code Editor",
    description:
      "Multi-language web IDE with Monaco Editor, dynamic input, and VS Code-like UX for online coding and testing.",
    stack: ["Monaco Editor", "Node.js", "Express", "MySQL"],
    github: "https://github.com/ryash14/OnlineCodeEditor",
    live: "https://codecraft-xwcu.onrender.com/",
    tags: ["DevTools", "Web IDE"],
    image: "/OnlineCodeEditor.png",
    gradFrom: "#0D0A1A",
    gradTo: "#1A1030",
    accentColor: "#A78BFA",
    glowColor: "rgba(167,139,250,0.12)",
  },
  {
    num: "07",
    title: "Fake Product Identification",
    description:
      "Counterfeit detection system with secure product authentication, QR-based verification, and admin analytics dashboard.",
    stack: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/ryash14/FakeProductIdentification",
    live: "#",
    tags: ["Security", "Web"],
    image: "/FakeProductIdentification.png",
    gradFrom: "#0A1020",
    gradTo: "#0F1E35",
    accentColor: "#38BDF8",
    glowColor: "rgba(56,189,248,0.12)",
  },
];

// Skills — icon starts with "/" uses local public file; otherwise fetched from devicon CDN
export const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python",     icon: "python/python-original" },
      { name: "Java",       icon: "java/java-original" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "C",          icon: "c/c-original" },
      { name: "SQL",        icon: "mysql/mysql-original" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React",     icon: "react/react-original" },
      { name: "HTML",      icon: "html5/html5-original" },
      { name: "CSS",       icon: "css3/css3-original" },
      { name: "Tailwind",  icon: "tailwindcss/tailwindcss-original" },
      { name: "Bootstrap", icon: "/bootstrap.png" },
    ],
  },
  {
    category: "Backend & DB",
    items: [
      { name: "Node.js",    icon: "nodejs/nodejs-original" },
      { name: "Express",    icon: "/expressjs.svg", invert: true },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "MySQL",      icon: "mysql/mysql-original" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git",      icon: "git/git-original" },
      { name: "Docker",   icon: "docker/docker-original" },
      { name: "AWS",      icon: "amazonwebservices/amazonwebservices-plain-wordmark" },
      { name: "Netlify",  icon: "netlify/netlify-original" },
      { name: "Firebase", icon: "firebase/firebase-plain" },
      { name: "VS Code",  icon: "/vscode.svg" },
    ],
  },
];

export const educationHistory = [
  {
    level: "B.E. in Computer Science & Engineering",
    school: "MVSR Engineering College",
    period: "2022 – 2026",
    score: "8.87",
    scoreLabel: "CGPA / 10.0",
    coursework: ["Data Structures", "Operating Systems", "DBMS", "Networks", "Machine Learning"],
    logo: "/mvsr.png" as string | null,
  },
  {
    level: "Class XII — Intermediate (MPC)",
    school: "Narayana Junior College",
    period: "2020 – 2022",
    score: "96.7%",
    scoreLabel: "Board Percentage",
    coursework: [],
    logo: "/NarayanaLogo.png" as string | null,
  },
  {
    level: "Class X — Secondary School Certificate",
    school: "Bhashyam High School",
    period: "2019 – 2020",
    score: "10.0",
    scoreLabel: "GPA / 10.0",
    coursework: [],
    logo: "/bhashyamLogo.jpg" as string | null,
  },
];

export const certifications = [
  { name: "AWS Cloud Foundations",              issuer: "Amazon Web Services",  year: "2024" },
  { name: "Generative AI Virtual Internship",   issuer: "Online Program",       year: "2024" },
  { name: "Frontend Web Development",           issuer: "Coursera / Udemy",     year: "2023" },
  { name: "Python for Data Science",            issuer: "Online Program",       year: "2023" },
  { name: "Machine Learning Basics",            issuer: "Online Program",       year: "2023" },
  { name: "Cloud Computing Fundamentals",       issuer: "Online Program",       year: "2023" },
  { name: "Git & Collaboration",                issuer: "Online Program",       year: "2022" },
  { name: "Hackathon Winner — College / Regional", issuer: "MVSR / CSI",        year: "2024" },
];

export const achievements = [
  {
    title: "National Champion — HackSavvy 2025",
    sub: "1st Place (National) — Led a team of 4 to build UrbanFlow AI (Smart Traffic)",
  },
  {
    title: "National Finalist — Encode 25",
    sub: "2nd Place (National) — LearnityX (Career accelerator)",
  },
  {
    title: "CSI Hackathon — Winner",
    sub: "Regional winner for UrbanFlow AI project",
  },
  {
    title: "MVSR Website Redesign — Team Lead",
    sub: "Selected as Team Lead after winning internal college hackathon (1st out of 100 teams)",
  },
  {
    title: "Hackathon Track Record",
    sub: "Winner of 4 hackathons (including 2 national-level events) — 100% success rate",
  },
];
