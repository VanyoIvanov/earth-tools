"use client";

export function ScrollToDirectoryButton() {
  return (
    <button
      type="button"
      className="rounded-lg bg-surface-strong px-8 py-3 font-medium text-white transition-colors hover:bg-surface"
      onClick={() => {
        document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      View All Tools
    </button>
  );
}
