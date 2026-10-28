"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Check, Sparkles, Utensils, Flame, Leaf } from "lucide-react";

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
  "Search 'French Fries'...",
];

const POPULAR_QUICK_TAGS = [
  { label: "Double Tikki Burger", query: "Double Tikki" },
  { label: "Hakka Noodles", query: "Hakka Noodles" },
  { label: "Chilli Potato", query: "Chilli Potato" },
  { label: "Soya Chaap", query: "Chaap" },
  { label: "Crispy Fries", query: "Fries" },
  { label: "Grilled Sandwich", query: "Sandwich" },
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
    if (searchQuery) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_ITEMS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [searchQuery]);

  const handleSelectQuickTag = (tagQuery: string) => {
    setSearchQuery(tagQuery);
    setIsFocused(false);
    const el = document.getElementById("popular-combos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pb-2">
      {/* Search Bar & Desktop Quick Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Main Search Input Container */}
        <div className="relative flex-1 flex items-center">
          <div
            className={`w-full flex items-center bg-white rounded-full px-3.5 sm:px-4 py-2 sm:py-3 border transition-colors duration-150 ${
              isFocused
                ? "border-[#eb4d23] shadow-sm"
                : "border-stone-200 hover:border-stone-300"
            }`}
          >
            {/* Search Icon */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mr-2 sm:mr-2.5">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#eb4d23] stroke-[2.2]" aria-hidden="true" />
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
              style={{ outline: "none", border: "none", boxShadow: "none" }}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#020202] placeholder-stone-400 outline-none focus:outline-none focus:ring-0 ring-0 border-none truncate"
            />

            {/* Clear button */}
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

          {/* Filter button (mobile only trigger) */}
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            aria-label="Filter products"
            className={`md:hidden ml-2 relative w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer border ${
              selectedFilter !== "all"
                ? "bg-[#eb4d23] text-white border-[#eb4d23] shadow-sm"
                : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
            {selectedFilter !== "all" && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-[#eb4d23] rounded-full" />
            )}
          </button>
        </div>

        {/* Desktop Inline Filter Pills (Professional Vector Design) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {[
            { id: "all", label: "All Items", icon: Utensils },
            { id: "veg", label: "Pure Veg", icon: Leaf },
            { id: "non-veg", label: "Non-Veg", isNonVeg: true },
            { id: "spicy", label: "Spicy & Hot", icon: Flame },
          ].map((item) => {
            const isSelected = selectedFilter === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedFilter(item.id as "all" | "veg" | "non-veg" | "spicy")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? "bg-[#eb4d23] text-white border-[#eb4d23] shadow-sm shadow-[#eb4d23]/20"
                    : "bg-white text-stone-700 border-[#ede8dc] hover:bg-stone-50 hover:border-stone-300"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
                {item.isNonVeg && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border border-white shrink-0" aria-hidden="true" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Quick Tag Shortcuts */}
      <div className="hidden sm:flex items-center gap-2 mt-2.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-[#eb4d23]" aria-hidden="true" /> Quick:
        </span>
        {POPULAR_QUICK_TAGS.map((tag) => (
          <button
            key={tag.query}
            onClick={() => handleSelectQuickTag(tag.query)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 hover:text-[#eb4d23] text-stone-600 text-[11px] font-semibold border border-[#ede8dc] transition-colors cursor-pointer shrink-0"
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Floating Popular Suggestions Popover when Search Input is Focused on mobile */}
      {isFocused && !searchQuery && (
        <div className="md:hidden absolute left-3 right-3 sm:left-4 sm:right-4 top-[50px] sm:top-[54px] z-30 bg-white rounded-2xl p-3 shadow-xl border border-stone-200/80 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#eb4d23]" aria-hidden="true" /> Popular Searches
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

      {/* Mobile Filter Modal Sheet */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900 font-heading flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
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
                { id: "all", label: "All Items", icon: Utensils },
                { id: "veg", label: "Pure Veg (Plant-based)", icon: Leaf },
                { id: "non-veg", label: "Non-Veg", isNonVeg: true },
                { id: "spicy", label: "Spicy & Hot", icon: Flame },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedFilter === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedFilter(item.id as "all" | "veg" | "non-veg" | "spicy");
                      setShowFilterModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-sm font-semibold cursor-pointer ${
                      isSelected
                        ? "bg-orange-50 border-[#eb4d23] text-[#eb4d23]"
                        : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {Icon && <Icon className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />}
                      {item.isNonVeg && <span className="w-3 h-3 rounded-full bg-rose-600 border border-white" aria-hidden="true" />}
                      <span>{item.label}</span>
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
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
