"use client";

/**
 * Fixed segmented control to switch between Visual / Vim / k9s.
 * Also listens for a global hotkey ("m") to cycle modes, so keyboard users in
 * the Vim/k9s modes can jump out without reaching for the mouse.
 */

import { useEffect } from "react";
import { Mode, MODES, MODE_LABEL, useMode } from "@/lib/ModeContext";

export default function ModeSwitcher() {
  const { mode, setMode } = useMode();

  useEffect(() => {
    // Only bind the "m" hotkey in Visual mode. Vim/k9s capture single keystrokes
    // for their command lines, where an "m" must not also cycle the site mode;
    // there you switch via their own :visual / :vim / :k9s commands or the pill.
    if (mode !== "visual") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const i = MODES.indexOf(mode);
        setMode(MODES[(i + 1) % MODES.length]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, setMode]);

  // Vim and k9s pin a status line to the very bottom; at bottom-4 the pill lands
  // on top of it. Lift it clear in those modes. Visual's footer scrolls, so it
  // can ride low there.
  const bottom = mode === "visual" ? "bottom-4" : "bottom-14";

  // The pill lives in whichever world it is floating over: ink on stock in
  // Visual, chrome on void in the two terminals. Colours are literal because
  // the palette tokens describe the paper page only.
  const paper = mode === "visual";
  const shell = paper
    ? "border-ink/10 bg-white/80 text-muted"
    : "border-[var(--t-faint)] bg-[var(--t-bg-alt)] text-[var(--t-dim)]";
  const on = paper
    ? "bg-[#16181D] text-[#F3F0E8]"
    : "bg-[var(--t-status-bg)] text-[var(--t-status-fg)]";
  const off = paper ? "hover:text-[#16181D]" : "hover:text-[var(--t-fg)]";

  return (
    <div
      className={`fixed ${bottom} right-4 z-[60] flex items-center gap-1 rounded-full border p-1 font-mono text-[11px] backdrop-blur-md ${shell}`}
    >
      <span className="px-2 opacity-60" title="Press m to cycle">
        view
      </span>
      {MODES.map((m: Mode) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`rounded-full px-3 py-1 transition-colors ${mode === m ? on : off}`}
        >
          {MODE_LABEL[m]}
        </button>
      ))}
    </div>
  );
}
