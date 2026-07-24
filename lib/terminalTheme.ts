/**
 * Terminal colour schemes.
 *
 * The point is authenticity: a real terminal has a 16-colour ANSI palette and
 * colours things by ROLE (keyword, string, status, selection), not by shades of
 * one grey. So each scheme carries a full palette, and the mode maps those
 * colours onto its own roles — vim's line numbers, tildes, statusline, syntax.
 *
 * Schemes are the real published values, not approximations, so anyone who
 * uses one of these daily recognises it instantly.
 *
 * These are VIM's schemes — the visitor picks one with `:colorscheme` and it
 * sticks in their browser. k9s does not get a picker: it wears the real k9s
 * default skin (see K9S below), because half of that tool's identity is its
 * orange-on-black header and dodgerblue frame.
 */

export interface TerminalTheme {
  id: string;
  name: string;
  note: string;
  /** buffer background */
  bg: string;
  /** raised surface — status bars, headers, selected rows */
  bgAlt: string;
  /** cursor-line / selection fill */
  sel: string;
  /** body text */
  fg: string;
  /** secondary text — metadata, comments */
  dim: string;
  /** structural chrome — line numbers, rules */
  faint: string;
  /** vim's NonText: the tildes past end-of-buffer */
  nontext: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  statusBg: string;
  statusFg: string;
}

export const TERMINAL_THEMES: TerminalTheme[] = [
  {
    id: "classic",
    name: "Classic terminal",
    note: "xterm + vim defaults · reverse-video statusline",
    bg: "#0C0C0C",
    bgAlt: "#1C1C1C",
    sel: "#232323",
    fg: "#CCCCCC",
    dim: "#9A9A9A",
    faint: "#4E4E4E",
    nontext: "#2472C8",
    red: "#CD3131",
    green: "#0DBC79",
    yellow: "#E5E510",
    blue: "#3B8EEA",
    magenta: "#BC3FBC",
    cyan: "#11A8CD",
    statusBg: "#C8C8C8",
    statusFg: "#0C0C0C",
  },
  {
    id: "gruvbox",
    name: "Gruvbox dark",
    note: "warm retro · the most-installed vim scheme",
    bg: "#282828",
    bgAlt: "#3C3836",
    sel: "#3C3836",
    fg: "#EBDBB2",
    dim: "#BDAE93",
    faint: "#665C54",
    nontext: "#504945",
    red: "#FB4934",
    green: "#B8BB26",
    yellow: "#FABD2F",
    blue: "#83A598",
    magenta: "#D3869B",
    cyan: "#8EC07C",
    statusBg: "#504945",
    statusFg: "#FBF1C7",
  },
  {
    id: "solarized",
    name: "Solarized dark",
    note: "teal base · the most recognisable dev palette",
    bg: "#002B36",
    bgAlt: "#073642",
    sel: "#073642",
    fg: "#93A1A1",
    dim: "#839496",
    faint: "#586E75",
    nontext: "#0A4351",
    red: "#DC322F",
    green: "#859900",
    yellow: "#B58900",
    blue: "#268BD2",
    magenta: "#D33682",
    cyan: "#2AA198",
    statusBg: "#073642",
    statusFg: "#EEE8D5",
  },
  {
    id: "nord",
    name: "Nord",
    note: "cool + muted · pairs with the paper Visual mode",
    bg: "#2E3440",
    bgAlt: "#3B4252",
    sel: "#434C5E",
    fg: "#D8DEE9",
    dim: "#AEB8C8",
    faint: "#4C566A",
    nontext: "#434C5E",
    red: "#BF616A",
    green: "#A3BE8C",
    yellow: "#EBCB8B",
    blue: "#81A1C1",
    magenta: "#B48EAD",
    cyan: "#88C0D0",
    statusBg: "#434C5E",
    statusFg: "#ECEFF4",
  },
  {
    id: "tokyonight",
    name: "Tokyo Night",
    note: "modern · closest to the current palette",
    bg: "#1A1B26",
    bgAlt: "#24283B",
    sel: "#292E42",
    fg: "#A9B1D6",
    dim: "#787C99",
    faint: "#3B4261",
    nontext: "#3B4261",
    red: "#F7768E",
    green: "#9ECE6A",
    yellow: "#E0AF68",
    blue: "#7AA2F7",
    magenta: "#BB9AF7",
    cyan: "#7DCFFF",
    statusBg: "#24283B",
    statusFg: "#C0CAF5",
  },
  {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    note: "soft pastel · high legibility, low glare",
    bg: "#1E1E2E",
    bgAlt: "#313244",
    sel: "#45475A",
    fg: "#CDD6F4",
    dim: "#A6ADC8",
    faint: "#585B70",
    nontext: "#45475A",
    red: "#F38BA8",
    green: "#A6E3A1",
    yellow: "#F9E2AF",
    blue: "#89B4FA",
    magenta: "#CBA6F7",
    cyan: "#94E2D5",
    statusBg: "#313244",
    statusFg: "#CDD6F4",
  },
];

