/**
 * Single source of truth for the whole site.
 * Visual mode shows a curated subset (featured items, short). Vim and k9s modes
 * and the detail pages show everything — the full journey, certs, awards, scores.
 * Content never forks across the three presentations.
 */

import { asset } from "./asset";

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
    // public/ asset reached by a plain <a> — must carry the basePath itself.
    resume: asset("/resume.pdf"),
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
    tags: ["Python", "RAG", "Qdrant", "Evals"],
    summary: "A RAG pipeline where every claim must cite the passage it came from — and the system reports how often it succeeds.",
    oneLiner:
      "Financial-news sentiment where every stated driver has to cite the retrieved passage supporting it, and the grounding rate ships in the response instead of staying an internal detail.",
    problem:
      "Getting an LLM to emit well-formed JSON is solved — constrained decoding does it. What constrained decoding cannot do is make the JSON true. A schema can force a citations field to exist; it cannot make the IDs in it real, or make the cited passage actually support the claim attached to it. So a sentiment pipeline can be fully \"structured\" and still be confidently wrong, in a format that looks rigorous. I wanted to treat that as the engineering problem rather than a footnote.",
    whatYouBuilt:
      "Keyless RSS ingest → relevance filtering → dedupe → chunk → embed → Qdrant → retrieval → Qwen3 via a local OpenAI-compatible runtime, with per-claim citations enforced by a schema rebuilt for every request, a grounding check on each cited passage, and a run manifest that reproduces any answer. Plus an eval harness with a FinBERT baseline, a hand-labelled set scored for inter-annotator agreement, and a committed scorecard.",
    keyDecisions:
      "Rebuild the response schema per request so the citation field is an enum of the IDs actually retrieved; refuse rather than return an ungrounded answer; hand-label the eval set because a set labelled by the model under test measures nothing; publish the scorecard including the parts that don't flatter it.",
    whatItShows:
      "That I can build a system that knows what it doesn't know, and prove it with numbers I didn't get to choose. The measurable claim is not that it scores well — it ties a 2019 baseline — it's that every number it reports is one you can check.",
    stack: ["Python", "Qdrant", "Qwen3", "FastAPI", "Pydantic", "Ollama / vLLM"],
    architecture: [
      {
        head: "Keyless ingest",
        body: "Every source is a keyless RSS feed, so the project runs from a clean clone with no credentials. Articles are relevance-filtered, deduped, chunked and embedded with BGE-small. A scheduled canary tells me when a feed's shape changes.",
      },
      {
        head: "Citations the model cannot invent",
        body: "Each retrieved passage enters the prompt with a short ID, and the response schema is rebuilt per request with those IDs as an enum on the citation field. A static schema can only say \"a list of strings\" — it cannot say which strings. A validator still rejects unretrieved citations, because constrained decoding is a claim made by whichever server answers.",
      },
      {
        head: "Grounding, then refusal",
        body: "A second pass scores whether each cited passage actually supports its claim. Failures get one bounded repair attempt and then a hard error — an ungrounded answer is never returned quietly, and the grounding rate is printed alongside the verdict.",
      },
      {
        head: "Evaluation that can embarrass me",
        body: "A hand-labelled set, a FinBERT baseline, and a committed scorecard regenerated by make eval so a regression appears in a diff. Two annotators labelled the set independently; Cohen's κ is reported so a reader can judge the labels, not just the score.",
      },
    ],
    decisions: [
      "Per-request citation enum — not belt-and-braces. With it removed, the same model on the same corpus emitted zero valid citation IDs, filling the field with paraphrased quotes while the prompt named C1…C8 explicitly.",
      "Keyless by construction — a portfolio project that needs four paid credentials to start is a project nobody ever runs.",
      "Hand-labelled evals — an eval set labelled by the model under test measures agreement with that model, which is not a measurement of anything.",
      "Publish the unflattering number — fixing a mislabelled rule raised inter-annotator κ from 0.31 to 0.65 and erased a 9-point win over the FinBERT baseline. The lower number is the first one worth publishing.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/ArjunChavan219/market-sentiment-rag" },
      { label: "Scorecard", href: "https://github.com/ArjunChavan219/market-sentiment-rag/blob/main/evals/scorecard.md" },
    ],
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

