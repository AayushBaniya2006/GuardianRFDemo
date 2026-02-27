import type { Metadata } from "next";
import DashboardView from "@/components/dashboard/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard \u2014 Guardian RF",
  description: "Real-time drone monitoring and airspace intelligence dashboard.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
