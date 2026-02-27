"use client";

import Link from "next/link";

type MapStyle = "satellite" | "standard";

type TopBarProps = {
  mapStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
};

export default function TopBar({ mapStyle, onStyleChange, theme, onThemeChange }: TopBarProps) {
  return (
    <div className={`border-b border-white/[0.06] h-11 px-2 sm:px-4 flex items-center justify-between ${theme === "light" ? "bg-[#f0f1f3]" : "bg-[#080b12]"}`}>
      {/* Left: Theme toggle */}
      <div className="flex items-center gap-1">
        <button
          aria-label="Switch to light theme"
          aria-pressed={theme === "light"}
          onClick={() => onThemeChange("light")}
          className={`text-[11px] px-2 py-1 rounded transition-colors ${
            theme === "light"
              ? "text-gray-900 bg-black/[0.06]"
              : "text-white/25 hover:text-white/50"
          }`}
        >
          Light
        </button>
        <button
          aria-label="Switch to dark theme"
          aria-pressed={theme === "dark"}
          onClick={() => onThemeChange("dark")}
          className={`text-[11px] px-2 py-1 rounded transition-colors ${
            theme === "dark"
              ? "text-white bg-white/[0.06]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Dark
        </button>
      </div>

      {/* Center: Branding + status */}
      <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <span className="text-accent/60 font-mono text-xs">&gt;&gt;</span>
        <span className={`text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>Guardian RF</span>
        <span
          aria-label="System status: connected"
          className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          Connected
        </span>
      </Link>

      {/* Right: Map style toggle */}
      <div className="flex items-center gap-1">
        <button
          aria-label="Standard map view"
          aria-pressed={mapStyle === "standard"}
          onClick={() => onStyleChange("standard")}
          className={`text-[11px] px-2 py-1 rounded transition-colors ${
            mapStyle === "standard"
              ? theme === "light" ? "text-gray-900 bg-black/[0.06]" : "text-white bg-white/[0.06]"
              : theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-white/25 hover:text-white/50"
          }`}
        >
          Standard
        </button>
        <button
          aria-label="Satellite map view"
          aria-pressed={mapStyle === "satellite"}
          onClick={() => onStyleChange("satellite")}
          className={`text-[11px] px-2 py-1 rounded transition-colors ${
            mapStyle === "satellite"
              ? theme === "light" ? "text-gray-900 bg-black/[0.06]" : "text-white bg-white/[0.06]"
              : theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-white/25 hover:text-white/50"
          }`}
        >
          Satellite
        </button>
      </div>
    </div>
  );
}
