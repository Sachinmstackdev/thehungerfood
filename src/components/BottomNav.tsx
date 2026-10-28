"use client";

import React from "react";
import { Home, Utensils, ShoppingBag, Tag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface BottomNavProps {
  activeTab: "home" | "menu" | "offers" | "contact";
  setActiveTab: (tab: "home" | "menu" | "offers" | "contact") => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { totalItems, setIsCartOpen, grandTotal } = useCart();

  const handleTabClick = (tab: "home" | "menu" | "offers" | "contact") => {
    setActiveTab(tab);
    if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "menu") {
      const el = document.getElementById("popular-combos");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "offers") {
      const el = document.getElementById("offers");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ede8dc] shadow-[0_-4px_24px_rgba(2,2,2,0.08)] pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto px-4 pt-1.5 flex items-center justify-between relative">
        {/* Home */}
        <button
          onClick={() => handleTabClick("home")}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === "home" ? "text-[#eb4d23]" : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => handleTabClick("menu")}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === "menu" ? "text-[#eb4d23]" : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <Utensils className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-1">Menu</span>
        </button>

        {/* Orders / Cart (Center Elevated Floating Button) */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-3">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Cart"
            className="w-13 h-13 rounded-full bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white flex flex-col items-center justify-center shadow-floating transition-all border-4 border-white cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#020202] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
          <span className="text-[10px] font-extrabold text-[#eb4d23] mt-1 leading-none tracking-tight">
            {totalItems > 0 ? `₹${grandTotal}` : "Cart"}
          </span>
        </div>

        {/* Offers */}
        <button
          onClick={() => handleTabClick("offers")}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === "offers" ? "text-[#eb4d23]" : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <Tag className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-1">Offers</span>
        </button>

        {/* WhatsApp Quick Order / Help */}
        <button
          onClick={() => {
            setActiveTab("contact");
            setIsCartOpen(true);
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === "contact" ? "text-[#eb4d23]" : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <MessageCircle className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-1">WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
