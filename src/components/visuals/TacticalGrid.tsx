type Props = {
  showScanLine?: boolean;
  className?: string;
};

export function TacticalGrid({ showScanLine = true, className = "" }: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Center radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,255,148,0.02), transparent 70%)",
        }}
      />

      {/* Scan line */}
      {showScanLine && (
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-scan-line" />
      )}
    </div>
  );
}
