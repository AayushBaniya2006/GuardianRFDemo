"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { verticals } from "@/lib/data/verticals";

const gridSpans = [
  "md:col-span-2",    // Defense — large
  "",                  // Law Enforcement — normal
  "",                  // Infrastructure — normal
  "md:col-span-2",    // Venues — wide
  "md:col-span-3",    // Aviation — full-width
];

export function IndustryCards() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel>Industry Solutions</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Purpose-built for your mission
          </h2>
          <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
            Every environment has unique operational requirements. Guardian RF
            delivers tailored deployment strategies and intelligence outputs
            for each vertical.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticals.map((v, i) => (
            <AnimatedSection key={v.slug} delay={i * 0.08} className={gridSpans[i] || ""}>
              <Link href={`/verticals/${v.slug}`} className="block h-full">
                <div className="h-full bg-gray-950 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors duration-200 group cursor-pointer flex flex-col">
                  <span className="text-xs font-mono text-gray-500 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors duration-200">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed flex-1">
                    {v.tagline}
                  </p>
                  <span className="text-sm text-gray-600 group-hover:text-gray-300 mt-6 inline-flex items-center gap-1 transition-colors duration-200">
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
