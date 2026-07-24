"use client";

/**
 * Vim mode — navigate the portfolio like a Vim buffer.
 *  j/k  move      Enter/l  open section      h/Esc  back to index
 *  gg/G top/bottom of buffer      t  toggle raw Markdown / rendered
 *  ZZ/ZQ or :q from the index quits to Visual
 *  :    command line  →  :work :experience :projects :about :contact :home
 *                        :raw :md  (view)   :visual :k9s  (switch site mode)
 *                        :colo[rscheme] [name]   :help
 * The whole thing is keyboard-first; the signature is that it actually behaves.
 *
 * Colours come from the visitor's own colourscheme via CSS vars (see
 * lib/terminalTheme.ts), mapped onto vim's roles: NonText tildes, dim line
 * numbers, a reverse-video statusline, syntax colours on the raw markdown.
 * `:colo` opens the picker and the choice is remembered in their browser —
 * anyone who lives in vim expects to be able to change the colours.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { textSections, sectionById } from "@/lib/textContent";
import { Mode, useMode } from "@/lib/ModeContext";
import { TERMINAL_THEMES, themeById } from "@/lib/terminalTheme";
import { useVimTheme } from "@/lib/vimTheme";
import Markdown from "@/components/Markdown";

const NAMES = textSections.map((s) => s.id);

/** Raw-source colouring — a markdown syntax file, in ANSI roles. */
function rawClass(line: string): string {
  if (line.startsWith("#")) return "text-[var(--t-yellow)] font-semibold";
  if (line.startsWith(">")) return "text-[var(--t-green)] italic";
  if (line.startsWith("---")) return "text-[var(--t-faint)]";
  if (/^\s*-\s/.test(line)) return "text-[var(--t-fg)]";
  if (/^\s*\*\*/.test(line)) return "text-[var(--t-blue)]";
  return "";
}

