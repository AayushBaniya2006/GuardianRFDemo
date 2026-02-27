import type { Metadata } from "next";
import { DemoLanding } from "@/components/landing/DemoLanding";
import { Hero } from "@/components/sections/Hero";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { DeploymentsAndVerticals } from "@/components/sections/DeploymentsAndVerticals";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
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
      <DemoLanding />

      <div className="relative">
        <NoiseOverlay />
        <Hero />
        <PlatformPreview />
        <DeploymentsAndVerticals />
        <CTASection
          title="Discuss your requirements"
          primaryHref="/contact"
          primaryLabel="Request Briefing"
        />
        <Footer />
      </div>
    </>
  );
}
