import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const credentials = [
  { label: "Vandenberg Space Force Base", category: "DoD Deployment" },
  { label: "DIU Challenge Winner", category: "Defense Innovation Unit" },
  { label: "AFWERX Phase II SBIR", category: "Air Force Contract" },
  { label: "Forbes 30 Under 30", category: "Recognition" },
  { label: "Constellis Partnership", category: "Strategic Partner" },
];

export function SocialProof() {
  return (
    <section className="py-20">
      <div className="section-container">
        <AnimatedSection variant="fade-in">
          <SectionLabel className="text-center">
            Operational Credibility
          </SectionLabel>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-800 border border-gray-800 rounded-lg overflow-hidden">
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="bg-gray-950 px-5 py-5 text-center"
              >
                <p className="text-xs font-mono uppercase tracking-[0.1em] text-white/70">
                  {cred.label}
                </p>
                <p className="text-[10px] font-mono text-gray-600 mt-1.5 uppercase tracking-wider">
                  {cred.category}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
