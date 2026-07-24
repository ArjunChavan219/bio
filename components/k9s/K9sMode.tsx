"use client";

/**
 * k9s mode — browse the portfolio like a k9s TUI dashboard.
 *  j/k move   Enter/d describe   Esc back   0 all   1-9 jump   :<section>
 *  t toggle raw Markdown / rendered   :raw :md do the same
 *  :visual :vim switch site mode   :q back to list, then out to Visual
 * Resources = portfolio sections; "describe" drills into the full text.
 *
 * Unlike Vim, this mode is NOT themeable: it wears the k9s default skin,
 * because that skin is half of how the tool is recognised — orange info block
 * and logo, dodgerblue key hints and frame, fuchsia numeric keys, aqua frame
 * title with a papayawhip counter, lightskyblue cursor row, and finished
 * resources dimmed to lightslategray. Values live in lib/terminalTheme.ts.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { textSections, sectionById } from "@/lib/textContent";
import { Mode, useMode } from "@/lib/ModeContext";
import { K9S } from "@/lib/terminalTheme";
import Markdown from "@/components/Markdown";

const NAMES = textSections.map((s) => s.id);

/* k9s's own logo, as it draws it at the top right. */
const LOGO = ` ____  __.________
|    |/ _/   __   \\______
|      < \\____    /  ___/
|    |  \\   /    /\\___  \\
|____|__ \\ /____//____  /
        \\/            \\/`;

