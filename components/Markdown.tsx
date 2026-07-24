"use client";

/**
 * A deliberately tiny Markdown renderer for the Vim / k9s "formatted" view.
 *
 * It only handles the subset lib/textContent.ts emits — headings, bullets,
 * blockquotes, rules, and inline **bold** / `code` / [links](url) — because the
 * input is our own content, not user input. No dependency, no HTML injection,
 * and the raw view stays byte-identical to what this renders from.
 *
 * Colours come from the active terminal scheme (see lib/terminalTheme.ts) and
 * are assigned by ANSI role — headings yellow/blue, bullets yellow, code green,
 * quotes green, links cyan — the way a real markdown syntax file would.
 */

import { Fragment, type ReactNode } from "react";

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--t-fg)] brightness-125">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-[var(--t-sel)] px-1.5 py-0.5 text-[0.92em] text-[var(--t-green)]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const external = href.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-[var(--t-cyan)] underline decoration-[var(--t-cyan)]/50 underline-offset-4 transition-colors hover:decoration-[var(--t-cyan)]"
        >
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function Markdown({ lines }: { lines: string[] }) {
  return (
    <div className="max-w-3xl pb-10 pt-2 text-[13px] leading-[1.75] text-[var(--t-fg)]">
      {lines.map((raw, i) => {
        const line = raw.trimEnd();

        if (line === "") return <div key={i} className="h-3" />;
        if (line === "---") return <hr key={i} className="my-5 border-0 border-t border-[var(--t-faint)]" />;

        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="mb-1 mt-5 text-[11px] uppercase tracking-[0.2em] text-[var(--t-magenta)]">
              {inline(line.slice(4))}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="mb-1 mt-6 border-l-2 border-[var(--t-blue)] pl-3 text-[16px] font-semibold text-[var(--t-blue)]">
              {inline(line.slice(3))}
            </h2>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h1
              key={i}
              className="mb-4 border-b border-[var(--t-faint)] pb-2 text-[13px] uppercase tracking-[0.32em] text-[var(--t-yellow)]"
            >
              {inline(line.slice(2))}
            </h1>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <blockquote key={i} className="my-2 border-l-2 border-[var(--t-green)] pl-4 italic text-[var(--t-green)]">
              {inline(line.slice(2))}
            </blockquote>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-3 py-0.5 pl-1">
              <span className="select-none text-[var(--t-yellow)]" aria-hidden>
                •
              </span>
              <span className="flex-1">{inline(line.slice(2))}</span>
            </div>
          );
        }
        return <p key={i}>{inline(line)}</p>;
      })}
    </div>
  );
}
