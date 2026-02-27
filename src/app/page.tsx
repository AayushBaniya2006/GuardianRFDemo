import type { Metadata } from "next";
import { DemoLanding } from "@/components/landing/DemoLanding";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { Pipeline } from "@/components/sections/Pipeline";
import { ScoutShowcase } from "@/components/sections/ScoutShowcase";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { NoiseOverlay } from "@/components/visuals/NoiseOverlay";

export const metadata: Metadata = {
  title: "Guardian RF — Persistent Airspace Intelligence",
  description:
    "RF-based drone detection, classification, and intelligence for low-altitude airspace monitoring.",
  openGraph: {
    title: "Guardian RF — Persistent Airspace Intelligence",
    description:
      "Persistent RF-based drone detection and intelligence for low-altitude airspace.",
  },
};

export default function Home() {
  return (
    <>
      {/* 3D Hero — full viewport, own TopBar */}
      <DemoLanding />

      {/* Below-fold marketing sections — with visual effects matching subpages */}
      <div className="relative">
        <CursorGlow />
        <NoiseOverlay />
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
        <Footer />
      </div>
    </>
  );
}
