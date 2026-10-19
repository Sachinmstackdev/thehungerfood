"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Check, Sparkles } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFilter: "all" | "veg" | "non-veg" | "spicy";
  setSelectedFilter: (f: "all" | "veg" | "non-veg" | "spicy") => void;
}

const PLACEHOLDER_ITEMS = [
  "Search 'Double Tikki Burger'...",
  "Search 'Hakka Noodles'...",
  "Search 'Chilli Potato'...",
  "Search 'Tandoori Chaap'...",
  "Search 'Grilled Sandwich'...",
  "Search 'Peri Peri Fries'...",
];

const POPULAR_QUICK_TAGS = [
  { label: "🍔 Double Tikki", query: "Double Tikki" },
  { label: "🍜 Hakka Noodles", query: "Hakka Noodles" },
  { label: "🥣 Chilli Potato", query: "Chilli Potato" },
  { label: "🍢 Chaap", query: "Chaap" },
  { label: "🍟 Fries", query: "Fries" },
  { label: "🥪 Sandwich", query: "Sandwich" },
];

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
}: SearchBarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Smoothly rotate animated placeholder
  useEffect(() => {
    if (searchQuery) return; // Don't rotate while user is typing
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_ITEMS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [searchQuery]);

  const handleSelectQuickTag = (tagQuery: string) => {
    setSearchQuery(tagQuery);
    setIsFocused(false);
    // Smooth scroll to results
    const el = document.getElementById("popular-combos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative px-4 pt-2.5 pb-2 max-w-md mx-auto w-full">
      {/* Main Search Bar Row */}
      <div className="flex items-center gap-2">
        {/* Search Input Container */}
        <div
          className={`relative flex-1 flex items-center bg-white rounded-2xl px-3.5 py-2.5 sm:py-3 border transition-all duration-200 ${
            isFocused
              ? "border-[#eb4d23] shadow-[0_4px_20px_rgba(235,77,35,0.12)] ring-2 ring-[#eb4d23]/10"
              : "border-[#ede8dc] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-stone-300"
          }`}
        >
          {/* Animated/Colored Search Icon */}
          <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 mr-2">
            <Search className="w-3.5 h-3.5 text-[#eb4d23] stroke-[2.5]" />
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={PLACEHOLDER_ITEMS[placeholderIndex]}
            aria-label="Search menu items"
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#020202] placeholder-stone-400 focus:outline-none transition-all truncate"
          />

          {/* Clear button if text entered */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center shrink-0 ml-1 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Filter Sliders Button */}
        <button
          onClick={() => setShowFilterModal(!showFilterModal)}
          aria-label="Filter products"
          className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer border ${
            selectedFilter !== "all"
              ? "bg-[#eb4d23] text-white border-[#eb4d23] shadow-md shadow-[#eb4d23]/25"
              : "bg-white text-stone-700 border-[#ede8dc] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:bg-stone-50 hover:border-stone-300"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
          {selectedFilter !== "all" && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-[#eb4d23] rounded-full" />
          )}
        </button>
      </div>


      {/* Floating Popular Suggestions Popover when Search Input is Focused */}
      {isFocused && !searchQuery && (
        <div className="absolute left-4 right-4 top-[54px] z-30 bg-white rounded-2xl p-3 shadow-xl border border-stone-200/80 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#eb4d23]" /> Popular Searches
            </span>
            <span className="text-[10px] text-stone-400">Tap to search</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_QUICK_TAGS.map((tag) => (
              <button
                key={tag.query}
                onMouseDown={() => handleSelectQuickTag(tag.query)}
                className="px-2.5 py-1 rounded-xl bg-stone-50 hover:bg-orange-50 hover:text-[#eb4d23] text-stone-700 text-xs font-semibold border border-stone-200/60 transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Modal Sheet */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900 font-heading flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#eb4d23]" />
                Filter Menu
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Dietary Preference
              </label>

              {[
                { id: "all", label: "All Items", icon: "🍽️" },
                { id: "veg", label: "Pure Veg 🟢", icon: "🌱" },
                { id: "non-veg", label: "Non-Veg 🔴", icon: "🍗" },
                { id: "spicy", label: "Spicy & Hot 🔥", icon: "🌶️" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedFilter(item.id as "all" | "veg" | "non-veg" | "spicy");
                    setShowFilterModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-sm font-semibold cursor-pointer ${
                    selectedFilter === item.id
                      ? "bg-orange-50 border-[#eb4d23] text-[#eb4d23]"
                      : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{item.icon}</span> {item.label}
                  </span>
                  {selectedFilter === item.id && (
                    <Check className="w-4 h-4 text-[#eb4d23]" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => {
                  setSelectedFilter("all");
                  setShowFilterModal(false);
                }}
                className="w-1/2 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#eb4d23] text-white text-xs font-bold shadow-md hover:bg-[#d43f16] cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
