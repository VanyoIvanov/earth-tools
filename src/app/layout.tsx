import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://earth-tools.example"),
  title: {
    default: "Earth Tools",
    template: "%s | Earth Tools"
  },
  description:
    "Open ecological intelligence tools for wildfire awareness, climate monitoring, and transparent environmental methods.",
  openGraph: {
    title: "Earth Tools",
    description:
      "Open ecological intelligence tools for wildfire awareness, climate monitoring, and transparent environmental methods.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${plexMono.variable} min-h-full bg-bg text-text antialiased`}
      >
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-surface-strong focus:px-4 focus:py-2 focus:text-sm focus:text-text"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
