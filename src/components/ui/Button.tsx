"use client";

import Link from "next/link";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
};

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonNativeProps = ButtonBaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type ButtonProps = ButtonLinkProps | ButtonNativeProps;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants = {
  primary: `bg-white text-black font-medium rounded-md px-6 py-3 text-sm hover:bg-gray-100 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,255,148,0.15)] active:scale-[0.98] ${focusRing}`,
  secondary: `border border-gray-700 text-white/80 rounded-md px-6 py-3 text-sm hover:border-gray-500 hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(0,255,148,0.08)] active:scale-[0.98] ${focusRing}`,
  ghost: `text-sm text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors duration-150 ${focusRing}`,
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {variant === "ghost" && <span aria-hidden="true">&rarr;</span>}
      </Link>
    );
  }

  const { type = "button", onClick } = rest as ButtonNativeProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
