"use client";

import React, { useRef } from "react";
import { CATEGORIES } from "@/data/menu";

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

  // Mouse drag handlers (emulates finger swiping on desktop)
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
    const walk = (x - startX.current) * 1.5; // Drag sensitivity
    if (Math.abs(walk) > 4) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative py-1 max-w-md mx-auto w-full select-none">
      {/* Scrollable Container with finger touch & mouse drag swiping */}
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
        className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-2 px-4 scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory"
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
              className="p-0.5 flex flex-col items-center gap-1.5 shrink-0 snap-start group cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular Icon Card */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                  isSelected
                    ? "bg-[#fff2ec] border-2 border-[#eb4d23] ring-4 ring-[#eb4d23]/15 shadow-sm"
                    : "bg-white border border-[#ede8dc] shadow-soft group-hover:border-stone-300"
                }`}
              >
                <span className="transform transition-transform duration-200 group-hover:scale-110">
                  {cat.icon}
                </span>
              </div>

              {/* Category Label */}
              <span
                className={`text-[11px] font-semibold tracking-tight transition-colors whitespace-nowrap px-1 ${
                  isSelected
                    ? "text-[#eb4d23] font-bold"
                    : "text-stone-600 group-hover:text-stone-900"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
