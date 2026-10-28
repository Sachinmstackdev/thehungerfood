"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/menu";
import { ChevronLeft, ChevronRight, Flame, Sparkles } from "lucide-react";

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse drag-to-scroll support for desktop testing
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const scrollSide = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pb-2 select-none group">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-2.5 sm:mb-3 px-1">
        <div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#eb4d23]" />
            <h2 className="text-base sm:text-lg md:text-xl font-black text-stone-900 tracking-tight font-heading">
              What&apos;s on your mind?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            Handcrafted fast food, fresh &amp; piping hot
          </p>
        </div>

        {/* Desktop Quick Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Tap to filter dishes</span>
        </div>
      </div>

      {/* Relative wrapper for scroll container and arrow buttons */}
      <div className="relative">
        {/* Desktop Scroll Left Button */}
        <button
          onClick={() => scrollSide("left")}
          aria-label="Scroll categories left"
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 items-center justify-center text-stone-700 hover:text-[#eb4d23] hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Container with touch & desktop drag */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
            overscrollBehaviorX: "contain",
          }}
          className="flex items-start justify-start md:justify-center gap-3.5 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-2.5 sm:py-3 px-1 sm:px-2 scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (!hasMoved.current) {
                    onSelectCategory(cat.id);
                  }
                }}
                className="group/cat flex flex-col items-center gap-1.5 sm:gap-2 shrink-0 snap-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4d23] rounded-2xl p-1 transition-transform active:scale-95"
              >
                {/* Circular Food Image Avatar Container */}
                <div className="relative">
                  <div
                    className={`relative w-[72px] h-[72px] sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? "ring-4 ring-[#eb4d23] ring-offset-2 ring-offset-[#f8f6f0] scale-105 shadow-xl shadow-[#eb4d23]/30"
                        : "ring-2 ring-stone-200 hover:ring-[#eb4d23]/60 shadow-md hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover group-hover/cat:scale-110 transition-transform duration-500 ease-out"
                    />
                    {/* Subtle bottom vignette to enhance depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/cat:opacity-30 transition-opacity" />
                  </div>

                  {/* Optional Category Tag Badge */}
                  {cat.badge && (
                    <span className="absolute -top-1 -right-1 bg-[#eb4d23] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-md tracking-wider border border-white">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Category Labels */}
                <div className="flex flex-col items-center">
                  <span
                    className={`text-xs sm:text-sm tracking-tight transition-colors whitespace-nowrap text-center ${
                      isSelected
                        ? "text-[#eb4d23] font-black"
                        : "text-stone-800 font-bold group-hover/cat:text-[#eb4d23]"
                    }`}
                  >
                    {cat.name}
                  </span>

                  {/* Price / Subtitle starter */}
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 transition-colors ${
                      isSelected
                        ? "bg-orange-100 text-[#eb4d23] font-bold"
                        : "bg-stone-200/60 text-stone-500 group-hover/cat:bg-stone-200 group-hover/cat:text-stone-700"
                    }`}
                  >
                    {cat.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Desktop Scroll Right Button */}
        <button
          onClick={() => scrollSide("right")}
          aria-label="Scroll categories right"
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 items-center justify-center text-stone-700 hover:text-[#eb4d23] hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
