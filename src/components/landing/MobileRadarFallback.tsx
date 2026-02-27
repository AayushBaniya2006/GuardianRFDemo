"use client";

const blips = [
  { angle: 25, distance: 25, delay: "0s", label: "TGT-001" },
  { angle: 70, distance: 50, delay: "0.6s", label: "TGT-002" },
  { angle: 120, distance: 35, delay: "1.2s", label: "TGT-003" },
  { angle: 165, distance: 60, delay: "1.8s", label: "TGT-004" },
  { angle: 210, distance: 45, delay: "2.4s", label: "TGT-005" },
  { angle: 255, distance: 30, delay: "3.0s", label: "TGT-006" },
  { angle: 300, distance: 55, delay: "3.6s", label: "TGT-007" },
  { angle: 340, distance: 40, delay: "4.2s", label: "" },
  { angle: 15, distance: 70, delay: "4.8s", label: "" },
  { angle: 185, distance: 72, delay: "5.4s", label: "" },
];

const rangeLabels = ["1km", "2km", "3km", "4km"];

export function MobileRadarFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#08080a]">
      <div
        className="relative w-[min(85vw,85vh)]"
        style={{ aspectRatio: "1" }}
      >
        {/* Glow halo */}
        <div
          className="absolute inset-[-15%]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,148,0.04) 0%, transparent 55%)",
          }}
        />

        {/* Concentric rings */}
        {[20, 40, 60, 80, 100].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/[0.05]"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              top: `${(100 - size) / 2}%`,
              left: `${(100 - size) / 2}%`,
            }}
          />
        ))}

        {/* Range labels */}
        {rangeLabels.map((label, i) => {
          const pct = 20 + (i + 1) * 16;
          return (
            <span
              key={label}
              className="absolute font-mono text-[8px] text-accent/20"
              style={{ top: `${50 - pct / 2}%`, left: "51%" }}
            >
              {label}
            </span>
          );
        })}

        {/* Crosshairs */}
        <div className="absolute bottom-0 left-1/2 top-0 w-px bg-white/[0.03]" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.03]" />

        {/* Rotating sweep */}
        <div
          className="absolute inset-0 animate-sweep"
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="absolute left-1/2 top-0 h-1/2 w-1/2"
            style={{
              transformOrigin: "bottom left",
              background:
                "conic-gradient(from 0deg at 0% 100%, rgba(0,255,148,0.15) 0deg, transparent 45deg)",
            }}
          />
        </div>

        {/* Blips */}
        {blips.map((blip, i) => {
          const rad = (blip.angle * Math.PI) / 180;
          const x = 50 + (blip.distance / 2) * Math.cos(rad);
          const y = 50 + (blip.distance / 2) * Math.sin(rad);
          const isOutside = blip.distance > 65;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: blip.delay,
              }}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full animate-blip ${
                  isOutside ? "bg-white/20" : "bg-accent"
                }`}
                style={{
                  animationDelay: blip.delay,
                  boxShadow: isOutside
                    ? "none"
                    : "0 0 8px 2px rgba(0,255,148,0.3)",
                }}
              />
              {blip.label && !isOutside && (
                <span className="absolute left-3 top-[-3px] whitespace-nowrap font-mono text-[7px] text-accent/40">
                  {blip.label}
                </span>
              )}
            </div>
          );
        })}

        {/* Center sensor dot */}
        <div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60"
          style={{ boxShadow: "0 0 8px rgba(0,255,148,0.5)" }}
        />
      </div>
    </div>
  );
}
