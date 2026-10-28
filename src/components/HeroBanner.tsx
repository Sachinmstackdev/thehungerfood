"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Flame, Clock, ShieldCheck } from "lucide-react";

interface Slide {
  badge: string;
  title1: string;
  title2: string;
  title3: string;
  subtitle: string;
  image: string;
  cta: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    badge: "LIMITED TIME OFFER",
    title1: "CRISPY.",
    title2: "JUICY.",
    title3: "IRRESISTIBLE.",
    subtitle: "Maharaja Burger & Double Tikki Combos fresh from our kitchen",
    image: "/images/burger-combo.jpg",
    cta: "Order Now",
    tag: "Flat 10% OFF with code HUNGER10",
  },
  {
    badge: "WOK SPECIAL",
    title1: "SIZZLING.",
    title2: "SPICY.",
    title3: "HAKKA NOODLES.",
    subtitle: "Authentic wok-tossed Hakka noodles & crispy chilli potato",
    image: "/images/noodles.jpg",
    cta: "Explore Noodles",
    tag: "100% Fresh Daily Ingredients",
  },
  {
    badge: "STREET SPECIAL",
    title1: "CRUNCHY.",
    title2: "LOADED.",
    title3: "KURKURE CHAAP.",
    subtitle: "Crispy Soya Chaap & Cheesy Grilled Sandwiches",
    image: "/images/tikka-platter.jpg",
    cta: "Taste Chaap",
    tag: "Authentic Charcoal Tandoor",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  const handleOrderClick = () => {
    const section = document.getElementById("popular-combos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
      <div className="relative w-full h-[210px] sm:h-[280px] md:h-[340px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#020202] text-white shadow-soft group select-none border border-stone-800">
        {/* Background Food Image */}
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title1}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center brightness-60 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle directional gradient so text is always 100% readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 md:via-black/60 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full p-4 sm:p-7 md:p-10 flex flex-col justify-between">
          <div>
            {/* Limited Time Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] sm:text-xs font-bold tracking-wider text-orange-200 uppercase border border-white/15">
              <Sparkles className="w-3 h-3 text-[#eb4d23]" />
              <span>{slide.badge}</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="hidden sm:inline text-[#eb4d23] font-extrabold">{slide.tag}</span>
            </div>

            {/* Main Headline */}
            <div className="mt-2 sm:mt-4">
              <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight sm:leading-none tracking-tight font-heading uppercase text-white drop-shadow-md">
                <span>{slide.title1}</span> <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                <span>{slide.title2}</span> <br />
                <span className="text-[#eb4d23]">{slide.title3}</span>
              </h2>
              <p className="mt-1 sm:mt-2.5 text-[11px] sm:text-sm md:text-base text-stone-200 font-medium tracking-wide max-w-md line-clamp-2">
                {slide.subtitle}
              </p>
            </div>
          </div>

          {/* Action Row & Navigation Controls */}
          <div className="flex items-center justify-between mt-auto pt-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleOrderClick}
                className="inline-flex items-center gap-2 bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg shadow-[#eb4d23]/30 transition-all cursor-pointer"
              >
                <span>{slide.cta}</span>
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
              </button>

              {/* Feature highlight visible on desktop */}
              <div className="hidden lg:flex items-center gap-4 text-xs text-stone-300 ml-4 font-medium">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#eb4d23]" /> 100% Fresh & Hot
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#eb4d23]" /> Fast 30-Min Delivery
                </span>
              </div>
            </div>

            {/* Pagination and Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="hidden sm:flex w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md items-center justify-center border border-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentSlide === idx
                        ? "w-6 h-1.5 bg-[#eb4d23]"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="hidden sm:flex w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md items-center justify-center border border-white/10 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
