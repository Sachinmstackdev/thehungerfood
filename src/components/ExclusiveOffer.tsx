"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Gift } from "lucide-react";

export default function ExclusiveOffer() {
  const handleClaim = () => {
    const section = document.getElementById("popular-combos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="offers" className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#fff2ec] via-[#ffece3] to-[#fff5f0] border border-[#fdd8cc] p-4 sm:p-8 overflow-hidden shadow-soft flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
        {/* Left Copy */}
        <div className="relative z-10 w-full sm:max-w-xl text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eb4d23]/10 text-[#eb4d23] text-xs font-black tracking-wider uppercase mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Special Deal of the Day</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#020202] tracking-tight font-heading leading-tight">
            Get Up to <span className="text-[#eb4d23]">30% OFF</span> on Feast Combos
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1.5 max-w-md">
            Order your favorite loaded burgers, piping hot noodles and crispy fries together. Direct WhatsApp delivery right to your door!
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              onClick={handleClaim}
              className="inline-flex items-center gap-2 bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#eb4d23]/25 transition-all cursor-pointer"
            >
              <span>Explore Offers</span>
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-2.5 h-2.5 text-white" />
              </div>
            </button>

            <span className="text-xs font-mono font-bold text-stone-700 bg-white px-3 py-2 rounded-xl border border-stone-200">
              Use Code: <span className="text-[#eb4d23]">HUNGER10</span>
            </span>
          </div>
        </div>

        {/* Right Food Image Showcase & 30% Badge */}
        <div className="relative w-48 h-36 sm:w-64 sm:h-44 md:w-72 md:h-48 shrink-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg border-2 border-white">
            <Image
              src="/images/burger-combo.jpg"
              alt="Exclusive Offer Combo"
              fill
              sizes="(max-width: 640px) 200px, 300px"
              className="object-cover"
            />
          </div>

          {/* 30% Circular Badge */}
          <div className="absolute -top-3 -right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#eb4d23] text-white flex flex-col items-center justify-center shadow-xl border-3 border-white transform rotate-6 animate-pulse-subtle">
            <span className="text-sm sm:text-lg font-black leading-none">30%</span>
            <span className="text-[9px] sm:text-[11px] font-black uppercase leading-tight">OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
