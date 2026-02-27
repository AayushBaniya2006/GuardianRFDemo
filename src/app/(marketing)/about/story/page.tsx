import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/CTASection";
import { TacticalGrid } from "@/components/visuals/TacticalGrid";
import { HUDElement } from "@/components/visuals/HUDElement";



export const metadata: Metadata = {
  title: "Our Story — Guardian RF",
  description:
    "How Guardian RF was built — from Georgetown classmates to the front lines of drone detection and airspace intelligence.",
};

const milestones = [
  { year: "2022", title: "Georgetown University", description: "Three classmates unite over shared interests in physics, signal processing, and national security." },
  { year: "2023", title: "Ukraine Deployment", description: "Traveled to Ukraine to assist with signal intelligence and drone detection. Witnessed firsthand how inexpensive drones outpaced institutional responses." },
  { year: "2023", title: "The Key Insight", description: "Learned that persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems." },
  { year: "2024", title: "Guardian RF Founded", description: "Built around low-SWaP attritable RF sensing paired with a cloud intelligence layer. Applied and accepted to Y Combinator S24." },
  { year: "2025", title: "First Deployments", description: "Vandenberg Space Force Base, Constellis training facility, DIU Challenge winner, Forbes 30 Under 30." },
  { year: "2026", title: "Scaling Operations", description: "CFP Championship deployment, AFWERX Phase II contract, expanding sensor network across critical infrastructure." },
];

const founders = [
  { initials: "LR", name: "Lucas Raskin", title: "Co-Founder & CEO" },
  { initials: "EK", name: "Eli Kerstein", title: "Co-Founder & CTO" },
  { initials: "JA", name: "John Andrzejewski", title: "Co-Founder & COO" },
];

const investors = ["Y Combinator", "Space Capital", "Valor Equity Partners", "D3VC", "General Catalyst"];

export default function StoryPage() {
  return (
    <>
      {/* Hero + Timeline (side-by-side on desktop) */}
      <section className="relative bg-gray-950 overflow-hidden">
        <TacticalGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-gray-950 z-[2]" />
        <HUDElement corner="top-left" className="z-[4] mt-16" />
        <HUDElement corner="bottom-right" className="z-[4]" />

        <div className="relative z-10 w-full section-container pt-24 pb-20">
          {/* Centered hero copy */}
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Our Story</SectionLabel>

            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-[-0.03em]">
              Built from the front lines
            </h1>

            <p className="text-lg text-gray-400 mt-4 leading-relaxed">
              Guardian RF was founded by former Georgetown classmates with
              backgrounds in physics and signal processing who deployed to
              Ukraine to assist with drone detection.
            </p>

            <blockquote className="border-l-2 border-accent/30 pl-6 mt-8 text-left max-w-xl mx-auto">
              <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                &ldquo;Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Timeline roadmap — 2-col with all items visible */}
          <div className="mt-20">
            <SectionLabel className="text-center">Our Journey</SectionLabel>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
              {milestones.map((milestone) => (
                <div key={milestone.title} className="grid grid-cols-[auto_auto_1fr] gap-x-4 items-start">
                  <span className="text-xs font-mono text-gray-500 tracking-wider pt-1.5">
                    {milestone.year}
                  </span>
                  <div className="flex flex-col items-center pt-2">
                    <span className="w-2 h-2 rounded-full bg-accent/40 shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team + Investors (combined) */}
      <section className="py-24">
        <div className="section-container">
          <SectionLabel>Leadership</SectionLabel>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {founders.map((founder) => (
              <Card key={founder.name}>
                <div className="flex flex-col items-center text-center">
                  <span className="w-14 h-14 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-sm font-mono text-gray-400 mb-4">
                    {founder.initials}
                  </span>
                  <h3 className="text-lg font-medium text-white">{founder.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{founder.title}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-12">
            <SectionLabel variant="muted" className="text-center mb-6">
              Backed by
            </SectionLabel>
            <div className="flex flex-wrap justify-center gap-3">
              {investors.map((investor) => (
                <span
                  key={investor}
                  className="px-4 py-1.5 text-xs font-mono text-gray-400 border border-gray-800 rounded-full bg-gray-950 hover:border-accent/20 hover:shadow-[0_0_12px_rgba(0,255,148,0.06)] transition-all duration-300"
                >
                  {investor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Contact Us"
        primaryHref="/contact"
        primaryLabel="Request Briefing"
      />
    </>
  );
}
