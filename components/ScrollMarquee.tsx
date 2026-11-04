"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "Air tickets",
  "Visa assistance",
  "Travel insurance",
  "Holiday packages",
  "Colombo 07",
  "IATA accredited",
];

// A strip of text that slides sideways as you scroll past it (it never moves on its own).
export default function ScrollMarquee() {
  const box = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = box.current;
    const r = row.current;
    if (!b || !r) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = b.getBoundingClientRect();
      const vh = window.innerHeight;
      // Slides left at 0.6px per px scrolled, starting from when the strip enters the screen.
      const travel = Math.max(0, r.scrollWidth - b.clientWidth);
      const x = Math.min(travel, Math.max(0, (vh - rect.top) * 0.6));
      r.style.transform = `translate3d(${-x}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="marquee" ref={box} aria-hidden="true">
      <div className="marquee-row" ref={row}>
        {[0, 1].map((k) => (
          <div className="marquee-group" key={k}>
            {ITEMS.map((m) => (
              <span key={m + k}>
                {m}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
