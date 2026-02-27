"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  { label: "About", href: "/about/story" },
];

/* ─── Dropdown (desktop) ──────────────────────────────────────────── */

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
          e.preventDefault();
          setOpen(true);
          // Focus first menu item
          requestAnimationFrame(() => {
            const first = menuRef.current?.querySelector<HTMLAnchorElement>("a");
            first?.focus();
          });
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    },
    []
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (!items) return;
      const current = document.activeElement as HTMLAnchorElement;
      const index = Array.from(items).indexOf(current);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          items[(index + 1) % items.length]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    []
  );

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
        aria-expanded={open}
        aria-haspopup="true"
        onKeyDown={handleKeyDown}
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div
              ref={menuRef}
              role="menu"
              onKeyDown={handleMenuKeyDown}
              className="min-w-[280px] rounded-lg border border-gray-800 bg-gray-950 py-2"
            >
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-900 focus-visible:text-white focus-visible:bg-gray-900 focus-visible:outline-none transition-colors duration-150"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile nav ──────────────────────────────────────────────────── */

function MobileNav({ onClose }: { onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const toggle = (label: string) =>
    setExpandedItem((prev) => (prev === label ? null : label));

  return (
    <motion.div
      ref={containerRef}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      className="fixed inset-0 z-40 bg-black lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex items-center justify-between px-6 h-16 border-b border-gray-800">
        <Logo />
        <button onClick={onClose} aria-label="Close menu" className="text-white/60 p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="px-6 py-8 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {NAV_ITEMS.map((item, idx) =>
          item.children ? (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.3 }}
            >
              <button
                onClick={() => toggle(item.label)}
                aria-expanded={expandedItem === item.label}
                className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedItem === item.label ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedItem === item.label && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 border-l border-gray-800 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2 text-sm text-gray-400 hover:text-white transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.3 }}
            >
              <Link
                href={item.href!}
                onClick={onClose}
                className="block py-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            </motion.div>
          ),
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * NAV_ITEMS.length, duration: 0.3 }}
          className="pt-8"
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="border border-gray-700 rounded-md px-4 py-1.5 text-sm text-white/80 hover:border-gray-500 hover:text-white transition-colors duration-150"
          >
            Contact
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
}

/* ─── Logo ────────────────────────────────────────────────────────── */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image src="/images/logo-symbol.png" alt="Guardian RF" width={20} height={20} />
      <span className="text-white font-medium tracking-[0.15em] text-sm uppercase font-mono">
        Guardian RF
      </span>
    </Link>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50"
            : "bg-black border-b border-gray-800"
        }`}
      >
        {/* Bottom border glow when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/[0.06]" />
        )}
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
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden lg:inline-flex border border-gray-700 rounded-md px-4 py-1.5 text-sm text-white/80 hover:border-gray-500 hover:text-white transition-colors duration-150"
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

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
