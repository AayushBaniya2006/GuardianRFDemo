import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Hardware", href: "/hardware" },
  { label: "Dashboard", href: "/dashboard" },
];

const industryLinks = [
  { label: "Defense", href: "/verticals/defense" },
  { label: "Law Enforcement", href: "/verticals/law-enforcement" },
  { label: "Infrastructure", href: "/verticals/critical-infrastructure" },
  { label: "Venues", href: "/verticals/venues" },
  { label: "Aviation", href: "/verticals/aviation" },
];

const companyLinks = [
  { label: "About", href: "/about/story" },
  { label: "Contact", href: "/contact" },
  {
    label: "Careers",
    href: "https://www.ycombinator.com/companies/guardian-rf/jobs",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo-symbol.png" alt="Guardian RF" width={20} height={20} />
              <span className="text-white font-medium tracking-[0.15em] text-[11px] uppercase">
                Guardian RF
              </span>
            </Link>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-xs">
              Persistent RF intelligence for low-altitude airspace. Building the
              sensing layer that enables real visibility into drone activity at scale.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {/* Social */}
            <a
              href="https://www.linkedin.com/company/guardianrf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors mt-4 inline-block"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 border-t border-gray-800 pt-8">
        <p className="text-sm text-gray-600 font-mono">
          &copy; 2026 Guardian RF Corporation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
