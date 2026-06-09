"use client";

/**
 * k9s mode — browse the portfolio like a k9s TUI dashboard.
 *  j/k move   Enter/d describe   Esc back   :<section> jump
 *  :visual :vim switch site mode   :q back to list
 * Resources = portfolio sections; "describe" drills into the full text.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { textSections, sectionById } from "@/lib/textContent";
import { Mode, useMode } from "@/lib/ModeContext";

const NAMES = textSections.map((s) => s.id);

function Header() {
  const rows = [
    ["Context", "portfolio"],
    ["User", profile.name.toLowerCase().replace(" ", "-")],
    ["Role", "software-engineer"],
    ["Location", "tysons-corner"],
  ];
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1c2733] px-4 py-2">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[12px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <span className="text-[#f5a623]">{k}:</span>
            <span className="text-[#56c8d8]">{v}</span>
          </div>
        ))}
      </div>
      <div className="hidden text-[11px] leading-tight text-[#4a5b6b] sm:block">
        <div>
          <span className="text-[#f5a623]">{"<j/k>"}</span> up/down{"   "}
          <span className="text-[#f5a623]">{"<enter>"}</span> describe
        </div>
        <div>
          <span className="text-[#f5a623]">{"<esc>"}</span> back{"   "}
          <span className="text-[#f5a623]">{":"}</span> command{"   "}
          <span className="text-[#f5a623]">{"<m>"}</span> mode
        </div>
      </div>
      <pre className="hidden select-none text-[9px] leading-[1.1] text-[#56c8d8] lg:block">{` _   ___
| | / _ \\
| |( (_) )___
|_| \\___/(___)`}</pre>
    </div>
  );
}

export default function K9sMode() {
  const { setMode } = useMode();
  const [open, setOpen] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [cmd, setCmd] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const runCommand = useCallback(
    (raw: string) => {
      const c = raw.trim().replace(/^:/, "").toLowerCase();
      if (c === "" || c === "q") return setOpen(null);
      if (c === "visual" || c === "vim") return setMode(c as Mode);
      if (NAMES.includes(c)) return setOpen(c);
      setStatus(`no resources matching "${c}"`);
    },
    [setMode]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (cmd !== null) {
        if (e.key === "Enter") {
          runCommand(cmd);
          setCmd(null);
        } else if (e.key === "Escape") setCmd(null);
        else if (e.key === "Backspace") setCmd((s) => (s && s.length > 1 ? s.slice(0, -1) : ":"));
        else if (e.key.length === 1) setCmd((s) => (s ?? ":") + e.key);
        e.preventDefault();
        return;
      }
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
  const crumb = section ? `sections(all)> ${section.id}` : "sections(all)";

  return (
    <div className="flex h-screen flex-col bg-[#0a0f14] font-mono text-[13px] text-[#cdd6df]">
      <Header />

      {/* Breadcrumb */}
      <div className="px-4 py-1 text-[12px] text-[#56c8d8]">
        &lt;{crumb}&gt;
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-2">
        {!section ? (
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-[#1c2733] text-[#f5a623]">
                <th className="py-1 pr-4 font-normal">NAME↑</th>
                <th className="py-1 pr-4 font-normal">KIND</th>
                <th className="py-1 pr-4 font-normal">INFO</th>
                <th className="py-1 font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {textSections.map((s, i) => (
                <tr
                  key={s.id}
                  onClick={() => setOpen(s.id)}
                  className={`cursor-pointer ${i === cursor ? "bg-[#123] text-[#f5a623]" : "hover:bg-[#0f1620]"}`}
                >
                  <td className="py-1 pr-4">{s.label}</td>
                  <td className="py-1 pr-4 text-[#8aa0b4]">Section</td>
                  <td className="py-1 pr-4 text-[#8aa0b4]">{s.meta}</td>
                  <td className="py-1 text-[#5fd38a]">Ready</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre-wrap break-words pt-2 text-[12px] leading-relaxed">
            {section.lines.map((ln, i) => (
              <div key={i} className={ln.startsWith("#") ? "text-[#f5a623]" : ln.match(/:\s/) ? "" : ""}>
                {ln || " "}
              </div>
            ))}
          </pre>
        )}
      </div>

      {/* Command / status bar */}
      <div className="border-t border-[#1c2733] bg-[#0d141b] px-4 py-1 text-[12px]">
        {cmd !== null ? (
          <span className="text-[#cdd6df]">
            {cmd}
            <span className="ml-px inline-block h-3.5 w-2 animate-pulse bg-[#cdd6df] align-middle" />
          </span>
        ) : (
          <span className="text-[#4a5b6b]">
            {status ? <span className="text-[#f5a623]">{status}</span> : `${textSections.length} sections · press : for command`}
          </span>
        )}
      </div>
    </div>
  );
}
