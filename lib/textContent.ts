/**
 * Flattens the full content model into plain text lines per section.
 * Used by Vim and k9s modes, which present the *complete* journey as monospace
 * text — school, college, masters, both jobs, projects, certs, awards, scores.
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
    `# ${p.title}  ·  ${p.year}  ·  [${p.tags.join(", ")}]`,
    `  ${p.summary}`,
    `  problem:   ${p.problem}`,
    `  built:     ${p.whatYouBuilt}`,
    `  decisions: ${p.keyDecisions}`,
    `  shows:     ${p.whatItShows}`,
  ];
  if (p.stack) base.push(`  stack:     ${p.stack.join(", ")}`);
  if (p.links) base.push(`  links:     ${p.links.map((l) => `${l.label} <${l.href}>`).join("  ")}`);
  base.push("");
  return base;
};

export const textSections: TextSection[] = [
  {
    id: "experience",
    label: "experience",
    meta: `${experience.length} companies`,
    lines: experience.flatMap((e) => [
      `# ${e.company} — ${e.location}`,
      ...e.roles.map((r) => `  ${r.title.padEnd(28)} ${r.period}`),
      "",
      `  ${e.summary}`,
      "",
      "  ## Highlights",
      ...e.highlights.map((h) => `  - ${h}`),
      "",
      "  ## Recognition",
      ...e.accolades.map((a) => `  ★ ${a}`),
      "",
      `  stack: ${e.stack.join(", ")}`,
      "",
      "",
    ]),
  },
  {
    id: "projects",
    label: "projects",
    meta: `${projects.length} projects`,
    lines: projects.flatMap(wrapProject),
  },
  {
    id: "education",
    label: "education",
    meta: `${education.length} programs`,
    lines: education.flatMap((ed) => [
      `# ${ed.degree} — ${ed.school}  (${ed.period})`,
      `  ${ed.detail}`,
      ...ed.notes.map((n) => `  - ${n}`),
      "",
    ]),
  },
  {
    id: "certifications",
    label: "certifications",
    meta: `${certifications.length} certs`,
    lines: [
      "# Certifications & Courses",
      "",
      ...certifications.map((c) => `  ${c.date.padEnd(10)} ${c.name}  —  ${c.issuer}`),
    ],
  },
  {
    id: "awards",
    label: "awards",
    meta: `${awards.length} awards`,
    lines: ["# Awards & Recognition", "", ...awards.map((a) => `  ${a.year}   ${a.text}`)],
  },
  {
    id: "scores",
    label: "scores",
    meta: "GRE · TOEFL",
    lines: ["# Test Scores", "", ...scores.flatMap((s) => [`  ${s.test.padEnd(10)} ${s.result}`, `             ${s.detail}`, ""])],
  },
  {
    id: "origin",
    label: "origin",
    meta: "Where it started",
    lines: ["# Origin", "", `  ${origin.blurb}`, "", ...origin.lines.map((l) => `  - ${l}`)],
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
      `  email:    ${profile.links.email}`,
      `  linkedin: ${profile.links.linkedin}`,
      `  github:   ${profile.links.github}`,
      `  resume:   ${profile.links.resume}`,
      `  location: ${profile.location}`,
    ],
  },
];

export const sectionById = (id: string) => textSections.find((s) => s.id === id);
