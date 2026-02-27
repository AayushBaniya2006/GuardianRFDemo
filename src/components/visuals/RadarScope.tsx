"use client";

const blips = [
  { angle: 45, distance: 35, delay: "0s" },
  { angle: 160, distance: 55, delay: "1.5s" },
  { angle: 250, distance: 70, delay: "3s" },
  { angle: 310, distance: 45, delay: "4.2s" },
];

export function RadarScope({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "1" }}>
      {/* Glow halo behind scope */}
      <div
        className="absolute inset-[-20%]"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 148, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Concentric circles */}
      {[25, 50, 75, 100].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-white/[0.06]"
          style={{
            width: `${size}%`,
            height: `${size}%`,
            top: `${(100 - size) / 2}%`,
            left: `${(100 - size) / 2}%`,
          }}
        />
      ))}

      {/* Crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.04]" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.04]" />

      {/* Rotating sweep beam */}
      <div
        className="absolute inset-0 animate-sweep"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute top-0 left-1/2 h-1/2 w-1/2"
          style={{
            transformOrigin: "bottom left",
            background:
              "conic-gradient(from 0deg at 0% 100%, rgba(0, 255, 148, 0.15) 0deg, transparent 40deg)",
          }}
        />
      </div>

      {/* Detection blips */}
      {blips.map((blip, i) => {
        const rad = (blip.angle * Math.PI) / 180;
        const x = 50 + (blip.distance / 2) * Math.cos(rad);
        const y = 50 + (blip.distance / 2) * Math.sin(rad);
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
              className="w-1.5 h-1.5 rounded-full bg-accent animate-blip"
              style={{
                animationDelay: blip.delay,
                boxShadow: "0 0 8px 2px rgba(0, 255, 148, 0.4)",
              }}
            />
          </div>
        );
      })}

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60" />
    </div>
  );
}
