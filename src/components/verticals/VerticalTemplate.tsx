import { Vertical } from "@/lib/data/verticals";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { Card } from "@/components/ui/Card";
import {
  AlertTriangle,
  ShieldCheck,
  Eye,
  MapPin,
  Network,
  Terminal,
  Search,
  Cpu,
  Building2,
  Clock,
  FileText,
  Settings,
  Shield,
  Radio,
  TrendingUp,
  Activity,
  Lock,
  Globe,
  Zap,
  Bell,
  Hexagon,
  LayoutGrid,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  eye: Eye,
  "map-pin": MapPin,
  network: Network,
  terminal: Terminal,
  search: Search,
  cpu: Cpu,
  building: Building2,
  clock: Clock,
  "file-text": FileText,
  settings: Settings,
  shield: Shield,
  radio: Radio,
  "trending-up": TrendingUp,
  activity: Activity,
  lock: Lock,
  globe: Globe,
  zap: Zap,
  bell: Bell,
  hexagon: Hexagon,
  "layout-grid": LayoutGrid,
  database: Database,
};

type Props = {
  vertical: Vertical;
};

export function VerticalTemplate({ vertical }: Props) {
  const subtitle = vertical.solution.split(". ")[0] + ".";

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-40">
        <div className="section-container">
          <AnimatedSection>
            <SectionLabel>{vertical.title}</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
              {vertical.tagline}
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </AnimatedSection>

          {/* Metrics — inline under hero text */}
          {vertical.metrics && vertical.metrics.length > 0 && (
            <AnimatedSection delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                {vertical.metrics.map((metric) => (
                  <div key={metric.label}>
                    <span className="font-mono text-sm text-white">
                      {metric.value}
                    </span>
                    <span className="font-mono text-xs text-gray-600 uppercase tracking-wider ml-2">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="bg-gray-950">
        <div className="section-container py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:divide-x md:divide-gray-800">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <SectionLabel variant="muted" className="mb-0">
                  The Challenge
                </SectionLabel>
              </div>
              <p className="text-[17px] text-gray-400 leading-relaxed">
                {vertical.problem}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="md:pl-12">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-accent/60" />
                <SectionLabel className="mb-0">The Solution</SectionLabel>
              </div>
              <p className="text-[17px] text-gray-400 leading-relaxed">
                {vertical.solution}
              </p>
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vertical.capabilities.map((cap, i) => {
              const Icon = cap.icon ? iconMap[cap.icon] : null;
              return (
                <AnimatedSection key={cap.title} delay={0.05 * i}>
                  <Card className="border-t-2 border-t-accent/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-accent/30 font-mono text-xs">
                        0{i + 1}
                      </span>
                      {Icon && <Icon className="w-4 h-4 text-accent/40" />}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      {cap.description}
                    </p>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deployments */}
      {vertical.deployments && vertical.deployments.length > 0 && (
        <section className="py-24 bg-gray-950">
          <div className="section-container">
            <AnimatedSection>
              <SectionLabel>Proven Deployments</SectionLabel>
            </AnimatedSection>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vertical.deployments.map((dep, i) => (
                <AnimatedSection key={dep.name} delay={0.05 * i}>
                  <div className="bg-accent/[0.02] border border-gray-800 border-l-2 border-l-accent/40 rounded-lg p-6 hover:border-gray-700 transition-colors duration-200">
                    <span className="font-mono text-[10px] text-accent/50 uppercase tracking-wider">
                      Verified
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-2">
                      {dep.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      {dep.description}
                    </p>
                  </div>
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