/** Left info block — orange labels, white values, exactly k9s's header. */
function Info() {
  const rows: [string, React.ReactNode][] = [
    ["Context", "arjun-chavan"],
    ["Cluster", "portfolio"],
    ["User", "visitor"],
    [
      "Rev",
      <>
        v2026.7 <span style={{ color: K9S.ok }}>⚡latest</span>
      </>,
    ],
    ["Role", profile.title.toLowerCase().replace(/ /g, "-")],
    ["Location", "tysons-corner-va"],
  ];
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0 text-[12px] leading-[1.45]">
      {rows.map(([k, v], i) => (
        <div key={i} className="contents">
          <span style={{ color: K9S.orange }}>{k}:</span>
          <span className="font-semibold" style={{ color: K9S.fg }}>
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

/** A column of `<key> Action` hints. */
function Keys({ items, num }: { items: [string, string][]; num?: boolean }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-2 text-[12px] leading-[1.45]">
      {items.map(([k, label]) => (
        <div key={k} className="contents">
          <span style={{ color: num ? K9S.fuchsia : K9S.blue }}>&lt;{k}&gt;</span>
          <span style={{ color: K9S.gray }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function K9sMode() {
  const { setMode } = useMode();
  const [open, setOpen] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [cmd, setCmd] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  // Describe output is Markdown; `t` swaps the raw source for the rendered form.
  const [view, setView] = useState<"raw" | "md">("raw");
  const scrollRef = useRef<HTMLDivElement>(null);

  const runCommand = useCallback(
    (raw: string) => {
      const c = raw.trim().replace(/^:/, "").toLowerCase();
      if (c === "") return setOpen(null);
      // :q backs out of a describe; from the resource list it quits k9s, and
      // quitting either terminal always lands on Visual — that is the way out.
      if (c === "q" || c === "q!" || c === "quit") {
        if (open) return setOpen(null);
        return setMode("visual");
      }
      if (c === "raw" || c === "md" || c === "pretty" || c === "format") {
        setView(c === "raw" ? "raw" : "md");
        return setStatus(c === "raw" ? "raw markdown" : "rendered markdown");
      }
      if (c === "help" || c === "?")
        return setStatus("j/k move · Enter describe · Esc back · 1-9 jump · t raw/rendered · m cycle mode · :q quit to Visual · :visual :vim switch");
      if (c === "visual" || c === "vim") return setMode(c as Mode);
      if (NAMES.includes(c)) return setOpen(c);
      setStatus(`no resources matching "${c}"`);
    },
    // `open` matters: :q backs out of a describe before it quits the mode
    [setMode, open]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (cmd !== null) {
        if (e.key === "Enter") {
          runCommand(cmd);
          setCmd(null);
        } else if (e.key === "Escape") setCmd(null);
        else if (e.key === "Backspace") setCmd((s) => (s && s.length > 1 ? s.slice(0, -1) : ":"));
        else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) setCmd((s) => (s ?? ":") + e.key);
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Numeric keys switch view the way k9s switches namespace: 0 is "all".
      if (e.key >= "0" && e.key <= "9") {
        const n = Number(e.key);
        if (n === 0) {
          setOpen(null);
          setStatus("");
        } else if (NAMES[n - 1]) {
          setCursor(n - 1);
          setOpen(NAMES[n - 1]);
        }
        return;
      }

      switch (e.key) {
        case ":":
          setCmd(":");
          setStatus("");
          e.preventDefault();
          break;
        case "m":
          // cycle site mode (k9s → Visual, completing the m-cycle)
          setMode("visual");
          break;
        case "t":
          setView((v) => (v === "raw" ? "md" : "raw"));
          setStatus("");
          break;
        case "G":
          if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
          else setCursor(NAMES.length - 1);
          break;
        case "g":
          if (open) scrollRef.current?.scrollTo({ top: 0 });
          else setCursor(0);
          break;
        case "j":
        case "ArrowDown":
          if (open) scrollRef.current?.scrollBy({ top: 40 });
          else setCursor((c) => Math.min(NAMES.length - 1, c + 1));
          break;
        case "k":
        case "ArrowUp":
          if (open) scrollRef.current?.scrollBy({ top: -40 });
          else setCursor((c) => Math.max(0, c - 1));
          break;
        case "Enter":
        case "d":
          if (!open) setOpen(NAMES[cursor]);
          break;
        case "Escape":
          if (open) setOpen(null);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmd, open, cursor, runCommand]);

  const section = open ? sectionById(open) : null;

  return (
    <div
      className="flex h-screen flex-col font-mono text-[13px]"
      style={{ background: K9S.bg, color: K9S.fg }}
    >
      {/* Header: info block · key hints · logo */}
      <div className="flex items-start gap-8 px-4 pb-2 pt-2">
        <Info />
        <Keys
          num
          items={[
            ["0", "all"],
            ["1", "experience"],
            ["2", "projects"],
            ["3", "education"],
          ]}
        />
        <div className="hidden md:block">
          <Keys
            items={[
              ["d", "Describe"],
              ["enter", "Describe"],
              ["esc", "Back"],
              ["t", "Toggle raw/md"],
            ]}
          />
        </div>
        <div className="hidden lg:block">
          <Keys
            items={[
              ["j/k", "Up/Down"],
              [":", "Command"],
              ["m", "Switch mode"],
              ["?", "Help"],
            ]}
          />
        </div>
        <pre
          className="ml-auto hidden select-none text-[11px] leading-[1.05] xl:block"
          style={{ color: K9S.orange }}
        >
          {LOGO}
        </pre>
      </div>

      {/* Framed main view — the title rides on the top border, k9s-style */}
      <div className="relative mx-2 mb-1 min-h-0 flex-1" style={{ border: `1px solid ${K9S.blue}` }}>
        <div
          className="absolute -top-[9px] left-1/2 -translate-x-1/2 whitespace-nowrap px-2 text-[12px]"
          style={{ background: K9S.bg }}
        >
          <span style={{ color: K9S.aqua }}>{section ? "describe" : "sections"}</span>
          <span style={{ color: K9S.fuchsia }}>({section ? section.id : "all"})</span>
          <span style={{ color: K9S.papaya }}>
            [{section ? section.lines.length : textSections.length}]
          </span>
        </div>

        {/* x-scroll so a phone can reach the right-hand columns instead of
            having them chopped the way a narrow real terminal would */}
        <div ref={scrollRef} className="h-full overflow-auto px-3 py-2">
          {!section ? (
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr style={{ color: K9S.fg }}>
                  <th className="py-0.5 pr-6 font-normal">
                    NAME<span style={{ color: K9S.aqua }}>↑</span>
                  </th>
                  <th className="py-0.5 pr-6 font-normal">KIND</th>
                  <th className="py-0.5 pr-6 font-normal">READY</th>
                  <th className="py-0.5 pr-6 font-normal">STATUS</th>
                  <th className="py-0.5 pr-6 text-right font-normal">LINES</th>
                  {/* soaks up the leftover width so the rest stay compact */}
                  <th className="w-full py-0.5 font-normal">INFO</th>
                </tr>
              </thead>
              <tbody>
                {textSections.map((s, i) => {
                  const on = i === cursor;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setOpen(s.id)}
                      className={`cursor-pointer ${on ? "font-semibold" : ""}`}
                      style={
                        on
                          ? { background: K9S.cursorBg, color: K9S.cursorFg }
                          : { color: K9S.fg }
                      }
                    >
                      <td className="py-[1px] pr-6">{s.label}</td>
                      <td className="py-[1px] pr-6" style={on ? undefined : { color: K9S.gray }}>
                        Section
                      </td>
                      <td className="py-[1px] pr-6">1/1</td>
                      <td className="py-[1px] pr-6">Running</td>
                      <td className="py-[1px] pr-6 text-right">{s.lines.length}</td>
                      <td className="py-[1px]" style={on ? undefined : { color: K9S.gray }}>
                        {s.meta}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : view === "raw" ? (
            <pre className="whitespace-pre-wrap break-words text-[12px] leading-relaxed">
              {section.lines.map((ln, i) => (
                <div
                  key={i}
                  style={{
                    color: ln.startsWith("#")
                      ? K9S.orange
                      : ln.startsWith(">")
                        ? K9S.ok
                        : ln.startsWith("---")
                          ? K9S.completed
                          : undefined,
                  }}
                  className={ln.startsWith("#") ? "font-semibold" : ""}
                >
                  {ln || " "}
                </div>
              ))}
            </pre>
          ) : (
            <Markdown lines={section.lines} />
          )}
        </div>
      </div>

      {/* Breadcrumb — k9s keeps it bottom-left, active crumb on orange */}
      <div className="flex items-center gap-1 px-2 pb-1 text-[12px]">
        {section ? (
          <>
            <button
              onClick={() => setOpen(null)}
              className="px-2"
              style={{ background: K9S.aqua, color: "#000" }}
              title="back to all sections (esc)"
            >
              &lt;sections&gt;
            </button>
            <span className="px-2" style={{ background: K9S.orange, color: "#000" }}>
              &lt;{section.id}&gt;
            </span>
          </>
        ) : (
          <span className="px-2" style={{ background: K9S.orange, color: "#000" }}>
            &lt;sections&gt;
          </span>
        )}
      </div>

      {/* Command / status bar */}
      <div className="flex items-center justify-between gap-4 px-3 pb-1 text-[12px]">
        {cmd !== null ? (
          <span style={{ color: K9S.fg }}>
            {cmd}
            <span
              className="ml-px inline-block h-3.5 w-2 animate-pulse align-middle"
              style={{ background: K9S.fg }}
            />
          </span>
        ) : (
          <span style={{ color: K9S.gray }}>
            {status ? (
              <span style={{ color: K9S.orange }}>{status}</span>
            ) : (
              `${textSections.length} sections · press : for command · ? for help`
            )}
          </span>
        )}
        <button
          onClick={() => setView((v) => (v === "raw" ? "md" : "raw"))}
          title="toggle raw markdown / rendered (t)"
          className="shrink-0 text-[11px]"
          style={{ color: K9S.gray }}
        >
          <span style={view === "raw" ? { color: K9S.fg, fontWeight: 600 } : undefined}>raw</span>
          <span className="px-1">/</span>
          <span style={view === "md" ? { color: K9S.fg, fontWeight: 600 } : undefined}>
            rendered
          </span>
        </button>
      </div>
    </div>
  );
}
