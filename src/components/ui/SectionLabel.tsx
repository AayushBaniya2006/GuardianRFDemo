type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "accent" | "muted";
};

const variantClasses = {
  accent: "text-accent",
  muted: "text-gray-500",
};

export function SectionLabel({
  children,
  className = "",
  variant = "accent",
}: SectionLabelProps) {
  return (
    <p className={`text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] ${variantClasses[variant]} mb-4 ${className}`}>
      {children}
    </p>
  );
}
