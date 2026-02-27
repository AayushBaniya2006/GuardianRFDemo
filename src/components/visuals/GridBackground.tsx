"use client";

export function GridBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,255,148,0.02) 0px, rgba(0,255,148,0.02) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(90deg, rgba(0,255,148,0.02) 0px, rgba(0,255,148,0.02) 1px, transparent 1px, transparent 80px)
          `,
          transform: "perspective(800px) rotateX(45deg)",
          transformOrigin: "center top",
          height: "200%",
          top: "-20%",
        }}
      />
      {/* Sweeping highlight */}
      <div
        className="absolute inset-x-0 h-[200px]"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(0,255,148,0.03), transparent)",
          transform: "perspective(800px) rotateX(45deg)",
          transformOrigin: "center top",
        }}
      />
    </div>
  );
}
