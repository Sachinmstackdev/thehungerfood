"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart, OrderType } from "@/context/CartContext";
import { RESTAURANT_INFO } from "@/data/menu";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Bike,
  ShoppingBag,
  UtensilsCrossed,
  Tag,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Navigation,
  MapPin,
  Loader2,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateInstructions,
    totalItems,
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
    isCartOpen,
    setIsCartOpen,
    couponCode,
    applyCoupon,
    orderType,
    setOrderType,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    deliveryAddress,
    setDeliveryAddress,
    locationUrl,
    setLocationUrl,
    tableNumber,
    setTableNumber,
    paymentMethod,
    setPaymentMethod,
    sendWhatsAppOrder,
    whatsappNumber,
    clearCart,
  } = useCart();

  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; address?: boolean }>({});
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(inputCoupon)) {
      setCouponStatus("Coupon applied successfully! 10% OFF");
    } else {
      setCouponStatus("Invalid coupon code. Try HUNGER10");
    }
  };

  const handleGetLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
        setLocationUrl(mapsUrl);
        try {
          localStorage.setItem("thf_customer_location", mapsUrl);
        } catch {}

        // Try reverse geocoding to auto-fill address if user hasn't typed one
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data && data.display_name && !deliveryAddress.trim()) {
              setDeliveryAddress(data.display_name);
            }
          }
        } catch {
          // Geocode is secondary; coordinates link is primary
        }

        setIsLocating(false);
        if (errors.address) {
          setErrors((prev) => ({ ...prev, address: false }));
        }
      },
      (err) => {
        setIsLocating(false);
        setLocationError(
          "Notice: GPS location couldn't be detected (permission blocked or active screen overlays). No worries! Just enter your complete street address & landmark above, or share live location directly in WhatsApp chat."
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const handleClose = () => {
    setPlacedOrderNumber(null);
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    // Validation: Name, Phone (10 digits), and Address/Location are validated
    const newErrors: { name?: boolean; phone?: boolean; address?: boolean } = {};
    if (!customerName.trim()) newErrors.name = true;
    const cleanDigits = customerPhone.replace(/[^0-9]/g, "");
    if (!customerPhone.trim() || cleanDigits.length < 10) newErrors.phone = true;
    if (!deliveryAddress.trim() && !locationUrl) newErrors.address = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const orderNum = sendWhatsAppOrder();
    if (orderNum) {
      setPlacedOrderNumber(orderNum);
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#f8f6f0] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#ede8dc] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#eb4d23]/10 text-[#eb4d23] flex items-center justify-center font-bold text-sm">
              🛍️
            </span>
            <div>
              <h2 className="text-base font-extrabold text-[#020202] font-heading">
                {placedOrderNumber ? "Order Status" : "Your WhatsApp Order"}
              </h2>
              <p className="text-[11px] text-stone-500">
                {placedOrderNumber ? "Sent to WhatsApp" : `${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {placedOrderNumber ? (
            <div className="text-center py-10 px-2 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Order Successfully Forwarded
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-2.5 font-heading">
                  Order #{placedOrderNumber}
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto mt-1 leading-relaxed">
                  Your order has been sent to The Hunger Food kitchen. Please confirm the pre-filled message on WhatsApp so our chefs can begin preparing your fresh meal!
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Customer:</span>
                  <span className="font-bold text-stone-800">{customerName}</span>
                </div>
                {customerPhone && (
                  <div className="flex justify-between text-stone-500">
                    <span>Contact Phone:</span>
                    <span className="font-bold text-stone-800">{customerPhone}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Order Type:</span>
                  <span className="font-bold text-stone-800 capitalize">{orderType.replace("_", " ")}</span>
                </div>
                {deliveryAddress && (
                  <div className="flex justify-between text-stone-500">
                    <span className="shrink-0 mr-2">Delivery To:</span>
                    <span className="font-bold text-stone-800 truncate text-right">{deliveryAddress}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500 pt-2 border-t border-stone-100">
                  <span className="font-bold text-stone-800">Order Status:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Sent to Kitchen
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-1">
                <p className="font-extrabold text-emerald-900 text-[11px] flex items-center gap-1.5">
                  <span>📍</span> Fast Delivery Tip:
                </p>
                <p className="text-[10px] text-emerald-700 leading-relaxed">
                  Want the delivery rider to reach you even faster? In the WhatsApp chat, tap <strong>📎 ➔ Location</strong> to send your live location!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-2xl bg-[#eb4d23] hover:bg-[#d84017] text-white font-extrabold text-xs shadow-md shadow-[#eb4d23]/25 transition-all cursor-pointer"
                >
                  Done / Order More Food
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="text-5xl">🍔</div>
              <h3 className="text-base font-bold text-stone-800 font-heading">
                Your cart is hungry!
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our menu and add your favorite burgers, biryanis, and combos to send directly via WhatsApp.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#eb4d23] text-white text-xs font-bold shadow-md hover:bg-[#d43f16] transition-all cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Order Items
                </h3>

                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-white rounded-2xl border border-[#ede8dc] shadow-soft flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate font-heading">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] font-extrabold text-[#eb4d23] mt-0.5">
                          ₹{item.product.price * item.quantity}
                          <span className="text-stone-400 font-normal ml-1">
                            (₹{item.product.price} each)
                          </span>
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center bg-stone-100 rounded-full px-1.5 py-0.5 shrink-0">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          <Minus className="w-3 h-3 stroke-[2.5]" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Remove item"
                        className="text-stone-300 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick instruction note per item */}
                    <input
                      type="text"
                      value={item.instructions || ""}
                      onChange={(e) =>
                        updateInstructions(item.product.id, e.target.value)
                      }
                      placeholder="Cooking instructions (e.g. Less spicy, extra sauce)..."
                      className="w-full text-[10px] bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 placeholder-stone-400 focus:outline-none focus:border-[#eb4d23]"
                    />
                  </div>
                ))}
              </div>

              {/* Customer Contact Details */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#ede8dc] shadow-soft space-y-3">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📍</span> Delivery Details
                </h3>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full text-xs p-3 rounded-xl border ${
                      errors.name ? "border-rose-500 bg-rose-50" : "border-stone-200"
                    } focus:outline-none focus:border-[#eb4d23]`}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1">Please enter your name</p>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Phone Number (for Delivery Call) *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-stone-400 select-none">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                        setCustomerPhone(val);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: false }));
                      }}
                      placeholder="10-digit mobile number"
                      className={`w-full text-xs pl-11 pr-3 py-3 rounded-xl border ${
                        errors.phone ? "border-rose-500 bg-rose-50" : "border-stone-200"
                      } focus:outline-none focus:border-[#eb4d23]`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1">
                      Please enter a valid 10-digit mobile number for delivery calls
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-stone-700">
                      Delivery Address & Nearby Landmark *
                    </label>
                    <span className="text-[10px] text-[#eb4d23] font-semibold">
                      Must include landmark
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => {
                      setDeliveryAddress(e.target.value);
                      if (errors.address) setErrors((prev) => ({ ...prev, address: false }));
                    }}
                    placeholder="House/Flat No, Colony/Street, Landmark (e.g. Near Gurudwara, Opposite Bank)"
                    className={`w-full text-xs p-3 rounded-xl border ${
                      errors.address ? "border-rose-500 bg-rose-50" : "border-stone-200"
                    } focus:outline-none focus:border-[#eb4d23]`}
                  />
                  {errors.address && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1">
                      Please enter your delivery address with a nearby landmark
                    </p>
                  )}

                  {/* Share Current GPS Location feature (Optional) */}
                  {!locationUrl ? (
                    <div className="mt-2.5 space-y-1.5">
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="w-full py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100/80 active:scale-98 text-[#eb4d23] border border-orange-200/80 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 shadow-2xs"
                      >
                        {isLocating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Detecting your exact GPS location...</span>
                          </>
                        ) : (
                          <>
                            <Navigation className="w-3.5 h-3.5 fill-[#eb4d23]" />
                            <span>Auto-Detect GPS Location (Optional)</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-stone-500 flex items-start gap-1 px-1 leading-tight">
                        <span className="shrink-0 text-amber-500">💡</span>
                        <span>
                          <strong>GPS is optional.</strong> Writing your landmark above is 100% enough for our delivery rider, or you can send live location inside WhatsApp (📎 ➔ Location).
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-extrabold text-emerald-900 flex items-center gap-1">
                            Live GPS Location Attached
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                          </p>
                          <p className="text-[10px] text-emerald-700 truncate">
                            Delivery partner gets 1-tap Google Maps link
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-white px-2 py-1 rounded-md border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setLocationUrl("");
                            try {
                              localStorage.removeItem("thf_customer_location");
                            } catch {}
                          }}
                          className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  {locationError && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[10px] flex items-start gap-2 leading-relaxed">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                      <span>{locationError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coupon Bar */}
              <div className="p-3 bg-white rounded-2xl border border-[#ede8dc] shadow-soft">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1 flex items-center">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Enter coupon code (try HUNGER10)"
                      className="w-full text-xs pl-8 pr-2 py-2 rounded-xl border border-stone-200 uppercase font-semibold focus:outline-none focus:border-[#eb4d23]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#020202] text-white text-xs font-bold rounded-xl hover:bg-stone-800 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponStatus && (
                  <p className="text-[10px] text-[#eb4d23] font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {couponStatus}
                  </p>
                )}
              </div>

              {/* Bill Details */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#ede8dc] shadow-soft space-y-2 text-xs">
                <h3 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                  Bill Summary
                </h3>

                <div className="flex justify-between text-stone-600">
                  <span>Item Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#eb4d23] font-semibold">
                    <span>Coupon Discount ({couponCode})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                {orderType === "delivery" && (
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      <span>₹{deliveryFee}</span>
                    )}
                  </div>
                )}

                {subtotal > 0 && subtotal < RESTAURANT_INFO.freeDeliveryThreshold && orderType === "delivery" && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                    💡 Add items worth ₹{RESTAURANT_INFO.freeDeliveryThreshold - subtotal} more for FREE delivery!
                  </p>
                )}

                <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-black text-[#020202]">
                  <span>To Pay</span>
                  <span className="text-base text-[#eb4d23] font-heading">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Order CTA */}
        {cart.length > 0 && (
          <div className="p-4 pb-[max(16px,env(safe-area-inset-bottom))] bg-white border-t border-[#ede8dc] shadow-lg">
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#eb4d23] hover:bg-[#d84017] active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#eb4d23]/25 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <span>Place Order</span>
              </div>
              <span className="bg-black/20 px-2.5 py-1 rounded-full text-xs font-black">
                ₹{grandTotal}
              </span>
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-2">
              Orders sent directly to WhatsApp: {RESTAURANT_INFO.displayPhone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
