"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

/** Rajshahi, the studio's home city. */
const RAJSHAHI: [number, number] = [24.374, 88.604];
/** Dhaka. */
const DHAKA: [number, number] = [23.811, 90.412];
const LONDON: [number, number] = [51.507, -0.128];
const NEW_YORK: [number, number] = [40.713, -74.006];

/** Faces ~7°E, so Bangladesh, the UK, and the US east coast are on the front. */
const INITIAL_PHI = -Math.PI / 2 - (7.3 * Math.PI) / 180;
const THETA = 0.25;

const ORANGE: [number, number, number] = [0.969, 0.576, 0.118];
const PURPLE: [number, number, number] = [0.482, 0.247, 0.894];

export default function HeroGlobeCanvas({
  onReady,
  label,
}: {
  onReady?: () => void;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let width = parent.clientWidth || 320;
    const dpr = Math.min(window.devicePixelRatio || 1, width < 480 ? 1.5 : 2);
    let phi = INITIAL_PHI;
    let dragging = false;
    let lastWidth = -1;
    let frame = 0;
    let readySent = false;
    let lastDraw = 0;
    const samples = width < 420 ? 6000 : 10000;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi,
      theta: THETA,
      dark: 0,
      diffuse: 1.2,
      mapSamples: samples,
      mapBrightness: 5.2,
      mapBaseBrightness: 0.12,
      baseColor: [0.42, 0.28, 0.62],
      markerColor: ORANGE,
      glowColor: [0.99, 0.93, 0.88],
      opacity: 0.92,
      scale: 1,
      offset: [0, 0],
      markers: [
        { location: RAJSHAHI, size: 0.055, color: ORANGE, id: "bd" },
        { location: DHAKA, size: 0.04, color: ORANGE },
        { location: LONDON, size: 0.05, color: PURPLE, id: "uk" },
        { location: NEW_YORK, size: 0.05, color: PURPLE, id: "usa" },
      ],
      arcs: [
        { from: RAJSHAHI, to: LONDON, color: ORANGE },
        { from: RAJSHAHI, to: NEW_YORK, color: PURPLE },
      ],
      arcColor: ORANGE,
      arcWidth: 0.6,
      arcHeight: 0.28,
      markerElevation: 0.015,
    });

    const draw = (now: number) => {
      frame = window.requestAnimationFrame(draw);
      if (!dragging && now - lastDraw < 34) return;
      lastDraw = now;
      if (!dragging) phi += 0.0048;
      const next: { phi: number; width?: number; height?: number } = { phi };
      if (width !== lastWidth) {
        next.width = width;
        next.height = width;
        lastWidth = width;
      }
      globe.update(next);
      if (!readySent) {
        readySent = true;
        onReady?.();
      }
    };
    frame = window.requestAnimationFrame(draw);

    const observer = new ResizeObserver(() => {
      width = parent.clientWidth || width;
    });
    observer.observe(parent);

    let grab: { x: number; phi: number } | null = null;

    const onDown = (event: PointerEvent) => {
      dragging = true;
      grab = { x: event.clientX, phi };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (event: PointerEvent) => {
      if (!grab) return;
      phi = grab.phi + (event.clientX - grab.x) * 0.005;
    };
    const onUp = (event: PointerEvent) => {
      dragging = false;
      grab = null;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      dragging = true;
      phi += event.key === "ArrowRight" ? 0.08 : -0.08;
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") dragging = false;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("keyup", onKeyUp);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("keyup", onKeyUp);
      globe.destroy();
    };
  }, [onReady]);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      aria-label={label}
      className="block h-full w-full cursor-grab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
      style={{ touchAction: "none" }}
    />
  );
}
