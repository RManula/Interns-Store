"use client";

import { useEffect, useRef, useState } from "react";

type Review = { quote: string; name: string; role: string; initials: string };

export function ReviewsCarousel({ reviews }: { reviews: readonly Review[] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = reviews.length;

  // Auto-advance, looping back to the start.
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(t);
  }, [count]);

  // Scroll the active card into view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, [index]);

  return (
    <div className="relative mt-12">
      {/* faded edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-12"
      >
        {reviews.map((item) => (
          <div
            key={item.name}
            className="soft-card w-[85%] shrink-0 snap-center p-7 sm:w-[46%] lg:w-[31%]"
          >
            <div className="flex gap-1 text-coral-500" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote className="mt-6 text-base font-semibold leading-7 text-navy-950">“{item.quote}”</blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">{item.initials}</span>
              <div><p className="text-sm font-extrabold">{item.name}</p><p className="text-xs text-muted">{item.role}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Go to review ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-blue-600" : "w-2 bg-line hover:bg-blue-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
