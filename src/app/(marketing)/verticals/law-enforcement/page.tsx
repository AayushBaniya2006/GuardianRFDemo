import { notFound } from "next/navigation";
import { verticals } from "@/lib/data/verticals";
import { VerticalTemplate } from "@/components/verticals/VerticalTemplate";
import type { Metadata } from "next";

const vertical = verticals.find((v) => v.slug === "law-enforcement");

export const metadata: Metadata = vertical
  ? { title: `${vertical.title} — Guardian RF`, description: vertical.tagline }
  : {};

export default function LawEnforcementPage() {
  if (!vertical) notFound();
  return <VerticalTemplate vertical={vertical} />;
}
