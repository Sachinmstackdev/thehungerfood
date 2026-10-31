"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, CheckCircle, Smartphone } from "lucide-react";

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSettingsModal({
  isOpen,
  onClose,
}: AdminSettingsModalProps) {
  const { whatsappNumber, setWhatsappNumber } = useCart();
  const [tempNumber, setTempNumber] = useState(whatsappNumber);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const clean = tempNumber.replace(/[^0-9]/g, "");
    setWhatsappNumber(clean);
    try {
      localStorage.setItem("thf_whatsapp_number", clean);
      window.dispatchEvent(new Event("thf_settings_updated"));
    } catch {}
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#eb4d23]" />
            <h3 className="font-extrabold text-base text-stone-900 font-heading">
              WhatsApp Configuration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 mt-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Enter the restaurant owner&apos;s WhatsApp number with country code (e.g. <code>919876543210</code> for India). Customer orders will be sent directly to this number!
          </p>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              WhatsApp Phone Number (with Country Code)
            </label>
            <input
              type="text"
              value={tempNumber}
              onChange={(e) => setTempNumber(e.target.value)}
              placeholder="e.g. 919876543210"
              className="w-full text-sm font-semibold p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-[#eb4d23]"
            />
          </div>

          {saved && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp number saved successfully!</span>
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-1/2 py-2.5 rounded-xl bg-[#eb4d23] hover:bg-[#d43f16] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              Save Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