export default function VimMode() {
  const { setMode } = useMode();
  const [open, setOpen] = useState<string | null>(null); // open section id, or null = index
  const [cursor, setCursor] = useState(0); // index-list cursor
  const [cmd, setCmd] = useState<string | null>(null); // command-line buffer (null = not in cmdline)
  const [status, setStatus] = useState("");
  // Raw is the default: this is a text editor. `t` renders the same Markdown.
  const [view, setView] = useState<"raw" | "md">("raw");
  const [theme, setTheme] = useVimTheme();
  const [palette, setPalette] = useState(false); // colourscheme picker open
  const lastG = useRef(0);
  const lastZ = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runCommand = useCallback(
    (raw: string) => {
      const c = raw.trim().replace(/^:/, "");
      if (c === "" ) return;
      const [head, ...rest] = c.split(/\s+/);
      if (head === "colo" || head === "colors" || head === "colorscheme") {
        const name = rest.join("").toLowerCase();
        if (!name) {
          setPalette(true);
          return setStatus("-- colorscheme --  j/k preview · Enter keep");
        }
        if (TERMINAL_THEMES.some((t) => t.id === name)) {
          setTheme(name);
          setPalette(false);
          return setStatus(`colorscheme ${name}`);
        }
        return setStatus(`E185: Cannot find color scheme '${name}'`);
      }
      if (c === "q" || c === "q!" || c === "quit") {
        // :q closes the open buffer; from the index it quits Vim → Visual mode
        if (open) return setOpen(null);
        return setMode("visual");
      }
      // quit-all leaves the editor from anywhere, buffer open or not
      if (c === "qa" || c === "qa!" || c === "qall" || c === "quitall") return setMode("visual");
      if (c === "wq" || c === "x") {
        setStatus('"portfolio" written');
        return setMode("visual");
      }
      if (c === "home" || c === "index") return setOpen(null);
      if (c === "raw" || c === "md" || c === "pretty" || c === "format") {
        setView(c === "raw" ? "raw" : "md");
        return setStatus(c === "raw" ? "-- raw markdown --" : "-- rendered --");
      }
      if (c === "help" || c === "h")
        return setStatus("j/k move · Enter open · h back · t raw/rendered · :colo colours · ZZ or :q quit to Visual · :<section> jump · :visual :k9s switch");
      if (c === "visual" || c === "k9s") return setMode(c as Mode);
      if (NAMES.includes(c)) {
        setOpen(c);
        return;
      }
      setStatus(`E492: Not an editor command: ${c}`);
    },
    [setMode, open, theme, setTheme]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Command-line mode
      if (cmd !== null) {
        if (e.key === "Enter") {
          runCommand(cmd);
          setCmd(null);
        } else if (e.key === "Escape") {
          setCmd(null);
        } else if (e.key === "Backspace") {
          setCmd((s) => (s && s.length > 1 ? s.slice(0, -1) : ":"));
        } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          setCmd((s) => (s ?? ":") + e.key);
        }
        e.preventDefault();
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Colourscheme picker — j/k previews live (that is how you actually
      // choose one), Enter/Esc keeps what is on screen and closes.
      if (palette) {
        const i = TERMINAL_THEMES.findIndex((t) => t.id === theme);
        if (e.key === "j" || e.key === "ArrowDown" || e.key === "k" || e.key === "ArrowUp") {
          const d = e.key === "j" || e.key === "ArrowDown" ? 1 : -1;
          const next = TERMINAL_THEMES[(i + d + TERMINAL_THEMES.length) % TERMINAL_THEMES.length];
          setTheme(next.id);
          setStatus(`-- colorscheme --  ${next.id}`);
        } else if (e.key === "Enter" || e.key === "Escape" || e.key === "q") {
          setPalette(false);
          setStatus(`colorscheme ${theme}`);
        } else if (e.key >= "1" && e.key <= String(TERMINAL_THEMES.length)) {
          setTheme(TERMINAL_THEMES[Number(e.key) - 1].id);
        } else if (e.key === ":") {
          setPalette(false);
          setCmd(":");
        }
        e.preventDefault();
        return;
      }

      // Normal mode
      switch (e.key) {
        case "m":
          // cycle site mode (matches the "press m" hint in Visual mode)
          setMode("k9s");
          break;
        case "t":
          setView((v) => (v === "raw" ? "md" : "raw"));
          setStatus("");
          break;
        case ":":
          setCmd(":");
          setStatus("");
          e.preventDefault();
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
        case "Z":
        case "Q":
          // ZZ / ZQ — the muscle-memory way out of vim; both land on Visual
          if (Date.now() - lastZ.current < 500) setMode("visual");
          lastZ.current = e.key === "Z" ? Date.now() : 0;
          break;
        case "G":
          if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
          else setCursor(NAMES.length - 1);
          break;
        case "g":
          if (Date.now() - lastG.current < 400) {
            if (open) scrollRef.current?.scrollTo({ top: 0 });
            else setCursor(0);
          }
          lastG.current = Date.now();
          break;
        case "l":
        case "Enter":
          if (!open) setOpen(NAMES[cursor]);
          break;
        case "h":
        case "Escape":
          if (open) setOpen(null);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmd, open, cursor, runCommand, palette, theme, setTheme]);

  const section = open ? sectionById(open) : null;

  return (
    <div className="flex h-screen flex-col bg-[var(--t-bg)] font-mono text-[13px] leading-relaxed text-[var(--t-fg)]">
      {/* Buffer body */}
      <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto px-4 py-3 md:px-8">
        {!section ? (
          <div>
            <div className="mb-4 text-[var(--t-dim)]">
              &quot; {profile.name} — {profile.title}
              <br />
              &quot; buffer list · j/k to move · Enter to open · t for raw/rendered
              <br />
              &quot; :colo to change colourscheme · :help for commands
            </div>
            {textSections.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setOpen(s.id)}
                className={`flex cursor-pointer items-baseline gap-4 px-2 py-1 ${
                  i === cursor
                    ? "bg-[var(--t-sel)] text-[var(--t-fg)]"
                    : "hover:bg-[var(--t-sel)]/50"
                }`}
              >
                <span className="w-6 text-right text-[var(--t-faint)]">{i + 1}</span>
                <span className="w-32 text-[var(--t-cyan)]">{s.label}</span>
                <span className="text-[var(--t-dim)]">{s.meta}</span>
              </div>
            ))}
          </div>
        ) : view === "raw" ? (
          <pre className="whitespace-pre-wrap break-words">
            {section.lines.map((ln, i) => (
              <div key={i} className="flex">
                <span className="mr-4 w-8 shrink-0 select-none text-right text-[var(--t-faint)]">{i + 1}</span>
                <span className={rawClass(ln)}>{ln || " "}</span>
              </div>
            ))}
          </pre>
        ) : (
          <Markdown lines={section.lines} />
        )}

        {/* Empty-buffer tildes, exactly like real Vim — this is what fills the
            dead space below short buffers. `flex-1 min-h-0 overflow-hidden`
            means the block takes only the leftover height and clips, so it
            never introduces scroll of its own. */}
        <div className="min-h-0 flex-1 select-none overflow-hidden pt-1 text-[var(--t-nontext)]" aria-hidden>
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i}>~</div>
          ))}
        </div>
      </div>

      {/* Colourscheme picker — floats above the statusline like a completion
          menu. Live-previews on hover/j/k; the pick is stored per browser. */}
      {palette && (
        <div className="relative">
          <div
            // clears the mode pill on narrow screens, hugs the statusline on wide
            className="absolute bottom-24 left-3 z-10 w-[19rem] max-w-[calc(100vw-1.5rem)] border py-1 shadow-2xl sm:bottom-1"
            style={{ background: "var(--t-bg-alt)", borderColor: "var(--t-faint)" }}
          >
            <div className="px-3 pb-1 pt-0.5 text-[11px] text-[var(--t-dim)]">
              :colorscheme — saved in this browser
            </div>
            {TERMINAL_THEMES.map((t, i) => {
              const on = t.id === theme;
              return (
                <button
                  key={t.id}
                  onMouseEnter={() => setTheme(t.id)}
                  onClick={() => {
                    setTheme(t.id);
                    setPalette(false);
                    setStatus(`colorscheme ${t.id}`);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1 text-left text-[12px]"
                  // PmenuSel: a real completion menu inverts the current line,
                  // and several schemes' `sel` is too close to `bgAlt` to read.
                  style={{
                    background: on ? "var(--t-blue)" : "transparent",
                    color: on ? "var(--t-bg)" : "var(--t-dim)",
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  <span className="w-3 text-[var(--t-faint)]">{i + 1}</span>
                  <span className="w-[8.5rem] truncate">{t.id}</span>
                  {/* the scheme's own ANSI colours, drawn in the scheme */}
                  <span
                    className="ml-auto flex items-center gap-[3px] rounded-sm p-[3px]"
                    style={{ background: themeById(t.id).bg }}
                  >
                    {[t.red, t.green, t.yellow, t.blue, t.magenta, t.cyan].map((c) => (
                      <span key={c} className="h-2.5 w-2.5" style={{ background: c }} />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Vim status line */}
      <div className="flex items-center justify-between gap-4 bg-[var(--t-status-bg)] px-3 py-1 text-[var(--t-status-fg)]">
        <span className="flex items-center gap-3">
          <span className="font-bold">{cmd !== null ? "" : "-- NORMAL --"}</span>
          {/* View toggle — clickable as well as bound to `t`, since the whole
              point is that the same Markdown can be read either way. */}
          <button
            onClick={() => setView((v) => (v === "raw" ? "md" : "raw"))}
            title="toggle raw markdown / rendered (t)"
            className="text-[11px] opacity-70 transition-opacity hover:opacity-100"
          >
            <span className={view === "raw" ? "font-bold" : "opacity-60"}>raw</span>
            <span className="px-1">/</span>
            <span className={view === "md" ? "font-bold" : "opacity-60"}>rendered</span>
            <span className="ml-2 opacity-50">t</span>
          </button>
          {/* Colourscheme — the statusline is where vim reports its state, so
              it is also where you reach for the colours. */}
          <button
            onClick={() => setPalette((v) => !v)}
            title="change colourscheme (:colo)"
            className="shrink-0 text-[11px] opacity-70 transition-opacity hover:opacity-100"
          >
            <span className="hidden opacity-60 sm:inline">colors </span>
            <span className="font-bold">{theme}</span>
            <span className="ml-2 hidden opacity-50 sm:inline">:colo</span>
          </button>
        </span>
        <span className="truncate">
          {section ? (
            <button onClick={() => setOpen(null)} className="underline-offset-2 hover:underline" title="back to index (h)">
              portfolio/{section.id} ← index
            </button>
          ) : (
            "portfolio/index"
          )}
          {status && <span className="ml-4 font-bold">{status}</span>}
        </span>
      </div>

      {/* Command line */}
      <div className="h-6 bg-[var(--t-bg)] px-3 text-[var(--t-fg)]">
        {cmd !== null && (
          <span>
            {cmd}
            <span className="ml-px inline-block h-3.5 w-2 animate-pulse bg-[var(--t-fg)] align-middle" />
          </span>
        )}
      </div>
    </div>
  );
}
