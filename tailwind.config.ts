import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          950: "#0a0a0f",
          900: "#111118",
          800: "#1f1f2e",
          700: "#2a2a3d",
          600: "#3a3a50",
          500: "#6b6b80",
          400: "#9ca3af",
          300: "#d1d5db",
          200: "#e5e7eb",
          100: "#f3f4f6",
        },
        accent: {
          DEFAULT: "#00FF94",
        },
        danger: "#ff3b3b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        sweep: "sweep 6s linear infinite",
        "scan-line": "scanLine 3s linear infinite",
        blip: "blip 2s ease-in-out infinite",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scanLine: {
          "0%": { top: "-2%" },
          "100%": { top: "102%" },
        },
        blip: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.7)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
