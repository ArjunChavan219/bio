"use client";

/**
 * Top-level switch: renders the active mode and the always-present mode pill.
 * Vim/k9s are full-screen TUIs; Visual is the scrolling GUI.
 *
 * The terminal palette is injected here as CSS vars so the mode, the markdown
 * renderer and the mode pill all agree. Vim wears whichever colourscheme the
 * visitor picked (remembered in their browser); k9s always wears the real k9s
 * skin. Visual mode ignores both — it is the paper page.
 */

import { useMode } from "@/lib/ModeContext";
import { K9S_SKIN, themeById, themeVars } from "@/lib/terminalTheme";
import { useVimTheme } from "@/lib/vimTheme";
import ModeSwitcher from "./ModeSwitcher";
import VisualMode from "./visual/VisualMode";
import VimMode from "./vim/VimMode";
import K9sMode from "./k9s/K9sMode";

export default function SiteShell() {
  const { mode } = useMode();
  const [vimTheme] = useVimTheme();
  return (
    <div style={themeVars(mode === "k9s" ? K9S_SKIN : themeById(vimTheme))}>
      {mode === "visual" && <VisualMode />}
      {mode === "vim" && <VimMode />}
      {mode === "k9s" && <K9sMode />}
      <ModeSwitcher />
    </div>
  );
}
