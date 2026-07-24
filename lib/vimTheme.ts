"use client";

/**
 * The visitor's Vim colourscheme, remembered in their browser.
 *
 * Two components need it — VimMode owns the `:colorscheme` picker, SiteShell
 * paints the CSS vars — so it lives in a tiny module-level store with
 * subscribers rather than another React provider.
 *
 * First render is always DEFAULT_VIM_THEME on both server and client (this is a
 * static export; a localStorage read during render would desync hydration).
 * The stored pick is applied in an effect immediately after mount.
 */

import { useEffect, useState } from "react";
import { DEFAULT_VIM_THEME, TERMINAL_THEMES } from "./terminalTheme";

const KEY = "bio.vim.colorscheme";

let current = DEFAULT_VIM_THEME;
let hydrated = false;
const subscribers = new Set<(id: string) => void>();

const isKnown = (id: string | null): id is string =>
  !!id && TERMINAL_THEMES.some((t) => t.id === id);

export function setVimTheme(id: string) {
  if (!isKnown(id) || id === current) return;
  current = id;
  subscribers.forEach((fn) => fn(id));
  try {
    window.localStorage.setItem(KEY, id);
  } catch {
    // private mode / storage disabled — the pick just won't outlive the tab
  }
}

export function useVimTheme(): [string, (id: string) => void] {
  const [id, setId] = useState(current);

  useEffect(() => {
    if (!hydrated) {
      hydrated = true;
      try {
        const stored = window.localStorage.getItem(KEY);
        if (isKnown(stored)) current = stored;
      } catch {
        /* ignore */
      }
    }
    setId(current);
    const fn = (next: string) => setId(next);
    subscribers.add(fn);
    return () => {
      subscribers.delete(fn);
    };
  }, []);

  return [id, setVimTheme];
}
