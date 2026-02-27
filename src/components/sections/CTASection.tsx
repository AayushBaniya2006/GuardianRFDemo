import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { HUDElement } from "@/components/visuals/HUDElement";

type CTASectionProps = {
  title: string;
  primaryHref: string;
  primaryLabel: string;
};

export function CTASection({
  title,
  primaryHref,
  primaryLabel,
}: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-lg border border-accent/[0.08] px-6 py-10 md:px-8 md:py-12 lg:py-16 text-center">
          <HUDElement corner="top-left" />
          <HUDElement corner="bottom-right" />

          <div className="relative z-10">
            <AnimatedSection variant="fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-[-0.03em]">
                {title}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="mt-6">
                <Button href={primaryHref}>{primaryLabel}</Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
