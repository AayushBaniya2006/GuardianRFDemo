"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavOverlay } from "./NavOverlay";

export function DemoTopBar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-50 flex h-12 items-center justify-between px-5"
        style={{
          background: "rgba(8, 8, 10, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-symbol.png"
            alt=""
            width={20}
            height={20}
            className="opacity-90"
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
            GuardianRF
          </span>
        </Link>

        {/* Center: Status pill */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
            Simulation
          </span>
        </div>

        {/* Right: Nav + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNavOpen(true)}
            className="p-1.5 text-white/50 transition-colors hover:text-white/80"
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-md border border-white/[0.12] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-accent/30 hover:text-accent"
          >
            Request Access
          </Link>
        </div>
      </header>

      <NavOverlay isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
