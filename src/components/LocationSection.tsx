"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Navigation, Clock, Phone, ExternalLink, ShieldCheck, Utensils, Star, Sparkles } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export default function LocationSection() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.4602610910742!2d75.95118877934489!3d30.864682399999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d2515dda1f5%3A0x6b174dae2ab6794c!2sThe%20hunger%20food!5e1!3m2!1sen!2sin!4v1792417826448!5m2!1sen!2sin";

  const directMapLink =
    "https://www.google.com/maps/place/The+hunger+food/@30.8646824,75.9511888,17z";

  return (
    <section id="location" className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 border border-[#ede8dc] shadow-soft">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-stone-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#eb4d23]/10 text-[#eb4d23] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#eb4d23]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-xl text-[#020202] font-heading leading-tight">
                Visit Our Outlet & Cloud Kitchen
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                The Hunger Food • Dine-In, Takeaway & Fast Doorstep Delivery
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Kitchen Open Today
          </span>
        </div>

        {/* 2-Column Grid on Tablet/Laptop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
          {/* Embedded Google Map (Left) */}
          <div className="md:col-span-7 relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
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

          {/* Outlet Details & Actions (Right) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#eb4d23] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Address</h4>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#eb4d23] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Timings</h4>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                    {RESTAURANT_INFO.timings}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#eb4d23] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Phone & WhatsApp</h4>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                    {RESTAURANT_INFO.displayPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={directMapLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#020202] hover:bg-stone-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#eb4d23]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="py-3 px-5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#eb4d23] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-orange-200 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen</span>
              </a>
            </div>

            {/* Quick 1-Tap Google Review Generator CTA */}
            <Link
              href="/reviews"
              className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-2xl border border-amber-200 flex items-center justify-between text-xs transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h5 className="font-extrabold text-stone-900 group-hover:text-[#eb4d23] transition-colors">
                    Loved our food? Leave a Google Review!
                  </h5>
                  <p className="text-[10px] text-stone-500">
                    Tap to auto-copy 50+ ready-made templates & post in 5s
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-[#eb4d23] text-white text-[11px] font-bold shrink-0 shadow-xs">
                Write Review ⭐
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
