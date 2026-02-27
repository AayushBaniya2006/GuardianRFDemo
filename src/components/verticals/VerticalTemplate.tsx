import { Vertical } from "@/lib/data/verticals";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { Card } from "@/components/ui/Card";



type Props = {
  vertical: Vertical;
};

export function VerticalTemplate({ vertical }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="py-24 pt-32">
        <div className="section-container max-w-4xl">
          <AnimatedSection>
            <SectionLabel>{vertical.title}</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {vertical.tagline}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 bg-gray-950">
        <div className="section-container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <SectionLabel variant="muted">The Challenge</SectionLabel>
              <p className="text-gray-400 leading-relaxed">{vertical.problem}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <SectionLabel>The Solution</SectionLabel>
              <p className="text-gray-400 leading-relaxed">{vertical.solution}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection>
            <SectionLabel>Key Capabilities</SectionLabel>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vertical.capabilities.map((cap, i) => (
              <AnimatedSection key={cap.title}>
                <Card>
                  <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{cap.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Deployments */}
      {vertical.deployments && vertical.deployments.length > 0 && (
        <section className="py-24">
          <div className="section-container">
            <AnimatedSection>
              <SectionLabel>Proven Deployments</SectionLabel>
            </AnimatedSection>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vertical.deployments.map((dep, i) => (
                <AnimatedSection key={dep.name}>
                  <Card>
                    <h3 className="text-lg font-semibold text-white">
                      {dep.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{dep.description}</p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Discuss ${vertical.shortTitle.toLowerCase()} requirements`}
        primaryHref="/contact"
        primaryLabel="Request Briefing"
      />
    </>
  );
}
