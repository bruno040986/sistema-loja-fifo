"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ProductCard, StoreItem } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedCarousel({ items }: { items: StoreItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const [showArrows, setShowArrows] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollAmountRef = useRef(344);

  // Calculate scroll amount from CSS values — no DOM reads, no forced reflow
  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth;
      const isMobile = vw < 640; // Tailwind sm breakpoint
      const itemWidth = isMobile ? Math.min(300, vw * 0.85) : 320;
      const gap = isMobile ? 16 : 24; // gap-4 (16px) mobile, gap-6 (24px) desktop
      scrollAmountRef.current = itemWidth + gap;
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  const scrollNext = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // If we reached the end, scroll back to the beginning
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmountRef.current, behavior: "smooth" });
    }
  }, []);

  // Auto-scroll effect - always runs, only pauses on hover
  useEffect(() => {
    if (items.length <= 1) return;

    const startAutoScroll = () => {
      // Clear any existing interval
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        if (!isHoveredRef.current && scrollRef.current) {
          scrollNext();
        }
      }, 4000);
    };

    // Start after a short delay to ensure DOM is ready
    const timeout = setTimeout(startAutoScroll, 1000);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length, scrollNext]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollAmountRef.current * 2; // Scroll 2 items at a time manually
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setShowArrows(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setShowArrows(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <p className="text-xl text-zinc-400">Nenhuma oferta disponível no momento.</p>
          <p className="text-zinc-500 mt-2">Volte mais tarde para conferir as novidades!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative max-w-full mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Arrow */}
      {items.length > 3 && (
        <button
          onClick={() => scroll("left")}
          className={`hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-yellow-400 text-black p-3 rounded-full shadow-xl shadow-black/50 hover:bg-yellow-500 hover:scale-110 transition-all ${showArrows ? 'opacity-100' : 'opacity-0'} disabled:opacity-0`}
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} className="ml-[-2px]" />
        </button>
      )}

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 sm:gap-6 w-max px-[calc((100vw-min(300px,85vw))/2)] sm:px-6 lg:px-8">
          {items.map((item) => (
            <div key={item.id} className="carousel-item w-[min(300px,85vw)] sm:w-[320px] snap-center shrink-0">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {items.length > 3 && (
        <button
          onClick={() => scroll("right")}
          className={`hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-yellow-400 text-black p-3 rounded-full shadow-xl shadow-black/50 hover:bg-yellow-500 hover:scale-110 transition-all ${showArrows ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} className="mr-[-2px]" />
        </button>
      )}
    </div>
  );
}
