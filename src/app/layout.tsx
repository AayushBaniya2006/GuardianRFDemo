import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/ui/Providers";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Guardian RF — Persistent Airspace Intelligence",
    template: "%s — Guardian RF",
  },
  description:
    "Radiofrequency drone intelligence for low-altitude airspace monitoring.",
  openGraph: {
    type: "website",
    siteName: "Guardian RF",
    title: "Guardian RF — Persistent Airspace Intelligence",
    description:
      "Radiofrequency drone intelligence for low-altitude airspace monitoring.",
  },
  twitter: {
    card: "summary",
    title: "Guardian RF — Persistent Airspace Intelligence",
    description:
      "Radiofrequency drone intelligence for low-altitude airspace monitoring.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
