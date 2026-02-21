import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wildfire Nowcast & Forecast",
  description: "Embedded Wildfire Nowcast stream for live fire monitoring.",
  openGraph: {
    title: "Earth Tools Wildfire",
    description: "Embedded Wildfire Nowcast stream for live fire monitoring."
  }
};

function resolveWildfireEmbedUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_WILDFIRE_NOWCAST_URL?.trim();

  if (!rawUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

export default async function WildfirePage() {
  const embedUrl = resolveWildfireEmbedUrl();

  if (!embedUrl) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="mb-3 text-2xl font-bold text-white">Wildfire Nowcast</h1>
        <p className="text-sm leading-relaxed text-text-muted">
          Set <code>NEXT_PUBLIC_WILDFIRE_NOWCAST_URL</code> to the Streamlit app URL (for example{" "}
          <code>http://localhost:8501</code>) to render this tool.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100dvh-4rem)] overflow-hidden bg-bg" aria-label="Wildfire app embed area">
      <h1 className="sr-only">Wildfire Nowcast</h1>
      <iframe
        src={embedUrl}
        title="Wildfire Nowcast app"
        data-testid="wildfire-iframe"
        className="h-[calc(100dvh-4rem)] w-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
}
