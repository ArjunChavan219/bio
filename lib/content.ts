/**
 * Single source of truth for the whole site.
 * Visual mode shows a curated subset (featured items, short). Vim and k9s modes
 * and the detail pages show everything — the full journey, certs, awards, scores.
 * Content never forks across the three presentations.
 */

export const profile = {
  name: "Arjun Chavan",
  title: "Software Engineer",
  tagline:
    "I build production software — LLM systems, full-stack services, and the infrastructure that keeps them reliable at scale.",
  blurb:
    "Multi-agent orchestration, retrieval, and millions of requests a day. Currently SWE2 at Strategy; JHU MSCS.",
  location: "Tysons Corner, VA · open to relocation",
  metrics: [
    { value: "2M+", label: "LLM queries / day" },
    { value: "5M+", label: "API requests / day" },
    { value: "$50K", label: "infra saved / yr" },
    { value: "4+ yrs", label: "production eng" },
  ],
  links: {
    email: "arjun.chavan999@gmail.com",
    linkedin: "https://www.linkedin.com/in/arjun-chavan-9936041a6/",
    linkedinLabel: "arjun-chavan-9936041a6",
    github: "https://github.com/ArjunChavan219",
    githubLabel: "ArjunChavan219",
    resume: "/resume.pdf",
  },
} as const;

/* ------------------------------ Experience ------------------------------- */

export interface ExperienceRole {
  title: string;
  period: string;
}
export interface ExperienceEntry {
  id: string;
  company: string;
  location: string;
  roles: ExperienceRole[];
  summary: string;
  highlights: string[];
  accolades: string[];
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "strategy",
    company: "Strategy",
    location: "Tysons Corner, VA",
    roles: [
      { title: "Software Engineer 2", period: "Apr 2026 – present" },
      { title: "Software Engineer 1", period: "Feb 2025 – Apr 2026" },
      { title: "Engineering Intern", period: "May – Aug 2024" },
    ],
    summary:
      "Lead applied-AI initiatives on the enterprise platform — owning LLM features end to end, the orchestration layer behind them, and (post-promotion) the customer-facing enablement and mentorship around them. (Strategy, formerly MicroStrategy.)",
    highlights: [
      "Led Autodash 2.0 from PoC to launch — a multi-agent workflow enabling autonomous dashboard creation, designed end to end.",
      "Built the application-layer LLM orchestration integrating OpenAI, Groq, and Anthropic — 2M+ daily queries in production.",
      "Designed a dynamic multi-provider routing layer that cut AI infrastructure cost by ~$50K/year.",
      "Drove prompt optimization across enterprise AI apps: 40% token reduction at 92% accuracy retained.",
      "Shipped a functional AI use case as a 3-day prototype — formally recognized at Strategy's 2026 Annual Conference for execution speed.",
      "Post-promotion: customer-facing AI enablement — enterprise calls covering in-house app setup, Kubernetes/Docker, and cloud deployment configs; point of contact for AI on a major enterprise client (5 client-facing calls, deployments on GKE and Azure containers).",
      "Mentoring 4 incoming engineers (2 interns Jun 2026, 2 new-grad FT Aug 2026).",
      "As an intern: built the AI assistant for Autodash 1.0 (50K monthly users) and an AI-driven theme/palette recommendation engine.",
    ],
    accolades: [
      "Promoted to Software Engineer 2 (April 1, 2026).",
      "Formal recognition at Strategy's 2026 Annual Conference for prototyping and launching an AI use case in under 3 days.",
    ],
    stack: ["Python", "LangGraph", "OpenAI / Anthropic / Groq", "Kubernetes", "GCP", "Azure"],
  },
  {
    id: "cimpress",
    company: "Cimpress",
    location: "Mumbai, India",
    roles: [
      { title: "DevOps Engineer", period: "Jan 2022 – Aug 2023" },
      { title: "Software Engineer, Full Stack", period: "Aug 2021 – Dec 2021" },
    ],
    summary:
      "Owned production DevOps and full-stack work across multiple product squads — infrastructure, CI/CD, and customer-facing features at 5M+ daily request scale.",
    highlights: [
      "Owned 5 production projects end to end: Ctools Client Auditor (CommerceTools/Jira credential audit), CMS Backup Verification (first Docker/K8s Cronjob), Repository Rollback Strategy (Git/CodeCommit internals), and a CodeArtifact migration investigation.",
      "Delivered the NA Migration company-wide launch — a time-sensitive multi-team deployment; recognized by the team lead for execution under pressure.",
      "Operated 15+ AWS services (including EKS and CodePipeline) supporting deployments serving 500K users.",
      "Built CI/CD automation with Docker + Kubernetes: 90% deploy-time reduction with zero-downtime releases.",
      "Standardized Terraform IaC across 4 teams: 100% deployment consistency, eliminated configuration drift.",
      "Shipped React.js / Node.js features to 300K+ users across 6 product squads.",
      "Built REST APIs handling 5M+ daily requests; caching reduced DB load by 60%.",
      "Raised code coverage 45% → 82% via SonarCloud; wrote onboarding docs for 25+ services, cutting new-dev ramp-up 50%.",
    ],
    accolades: [
      "Nominated for PR2 promotion before departing for the MS.",
      "Recognized by the team lead on the NA Migration for availability and logical deliverability under stress.",
    ],
    stack: ["AWS (EKS, CodePipeline)", "Kubernetes", "Docker", "Terraform", "React / Node", "Python"],
  },
];

