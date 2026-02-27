import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#000000",
          surface: "#0a0a0f",
        },
        surface: {
          1: "#060609",
          2: "#0a0a0f",
          3: "#0f0f16",
        },
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
        warning: "#ffaa00",
        success: "#00ff88",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        surface: "0 1px 3px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        sweep: "sweep 6s linear infinite",
        "scan-line": "scanLine 3s linear infinite",
        blip: "blip 2s ease-in-out infinite",
        "blip-ping": "blipPing 2s ease-out infinite",
        "blip-fade": "blipFade 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
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
        blipPing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(3.5)", opacity: "0" },
        },
        blipFade: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
