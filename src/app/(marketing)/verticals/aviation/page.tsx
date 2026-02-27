import { verticals } from "@/lib/data/verticals";
import { VerticalTemplate } from "@/components/verticals/VerticalTemplate";
import type { Metadata } from "next";

const vertical = verticals.find((v) => v.slug === "aviation")!;

export const metadata: Metadata = {
  title: `${vertical.title} — Guardian RF`,
  description: vertical.tagline,
};

export default function AviationPage() {
  return <VerticalTemplate vertical={vertical} />;
}
