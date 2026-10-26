import { ImageResponse } from "next/og";

export const alt = "Marketivity | Software Development, Web Design & Marketing Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#F7F3F1",
          padding: "72px",
        }}
      >
        <div style={{ color: "#F7931E", fontSize: 28, fontWeight: 700 }}>Marketivity</div>
        <div
          style={{
            color: "#24202C",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 16,
            maxWidth: 900,
          }}
        >
          Meta ads and websites that start real conversations.
        </div>
        <div style={{ color: "#4A4553", fontSize: 28, marginTop: 28 }}>marketivity.agency</div>
      </div>
    ),
    { ...size }
  );
}
