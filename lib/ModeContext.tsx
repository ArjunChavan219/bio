"use client";

/**
 * Global view-mode state. The same portfolio content renders three ways:
 *  - "visual" : the polished GUI portfolio (default; recruiter-facing)
 *  - "vim"    : a Vim-style buffer/command navigation of the same content
 *  - "k9s"    : a k9s-style TUI dashboard (panels, tables, command bar)
 * Choice is persisted so a repeat visitor lands back in their preferred mode.
 */

import { createContext, useContext, useEffect, useState } from "react";

export type Mode = "visual" | "vim" | "k9s";
export const MODES: Mode[] = ["visual", "vim", "k9s"];
export const MODE_LABEL: Record<Mode, string> = {
  visual: "Visual",
  vim: "Vim",
  k9s: "k9s",
};

const STORAGE_KEY = "arjun.portfolio.mode";

interface ModeCtx {
  mode: Mode;
  setMode: (m: Mode) => void;
}

const Ctx = createContext<ModeCtx>({ mode: "visual", setMode: () => {} });

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("visual");

  // Restore persisted choice on mount (client-only to avoid hydration mismatch).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    if (saved && MODES.includes(saved)) setModeState(saved);
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    localStorage.setItem(STORAGE_KEY, m);
  };

  return <Ctx.Provider value={{ mode, setMode }}>{children}</Ctx.Provider>;
}

export const useMode = () => useContext(Ctx);
