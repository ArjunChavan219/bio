/**
 * Flattens the full content model into Markdown, one array of lines per section.
 *
 * Vim and k9s modes present the *complete* journey — school, college, master's,
 * both jobs, every project, certs, awards, scores, the long origin story — and
 * both can show it two ways: the raw Markdown source, or the rendered version
 * (see components/Markdown.tsx). So these lines have to be real Markdown, not
 * pre-indented ASCII: headings, bullets, `**bold**`, `` `code` ``, [links](url).
 */

import {
  projects,
  experience,
  education,
  certifications,
  awards,
  scores,
  origin,
  about,
  profile,
} from "./content";

export interface TextSection {
  id: string;
  label: string;
  meta: string;
  lines: string[];
}

const wrapProject = (p: (typeof projects)[number]): string[] => {
  const base = [
    `## ${p.title}`,
    `\`${p.year}\` · \`${p.category}\` · ${p.tags.map((t) => `\`${t}\``).join(" ")}`,
    "",
    p.summary,
    "",
    `**Problem** — ${p.problem}`,
    "",
    `**Built** — ${p.whatYouBuilt}`,
    "",
    `**Decisions** — ${p.keyDecisions}`,
    "",
    `**Shows** — ${p.whatItShows}`,
  ];
  if (p.stack) base.push("", `**Stack:** ${p.stack.join(", ")}`);
  if (p.links) base.push("", `**Links:** ${p.links.map((l) => `[${l.label}](${l.href})`).join(" · ")}`);
  base.push("", "---", "");
  return base;
};

export const textSections: TextSection[] = [
  {
    id: "experience",
    label: "experience",
    meta: `${experience.length} companies`,
    lines: [
      "# Experience",
      "",
      ...experience.flatMap((e) => [
        `## ${e.company}`,
        `\`${e.location}\``,
        "",
        ...e.roles.map((r) => `**${r.title}** · ${r.period}`),
        "",
        e.summary,
        "",
        "### Highlights",
        ...e.highlights.map((h) => `- ${h}`),
        "",
        "### Recognition",
        ...e.accolades.map((a) => `- ★ ${a}`),
        "",
        `**Stack:** ${e.stack.join(", ")}`,
        "",
        "---",
        "",
      ]),
    ],
  },
  {
    id: "projects",
    label: "projects",
    meta: `${projects.length} projects`,
    lines: ["# Projects", "", ...projects.flatMap(wrapProject)],
  },
  {
    id: "education",
    label: "education",
    meta: `${education.length} programs`,
    lines: [
      "# Education",
      "",
      ...education.flatMap((ed) => [
        `## ${ed.degree}`,
        `**${ed.school}** · ${ed.detail} · \`${ed.period}\``,
        "",
        ...ed.notes.map((n) => `- ${n}`),
        "",
      ]),
    ],
  },
  {
    id: "certifications",
    label: "certifications",
    meta: `${certifications.length} certs`,
    lines: [
      "# Certifications & Courses",
      "",
      ...certifications.map((c) => `- \`${c.date}\` **${c.name}** — ${c.issuer}`),
    ],
  },
  {
    id: "awards",
    label: "awards",
    meta: `${awards.length} awards`,
    lines: ["# Awards & Recognition", "", ...awards.map((a) => `- \`${a.year}\` ${a.text}`)],
  },
  {
    id: "scores",
    label: "scores",
    meta: "GRE · TOEFL",
    lines: [
      "# Test Scores",
      "",
      ...scores.flatMap((s) => [`## ${s.test} — ${s.result}`, s.detail, ""]),
    ],
  },
  {
    id: "origin",
    label: "origin",
    meta: `${origin.chapters.length} chapters`,
    lines: [
      "# Origin",
      "",
      `> ${origin.blurb}`,
      "",
      "---",
      "",
      ...origin.chapters.flatMap((c) => [
        `## ${c.title}`,
        ...(c.period ? [`\`${c.period}\``, ""] : [""]),
        ...c.paragraphs.flatMap((p) => [p, ""]),
        ...(c.bullets ? [...c.bullets.map((b) => `- ${b}`), ""] : []),
        "---",
        "",
      ]),
    ],
  },
  {
    id: "about",
    label: "about",
    meta: profile.title,
    lines: ["# About", "", ...about.paragraphs.flatMap((p) => [p, ""])],
  },
  {
    id: "contact",
    label: "contact",
    meta: profile.links.email,
    lines: [
      "# Contact",
      "",
      `- **Email** — [${profile.links.email}](mailto:${profile.links.email})`,
      `- **LinkedIn** — [${profile.links.linkedinLabel}](${profile.links.linkedin})`,
      `- **GitHub** — [${profile.links.githubLabel}](${profile.links.github})`,
      `- **Resume** — [download PDF](${profile.links.resume})`,
      `- **Location** — ${profile.location}`,
    ],
  },
];

export const sectionById = (id: string) => textSections.find((s) => s.id === id);
