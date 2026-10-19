"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Menu, Bell, ShoppingBag, X, Phone, Clock, MapPin, Settings } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

interface HeaderProps {
  onOpenSettings?: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#f8f6f0]/95 backdrop-blur-md px-4 pt-3 pb-2 border-b border-[#ede8dc]">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
            className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-[#020202] hover:bg-stone-50 active:scale-95 transition-all cursor-pointer border border-[#ede8dc]"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-medium text-stone-500 tracking-wide flex items-center gap-1">
              Hello, Food Lover! <span className="text-sm">👋</span>
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold tracking-tight text-[#020202] font-heading uppercase">
                THE HUNGER <span className="text-[#eb4d23]">FOOD</span>
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#eb4d23] tracking-wide">
              It&apos;s finger lickin&apos; good.
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-[#020202] hover:bg-stone-50 active:scale-95 transition-all cursor-pointer border border-[#ede8dc]"
              >
                <Bell className="w-5 h-5" />
              </button>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#eb4d23] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                3
              </span>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 font-bold text-stone-800">
                    <span>Notifications</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="p-2 bg-orange-50 rounded-xl border border-orange-100">
                      <p className="font-semibold text-[#eb4d23]">🔥 Flat 10% OFF Today</p>
                      <p className="text-stone-600 text-[11px]">Use code HUNGER10 on WhatsApp checkout!</p>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-xl">
                      <p className="font-semibold text-stone-800">🛵 Free Delivery</p>
                      <p className="text-stone-600 text-[11px]">On all orders above ₹499!</p>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-xl">
                      <p className="font-semibold text-stone-800">🌟 Fresh Biryani Handi</p>
                      <p className="text-stone-600 text-[11px]">Authentic Dum Handi now back in stock.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
              className="relative w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-[#020202] hover:bg-stone-50 active:scale-95 transition-all cursor-pointer border border-[#ede8dc]"
            >
              <ShoppingBag className="w-5 h-5 text-[#020202]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#eb4d23] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-subtle shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-[#f8f6f0] h-full shadow-2xl p-6 flex flex-col justify-between z-10 border-r border-[#ede8dc]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#ede8dc]">
                <div>
                  <h3 className="text-lg font-extrabold text-[#020202] font-heading">
                    THE HUNGER <span className="text-[#eb4d23]">FOOD</span>
                  </h3>
                  <p className="text-[11px] text-stone-500">Delicious moments delivered</p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 shadow-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-2">
                <a
                  href="#menu"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <span>🍔</span> Explore Full Menu
                </a>
                <a
                  href="#offers"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <span>🎁</span> Special Deals & Offers
                </a>
                <a
                  href="#location"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <span>📍</span> Store Location & Map
                </a>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span>🛍️</span> My Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-[#eb4d23] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {totalItems}
                    </span>
                  )}
                </button>
                {onOpenSettings && (
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                  >
                    <Settings className="w-4 h-4 text-stone-500" /> WhatsApp Settings
                  </button>
                )}
              </nav>

              {/* Restaurant Info Card with Google Maps Location */}
              <div className="mt-6 p-4 bg-white rounded-2xl shadow-card space-y-3 text-xs text-stone-600 border border-[#ede8dc]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#eb4d23] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-extrabold text-stone-900 leading-tight">The Hunger Food</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{RESTAURANT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#eb4d23] shrink-0" />
                  <span>{RESTAURANT_INFO.timings}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#eb4d23] shrink-0" />
                  <span>{RESTAURANT_INFO.displayPhone}</span>
                </div>

                {/* Direct Google Maps Action Button */}
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full py-2.5 px-3 rounded-xl bg-[#eb4d23] hover:bg-[#d43f16] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-4 border-t border-[#ede8dc] text-[11px] text-stone-400 text-center">
              The Hunger Food © {new Date().getFullYear()} • WhatsApp Ordering
            </div>
          </div>
        </div>
      )}
    </>
  );
}
