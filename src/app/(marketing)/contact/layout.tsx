import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Guardian RF",
  description:
    "Get in touch with Guardian RF. Request a demo, discuss partnerships, or learn about our RF drone intelligence platform.",
  openGraph: {
    title: "Contact — Guardian RF",
    description:
      "Get in touch with Guardian RF. Request a demo, discuss partnerships, or learn about our RF drone intelligence platform.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
