"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F3F1",
          color: "#24202C",
          fontFamily: "Poppins, sans-serif",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: "#4A4553" }}>Please try again, or write to us on WhatsApp.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 20,
              background: "#F7931E",
              color: "#fff",
              border: 0,
              borderRadius: 999,
              padding: "12px 20px",
              fontWeight: 700,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
