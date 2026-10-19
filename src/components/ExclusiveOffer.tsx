"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ExclusiveOffer() {
  const handleClaim = () => {
    const section = document.getElementById("popular-combos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="offers" className="px-4 py-3 max-w-md mx-auto">
      <div className="relative rounded-3xl bg-[#fff2ec] border border-[#fdd8cc] p-4 overflow-hidden shadow-soft flex items-center justify-between">
        {/* Left Copy */}
        <div className="relative z-10 max-w-[60%]">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#eb4d23]">
            Exclusive Offer
          </span>
          <h3 className="text-xl font-black text-[#020202] tracking-tight font-heading mt-0.5 leading-tight">
            Up to 30% OFF
          </h3>
          <p className="text-[11px] text-stone-600 font-medium mt-0.5">
            On selected feast combos
          </p>

          <button
            onClick={handleClaim}
            className="mt-3 inline-flex items-center gap-1.5 bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <span>Order Now</span>
            <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-2 h-2 text-white" />
            </div>
          </button>
        </div>

        {/* Right Product Image & 30% Badge */}
        <div className="relative w-36 h-28 shrink-0 flex items-center justify-end">
          <div className="relative w-28 h-24 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/burger-combo.jpg"
              alt="Exclusive Offer Combo"
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>

          {/* 30% Circular Badge */}
          <div className="absolute -top-1 -right-1 w-14 h-14 rounded-full bg-[#eb4d23] text-white flex flex-col items-center justify-center shadow-md border-2 border-white transform rotate-6">
            <span className="text-xs font-black leading-none">30%</span>
            <span className="text-[8px] font-bold uppercase leading-tight">OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