/* ------------------------------- Education ------------------------------- */

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  detail: string;
  period: string;
  notes: string[];
}

export const education: EducationEntry[] = [
  {
    id: "jhu",
    school: "Johns Hopkins University",
    degree: "M.S. Computer Science",
    detail: "GPA 3.9 / 4.0 · Baltimore, MD",
    period: "Dec 2024",
    notes: [
      "Finished in 16 months (took extra credits to graduate early).",
      "Course Assistant — Artificial Intelligence (Spring & Fall 2024), Deep Learning (Fall 2024).",
      "Coursework: Software System Design, Cloud Computing, Neural Networks, AI, Deep Learning.",
    ],
  },
  {
    id: "great-lakes",
    school: "Great Lakes / Great Learning",
    degree: "Post Graduate Program in Data Science",
    detail: "Online",
    period: "Dec 2022",
    notes: ["Applied data-science program completed alongside early career work."],
  },
  {
    id: "mumbai",
    school: "Mumbai University (DBIT)",
    degree: "B.E. Computer Engineering",
    detail: "GPA 3.9 / 4.0 · Mumbai, India",
    period: "Jun 2021",
    notes: ["Best Outgoing Student, Batch 2017–2021."],
  },
];

/* -------------------------------- Projects ------------------------------- */

export type ProjectCategory = "professional" | "personal" | "academic";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  tags: string[];
  summary: string;
  problem: string;
  whatYouBuilt: string;
  keyDecisions: string;
  whatItShows: string;
  /** Shown in Visual mode's curated grid. Everything appears in Vim/k9s. */
  featured?: boolean;
  /** Optional deep case-study fields (the RAG anchor). */
  oneLiner?: string;
  stack?: string[];
  architecture?: { head: string; body: string }[];
  decisions?: string[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "market-sentiment-rag",
    title: "Market Sentiment RAG",
    category: "personal",
    year: "2026",
    featured: true,
    tags: ["Python", "vLLM", "Qdrant", "RAG"],
    summary: "Self-hosted RAG that reads market news across asset classes and returns structured, typed sentiment.",
    oneLiner:
      "A self-hosted RAG system that ingests market news across asset classes and returns structured, typed sentiment analysis downstream systems can actually consume.",
    problem:
      "Financial markets move on information velocity. I wanted a system that ingests market news across multiple asset classes in real time, retrieves the most relevant context for a query (ticker, theme), and returns structured, typed sentiment — with the model and vector infrastructure self-hosted, so there's no per-token API bleed and no data leaving the system.",
    whatYouBuilt:
      "Multi-source ingestion with priority fallback per asset class, a semantic + metadata retrieval layer over Qdrant, and a self-hosted Qwen model served by vLLM on GCP Vertex AI behind an OpenAI-compatible API — every response shaped by a typed schema.",
    keyDecisions:
      "Multi-source priority ordering for resilience; semantic + metadata filtering so finance queries aren't just top-k; vLLM for production batching; separate chunk types so reports and article content route to the right context.",
    whatItShows:
      "A real production-shaped applied-AI stack: multi-provider orchestration, semantic + metadata retrieval, self-hosted inference, and a clean typed API surface — on infrastructure I own outright.",
    stack: ["Python", "vLLM", "Qdrant", "GCP Vertex AI", "Qwen", "Pydantic"],
    architecture: [
      {
        head: "Multi-source ingestion",
        body: "Prioritized feeds per asset class — stocks via AlphaVantage → Finnhub → Marketaux → NewsAPI; crypto via AlphaVantage → CryptoRSS → Marketaux; forex via an Investing.com scraper + RSS; bonds/commodities via YahooFinance. Every article is full-text enriched asynchronously.",
      },
      {
        head: "Retrieval layer",
        body: "Semantic search (cosine similarity on embeddings) with metadata filtering on instrument / asset_class / custom filters, plus a configurable score threshold (default 0.7).",
      },
      {
        head: "Inference",
        body: "vLLM serving a self-hosted Qwen model on GCP Vertex AI, wrapped in an OpenAI-compatible API so the rest of the stack stays vendor-neutral.",
      },
      {
        head: "Typed outputs",
        body: "Four response schemas (SentimentResult, ArticleData, AnalysisResponse, ChatResponse) so every response is a contract, not prose.",
      },
    ],
    decisions: [
      "Multi-source with priority ordering — if AlphaVantage is down, fall back to Finnhub. No brittle single point of failure.",
      "Semantic + metadata filtering — constrained by relevance and instrument/timeframe, not just top-k. Finances don't tolerate \"close enough.\"",
      "vLLM for serving — production-grade throughput and batching, chosen for auto-batch and a LoRA-capable serving layer.",
      "Chunk-type distinction — reports and article content stored separately so a query routes to the right context.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/ArjunChavan219" }],
  },
  {
    id: "librechat-coursetools",
    title: "LibreChat CourseTools",
    category: "academic",
    year: "2024",
    featured: true,
    tags: ["AI", "Full-stack", "React / Node"],
    summary: "Role-based AI course-management platform for 1,000+ students, with professor / TA / student hierarchies.",
    problem:
      "A graduate course needed an AI chat platform where professors, TAs, and students each had the right access, scoped to course-specific context.",
    whatYouBuilt:
      "A full-stack React/Node platform serving 1,000+ students with role-based auth hierarchies and multi-model AI support, exposing course-specific conversational interfaces.",
    keyDecisions:
      "Role hierarchy and per-course scoping up front, and multi-model support so the platform wasn't locked to a single provider.",
    whatItShows:
      "Shipping a real multi-user AI product end to end — auth, scoping, and model abstraction — not a demo.",
  },
  {
    id: "little-go",
    title: "Little Go AI Player",
    category: "academic",
    year: "2024",
    featured: true,
    tags: ["AI", "Python", "Game Theory"],
    summary: "Game-playing AI using minimax search and learned board-evaluation heuristics; ~80% win rate.",
    problem:
      "Implement an AI player for Little Go (simplified Go on a smaller board) that could beat a human player consistently.",
    whatYouBuilt:
      "Minimax search with alpha-beta pruning paired with a heuristic board evaluator scoring positions on territory control, group safety, and influence, refined iteratively to learn which features mattered.",
    keyDecisions:
      "Balancing search depth against evaluation quality — a smarter evaluator meant shallower search was enough. Tuned until the bot reliably won ~80% of games.",
    whatItShows:
      "Search algorithms, heuristic design, and the optimization thinking that powers agent orchestration and decision-making at scale.",
  },
  {
    id: "covid-lstm",
    title: "COVID-19 Prediction LSTM",
    category: "academic",
    year: "2021",
    tags: ["ML", "Time Series", "Flask"],
    summary: "Time-series model forecasting COVID case counts at 85% precision across countries.",
    problem:
      "Early 2021: test whether historical case data could forecast future case counts in a region — useful for resource planning.",
    whatYouBuilt:
      "An LSTM trained on case-count time series from multiple countries (India, Germany, Italy, Spain) at 85% precision, deployed as a Flask web app so anyone could input a region and see a forecast.",
    keyDecisions:
      "Avoiding overfitting on region-specific anomalies while staying general — dropout regularization and per-country validation splits, not global.",
    whatItShows:
      "ML fundamentals (time-series modeling, evaluation discipline) and the full cycle from training to deployment.",
  },
  {
    id: "isro-drone",
    title: "Drone Route Planning",
    category: "academic",
    year: "2020",
    featured: true,
    tags: ["Optimization", "Algorithms", "ISRO"],
    summary: "Algorithm for 70% more efficient autonomous drone routes under battery and terrain constraints.",
    problem:
      "ISRO's Smart India Hackathon prompt: given a drone's battery, fuel stations, and a geography with obstacles, plan a route minimizing distance and time.",
    whatYouBuilt:
      "An algorithm that improved route efficiency ~70% over greedy routing — dynamic battery constraints and nearest refueling points, terrain baked into the heuristic, and real-time re-routing. Interactive AngularJS + Google Maps visualizations let judges watch it adjust in simulation.",
    keyDecisions:
      "Treating it as a constraint-satisfaction problem, not just shortest-path. A shorter route that runs out of battery isn't a route at all.",
    whatItShows:
      "Algorithmic optimization, systems thinking under constraints, and communicating complex technical work visually.",
  },
  {
    id: "htip-compression",
    title: "Hybrid Text + Image Compression",
    category: "academic",
    year: "2021",
    tags: ["Deep Learning", "Parallel Algorithms", "CUDA"],
    summary: "Final-year project: 300:1 image compression via DL + a 25× parallel LZSS+Huffman text algorithm.",
    problem:
      "Push compression ratios beyond conventional limits for mixed text-and-image payloads while keeping it fast.",
    whatYouBuilt:
      "Deep-learning models reaching a 300:1 image-compression ratio and a parallel LZSS+Huffman algorithm achieving a 25× speedup, built with PyTorch/TensorFlow/Keras and CUDA.",
    keyDecisions:
      "Splitting the problem by payload type and parallelizing the classical text path while letting DL handle images.",
    whatItShows:
      "Research-grade depth — accepted for oral presentation at the International Symposium on Grids and Clouds (ISGC) 2021.",
  },
  {
    id: "pegasus-cansat",
    title: "PEGASUS Can-Sat",
    category: "academic",
    year: "2020",
    tags: ["Embedded", "Firmware", "Robotics"],
    summary: "Head of Software Subsystems on an international Can-Sat team — flight firmware with zero margin for error.",
    problem:
      "Design and fly a can-sized satellite for the AAS international Can-Sat competition, with embedded software controlling sensors and flight triggers.",
    whatYouBuilt:
      "Led the embedded software subsystems — flight-controller and microcontroller firmware (Pixhawk, Arduino, Teensy, Raspberry Pi) for sensors and flight triggers — and contributed to circuit-board design.",
    keyDecisions:
      "Designing for hard-real-time reliability where a single firmware bug ends the mission.",
    whatItShows:
      "Embedded systems and team leadership under pressure — AAS International 82nd (2019), 40th (2020).",
  },
  {
    id: "expense-splitter",
    title: "Expense-Splitting Web App",
    category: "personal",
    year: "2021",
    tags: ["Full-stack", "React / Flask", "Self-hosted"],
    summary: "End-to-end full-stack app self-hosted on a Raspberry Pi with real cloud DNS/CDN.",
    problem:
      "Build and run a real full-stack product end to end, owning every layer from device to domain.",
    whatYouBuilt:
      "A React + Flask + PostgreSQL expense-splitting app self-hosted on a Raspberry Pi 4, fronted by AWS Route53 + CloudFront with Vercel.",
    keyDecisions:
      "Self-hosting on bare hardware to learn the full SDLC and the networking/CDN layer firsthand.",
    whatItShows:
      "End-to-end ownership and the full software lifecycle, hardware to production.",
  },
  {
    id: "gre-vocab",
    title: "GRE Vocabulary GUI",
    category: "personal",
    year: "2022",
    tags: ["Python", "Tkinter"],
    summary: "A self-study desktop app for GRE vocabulary, built to scratch my own itch.",
    problem: "Make GRE vocabulary drilling faster and more habitual during test prep.",
    whatYouBuilt: "A Python tkinter desktop GUI for spaced vocabulary self-study.",
    keyDecisions: "Keep it dead simple and local so the friction to study was near zero.",
    whatItShows: "Building small, useful tools to solve my own problems.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ----------------------- Certifications / Awards ------------------------- */

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  { name: "Post Graduate Program in Data Science", issuer: "Great Lakes / Great Learning", date: "2023" },
  { name: "100 Days of Code: The Complete Python Pro Bootcamp", issuer: "Udemy", date: "Jul 2023" },
  { name: "Tools for Data Science", issuer: "IBM / Coursera", date: "Sep 2022" },
  { name: "Mathematical Foundations of Machine Learning", issuer: "Coursera", date: "Feb 2022" },
  { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", date: "Mar 2021" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Mar 2021" },
  { name: "Getting and Cleaning Data", issuer: "JHU / Coursera", date: "Sep 2020" },
  { name: "R Programming", issuer: "JHU / Coursera", date: "Aug 2020" },
  { name: "The Data Scientist's Toolbox", issuer: "JHU / Coursera", date: "Jul 2020" },
];

