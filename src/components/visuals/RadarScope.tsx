const blips = [
  { angle: 30, distance: 30, delay: "0s" },
  { angle: 75, distance: 55, delay: "0.8s" },
  { angle: 130, distance: 40, delay: "1.5s" },
  { angle: 170, distance: 65, delay: "2.2s" },
  { angle: 220, distance: 50, delay: "3s" },
  { angle: 265, distance: 35, delay: "3.8s" },
  { angle: 310, distance: 70, delay: "4.5s" },
  { angle: 350, distance: 45, delay: "5.2s" },
];

const rangeLabels = ["1km", "2km", "3km"];

export function RadarScope({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "1" }}>
      {/* Glow halo behind scope */}
      <div
        className="absolute inset-[-20%]"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 148, 0.05) 0%, transparent 55%)",
        }}
      />

      {/* Outer ring glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 40px 4px rgba(0, 255, 148, 0.06), inset 0 0 30px 2px rgba(0, 255, 148, 0.03)",
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

      {/* Range labels */}
      {rangeLabels.map((label, i) => {
        const pct = 25 + (i + 1) * 18.75;
        return (
          <span
            key={label}
            className="absolute font-mono text-[9px] text-accent/20"
            style={{
              top: `${50 - pct / 2}%`,
              left: "51%",
            }}
          >
            {label}
          </span>
        );
      })}

      {/* Crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.04]" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.04]" />

      {/* Primary rotating sweep beam */}
      <div
        className="absolute inset-0 animate-sweep"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute top-0 left-1/2 h-1/2 w-1/2"
          style={{
            transformOrigin: "bottom left",
            background:
              "conic-gradient(from 0deg at 0% 100%, rgba(0, 255, 148, 0.18) 0deg, transparent 50deg)",
          }}
        />
      </div>

      {/* Secondary faint sweep at 180° offset */}
      <div
        className="absolute inset-0 animate-sweep"
        style={{ transformOrigin: "center center", animationDelay: "-3s" }}
      >
        <div
          className="absolute top-0 left-1/2 h-1/2 w-1/2"
          style={{
            transformOrigin: "bottom left",
            background:
              "conic-gradient(from 0deg at 0% 100%, rgba(0, 255, 148, 0.06) 0deg, transparent 30deg)",
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
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60" style={{ boxShadow: "0 0 6px rgba(0,255,148,0.5)" }} />
    </div>
  );
}
