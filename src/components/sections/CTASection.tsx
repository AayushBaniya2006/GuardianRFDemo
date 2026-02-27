"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

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
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          <div className="mt-8">
            <Button href={primaryHref}>{primaryLabel}</Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
