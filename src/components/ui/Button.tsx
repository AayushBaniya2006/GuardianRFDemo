import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const variants = {
    primary:
      "bg-white text-black font-medium rounded-md px-6 py-3 text-sm hover:bg-gray-100 transition-colors duration-200",
    secondary:
      "border border-gray-700 text-white/80 rounded-md px-6 py-3 text-sm hover:border-gray-500 hover:text-white transition-colors duration-200",
    ghost:
      "text-sm text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors duration-200",
  };

  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${variants[variant]} ${className}`}>
      {children}
      {variant === "ghost" && <span aria-hidden="true">&rarr;</span>}
    </Link>
  );
}
