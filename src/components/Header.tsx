"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  Menu,
  Bell,
  ShoppingBag,
  X,
  Phone,
  Clock,
  MapPin,
  Settings,
  Utensils,
  Tag,
  Sparkles,
  Flame,
  MessageCircle,
  Bike,
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

interface HeaderProps {
  onOpenSettings?: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
  const { totalItems, grandTotal, setIsCartOpen } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#ede8dc] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Mobile Hamburger OR Desktop Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Hamburger Button (Mobile only) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden w-11 h-11 rounded-2xl bg-white shadow-soft flex items-center justify-center text-stone-800 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer border border-[#ede8dc]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#eb4d23] to-[#c7350e] flex items-center justify-center shadow-md shadow-[#eb4d23]/25 group-hover:scale-105 transition-transform text-white shrink-0">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-[#020202] font-heading uppercase leading-none">
                    THE HUNGER <span className="text-[#eb4d23]">FOOD</span>
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#eb4d23] tracking-wide block leading-tight mt-0.5">
                  It&apos;s finger lickin&apos; good.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <a
              href="#menu"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-stone-700 hover:text-[#eb4d23] hover:bg-white rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Utensils className="w-3.5 h-3.5 text-[#eb4d23]" aria-hidden="true" />
              <span>Menu</span>
            </a>
            <a
              href="#offers"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-stone-700 hover:text-[#eb4d23] hover:bg-white rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Tag className="w-3.5 h-3.5 text-[#eb4d23]" aria-hidden="true" />
              <span>Offers</span>
              <span className="text-[10px] bg-orange-100 text-[#eb4d23] px-1.5 py-0.5 rounded-md font-extrabold uppercase">
                10% OFF
              </span>
            </a>
            <a
              href="#location"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-stone-700 hover:text-[#eb4d23] hover:bg-white rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#eb4d23]" aria-hidden="true" />
              <span>Location</span>
            </a>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-stone-700 hover:text-[#eb4d23] hover:bg-white rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#eb4d23]" aria-hidden="true" />
              <span>Call Us</span>
            </a>
          </nav>

          {/* Center (Desktop Timings & Free Delivery Badge) */}
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-[#ede8dc] text-xs shadow-xs shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-extrabold text-stone-900 whitespace-nowrap">Open Now</span>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-1.5 text-stone-600 font-medium whitespace-nowrap">
              <Bike className="w-3.5 h-3.5 text-[#eb4d23]" aria-hidden="true" />
              <span>Free Delivery above ₹{RESTAURANT_INFO.freeDeliveryThreshold}</span>
            </div>
          </div>

          {/* Right Action Icons (Clean customer-facing layout, no public admin button) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick WhatsApp Support (Desktop) */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.phone}?text=${encodeURIComponent("Hi The Hunger Food! I would like to place an order.")}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-all cursor-pointer whitespace-nowrap"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white shadow-soft flex items-center justify-center text-[#020202] hover:bg-stone-50 active:scale-95 transition-all cursor-pointer border border-[#ede8dc]"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#eb4d23] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                3
              </span>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 p-3.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#eb4d23]" />
                      Today&apos;s Specials & Deals
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-stone-400 hover:text-stone-600 cursor-pointer p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 mt-2.5">
                    <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-100">
                      <p className="font-bold text-[#eb4d23]">Flat 10% OFF on all orders</p>
                      <p className="text-stone-600 text-[11px] mt-0.5">Use promo code <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-orange-200">HUNGER10</span> on checkout!</p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-2xl">
                      <p className="font-bold text-stone-800">Free Home Delivery</p>
                      <p className="text-stone-600 text-[11px] mt-0.5">Free doorstep delivery on orders above ₹{RESTAURANT_INFO.freeDeliveryThreshold}!</p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-2xl">
                      <p className="font-bold text-stone-800">Kurkure Chaap Special</p>
                      <p className="text-stone-600 text-[11px] mt-0.5">Chef&apos;s freshly tossed crunchy soya chaap now available.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Pill Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
              className="relative flex items-center gap-2.5 h-10 sm:h-11 px-3.5 sm:px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-white shadow-soft transition-all cursor-pointer border border-stone-800"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#eb4d23] text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse-subtle shadow-sm border border-stone-900">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-extrabold whitespace-nowrap">
                {totalItems > 0 ? `₹${grandTotal}` : "Cart"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer (for mobile / tablet) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85%] bg-[#f8f6f0] h-full shadow-2xl p-6 flex flex-col justify-between z-10 border-r border-[#ede8dc]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#ede8dc]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#eb4d23] to-[#c7350e] flex items-center justify-center text-white shadow-xs">
                    <Flame className="w-4 h-4 fill-white/20 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#020202] font-heading leading-tight">
                      THE HUNGER <span className="text-[#eb4d23]">FOOD</span>
                    </h3>
                    <p className="text-[10px] text-stone-500">Delicious moments delivered</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 shadow-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links for Customer */}
              <nav className="mt-5 space-y-2">
                <a
                  href="#menu"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <Utensils className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
                  <span>Explore Full Menu</span>
                </a>
                <a
                  href="#offers"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <Tag className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
                  <span>Special Deals & Offers</span>
                </a>
                <a
                  href="#location"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <MapPin className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
                  <span>Store Location & Map</span>
                </a>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
                    <span>My Cart</span>
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-[#eb4d23] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {totalItems} • ₹{grandTotal}
                    </span>
                  )}
                </button>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-card font-semibold text-stone-800 hover:text-[#eb4d23] transition-all"
                >
                  <Phone className="w-4 h-4 text-[#eb4d23]" aria-hidden="true" />
                  <span>Call Restaurant</span>
                </a>
              </nav>

              {/* Restaurant Info Card */}
              <div className="mt-5 p-4 bg-white rounded-2xl shadow-card space-y-2.5 text-xs text-stone-600 border border-[#ede8dc]">
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
              The Hunger Food © 2026 • WhatsApp Ordering
            </div>
          </div>
        </div>
      )}
    </>
  );
}
