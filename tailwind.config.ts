import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        "ink-muted": "#5c5c5c",
        maroon: "#681A2B",
        "maroon-dark": "#42101C",
        silver: "#C4C7CB",
        paper: "#FFFFFF",
        surface: "#F7F7F5",
        line: "rgba(196, 199, 203, 0.65)",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
