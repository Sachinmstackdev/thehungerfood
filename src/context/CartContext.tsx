"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, RESTAURANT_INFO } from "@/data/menu";

export interface CartItem {
  product: Product;
  quantity: number;
  instructions?: string;
}

export type OrderType = "delivery" | "takeaway" | "dine_in";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, instructions?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateInstructions: (productId: string, instructions: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  locationUrl: string;
  setLocationUrl: (url: string) => void;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
  sendWhatsAppOrder: () => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("HUNGER10");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI on Delivery / QR");
  const [whatsappNumber, setWhatsappNumber] = useState(RESTAURANT_INFO.phone);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load saved state from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("thf_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedName = localStorage.getItem("thf_customer_name");
      if (savedName) setCustomerName(savedName);

      const savedPhone = localStorage.getItem("thf_customer_phone");
      if (savedPhone) setCustomerPhone(savedPhone);

      const savedAddress = localStorage.getItem("thf_customer_address");
      if (savedAddress) setDeliveryAddress(savedAddress);

      const savedLocation = localStorage.getItem("thf_customer_location");
      if (savedLocation) setLocationUrl(savedLocation);

      const savedWa = localStorage.getItem("thf_whatsapp_number");
      if (savedWa && savedWa !== "919876543210") {
        setWhatsappNumber(savedWa);
      } else {
        setWhatsappNumber(RESTAURANT_INFO.phone);
        localStorage.setItem("thf_whatsapp_number", RESTAURANT_INFO.phone);
      }

      const savedFavs = localStorage.getItem("thf_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("thf_cart", JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const addToCart = (product: Product, instructions?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, instructions: instructions || item.instructions }
            : item
        );
      }
      return [...prev, { product, quantity: 1, instructions }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateInstructions = (productId: string, instructions: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, instructions } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("thf_favorites", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "HUNGER10" || clean === "FIRST50") {
      setCouponCode(clean);
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee =
    orderType === "delivery" && subtotal > 0 && subtotal < RESTAURANT_INFO.freeDeliveryThreshold
      ? RESTAURANT_INFO.deliveryFee
      : 0;

  const discount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    // Persist customer data
    try {
      localStorage.setItem("thf_customer_name", customerName);
      localStorage.setItem("thf_customer_phone", customerPhone);
      localStorage.setItem("thf_customer_address", deliveryAddress);
    } catch {}

    const orderTypeLabel =
      orderType === "delivery"
        ? "🛵 Home Delivery"
        : orderType === "takeaway"
        ? "🛍️ Takeaway / Pickup"
        : `🍽️ Dine-in (Table: ${tableNumber || "Walk-in"})`;

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    let msg = `🔥 *NEW ORDER - ${RESTAURANT_INFO.name.toUpperCase()}* 🔥\n`;
    msg += `🕒 _${dateStr}_\n`;
    msg += `---------------------------------\n`;
    msg += `👤 *Customer Name:* ${customerName || "Customer"}\n`;
    msg += `📍 *Delivery Address:* ${deliveryAddress || "Address provided via chat"}\n`;
    if (locationUrl) {
      msg += `🗺️ *Live GPS Location:* ${locationUrl}\n`;
    }
    msg += `---------------------------------\n`;
    msg += `📋 *ORDER ITEMS:*\n\n`;

    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}* x ${item.quantity}\n`;
      msg += `   💵 ₹${item.product.price * item.quantity} (₹${item.product.price} each)\n`;
      if (item.instructions) {
        msg += `   📝 _Note: ${item.instructions}_\n`;
      }
    });

    msg += `\n---------------------------------\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    if (discount > 0) {
      msg += `Discount (${couponCode}): -₹${discount}\n`;
    }
    if (deliveryFee > 0) {
      msg += `Delivery Fee: ₹${deliveryFee}\n`;
    } else {
      msg += `Delivery Fee: FREE\n`;
    }
    msg += `💰 *GRAND TOTAL: ₹${grandTotal}*\n`;
    msg += `---------------------------------\n`;
    msg += `Please confirm my order and share the preparation time! 🙏🍔`;

    const encoded = encodeURIComponent(msg);
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateInstructions,
        clearCart,
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
        whatsappNumber,
        setWhatsappNumber,
        sendWhatsAppOrder,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
