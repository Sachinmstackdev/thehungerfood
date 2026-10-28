"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
import { INITIAL_PRODUCTS, RESTAURANT_INFO } from "@/data/menu";
import { ArrowRight, Flame, Clock, ShieldCheck, Sparkles, PhoneCall, LayoutDashboard, Heart, Utensils, Search } from "lucide-react";

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
      <div className="min-h-screen bg-[#f8f6f0] text-[#020202] flex flex-col justify-start pb-24 md:pb-12 selection:bg-[#eb4d23] selection:text-white overflow-x-hidden max-w-full w-full">
        {/* Sticky Responsive Header */}
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />

        <main className="flex-1 flex flex-col w-full min-w-0">
          {/* Search Bar & Desktop Quick Filters */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />

          {/* Hero Banner Slider */}
          <HeroBanner />

          {/* Category Navigation */}
          <CategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => setSelectedCategory(id)}
          />

          {/* Popular Combos / Menu Section */}
          <section id="popular-combos" className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6 pb-2 border-b border-stone-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-[#eb4d23] rounded-full" />
                <h2 className="text-lg sm:text-2xl font-extrabold text-[#020202] font-heading tracking-tight capitalize">
                  {selectedCategory === "all"
                    ? "Popular Items & Combos"
                    : selectedCategory === "chinese"
                    ? "Manchurian & Chilli Potato"
                    : selectedCategory === "chaap"
                    ? "Soya Chaap Specials"
                    : `${selectedCategory} Menu`}
                </h2>
                <span className="text-xs sm:text-sm text-stone-500 font-bold bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "dish" : "dishes"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {(selectedCategory !== "all" || selectedFilter !== "all" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedFilter("all");
                      setSearchQuery("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#eb4d23] hover:text-[#d43f16] bg-orange-50 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                  >
                    <span>Clear Filters</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedFilter("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#eb4d23] hover:text-[#d43f16] cursor-pointer"
                >
                  <span>View All Items</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Product Cards Grid: 2 cols on mobile, 3 cols on tablet, 4 cols on laptop */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl p-8 border border-[#ede8dc] shadow-soft max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#eb4d23] flex items-center justify-center mx-auto mb-3">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-stone-800 text-base sm:text-lg font-heading">
                  No matching dishes found
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xs mx-auto">
                  Try searching for another dish or reset your dietary preferences.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-5 py-2.5 bg-[#eb4d23] hover:bg-[#d43f16] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          {/* Exclusive Offer Promo Banner */}
          <ExclusiveOffer />

          {/* Why Foodies Love The Hunger Food (Features Showcase) */}
          <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 border border-[#ede8dc] shadow-soft">
              <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-[#eb4d23]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-xl text-[#020202] font-heading">
                    Why Foodies Love The Hunger Food
                  </h3>
                  <p className="text-xs text-stone-500">
                    High quality street food crafted fresh to order every single day
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-5">
                <div className="p-4 bg-stone-50 hover:bg-orange-50/50 rounded-2xl flex flex-col items-center text-center border border-stone-100 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2">
                    <Sparkles className="w-5 h-5 text-[#eb4d23]" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                    100% Fresh & Crisp
                  </span>
                  <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                    Prepared live in kitchen upon order
                  </span>
                </div>

                <div className="p-4 bg-stone-50 hover:bg-orange-50/50 rounded-2xl flex flex-col items-center text-center border border-stone-100 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-[#eb4d23]" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                    Express 30 Mins
                  </span>
                  <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                    Speedy hot doorstep delivery
                  </span>
                </div>

                <div className="p-4 bg-stone-50 hover:bg-orange-50/50 rounded-2xl flex flex-col items-center text-center border border-stone-100 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2">
                    <ShieldCheck className="w-5 h-5 text-[#eb4d23]" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                    WhatsApp Ordering
                  </span>
                  <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                    Direct chat & UPI / QR payment
                  </span>
                </div>

                <div className="p-4 bg-stone-50 hover:bg-orange-50/50 rounded-2xl flex flex-col items-center text-center border border-stone-100 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-[#eb4d23]" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                    Pocket Friendly
                  </span>
                  <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                    Burgers from ₹30 & combolicious meals
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Google Maps Location & Outlet Section */}
          <LocationSection />

          {/* Direct WhatsApp Call/Chat assistance banner */}
          <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 mb-6">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.phone}?text=${encodeURIComponent(
                "Hi The Hunger Food! I have a question about today's menu or want to place a custom bulk order."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-stone-800 gap-4"
            >
              <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                  <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold leading-tight">
                    Need custom party catering or bulk orders?
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Chat directly with our manager on WhatsApp • Fast confirmation & customized packages
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-colors">
                <span>Start WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4 text-stone-300" />
              </div>
            </a>
          </section>
        </main>

        {/* Rich Desktop & Mobile Footer */}
        <footer className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 pb-10 border-t border-stone-200/80 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#eb4d23] to-[#c7350e] flex items-center justify-center text-white shadow-xs">
                  <Flame className="w-4 h-4 fill-white/20 text-white" />
                </div>
                <span className="text-lg font-black text-[#020202] font-heading uppercase">
                  THE HUNGER <span className="text-[#eb4d23]">FOOD</span>
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Crispy burgers, sizzling noodles, and mouthwatering soya chaap prepared fresh on order with love.
              </p>
              <div className="text-xs text-stone-500">
                <span className="font-bold text-stone-700">Open Timings:</span> {RESTAURANT_INFO.timings}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 mb-3 font-heading">
                Explore Menu
              </h4>
              <ul className="space-y-2 text-xs text-stone-600">
                <li><a href="#popular-combos" className="hover:text-[#eb4d23] transition-colors">Burgers & Combos</a></li>
                <li><a href="#popular-combos" className="hover:text-[#eb4d23] transition-colors">Hakka Noodles</a></li>
                <li><a href="#popular-combos" className="hover:text-[#eb4d23] transition-colors">Manchurian & Chilli Potato</a></li>
                <li><a href="#popular-combos" className="hover:text-[#eb4d23] transition-colors">Soya Chaap Specials</a></li>
                <li><a href="#popular-combos" className="hover:text-[#eb4d23] transition-colors">Crispy French Fries</a></li>
              </ul>
            </div>

            {/* Column 3: Contact & Location */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 mb-3 font-heading">
                Contact & Orders
              </h4>
              <ul className="space-y-2 text-xs text-stone-600">
                <li><span className="font-semibold text-stone-800">Phone:</span> {RESTAURANT_INFO.displayPhone}</li>
                <li><span className="font-semibold text-stone-800">WhatsApp:</span> +{RESTAURANT_INFO.phone}</li>
                <li><span className="font-semibold text-stone-800">Location:</span> Punjab, India</li>
                <li>
                  <a
                    href={RESTAURANT_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#eb4d23] font-bold hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>View on Google Maps</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Ordering Assistance */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Flame className="w-4 h-4 text-[#eb4d23]" />
                  <span>Direct WhatsApp Ordering</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Enjoy gourmet street burgers, wok-tossed noodles, and fresh chaap with direct WhatsApp checkout and live confirmation.
                </p>
              </div>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.phone}?text=${encodeURIComponent("Hi The Hunger Food! I would like to order.")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <div>
              © 2026 The Hunger Food. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                Made with <Heart className="w-3.5 h-3.5 text-[#eb4d23] fill-[#eb4d23]" aria-hidden="true" /> for food lovers
              </span>
              <span>•</span>
              <Link href="/admin" className="font-bold text-[#eb4d23] hover:underline">
                Owner Login
              </Link>
            </div>
          </div>
        </footer>

        {/* Bottom Fixed Navigation (Mobile only) */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* WhatsApp Owner Settings Modal */}
        <AdminSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
