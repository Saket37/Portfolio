import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saketanand.dev"),
  title: {
    default: "Saket Anand — Android Developer",
    template: "%s — Saket Anand",
  },
  description:
    "Saket Anand is an Android Developer specializing in Kotlin, Jetpack Compose, and Clean Architecture.",
  openGraph: {
    title: "Saket Anand — Android Developer",
    description:
      "Saket Anand is an Android Developer specializing in Kotlin, Jetpack Compose, and Clean Architecture.",
    url: "https://saketanand.dev",
    siteName: "Saket Anand",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <div
            aria-hidden
            className="bg-grid animate-gridpan pointer-events-none fixed inset-0 -z-10"
          />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
