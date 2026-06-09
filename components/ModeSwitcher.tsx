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

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-1 rounded-full border border-white/10 bg-space/80 p-1 font-mono text-[11px] backdrop-blur-md">
      <span className="px-2 text-muted/60" title="Press m to cycle">
        view
      </span>
      {MODES.map((m: Mode) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`rounded-full px-3 py-1 transition-colors ${
            mode === m
              ? "bg-asignal text-space"
              : "text-muted hover:text-ink"
          }`}
        >
          {MODE_LABEL[m]}
        </button>
      ))}
    </div>
  );
}
