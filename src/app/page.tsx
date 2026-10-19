"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import HeroBanner from "@/components/HeroBanner";
import CategoryNav from "@/components/CategoryNav";
import ProductCard from "@/components/ProductCard";
import ExclusiveOffer from "@/components/ExclusiveOffer";
import BottomNav from "@/components/BottomNav";
import CartDrawer from "@/components/CartDrawer";
import AdminSettingsModal from "@/components/AdminSettingsModal";
import LocationSection from "@/components/LocationSection";
import { CartProvider } from "@/context/CartContext";
import { INITIAL_PRODUCTS, Product, RESTAURANT_INFO } from "@/data/menu";
import { ArrowRight, Flame, Clock, ShieldCheck, Sparkles, PhoneCall } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "veg" | "non-veg" | "spicy">("all");
  const [activeTab, setActiveTab] = useState<"home" | "menu" | "offers" | "contact">("home");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedFilter === "veg" && !product.isVeg) return false;
      if (selectedFilter === "non-veg" && product.isVeg) return false;
      if (selectedFilter === "spicy" && !product.isSpicy) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesItems = product.itemsIncluded?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesItems) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedFilter, searchQuery]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#f8f6f0] text-[#020202] flex flex-col items-center justify-start pb-24 selection:bg-[#eb4d23] selection:text-white">
        {/* Mobile / Tablet Container with app styling */}
        <div className="w-full max-w-md min-h-screen bg-[#f8f6f0] flex flex-col relative sm:shadow-[0_0_50px_rgba(0,0,0,0.06)] sm:border-x sm:border-[#ede8dc]">
          {/* Sticky Header */}
          <Header onOpenSettings={() => setIsSettingsOpen(true)} />

          <main className="flex-1 flex flex-col">
            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            {/* Hero Banner Slider */}
            <HeroBanner />

            {/* Category Navigation Pills */}
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => setSelectedCategory(id)}
            />

            {/* Popular Combos Section */}
            <section id="popular-combos" className="px-4 py-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold text-[#020202] font-heading tracking-tight capitalize">
                    {selectedCategory === "all"
                      ? "Popular Items & Combos"
                      : selectedCategory === "chinese"
                      ? "Manchurian & Chilli Potato"
                      : selectedCategory === "chaap"
                      ? "Soya Chaap Specials"
                      : `${selectedCategory} Menu`}
                  </h2>
                  <span className="text-xs text-stone-400 font-semibold">
                    ({filteredProducts.length})
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedFilter("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#eb4d23] hover:text-[#d43f16] cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-3xl p-6 border border-[#ede8dc] shadow-soft">
                  <p className="text-3xl mb-2">🔍</p>
                  <h3 className="font-bold text-stone-800 text-sm font-heading">
                    No matching items found
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Try searching for another dish or clearing filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedFilter("all");
                      setSearchQuery("");
                    }}
                    className="mt-3 px-4 py-2 bg-[#eb4d23] text-white text-xs font-bold rounded-xl"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Exclusive Offer Promo Banner */}
            <ExclusiveOffer />

            {/* Why Order from The Hunger Food */}
            <section className="px-4 py-3">
              <div className="bg-white rounded-3xl p-4 border border-[#ede8dc] shadow-soft space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#eb4d23]" />
                  <h3 className="font-extrabold text-sm text-[#020202] font-heading">
                    Why Foodies Love Us
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 bg-stone-50 rounded-2xl flex flex-col items-center">
                    <Sparkles className="w-4 h-4 text-[#eb4d23] mb-1" />
                    <span className="text-[10px] font-bold text-stone-800">
                      100% Fresh
                    </span>
                    <span className="text-[9px] text-stone-400">
                      Cooked to order
                    </span>
                  </div>

                  <div className="p-2 bg-stone-50 rounded-2xl flex flex-col items-center">
                    <Clock className="w-4 h-4 text-[#eb4d23] mb-1" />
                    <span className="text-[10px] font-bold text-stone-800">
                      Fast 30 Mins
                    </span>
                    <span className="text-[9px] text-stone-400">
                      Superfast delivery
                    </span>
                  </div>

                  <div className="p-2 bg-stone-50 rounded-2xl flex flex-col items-center">
                    <ShieldCheck className="w-4 h-4 text-[#eb4d23] mb-1" />
                    <span className="text-[10px] font-bold text-stone-800">
                      WhatsApp Pay
                    </span>
                    <span className="text-[9px] text-stone-400">
                      Direct & safe
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Google Maps Location & Dine-In Section */}
            <LocationSection />

            {/* Direct WhatsApp Call/Chat assistance banner */}
            <section className="px-4 py-2 mb-4">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phone}?text=${encodeURIComponent(
                  "Hi The Hunger Food! I have a question about today's menu."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl shadow-soft hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight">
                      Need custom party or bulk orders?
                    </h4>
                    <p className="text-[10px] text-stone-300">
                      Chat directly with our manager on WhatsApp
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </a>
            </section>
          </main>

          {/* Bottom Fixed Navigation */}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Slide-out Cart Drawer */}
          <CartDrawer />

          {/* WhatsApp Owner Settings Modal */}
          <AdminSettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      </div>
    </CartProvider>
  );
}
