"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface Slide {
  badge: string;
  title1: string;
  title2: string;
  title3: string;
  subtitle: string;
  image: string;
  cta: string;
}

const SLIDES: Slide[] = [
  {
    badge: "LIMITED TIME",
    title1: "CRISPY.",
    title2: "JUICY.",
    title3: "IRRESISTIBLE.",
    subtitle: "Maharaja Burger & Double Tikki Combos",
    image: "/images/burger-combo.jpg",
    cta: "Order Now",
  },
  {
    badge: "WOK SPECIAL",
    title1: "SIZZLING.",
    title2: "SPICY.",
    title3: "HAKKA NOODLES.",
    subtitle: "Wok-tossed Noodles & Chilli Potato",
    image: "/images/noodles.jpg",
    cta: "Explore Noodles",
  },
  {
    badge: "STREET FAVORITE",
    title1: "CRUNCHY.",
    title2: "LOADED.",
    title3: "KURKURE CHAAP.",
    subtitle: "Crispy Soya Chaap & Cheesy Sandwiches",
    image: "/images/tikka-platter.jpg",
    cta: "Taste Chaap",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  const handleOrderClick = () => {
    const section = document.getElementById("popular-combos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 py-2 max-w-md mx-auto w-full">
      <div className="relative w-full h-[215px] sm:h-[230px] rounded-3xl overflow-hidden bg-[#020202] text-white shadow-soft group select-none">
        {/* Background Food Image */}
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title1}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover object-center brightness-60 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle directional gradient so text is always 100% readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Limited Time Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-wider text-orange-200 uppercase border border-white/15">
              <Sparkles className="w-2.5 h-2.5 text-[#eb4d23]" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="mt-2">
              <h2 className="text-xl sm:text-2xl font-black leading-tight tracking-tight font-heading uppercase text-white drop-shadow-md">
                <span>{slide.title1}</span> <br />
                <span>{slide.title2}</span> <br />
                <span className="text-[#eb4d23]">{slide.title3}</span>
              </h2>
              <p className="mt-1 text-[11px] sm:text-xs text-stone-300 font-medium tracking-wide max-w-[220px] line-clamp-1">
                {slide.subtitle}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <button
              onClick={handleOrderClick}
              className="inline-flex items-center gap-1.5 bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white font-bold text-xs px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              <span>{slide.cta}</span>
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-2.5 h-2.5 text-white" />
              </div>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? "w-5 h-1.5 bg-[#eb4d23]"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
