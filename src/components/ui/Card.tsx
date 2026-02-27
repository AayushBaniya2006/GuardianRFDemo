type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group relative bg-gray-950 border border-gray-800 rounded-lg p-6 md:p-8 hover:border-gray-700 transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