export interface OriginChapter {
  id: string;
  title: string;
  period?: string;
  paragraphs: string[];
  bullets?: string[];
}

/**
 * The long version — Mumbai to Tysons, in order. This is deliberately *not*
 * curated the way Visual mode is: it's the full account, and it lives in the
 * Vim and k9s views for the people who go looking.
 */
export const origin = {
  blurb:
    "The through-line from a fifth-grader writing his first programs on a family computer in Mumbai to an engineer shipping production AI in Virginia. It is one long habit, not a career plan.",
  chapters: [
    {
      id: "first-machine",
      title: "The first machine",
      period: "School · Mumbai",
      paragraphs: [
        "I wrote my first program in 5th standard, before I had any idea it was a profession. The computer was the most interesting object in the house and everything I learned about it was in service of making it do something it hadn't done before.",
        "It went in the order that curiosity goes, not the order a syllabus would pick: Flash animation in 6th, Photoshop in 7th, then C++ and Java by 8th with a private tutor because school had run out of things to teach me on the subject. By the time I got to engineering college I had already been writing code for half my life.",
      ],
      bullets: [
        "First programs in 5th standard.",
        "Flash animation in 6th, Photoshop in 7th.",
        "C++ and Java by 8th standard, through private tutoring.",
      ],
    },
    {
      id: "arithmetic",
      title: "Arithmetic before algorithms",
      period: "School · Mumbai",
      paragraphs: [
        "In parallel — and this is the part that actually shaped how I think — I trained in mental arithmetic. UCMAS abacus with a Distinction at every level, then Vedic Maths. Years of drilling numbers until the answer arrives before the method does.",
        "What it left behind wasn't arithmetic. It was the expectation that a hard thing becomes an automatic thing if you sit with it long enough, and an instinct for finding the shorter path through a calculation. I reach for that instinct constantly — in optimization work, in cost/latency trade-offs, in the moment where a system's structure suddenly simplifies.",
      ],
      bullets: [
        "UCMAS Abacus — Distinction at all levels.",
        "Vedic Maths.",
        "International Maths Olympiad — rank 446.",
        "IPM and Ganit Pradnya merit awards.",
      ],
    },
    {
      id: "practice",
      title: "Practice as a default setting",
      period: "School · Mumbai",
      paragraphs: [
        "Music and sport ran alongside all of it. Indian classical, keyboard, harmonica and tanpura, graded 4th through 8th. Swimming, gymnastics, lawn tennis, skating.",
        "None of it was for a résumé — it was simply how the days were spent. But it built the thing every one of those disciplines has in common with engineering: you are bad at it, you keep going, and one day the mechanics disappear and you are just doing the thing. I don't experience learning as a special event. It's the normal state.",
      ],
      bullets: [
        "Music — Indian classical, keyboard, harmonica, tanpura (grades 4–8).",
        "Sport — swimming, gymnastics, lawn tennis, skating.",
      ],
    },
    {
      id: "dbit",
      title: "Engineering school, and everything around it",
      period: "DBIT, Mumbai University · 2017 – 2021",
      paragraphs: [
        "B.E. in Computer Engineering, 3.9/4.0, Best Outgoing Student of the 2017–2021 batch. But the coursework is not what I remember. The competitions are.",
        "PEGASUS was the big one: an international Can-Sat team building a satellite the size of a soda can that had to survive a launch and fly on its own. I was Head of Software Subsystems and alternate team lead — flight-controller and microcontroller firmware across Pixhawk, Arduino, Teensy and Raspberry Pi, plus circuit-board design. We placed 82nd internationally in 2019 and 40th in 2020. It was the first time I built software where a single bug ends the mission and there is no patch release. That standard never left.",
        "Then the Smart India Hackathon Grand Finale in 2020, on an ISRO problem statement: plan a drone's route given battery limits, refuelling points and real terrain. The insight that won it was refusing to treat it as a shortest-path problem — a shorter route that runs out of battery isn't a route. Reframed as constraint satisfaction, it came out roughly 70% more efficient than greedy routing.",
        "The final-year project was a hybrid text-and-image compression system — deep-learning models reaching a 300:1 image ratio, and a parallel LZSS+Huffman implementation in CUDA at a 25× speedup. It was accepted for oral presentation at the International Symposium on Grids and Clouds in 2021, which was the first time work of mine was judged by people who had no reason to be kind about it.",
      ],
      bullets: [
        "B.E. Computer Engineering — GPA 3.9/4.0.",
        "Best Outgoing Student, batch of 2017–2021.",
        "PEGASUS Can-Sat — Head of Software Subsystems, alternate team lead. AAS International 82nd (2019), 40th (2020).",
        "Robocon — 43rd nationally (2019).",
        "Smart India Hackathon Grand Finale 2020 — ISRO drone route planning, ~70% more efficient routes.",
        "Hybrid compression final-year project — 300:1 image ratio, 25× parallel speedup; ISGC 2021 oral presentation.",
        "Several inter-college coding competition wins.",
      ],
    },
    {
      id: "cimpress",
      title: "What production actually costs",
      period: "Cimpress, Mumbai · Aug 2021 – Aug 2023",
      paragraphs: [
        "My first real job, and the one that turned me from someone who writes software into someone who runs it. I started full-stack — React and Node features shipping to 300K+ users across six product squads, REST APIs carrying 5M+ requests a day — and moved into DevOps, where the consequences live.",
        "The projects I was handed were mostly things nobody had done before at the company, which meant the work always started with a week of reading. Ctools Client Auditor was my first solo end-to-end project: learn CommerceTools and Jira from scratch, then build and test a credential auditor. CMS Backup Verification was my first Docker and Kubernetes work, shipped as a cronjob. The repository rollback strategy meant going down into Git and CodeCommit internals until I understood exactly what a rollback does to history. There was a CodeArtifact migration investigation that was pure research.",
        "Then the NA Migration — a time-sensitive, company-wide, multi-team launch. My team lead's note afterwards was about availability and logical deliverability under stress, which is still the compliment I care most about. I was nominated for a PR2 promotion before I left for my master's.",
        "The habits from those two years are the ones I still work by: infrastructure as code (Terraform standardized across four teams, drift eliminated), CI/CD that cuts deploy time by 90% with zero-downtime releases, test coverage taken from 45% to 82%, and onboarding docs for 25+ services because a system nobody can ramp into is a system with one owner.",
      ],
      bullets: [
        "Full-stack → DevOps across multiple product squads.",
        "Ctools Client Auditor — first solo end-to-end project (CommerceTools + Jira credential audit).",
        "CMS Backup Verification — first Docker/Kubernetes work, built as a cronjob.",
        "Repository rollback strategy — Git and CodeCommit internals.",
        "AWS CodeArtifact migration investigation.",
        "NA Migration — company-wide, time-sensitive launch; recognized by the team lead.",
        "Nominated for PR2 promotion before leaving for the MS.",
      ],
    },
    {
      id: "jhu",
      title: "Baltimore",
      period: "Johns Hopkins University · Aug 2023 – Dec 2024",
      paragraphs: [
        "I moved from Mumbai to Baltimore for an M.S. in Computer Science and finished it in 16 months by loading extra credits, at a 3.9/4.0. Going early was deliberate: I had two years of production experience and wanted the degree to be a sharpening step, not a pause.",
        "I chose the project-heavy path over the theory-heavy one — Software System Design, Cloud Computing, Neural Networks, Artificial Intelligence, Deep Learning — and spent three semesters as a Course Assistant, for AI in Spring and Fall 2024 and Deep Learning in Fall 2024. Teaching a subject to a room of people who will immediately find the hole in your explanation is the fastest way I know to find out what you only half-understand.",
        "The summer internship in the middle of it was at Strategy, and it converted to a full-time offer.",
      ],
      bullets: [
        "M.S. Computer Science, GPA 3.9/4.0 — finished in 16 months.",
        "Course Assistant — Artificial Intelligence (Spring & Fall 2024), Deep Learning (Fall 2024).",
        "Coursework: Software System Design, Cloud Computing, Neural Networks, AI, Deep Learning.",
        "Summer 2024 internship at Strategy, converted to full-time.",
      ],
    },
    {
      id: "strategy",
      title: "Tysons Corner",
      period: "Strategy · May 2024 – present",
      paragraphs: [
        "I joined as an intern, built the AI assistant inside Autodash 1.0 (50K monthly users) and an AI-driven theme and palette recommendation engine, came back full-time as SWE1 in February 2025, and was promoted to Software Engineer 2 on April 1, 2026.",
        "The work since has been applied AI at production scale, which is a very different discipline from applied AI in a notebook. I led Autodash 2.0 — a multi-agent workflow for autonomous dashboard creation — from proof of concept to launch, and I own the application-layer orchestration underneath it: multi-provider integration across OpenAI, Groq and Anthropic serving 2M+ queries a day, a dynamic routing layer that cut AI infrastructure cost by roughly $50K a year, and prompt optimization that took 40% of the tokens out while holding 92% of the accuracy.",
        "One I'm quietly proud of: a functional AI use case prototyped and launched in under three days, formally recognized at Strategy's 2026 Annual Conference. Speed is a design decision, not an accident — it comes from knowing which parts you're allowed to skip.",
        "Since the promotion the job has widened past the code. Customer-facing AI enablement on enterprise calls covering in-house setup, Kubernetes and Docker, cloud deployment configuration; point of contact for AI on a major enterprise client, with deployments on GKE and Azure containers; and mentoring four incoming engineers — two interns and two new-grad full-timers.",
      ],
      bullets: [
        "Engineering Intern (May–Aug 2024) → SWE1 (Feb 2025) → SWE2 (Apr 1, 2026).",
        "Autodash 2.0 — multi-agent workflow, PoC to launch.",
        "LLM orchestration layer — 2M+ queries/day across three providers.",
        "Multi-provider routing — ~$50K/year infrastructure saved.",
        "Prompt optimization — 40% fewer tokens at 92% accuracy retained.",
        "AI use case prototyped and launched in under 3 days — recognized at the 2026 Annual Conference.",
        "Customer-facing enablement (GKE, Azure containers) and mentoring 4 engineers.",
      ],
    },
    {
      id: "own-time",
      title: "What I build when nobody's asking",
      paragraphs: [
        "The tell, if you want one, is what gets built on weekends. It is almost always a tool for a problem I actually have, which is why the small ones get finished.",
        "An expense-splitting app on a Raspberry Pi 4 — React, Flask, PostgreSQL, self-hosted behind Route 53 and CloudFront — built specifically to own every layer from the hardware to the domain. A GRE vocabulary desktop app in Python because drilling vocabulary needed to be frictionless. Market Sentiment RAG, which is open source: a financial-news pipeline where every stated driver has to cite the passage it came from, with the grounding rate reported in the answer and a committed scorecard that publishes the numbers that don't flatter it.",
        "And tailchute, which is open source: a small service that lets me paste a screenshot straight into a Claude Code session running on another machine over Tailscale. It exists because macOS puts screenshots on the clipboard, Taildrop can only send files, and I hit that wall every single day.",
      ],
      bullets: [
        "Expense splitter — self-hosted on a Raspberry Pi 4 with real cloud DNS/CDN.",
        "GRE vocabulary GUI — Python/Tkinter, built to remove friction from my own studying.",
        "Market Sentiment RAG — open source; enforced per-claim citations, grounding rate reported, scorecard committed.",
        "tailchute — open source; paste screenshots into a remote Claude Code session over Tailscale.",
      ],
    },
    {
      id: "how-i-work",
      title: "How I work",
      paragraphs: [
        "I think from the machine's side first — decompose a problem into small modular units, put abstraction layers where the seams are, and make the structure obvious enough that the next person doesn't need me to explain it. Clean code is maintainable code; that isn't an aesthetic position, it's an operational one.",
        "User experience drives technical decisions, not the other way around — the elegant internal design that produces a worse product is the wrong design. And automation over repetition, always: if I have done something by hand three times, the fourth time is a script.",
        "What I actually enjoy: optimization, automation, going into an existing system until I understand why it is the way it is and then modernizing it, and debugging. Especially debugging. The bug is the part of the system that is telling you the truth.",
      ],
      bullets: [
        "Clean code is maintainable code.",
        "User experience drives technical decisions.",
        "Automation over repetition.",
        "Decompose into small modular units behind clear abstraction layers.",
      ],
    },
    {
      id: "next",
      title: "What's next",
      paragraphs: [
        "An early-stage role where I own the full technical stack of an AI product, or a senior IC seat on a team shipping production software at scale. The constant across everything above is that I like being responsible for whether the thing works — end to end, in production, in front of real users.",
      ],
    },
  ] as OriginChapter[],
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
