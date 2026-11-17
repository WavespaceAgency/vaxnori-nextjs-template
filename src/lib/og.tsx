import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

/**
 * Social share image (Open Graph / Twitter), drawn in the site style:
 * dotted canvas, brand mark, big title and an orange eyebrow.
 */
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fbfbfb",
          backgroundImage: "radial-gradient(circle at 1px 1px, #dcdcdc 1.5px, transparent 0)",
          backgroundSize: "20px 20px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#ff4820", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="39" viewBox="0 0 15.3627 19.9998">
              <path
                fill="#fff"
                d="M7.68 3.94C6.75 5.1 6.2 6.13 6.02 7c-.18.7-.11 1.27.2 1.7.33.49.82.73 1.46.73.64 0 1.13-.24 1.46-.73.3-.42.38-.99.2-1.7-.2-.89-.75-1.92-1.66-3.07ZM15.12 4.8c-.13.4-.35.87-.62 1.44v.02C13.2 9.01 12 11.49 10.85 13.71l-.08.12c-.81 1.67-1.4 2.68-3.09 2.68-1.68 0-2.39-1.17-3.12-2.68l-.06-.11C3.36 11.49 2.16 9.01.86 6.25v-.03l-.38-.84c-.15-.35-.22-.53-.24-.58C-.69 2.24 1.22 0 3.54 0h.44c1.2.15 2.44.91 3.7 2.28C8.94.93 10.18.17 11.38.02h.44c2.32 0 4.23 2.24 3.3 4.78Z"
              />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#000" }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#cc340b", textTransform: "uppercase", letterSpacing: 1 }}>
            <div style={{ width: 40, height: 2, background: "#ff4820" }} />
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.08, fontWeight: 700, color: "#000", letterSpacing: -2 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 30, lineHeight: 1.35, color: "#5e5e5e" }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", height: 10, width: "100%" }}>
          {["#ff4820", "#ffcf00", "#e8e1d6", "#f1f1f1"].map((c) => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
