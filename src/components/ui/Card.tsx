type CardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className = "", interactive = false }: CardProps) {
  return (
    <div
      className={`group relative bg-gray-950 border border-gray-800 rounded-lg p-8 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.08)] transition-all duration-200 ${interactive ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
