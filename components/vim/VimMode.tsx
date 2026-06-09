"use client";

/**
 * Vim mode — navigate the portfolio like a Vim buffer.
 *  j/k  move      Enter/l  open section      h/Esc  back to index
 *  gg/G top/bottom of buffer
 *  :    command line  →  :work :experience :projects :about :contact :home
 *                        :visual :k9s  (switch site mode)   :help
 * The whole thing is keyboard-first; the signature is that it actually behaves.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { textSections, sectionById } from "@/lib/textContent";
import { Mode, useMode } from "@/lib/ModeContext";

const NAMES = textSections.map((s) => s.id);

export default function VimMode() {
  const { setMode } = useMode();
  const [open, setOpen] = useState<string | null>(null); // open section id, or null = index
  const [cursor, setCursor] = useState(0); // index-list cursor
  const [cmd, setCmd] = useState<string | null>(null); // command-line buffer (null = not in cmdline)
  const [status, setStatus] = useState("");
  const lastG = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runCommand = useCallback(
    (raw: string) => {
      const c = raw.trim().replace(/^:/, "");
      if (c === "" ) return;
      if (c === "home" || c === "index" || c === "q") return setOpen(null);
      if (c === "help" || c === "h") return setStatus("j/k move · Enter open · h back · :<section> jump · :visual :k9s switch");
      if (c === "visual" || c === "k9s") return setMode(c as Mode);
      if (NAMES.includes(c)) {
        setOpen(c);
        return;
      }
      setStatus(`E492: Not an editor command: ${c}`);
    },
    [setMode]
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
        } else if (e.key.length === 1) {
          setCmd((s) => (s ?? ":") + e.key);
        }
        e.preventDefault();
        return;
      }

      // Normal mode
      switch (e.key) {
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
  }, [cmd, open, cursor, runCommand]);

  const section = open ? sectionById(open) : null;

  return (
    <div className="flex h-screen flex-col bg-[#0c0a14] font-mono text-[13px] leading-relaxed text-[#c9c5da]">
      {/* Buffer body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 md:px-8">
        {!section ? (
          <div>
            <div className="mb-4 text-[#5b5470]">
              &quot; {profile.name} — {profile.title}
              <br />
              &quot; buffer list · j/k to move · Enter to open · :help for commands
            </div>
            {textSections.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setOpen(s.id)}
                className={`flex cursor-pointer items-baseline gap-4 px-2 py-1 ${
                  i === cursor ? "bg-[#241d3a] text-[#f5b544]" : "hover:bg-[#181327]"
                }`}
              >
                <span className="w-6 text-right text-[#5b5470]">{i + 1}</span>
                <span className="w-32 text-[#a78bfa]">{s.label}</span>
                <span className="text-[#5b5470]">{s.meta}</span>
              </div>
            ))}
          </div>
        ) : (
          <pre className="whitespace-pre-wrap break-words">
            {section.lines.map((ln, i) => (
              <div key={i}>
                <span className="mr-4 inline-block w-8 select-none text-right text-[#3a3352]">{i + 1}</span>
                <span className={ln.startsWith("#") ? "text-[#f5b544]" : ln.match(/^\s*-/) ? "text-[#c9c5da]" : ""}>
                  {ln || " "}
                </span>
              </div>
            ))}
          </pre>
        )}
      </div>

      {/* Vim status line */}
      <div className="flex items-center justify-between bg-[#2a2342] px-3 py-1 text-[#e7e3f3]">
        <span className="font-bold text-[#a78bfa]">{cmd !== null ? "" : "-- NORMAL --"}</span>
        <span className="text-[#8b84a3]">
          {section ? `portfolio/${section.id}` : "portfolio/index"}
          {status && <span className="ml-4 text-[#f5b544]">{status}</span>}
        </span>
      </div>

      {/* Command line */}
      <div className="h-6 bg-[#0c0a14] px-3 text-[#c9c5da]">
        {cmd !== null && (
          <span>
            {cmd}
            <span className="ml-px inline-block h-3.5 w-2 animate-pulse bg-[#c9c5da] align-middle" />
          </span>
        )}
      </div>
    </div>
  );
}
