type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`text-[11px] font-mono uppercase tracking-[0.2em] text-accent mb-4 ${className}`}>
      {children}
    </p>
  );
}
