/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#030508",
        nebula: "#0a0e1a",
        cyan: { glow: "#22d3ee", dim: "#0891b2" },
        magenta: { glow: "#e879f9", dim: "#c026d3" },
        electric: "#38bdf8",
      },
      fontFamily: {
        sans: ["JetBrains Mono", "ui-monospace", "system-ui", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 211, 238, 0.35)",
        glowMagenta: "0 0 32px rgba(232, 121, 249, 0.3)",
      },
    },
  },
  plugins: [],
};
