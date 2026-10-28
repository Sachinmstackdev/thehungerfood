"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { Heart, Plus, Minus, Info, AlertCircle, X } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity, favorites, toggleFavorite, outOfStockIds } = useCart();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [customNote, setCustomNote] = useState("");

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isFavorite = favorites.includes(product.id);
  const isOutOfStock = outOfStockIds.includes(product.id);

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case "BESTSELLER":
        return "bg-[#eb4d23] text-white";
      case "POPULAR":
        return "bg-amber-600 text-white";
      case "SPECIAL":
        return "bg-purple-700 text-white";
      case "CRUNCHY":
        return "bg-orange-600 text-white";
      case "FAVORITE":
        return "bg-emerald-600 text-white";
      default:
        return "bg-stone-800 text-white";
    }
  };

  return (
    <>
      <div className={`bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-soft border border-[#ede8dc] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${
        isOutOfStock ? "opacity-75" : ""
      }`}>
        <div>
          {/* Top Badges & Favorite Heart */}
          <div className="flex items-center justify-between w-full mb-1.5 z-10 gap-1">
            {isOutOfStock ? (
              <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider bg-stone-900 text-white truncate">
                Out of Stock
              </span>
            ) : product.badge ? (
              <span
                className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs truncate ${getBadgeClass(
                  product.badge
                )}`}
              >
                {product.badge}
              </span>
            ) : (
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-stone-600 truncate">
                {product.isVeg ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-200 truncate">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                    <span>Pure Veg</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-rose-200 truncate">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-600 shrink-0" aria-hidden="true" />
                    <span>Non-Veg</span>
                  </span>
                )}
              </div>
            )}

            <button
              onClick={() => toggleFavorite(product.id)}
              aria-label="Add to favorites"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:text-[#eb4d23] hover:bg-orange-50 transition-colors cursor-pointer shrink-0"
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform active:scale-125 ${
                  isFavorite ? "fill-[#eb4d23] text-[#eb4d23]" : "text-stone-400"
                }`}
              />
            </button>
          </div>

          {/* Product Image */}
          <div
            onClick={() => setShowDetailModal(true)}
            className="relative w-full h-32 sm:h-40 md:h-44 my-1 rounded-2xl overflow-hidden cursor-pointer bg-stone-100"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
            />

            {/* Veg Indicator */}
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs">
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

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                <span className="text-white text-xs font-bold px-2.5 py-1 bg-black/70 rounded-lg">
                  Sold Out Today
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="mt-2.5">
            <h3
              onClick={() => setShowDetailModal(true)}
              className="text-sm sm:text-base font-bold text-stone-900 line-clamp-1 cursor-pointer hover:text-[#eb4d23] transition-colors tracking-tight"
            >
              {product.name}
            </h3>

            <p className="text-xs sm:text-[13px] text-stone-500 font-normal mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100 gap-1">
          <div className="min-w-0">
            <span className="text-sm sm:text-xl font-black text-[#020202] font-heading">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-sm text-stone-400 line-through ml-1 sm:ml-1.5 font-medium">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {isOutOfStock ? (
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0">
              Unavailable
            </span>
          ) : quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              aria-label={`Add ${product.name} to cart`}
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#eb4d23] hover:bg-[#d43f16] active:scale-95 text-white flex items-center justify-center shadow-md shadow-[#eb4d23]/25 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          ) : (
            <div className="flex items-center bg-[#eb4d23] text-white rounded-full px-1 py-0.5 sm:px-2 sm:py-1 shadow-sm shrink-0">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                aria-label="Decrease quantity"
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
              </button>
              <span className="px-1 sm:px-2 text-xs sm:text-sm font-bold min-w-[14px] sm:min-w-[16px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                aria-label="Increase quantity"
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Details & Customization Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
            <div className="relative w-full h-56 sm:h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setShowDetailModal(false)}
                aria-label="Close details"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-stone-900 font-heading">
                    {product.name}
                  </h3>
                  <span className="text-xl font-black text-[#eb4d23] font-heading">
                    ₹{product.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
                {product.itemsIncluded && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-xl border border-orange-100 text-xs text-[#eb4d23] font-medium flex items-center gap-2">
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
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#eb4d23]"
                />
              </div>

              {/* Add to WhatsApp Cart CTA */}
              {isOutOfStock ? (
                <div className="p-3 bg-stone-100 rounded-2xl text-center text-xs font-bold text-stone-500">
                  This item is currently sold out
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