/** What Vim opens with before a visitor picks their own. */
export const DEFAULT_VIM_THEME = "gruvbox";

export const themeById = (id: string) =>
  TERMINAL_THEMES.find((t) => t.id === id) ??
  TERMINAL_THEMES.find((t) => t.id === DEFAULT_VIM_THEME) ??
  TERMINAL_THEMES[0];

/**
 * k9s default skin — tcell colour names as k9s ships them, so it reads as the
 * real tool and not "a dark dashboard":
 *
 *   info labels + logo + active crumb   orange
 *   key hints                           dodgerblue
 *   numeric key hints + title filter    fuchsia
 *   frame title                         aqua       counter  papayawhip
 *   selected row                        lightskyblue on black
 *   finished resources                  lightslategray
 */
export const K9S = {
  bg: "#000000",
  fg: "#E6E6E6",
  gray: "#808080",
  orange: "#FFA500",
  blue: "#1E90FF",
  fuchsia: "#FF00FF",
  aqua: "#00FFFF",
  papaya: "#FFEFD5",
  cursorBg: "#87CEFA",
  cursorFg: "#000000",
  completed: "#778899",
  ok: "#ADFF2F",
  warn: "#FF4500",
} as const;

/**
 * The same skin expressed as a TerminalTheme, so the shared pieces that style
 * themselves from var(--t-*) — the markdown renderer, the mode pill — come
 * along when k9s is on screen.
 */
export const K9S_SKIN: TerminalTheme = {
  id: "k9s",
  name: "k9s default",
  note: "the real k9s skin — not user-switchable",
  bg: K9S.bg,
  bgAlt: "#0B0B0B",
  sel: "#1C1C1C",
  fg: K9S.fg,
  dim: K9S.gray,
  faint: K9S.blue,
  nontext: K9S.blue,
  red: K9S.warn,
  green: K9S.ok,
  yellow: K9S.orange,
  blue: K9S.blue,
  magenta: K9S.fuchsia,
  cyan: K9S.aqua,
  statusBg: K9S.orange,
  statusFg: "#000000",
};

/** CSS custom properties, so components style with var(--t-*) and stay dumb. */
export function themeVars(t: TerminalTheme): React.CSSProperties {
  return {
    "--t-bg": t.bg,
    "--t-bg-alt": t.bgAlt,
    "--t-sel": t.sel,
    "--t-fg": t.fg,
    "--t-dim": t.dim,
    "--t-faint": t.faint,
    "--t-nontext": t.nontext,
    "--t-red": t.red,
    "--t-green": t.green,
    "--t-yellow": t.yellow,
    "--t-blue": t.blue,
    "--t-magenta": t.magenta,
    "--t-cyan": t.cyan,
    "--t-status-bg": t.statusBg,
    "--t-status-fg": t.statusFg,
  } as React.CSSProperties;
}
