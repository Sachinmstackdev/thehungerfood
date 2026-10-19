"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { Heart, Plus, Minus, Star, Info } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity, favorites, toggleFavorite } = useCart();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [customNote, setCustomNote] = useState("");

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isFavorite = favorites.includes(product.id);

  // Badge background color helper
  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case "BESTSELLER":
        return "bg-[#eb4d23] text-white";
      case "POPULAR":
        return "bg-amber-600 text-white";
      case "SAVE 15%":
      case "SAVE 20%":
        return "bg-rose-600 text-white";
      case "CHEF SPECIAL":
        return "bg-purple-700 text-white";
      default:
        return "bg-stone-800 text-white";
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-3.5 shadow-soft border border-[#ede8dc] flex flex-col justify-between hover:shadow-md transition-all group">
        {/* Top Badges & Favorite Heart */}
        <div className="flex items-center justify-between w-full mb-1 z-10">
          {product.badge ? (
            <span
              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider ${getBadgeClass(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-stone-400">
              {product.isVeg ? "🟢 Pure Veg" : "🔴 Non-Veg"}
            </span>
          )}

          <button
            onClick={() => toggleFavorite(product.id)}
            aria-label="Add to favorites"
            className="w-7 h-7 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:text-[#eb4d23] transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isFavorite ? "fill-[#eb4d23] text-[#eb4d23]" : "text-stone-400"
              }`}
            />
          </button>
        </div>

        {/* Product Image */}
        <div
          onClick={() => setShowDetailModal(true)}
          className="relative w-full h-32 sm:h-36 my-1 rounded-2xl overflow-hidden cursor-pointer"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 250px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {/* Veg / Non-Veg Indicator badge */}
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs">
            {product.isVeg ? (
              <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
            ) : (
              <div className="w-3.5 h-3.5 border border-rose-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-rose-600" />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="mt-2 flex-1 flex flex-col justify-between">
          <div>
            <h3
              onClick={() => setShowDetailModal(true)}
              className="text-sm sm:text-[15px] font-extrabold text-[#020202] line-clamp-1 cursor-pointer hover:text-[#eb4d23] transition-colors font-heading tracking-tight"
            >
              {product.name}
            </h3>

            <p className="text-xs sm:text-[13px] text-stone-600 font-normal mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-stone-400 font-medium">
                ({product.ratingCount})
              </span>
            </div>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-100">
            <div>
              <span className="text-base sm:text-lg font-black text-[#020202] font-heading">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through ml-1.5 font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.name} to cart`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center bg-[#eb4d23] text-white rounded-full px-1.5 py-0.5 shadow-sm">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="px-2 text-xs font-bold min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Details & Customization Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
            <div className="relative w-full h-52">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-stone-900 font-heading">
                    {product.name}
                  </h3>
                  <span className="text-lg font-black text-[#eb4d23] font-heading">
                    ₹{product.price}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
                {product.itemsIncluded && (
                  <div className="mt-2 p-2.5 bg-orange-50 rounded-xl border border-orange-100 text-xs text-[#eb4d23] font-medium flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Includes: {product.itemsIncluded}</span>
                  </div>
                )}
              </div>

              {/* Special Instructions Note */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Custom Instructions for Kitchen (Optional):
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Extra spicy, no mayo, crispy fries"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#eb4d23]"
                />
              </div>

              {/* Add to WhatsApp Cart CTA */}
              <button
                onClick={() => {
                  addToCart(product, customNote);
                  setShowDetailModal(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#eb4d23] hover:bg-[#d43f16] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to Order</span>
                <span>•</span>
                <span>₹{product.price}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
