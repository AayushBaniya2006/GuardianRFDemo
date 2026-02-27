"use client";

import { useEffect, useState } from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const STATUS_LINES = [
  "SYS::NOMINAL",
  "RF::SCANNING",
  "NET::ACTIVE",
  "GPS::LOCKED",
  "ENC::AES-256",
  "LINK::STABLE",
  "MODE::SURVEY",
  "AUTH::VALID",
];

function cornerClasses(corner: Corner) {
  switch (corner) {
    case "top-left":
      return "top-0 left-0";
    case "top-right":
      return "top-0 right-0 text-right";
    case "bottom-left":
      return "bottom-0 left-0";
    case "bottom-right":
      return "bottom-0 right-0 text-right";
  }
}

function CornerBracket({ corner }: { corner: Corner }) {
  const isTop = corner.includes("top");
  const isLeft = corner.includes("left");
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-accent/20"
      style={{
        transform: `scaleX(${isLeft ? 1 : -1}) scaleY(${isTop ? 1 : -1})`,
      }}
    >
      <path d="M0 12V0h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function HUDElement({
  corner = "top-left",
  className = "",
}: {
  corner?: Corner;
  className?: string;
}) {
  const [statusIdx, setStatusIdx] = useState(0);
  const [coords, setCoords] = useState("38.8977N 77.0365W");

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_LINES.length);
      const lat = (38.89 + Math.random() * 0.02).toFixed(4);
      const lon = (77.03 + Math.random() * 0.02).toFixed(4);
      setCoords(`${lat}N ${lon}W`);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden
      className={`absolute ${cornerClasses(corner)} pointer-events-none p-3 ${className}`}
    >
      <CornerBracket corner={corner} />
      <div className="font-mono text-[9px] text-accent/30 mt-1 space-y-0.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
          <span>{STATUS_LINES[statusIdx]}</span>
        </div>
        <div>{coords}</div>
      </div>
    </div>
  );
}
