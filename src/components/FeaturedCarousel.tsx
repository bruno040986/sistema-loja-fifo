"use client";

import { useRef, useEffect, useState } from "react";
import { ProductCard, StoreItem } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedCarousel({ items }: { items: StoreItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || isHovered || items.length <= 1) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // If we reached the end, scroll back to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll to the next item (approx 320px + 24px gap = 344px)
          scrollRef.current.scrollBy({ left: 344, behavior: "smooth" });
        }
      }
    }, 4000); // 4 seconds delay

    return () => clearInterval(interval);
  }, [isHovered, items.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 344 * 2; // Scroll 2 items at a time manually
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Arrow */}
      {items.length > 3 && (
        <button
          onClick={() => scroll("left")}
          className={`hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-yellow-400 text-black p-3 rounded-full shadow-xl shadow-black/50 hover:bg-yellow-500 hover:scale-110 transition-all ${isHovered ? 'opacity-100' : 'opacity-0'} disabled:opacity-0`}
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} className="ml-[-2px]" />
        </button>
      )}

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-6 w-max mx-auto max-w-[100vw] sm:max-w-none">
          {items.map((item) => (
            <div key={item.id} className="w-[300px] sm:w-[320px] snap-center shrink-0">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {items.length > 3 && (
        <button
          onClick={() => scroll("right")}
          className={`hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-yellow-400 text-black p-3 rounded-full shadow-xl shadow-black/50 hover:bg-yellow-500 hover:scale-110 transition-all ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} className="mr-[-2px]" />
        </button>
      )}
    </div>
  );
}
