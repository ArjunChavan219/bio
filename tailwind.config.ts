import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#0B0717",
        spaceLite: "#140C2B",
        pindigo: "#32127A",
        vsignal: "#6D4AFF",
        asignal: "#F5B544",
        ink: "#ECE8F5",
        muted: "#A39DB8",
      },
      fontFamily: {
        display: ['"Clash Display"', "ui-sans-serif", "system-ui", "sans-serif"],
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
