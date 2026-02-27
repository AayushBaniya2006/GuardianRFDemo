import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const deployments = [
  { name: "Vandenberg Space Force Base", detail: "Active Phase II SBIR — persistent passive RF monitoring" },
  { name: "DIU C-UAS Challenge", detail: "Downselected passive RF solution" },
  { name: "AFWERX Phase II", detail: "Air Force contract" },
  { name: "Constellis Training Facility", detail: "3,700-acre NC site — live-fire range airspace awareness" },
  { name: "CFP Championship 2026", detail: "University of Miami — continuous detection and alerting" },
];

const recognition = ["Forbes 30 Under 30", "Y Combinator S24"];

const verticals = [
  { name: "Defense & National Security", href: "/verticals/defense", tagline: "Protect installations with persistent, passive RF sensing." },
  { name: "Law Enforcement", href: "/verticals/law-enforcement", tagline: "Regional drone awareness across jurisdictions." },
  { name: "Critical Infrastructure", href: "/verticals/critical-infrastructure", tagline: "Continuous airspace monitoring for energy and industrial sites." },
  { name: "Venues & Events", href: "/verticals/venues", tagline: "Scalable, event-ready drone detection." },
  { name: "Aviation", href: "/verticals/aviation", tagline: "Safeguard airports and emergency response corridors." },
];

export function DeploymentsAndVerticals() {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — Deployments */}
          <AnimatedSection className="lg:col-span-7">
            <SectionLabel>Deployments &amp; Recognition</SectionLabel>
            <div className="mt-6 space-y-4">
              {deployments.map((dep) => (
                <div
                  key={dep.name}
                  className="flex items-start gap-3 py-3 border-b border-gray-800/50 last:border-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{dep.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{dep.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {recognition.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-mono text-gray-500 border border-gray-800 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — Verticals */}
          <AnimatedSection className="lg:col-span-5" delay={0.1}>
            <SectionLabel>Verticals</SectionLabel>
            <div className="mt-6 space-y-3">
              {verticals.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="group block py-3 border-b border-gray-800/50 last:border-0 hover:border-accent/10 transition-colors duration-150"
                >
                  <p className="text-sm font-medium text-white group-hover:text-accent/90 transition-colors duration-150">
                    {v.name} <span className="text-gray-600 group-hover:text-gray-500">&rarr;</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{v.tagline}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
