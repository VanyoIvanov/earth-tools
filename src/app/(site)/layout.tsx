import { SiteHeader } from "@/components/layout/SiteHeader";

export default function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-bg text-text selection:bg-accent-soft">
      <SiteHeader />
      <main id="main-content" className="min-h-[calc(100dvh-4rem)]">
        {children}
      </main>
    </div>
  );
}
