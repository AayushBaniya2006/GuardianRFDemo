import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AnimatedBorder({
  children,
  className = "",
}: Props) {
  return (
    <div className={`relative p-px rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 rounded-lg border border-accent/[0.08]" />
      <div className="relative bg-gray-950 rounded-lg">
        {children}
      </div>
    </div>
  );
}
