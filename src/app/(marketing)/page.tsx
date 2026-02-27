import { Hero } from "@/components/sections/Hero";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { Pipeline } from "@/components/sections/Pipeline";
import { ScoutShowcase } from "@/components/sections/ScoutShowcase";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <PlatformPreview />
      <Pipeline />
      <ScoutShowcase />
      <IndustryCards />
      <SocialProof />
      <CTASection
        title="Ready to see what's in your airspace?"
        primaryHref="/dashboard"
        primaryLabel="Launch Platform"
      />
    </>
  );
}
