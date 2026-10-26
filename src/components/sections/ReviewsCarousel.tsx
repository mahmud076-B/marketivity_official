"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/lib/reviews";

const SPEED = 28;

type Copy = {
  badge: string;
  recommends: string;
  previous: string;
  next: string;
  readMore: string;
  showLess: string;
  carousel: string;
};

type Holds = {
  hover: boolean;
  drag: boolean;
  focus: boolean;
  nudge: boolean;
};

function ReviewCard({
  review,
  copy,
  interactive,
}: {
  review: Review;
  copy: Copy;
  interactive: boolean;
}) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const check = () => {
      if (open) return;
      setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, review.quote]);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-brand-charcoal/10 bg-white p-5 shadow-[0_16px_36px_-28px_rgba(36,32,44,0.55)] sm:p-6">
      <header className="flex items-center gap-3">
        {review.logo ? (
          <Image
            src={review.logo}
            alt=""
            width={112}
            height={112}
            sizes="48px"
            className="h-12 w-12 shrink-0 rounded-2xl border border-brand-charcoal/10 bg-white object-contain p-1 ring-1 ring-brand-charcoal/10"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-orange/40 bg-brand-offwhite text-sm font-bold text-brand-charcoal ring-1 ring-brand-orange/30"
          >
            {review.initials}
          </span>
        )}
        <div className="min-w-0">
          <cite className="block truncate text-sm font-bold not-italic text-brand-charcoal">{review.name}</cite>
          <p className="mt-1 inline-flex max-w-full rounded-full bg-brand-offwhite px-2 py-0.5 text-[11px] font-semibold leading-snug text-brand-ink ring-1 ring-brand-charcoal/10">
            {copy.badge} · {copy.recommends}
          </p>
        </div>
      </header>
      <blockquote className="mt-4">
        <p
          ref={quoteRef}
          lang="en"
          className={`text-pretty text-[15px] leading-7 text-brand-charcoal sm:text-base ${open ? "" : "line-clamp-6"}`}
        >
          <span aria-hidden className="mr-1 font-serif text-[1.65rem] leading-none text-brand-orange">
            “
          </span>
          {review.quote}
        </p>
      </blockquote>
      {interactive && (overflows || open) ? (
        <button
          type="button"
          className="mt-3 self-start text-sm font-bold text-brand-ink underline decoration-brand-orange underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? copy.showLess : copy.readMore}
        </button>
      ) : null}
    </article>
  );
}

function ReviewSet({
  reviews,
  copy,
  interactive,
  setRef,
}: {
  reviews: Review[];
  copy: Copy;
  interactive: boolean;
  setRef?: React.Ref<HTMLUListElement>;
}) {
  return (
    <ul ref={setRef} className="flex shrink-0 items-stretch gap-5 pr-5" aria-hidden={interactive ? undefined : true}>
      {reviews.map((review) => (
        <li key={review.id} className="flex w-[min(22rem,78vw)] shrink-0">
          <ReviewCard review={review} copy={copy} interactive={interactive} />
        </li>
      ))}
    </ul>
  );
}

export default function ReviewsCarousel({ reviews, copy }: { reviews: Review[]; copy: Copy }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const widthRef = useRef(0);
  const holds = useRef<Holds>({ hover: false, drag: false, focus: false, nudge: false });
  const cooling = useRef(false);
  const reduced = useRef(false);
  const timer = useRef<number | null>(null);
  const lastInput = useRef<"key" | "pointer">("pointer");
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    origin: number;
    active: boolean;
    decided: boolean;
  } | null>(null);

  function apply() {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
  }

  function wrap() {
    const width = widthRef.current;
    if (width <= 0) return;
    while (offsetRef.current <= -width) offsetRef.current += width;
    while (offsetRef.current > 0) offsetRef.current -= width;
  }

  function held() {
    const state = holds.current;
    return state.hover || state.drag || state.focus || state.nudge;
  }

  function armResume() {
    if (timer.current != null) window.clearTimeout(timer.current);
    cooling.current = true;
    timer.current = window.setTimeout(() => {
      cooling.current = false;
      timer.current = null;
    }, 2000);
  }

  function setHold(key: keyof Holds, on: boolean) {
    holds.current[key] = on;
    if (on) {
      if (timer.current != null) window.clearTimeout(timer.current);
      timer.current = null;
      cooling.current = true;
      return;
    }
    if (!held()) armResume();
  }

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      reduced.current = motion.matches;
    };
    onMotion();
    motion.addEventListener("change", onMotion);

    const measure = () => {
      widthRef.current = setRef.current?.offsetWidth ?? 0;
      wrap();
      apply();
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (setRef.current) observer.observe(setRef.current);

    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced.current && !held() && !cooling.current && widthRef.current > 0) {
        offsetRef.current -= SPEED * dt;
        wrap();
        apply();
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key.startsWith("Arrow")) lastInput.current = "key";
    };
    window.addEventListener("keydown", onKey, true);

    const viewport = viewportRef.current;
    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!delta) return;
      event.preventDefault();
      offsetRef.current -= delta;
      wrap();
      apply();
      if (!held()) armResume();
    };
    viewport?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      motion.removeEventListener("change", onMotion);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey, true);
      viewport?.removeEventListener("wheel", onWheel);
      if (timer.current != null) window.clearTimeout(timer.current);
    };
  }, []);

  function nudge(direction: number) {
    const card = setRef.current?.querySelector("li");
    const distance = (card?.getBoundingClientRect().width ?? 320) + 20;
    const target = offsetRef.current - direction * distance;
    const start = offsetRef.current;
    const began = performance.now();
    const duration = reduced.current ? 0 : 460;
    setHold("nudge", true);
    const step = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min(1, (now - began) / duration);
      const eased = 1 - (1 - progress) ** 3;
      offsetRef.current = start + (target - start) * eased;
      wrap();
      apply();
      if (progress < 1) {
        window.requestAnimationFrame(step);
        return;
      }
      setHold("nudge", false);
    };
    window.requestAnimationFrame(step);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button, a")) return;
    lastInput.current = "pointer";
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      origin: offsetRef.current,
      active: false,
      decided: false,
    };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.decided) {
      if (Math.hypot(dx, dy) < 8) return;
      current.decided = true;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null;
        return;
      }
      current.active = true;
      setHold("drag", true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!current.active) return;
    offsetRef.current = current.origin + dx;
    wrap();
    apply();
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    if (current.active && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    if (current.active) setHold("drag", false);
    if (event.pointerType !== "mouse") setHold("hover", false);
  }

  return (
    <div
      className="mt-8"
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.carousel}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHold("hover", true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHold("hover", false);
      }}
      onFocusCapture={(event) => {
        const target = event.target as HTMLElement;
        if (lastInput.current === "key" && target.matches(":focus-visible")) setHold("focus", true);
      }}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null;
        if (next && event.currentTarget.contains(next)) return;
        setHold("focus", false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          nudge(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          nudge(-1);
        }
      }}
    >
      <div
        ref={viewportRef}
        data-reviews-viewport
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} data-reviews-track className="flex w-max items-stretch will-change-transform">
          <ReviewSet reviews={reviews} copy={copy} interactive setRef={setRef} />
          <ReviewSet reviews={reviews} copy={copy} interactive={false} />
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-charcoal/10 bg-white text-brand-charcoal shadow-sm transition-colors hover:border-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
          aria-label={copy.previous}
          onClick={() => nudge(-1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-charcoal/10 bg-white text-brand-charcoal shadow-sm transition-colors hover:border-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
          aria-label={copy.next}
          onClick={() => nudge(1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
