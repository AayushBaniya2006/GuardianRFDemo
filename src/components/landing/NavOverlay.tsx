"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/hardware", label: "Hardware" },
  { href: "/verticals/defense", label: "Defense" },
  { href: "/verticals/law-enforcement", label: "Law Enforcement" },
  { href: "/verticals/critical-infrastructure", label: "Infrastructure" },
  { href: "/verticals/venues", label: "Venues" },
  { href: "/verticals/aviation", label: "Aviation" },
  { href: "/about/story", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            background: "rgba(8, 8, 10, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 text-white/60 hover:text-white/90 transition-colors"
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-mono text-lg tracking-widest uppercase text-white/60 transition-colors hover:text-white/90"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
