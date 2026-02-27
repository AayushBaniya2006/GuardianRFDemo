"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────────── */

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Industries",
    children: [
      { label: "Defense & National Security", href: "/verticals/defense" },
      { label: "Law Enforcement & Public Safety", href: "/verticals/law-enforcement" },
      { label: "Critical Infrastructure & Energy", href: "/verticals/critical-infrastructure" },
      { label: "Stadiums, Campuses & Events", href: "/verticals/venues" },
      { label: "Aviation & Emergency Response", href: "/verticals/aviation" },
    ],
  },
  { label: "Platform", href: "/platform" },
  { label: "Hardware", href: "/hardware" },
  {
    label: "About",
    children: [{ label: "The Guardian RF Story", href: "/about/story" }],
  },
];

/* ─── Dropdown (desktop) ──────────────────────────────────────────── */

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-white transition-colors duration-200"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="min-w-[240px] rounded-lg border border-gray-800 bg-gray-950 py-1.5">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-[13px] text-gray-500 hover:text-white hover:bg-gray-900 transition-colors duration-150"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile nav ──────────────────────────────────────────────────── */

function MobileNav({ onClose }: { onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggle = (label: string) =>
    setExpandedItem((prev) => (prev === label ? null : label));

  return (
    <div className="fixed inset-0 z-40 bg-black lg:hidden">
      <div className="flex items-center justify-between px-6 h-16 border-b border-gray-800">
        <Logo />
        <button onClick={onClose} aria-label="Close menu" className="text-white/60 p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="px-6 py-8 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggle(item.label)}
                className="flex w-full items-center justify-between py-3 text-[15px] text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedItem === item.label ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedItem === item.label && (
                <div className="ml-4 border-l border-gray-800 pl-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block py-2 text-sm text-gray-500 hover:text-white transition-colors duration-150"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href!}
              onClick={onClose}
              className="block py-3 text-[15px] text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ),
        )}

        <div className="pt-8">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="border border-gray-700 rounded-md px-4 py-1.5 text-sm text-white/80 hover:border-gray-500 hover:text-white transition-colors duration-200"
          >
            Platform
          </Link>
        </div>
      </nav>
    </div>
  );
}

/* ─── Logo ────────────────────────────────────────────────────────── */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image src="/images/logo-symbol.png" alt="Guardian RF" width={20} height={20} />
      <span className="text-white font-medium tracking-[0.15em] text-[11px] uppercase">
        Guardian RF
      </span>
    </Link>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-black border-b border-gray-800"
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden lg:inline-flex border border-gray-700 rounded-md px-4 py-1.5 text-sm text-white/80 hover:border-gray-500 hover:text-white transition-colors duration-200"
            >
              Platform
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-white/60 p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </>
  );
}
