"use client";

interface HudPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function HudPanel({ title, children, className = "" }: HudPanelProps) {
  return (
    <div
      className={`pointer-events-auto rounded-xl border border-white/[0.08] px-4 py-3 font-mono text-xs ${className}`}
      style={{
        background: "rgba(10, 10, 14, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
        {title}
      </div>
      <div className="border-t border-white/[0.06] pt-2">{children}</div>
    </div>
  );
}
