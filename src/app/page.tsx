import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { Pipeline } from "@/components/sections/Pipeline";
import { DeploymentsAndVerticals } from "@/components/sections/DeploymentsAndVerticals";
import { SocialProof } from "@/components/sections/SocialProof";
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
    <div className="relative">
      <NoiseOverlay />
      <Navbar />
      <main className="pt-16">
        <Hero />
        <PlatformPreview />
        <Pipeline />
        <DeploymentsAndVerticals />
        <SocialProof />
        <CTASection
          title="Discuss your requirements"
          primaryHref="/contact"
          primaryLabel="Request Briefing"
        />
      </main>
      <Footer />
    </div>
  );
}
