"use client";

/**
 * Top-level switch: renders the active mode and the always-present mode pill.
 * Vim/k9s are full-screen TUIs; Visual is the scrolling GUI.
 */

import { useMode } from "@/lib/ModeContext";
import ModeSwitcher from "./ModeSwitcher";
import VisualMode from "./visual/VisualMode";
import VimMode from "./vim/VimMode";
import K9sMode from "./k9s/K9sMode";

export default function SiteShell() {
  const { mode } = useMode();
  return (
    <>
      {mode === "visual" && <VisualMode />}
      {mode === "vim" && <VimMode />}
      {mode === "k9s" && <K9sMode />}
      <ModeSwitcher />
    </>
  );
}
