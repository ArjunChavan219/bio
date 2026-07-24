import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ------------------------------------------------------------------
      // The paper palette.
      //
      // Visual mode is a PRINTED PAGE: warm off-white stock, ink type, the
      // system drawn on it as a technical plate (see SystemPlate). Vim and k9s
      // stay dark terminals — they hard-code their own colours, so they are
      // untouched by anything here. The mode switch is therefore not a skin
      // change: it is the document versus the machine.
      //
      // Only these tokens are used by the Visual world (VisualMode, Sections,
      // /experience, /projects). Colour is spent on three accents, one per
      // section, and nowhere else.
      // ------------------------------------------------------------------
      colors: {
        space: "#F3F0E8", // the stock — page base
        spaceLite: "#FFFFFF", // raised surface / panel
        vsignal: "#8F95A1", // dim rule — hairlines, inactive edges
        asignal: "#2B5AA6", // accent chrome — eyebrows, CTAs, hover lift
        ink: "#16181D", // the type
        muted: "#5C6270", // body copy / secondary
        threat: "#C0392B", // red    — accent 1
        perp: "#2B5AA6", // blue   — accent 2
        victim: "#B07D18", // ochre  — accent 3
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"General Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widemono: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
