"use client";

import React from "react";
import { MapPin, Navigation, Clock, Phone, ExternalLink } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export default function LocationSection() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.4602610910742!2d75.95118877934489!3d30.864682399999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d2515dda1f5%3A0x6b174dae2ab6794c!2sThe%20hunger%20food!5e1!3m2!1sen!2sin!4v1792417826448!5m2!1sen!2sin";

  const directMapLink =
    "https://www.google.com/maps/place/The+hunger+food/@30.8646824,75.9511888,17z";

  return (
    <section id="location" className="px-4 py-3 max-w-md mx-auto w-full">
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#ede8dc] shadow-soft space-y-3.5">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#eb4d23]/10 text-[#eb4d23] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#eb4d23]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#020202] font-heading leading-tight">
                Visit & Dine-In
              </h3>
              <p className="text-[10px] text-stone-500">
                The Hunger Food Outlet & Kitchen
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open Now
          </span>
        </div>

        {/* Embedded Google Map */}
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="The Hunger Food Location"
            className="w-full h-full"
          />
        </div>

        {/* Outlet Details */}
        <div className="space-y-2 text-xs text-stone-600 pt-1">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#eb4d23] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight font-medium text-stone-700">
              The Hunger Food, Main Road, Punjab, India
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#eb4d23] shrink-0" />
            <span className="text-[11px] font-medium text-stone-700">
              {RESTAURANT_INFO.timings}
            </span>
          </div>
        </div>

        {/* Get Directions Action Button */}
        <div className="pt-2 flex gap-2">
          <a
            href={directMapLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-3 rounded-2xl bg-[#020202] hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-[#eb4d23]" />
            <span>Get Directions</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="py-2.5 px-4 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#eb4d23] text-xs font-bold flex items-center justify-center gap-1.5 border border-orange-200 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </section>
  );
}
