import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { NoiseOverlay } from "@/components/visuals/NoiseOverlay";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <NoiseOverlay />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