export interface Award {
  year: string;
  text: string;
}

export const awards: Award[] = [
  { year: "2026", text: "Promoted to Software Engineer 2 at Strategy." },
  { year: "2026", text: "Formal recognition at Strategy's Annual Conference for prototyping & launching an AI use case in under 3 days." },
  { year: "2023", text: "Nominated for PR2 promotion at Cimpress before departing for the MS." },
  { year: "2021", text: "Best Outgoing Student, B.E. Batch 2017–2021, DBIT." },
  { year: "2020", text: "Smart India Hackathon Grand Finale · Can-Sat AAS International 40th · multiple inter-college coding wins." },
  { year: "2019", text: "Can-Sat AAS International 82nd · Robocon National 43rd." },
];

export interface Score {
  test: string;
  result: string;
  detail: string;
}

export const scores: Score[] = [
  { test: "GRE", result: "324", detail: "Verbal 154 · Quantitative 170 (96th pct) · AWA 3.5 · Jul 2022" },
  { test: "TOEFL iBT", result: "102", detail: "Reading 26 · Listening 27 · Speaking 22 · Writing 27 · Sep 2022" },
];

/* --------------------------------- Origin -------------------------------- */

export const origin = {
  blurb:
    "I started young and never really stopped — the through-line from a 5th-grader writing his first programs to a senior engineer shipping production AI.",
  lines: [
    "Started programming in 5th standard; C++ and Java by 8th (private tutoring).",
    "UCMAS Abacus (Distinction at all levels) and Vedic Maths.",
    "International Maths Olympiad rank 446; IPM and Ganit Pradnya merits.",
    "Music — Classical, Keyboard, Harmonica, Tanpura (grades 4–8).",
    "Sports — swimming, gymnastics, lawn tennis, skating.",
  ],
} as const;

/* --------------------------------- About --------------------------------- */

export const about = {
  paragraphs: [
    "I'm a software engineer who ships LLM-integrated systems at scale. Over 4+ years of production software I've gone deep on applied-AI orchestration (multi-provider routing, cost/accuracy trade-offs, prompt optimization), full-stack systems (APIs at millions of daily requests), and the infrastructure that keeps it all running. Finished my MS in CS a year early; currently SWE2 at Strategy, leading AI initiatives and mentoring incoming engineers.",
    "I'm drawn to problems where the constraints matter — teams shipping under uncertainty, systems that have to work on the first deployment, and the specific design decisions that turn an LLM from a neat demo into a trusted tool in production.",
    "Right now I'm looking for an early-stage role where I can own the full technical stack of an AI product, or a senior IC role on a team shipping production software at scale.",
  ],
} as const;

/* ----------------------- Visual-mode section index ----------------------- */

export const sections = [
  { id: "experience", label: "Experience", hint: "Strategy · Cimpress" },
  { id: "projects", label: "Projects", hint: "Featured work" },
  { id: "about", label: "About", hint: "Who I am" },
  { id: "contact", label: "Contact", hint: "Reach me" },
] as const;
