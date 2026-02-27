import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { StoryTimeline } from "@/components/sections/StoryTimeline";



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
      {/* Hero */}
      <section className="py-24 pt-32">
        <div className="section-container max-w-4xl">
          <AnimatedSection>
            <SectionLabel>Our Story</SectionLabel>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Built from the front lines
            </h1>

            <p className="text-base text-gray-400 mt-6 max-w-lg leading-relaxed">
              Guardian RF was founded by former Georgetown classmates with
              backgrounds in physics and signal processing who deployed to
              Ukraine to assist with drone detection.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-950">
        <div className="section-container max-w-3xl">
          <StoryTimeline milestones={milestones} />
        </div>
      </section>

      {/* Blockquote */}
      <section className="py-24 bg-gray-950">
        <div className="section-container max-w-3xl">
          <AnimatedSection>
            <blockquote className="border-l-2 border-accent/30 pl-8">
              <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                &ldquo;Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems.&rdquo;
              </p>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection>
            <SectionLabel>Leadership</SectionLabel>
          </AnimatedSection>

          <div className="mt-8 border-t border-gray-800">
            {founders.map((founder) => (
              <AnimatedSection key={founder.name}>
                <div className="flex items-center justify-between py-8 border-b border-gray-800">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center text-xs font-mono text-gray-500">
                      {founder.initials}
                    </span>
                    <span className="font-medium text-white">{founder.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{founder.title}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection variant="fade-in">
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
          </AnimatedSection>
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
