"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  RestaurantOrder,
  OrderStatus,
  INITIAL_ORDERS,
} from "@/data/orders";
import { INITIAL_PRODUCTS, RESTAURANT_INFO, Product } from "@/data/menu";
import { Coupon, INITIAL_COUPONS } from "@/context/CartContext";
import {
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
  Search,
  Filter,
  ArrowLeft,
  RefreshCw,
  PlusCircle,
  Eye,
  EyeOff,
  Check,
  X,
  SlidersHorizontal,
  DollarSign,
  Utensils,
  Store,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Flame,
  Bike,
  Shield,
  Save,
  Trash2,
  Lock,
  KeyRound,
  LogOut,
  Volume2,
  VolumeX,
  BellRing,
  Tag,
  Percent,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<RestaurantOrder[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "analytics" | "menu" | "settings">("orders");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState(RESTAURANT_INFO.phone);
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(RESTAURANT_INFO.freeDeliveryThreshold);
  const [deliveryFee, setDeliveryFee] = useState(RESTAURANT_INFO.deliveryFee);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  // Coupon Management States
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Owner Password Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [ownerPassword, setOwnerPassword] = useState<string>("Hunger@Master2026");
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<boolean>(false);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Real-time Audio & Push Notification States
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [newOrderAlert, setNewOrderAlert] = useState<RestaurantOrder | null>(null);
  const lastOrderCountRef = useRef<number>(0);

  // Synthesize an appetizing 3-tone restaurant chime with Web Audio API
  const playOrderChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      playTone(784, now, 0.35); // G5
      playTone(1046.5, now + 0.18, 0.45); // C6
      playTone(1318.5, now + 0.38, 0.65); // E6
    } catch {}
  };

  // Load orders and settings from localStorage
  const loadData = (notifyIfNew = false) => {
    try {
      const storedOrders = localStorage.getItem("thf_orders_list");
      if (storedOrders) {
        const parsed: RestaurantOrder[] = JSON.parse(storedOrders);
        setOrders(parsed);

        // If a new order was detected while admin is on the page
        if (notifyIfNew && lastOrderCountRef.current > 0 && parsed.length > lastOrderCountRef.current) {
          const newest = parsed[0];
          playOrderChime();
          setNewOrderAlert(newest);

          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 300]);
          }

          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            try {
              new Notification(`🔥 New Order #${newest.orderNumber}`, {
                body: `${newest.customerName} placed an order for ₹${newest.grandTotal}!`,
                icon: "/images/burger-combo.jpg",
              });
            } catch {}
          }
        }
        lastOrderCountRef.current = parsed.length;
      } else {
        setOrders(INITIAL_ORDERS);
        lastOrderCountRef.current = INITIAL_ORDERS.length;
        localStorage.setItem("thf_orders_list", JSON.stringify(INITIAL_ORDERS));
      }

      const storedStock = localStorage.getItem("thf_out_of_stock");
      if (storedStock) {
        setOutOfStockIds(JSON.parse(storedStock));
      }

      const storedWa = localStorage.getItem("thf_whatsapp_number");
      if (storedWa) {
        setWhatsappNumber(storedWa);
      }

      const storedThreshold = localStorage.getItem("thf_free_delivery_threshold");
      if (storedThreshold) {
        setFreeDeliveryThreshold(Number(storedThreshold));
      }

      const storedDeliveryFee = localStorage.getItem("thf_delivery_fee");
      if (storedDeliveryFee) {
        setDeliveryFee(Number(storedDeliveryFee));
      }

      const storedCoupons = localStorage.getItem("thf_coupons_list");
      if (storedCoupons) {
        try {
          const parsed = JSON.parse(storedCoupons);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCoupons(parsed);
          }
        } catch {}
      } else {
        localStorage.setItem("thf_coupons_list", JSON.stringify(INITIAL_COUPONS));
      }

      const storedStoreOpen = localStorage.getItem("thf_is_store_open");
      if (storedStoreOpen !== null) {
        setIsStoreOpen(storedStoreOpen === "true");
      }

      const storedPassword = localStorage.getItem("thf_owner_password") || localStorage.getItem("thf_owner_pin");
      if (storedPassword) {
        setOwnerPassword(storedPassword);
      } else {
        localStorage.setItem("thf_owner_password", "Hunger@Master2026");
      }

      const isSessionAuth = localStorage.getItem("thf_owner_session") === "true";
      if (isSessionAuth) {
        setIsAuthenticated(true);
      }

      setLastRefreshed(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch {
      setOrders(INITIAL_ORDERS);
    }
  };

  useEffect(() => {
    loadData(false);

    // Listen for storage changes from other windows/tabs in real-time
    const handleStorageChange = () => loadData(true);
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("thf_orders_updated", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("thf_orders_updated", handleStorageChange);
    };
  }, []);

  // Countdown timer for security lockout
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  // Unlock Owner Portal with Master Password
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    if (passwordInput.trim() === ownerPassword.trim()) {
      setIsAuthenticated(true);
      setLoginError(null);
      setFailedAttempts(0);
      try {
        localStorage.setItem("thf_owner_session", "true");
      } catch {}
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);
      if (nextFailed >= 5) {
        setLockoutRemaining(30);
        setLoginError("Too many failed attempts! Screen locked for 30 seconds for security.");
      } else {
        setLoginError(`Incorrect master password. ${5 - nextFailed} attempt(s) remaining.`);
      }
    }
  };

  // Lock Owner Portal
  const handleLock = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    setLoginError(null);
    try {
      localStorage.removeItem("thf_owner_session");
    } catch {}
  };

  // Generator for 14-char secure random password
  const generateStrongPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 14; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPasswordInput(pass);
    setConfirmPasswordInput(pass);
    setPasswordChangeError(null);
  };

  // Update Owner Password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.length < 8) {
      setPasswordChangeError("Password must be at least 8 characters long.");
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError("Passwords do not match. Please verify.");
      return;
    }

    setOwnerPassword(newPasswordInput);
    try {
      localStorage.setItem("thf_owner_password", newPasswordInput);
      localStorage.removeItem("thf_owner_pin");
    } catch {}
    setPasswordChangeError(null);
    setPasswordChangeSuccess(true);
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  // Update order status
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    try {
      localStorage.setItem("thf_orders_list", JSON.stringify(updated));
    } catch {}
  };

  // Toggle item stock status
  const handleToggleStock = (productId: string) => {
    const next = outOfStockIds.includes(productId)
      ? outOfStockIds.filter((id) => id !== productId)
      : [...outOfStockIds, productId];

    setOutOfStockIds(next);
    try {
      localStorage.setItem("thf_out_of_stock", JSON.stringify(next));
    } catch {}
  };

  // Save Store Settings
  const handleSaveSettings = () => {
    try {
      const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");
      localStorage.setItem("thf_whatsapp_number", cleanWa);
      localStorage.setItem("thf_free_delivery_threshold", String(freeDeliveryThreshold));
      localStorage.setItem("thf_delivery_fee", String(deliveryFee));
      localStorage.setItem("thf_is_store_open", String(isStoreOpen));
      localStorage.setItem("thf_coupons_list", JSON.stringify(coupons));

      // Broadcast changes across tabs and context
      window.dispatchEvent(new Event("thf_settings_updated"));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {}
  };

  // Add a new discount coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const cleanCode = newCouponCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!cleanCode) {
      setCouponError("Please enter a valid coupon code (e.g. SUMMER20)");
      return;
    }
    if (coupons.some((c) => c.code.toUpperCase() === cleanCode)) {
      setCouponError(`Coupon code '${cleanCode}' already exists!`);
      return;
    }
    if (newCouponDiscount <= 0 || newCouponDiscount > 100) {
      setCouponError("Discount percentage must be between 1% and 100%");
      return;
    }

    const updated = [
      ...coupons,
      {
        id: "cp-" + Date.now(),
        code: cleanCode,
        discountPercent: Number(newCouponDiscount),
        minOrder: Number(newCouponMinOrder) || 0,
        description: `${newCouponDiscount}% OFF on orders${newCouponMinOrder > 0 ? ` above ₹${newCouponMinOrder}` : ""}`,
      },
    ];

    setCoupons(updated);
    try {
      localStorage.setItem("thf_coupons_list", JSON.stringify(updated));
      window.dispatchEvent(new Event("thf_settings_updated"));
    } catch {}

    setNewCouponCode("");
    setNewCouponDiscount(10);
    setNewCouponMinOrder(0);
    setCouponError(null);
  };

  // Delete a discount coupon
  const handleDeleteCoupon = (id: string) => {
    const updated = coupons.filter((c) => c.id !== id);
    setCoupons(updated);
    try {
      localStorage.setItem("thf_coupons_list", JSON.stringify(updated));
      window.dispatchEvent(new Event("thf_settings_updated"));
    } catch {}
  };

  // Generate a test order for simulation
  const handleCreateTestOrder = () => {
    const sampleDishes = [
      INITIAL_PRODUCTS[0],
      INITIAL_PRODUCTS[1],
      INITIAL_PRODUCTS[7],
      INITIAL_PRODUCTS[13],
    ];
    const pick1 = sampleDishes[Math.floor(Math.random() * sampleDishes.length)];
    const pick2 = sampleDishes[Math.floor(Math.random() * sampleDishes.length)];

    const items = [
      { id: pick1.id, name: pick1.name, price: pick1.price, quantity: 2, instructions: "Extra spicy", category: pick1.category },
      { id: pick2.id, name: pick2.name, price: pick2.price, quantity: 1, category: pick2.category },
    ];
    const sub = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const disc = Math.round(sub * 0.1);
    const total = sub - disc;

    const names = ["Gurpreet Singh", "Jasleen Kaur", "Arjun Mehta", "Vikram Patel", "Pooja Roy"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const orderNum = "THF-" + Math.floor(2050 + Math.random() * 500);

    const newOrd: RestaurantOrder = {
      id: "ord-" + Date.now(),
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customerName: randomName,
      customerPhone: "98765" + Math.floor(10000 + Math.random() * 90000),
      deliveryAddress: "Near City Center, Sector 14, Flat " + Math.floor(10 + Math.random() * 90),
      orderType: Math.random() > 0.4 ? "delivery" : "takeaway",
      paymentMethod: "UPI on Delivery / QR",
      items,
      subtotal: sub,
      discount: disc,
      couponCode: "HUNGER10",
      deliveryFee: 0,
      grandTotal: total,
      status: "new",
    };

    const nextList = [newOrd, ...orders];
    setOrders(nextList);
    lastOrderCountRef.current = nextList.length;
    playOrderChime();
    setNewOrderAlert(newOrd);
    try {
      localStorage.setItem("thf_orders_list", JSON.stringify(nextList));
    } catch {}
  };

  // Reset to sample orders
  const handleResetOrders = () => {
    if (confirm("Reset orders to initial demo state?")) {
      setOrders(INITIAL_ORDERS);
      localStorage.setItem("thf_orders_list", JSON.stringify(INITIAL_ORDERS));
    }
  };

  // Delete single order
  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    try {
      localStorage.setItem("thf_orders_list", JSON.stringify(updated));
    } catch {}
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const totalRev = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.grandTotal, 0);

    const newOrders = orders.filter((o) => o.status === "new").length;
    const preparingOrders = orders.filter((o) => o.status === "preparing").length;
    const completedOrders = orders.filter((o) => o.status === "completed").length;
    const deliveryOrders = orders.filter((o) => o.orderType === "delivery").length;

    const avgOrderValue = orders.length > 0 ? Math.round(totalRev / orders.length) : 0;

    return {
      totalRevenue: totalRev,
      totalOrders: orders.length,
      newOrders,
      preparingOrders,
      completedOrders,
      deliveryOrders,
      avgOrderValue,
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = order.customerName.toLowerCase().includes(q);
        const matchesNum = order.orderNumber.toLowerCase().includes(q);
        const matchesPhone = order.customerPhone.includes(q);
        const matchesItems = order.items.some((i) => i.name.toLowerCase().includes(q));
        if (!matchesName && !matchesNum && !matchesPhone && !matchesItems) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  // Category sales breakdown
  const categoryAnalytics = useMemo(() => {
    const map: Record<string, { count: number; revenue: number }> = {};
    orders.forEach((ord) => {
      if (ord.status === "cancelled") return;
      ord.items.forEach((item) => {
        const cat = item.category || "other";
        if (!map[cat]) map[cat] = { count: 0, revenue: 0 };
        map[cat].count += item.quantity;
        map[cat].revenue += item.price * item.quantity;
      });
    });

    const entries = Object.entries(map).map(([category, data]) => ({
      category,
      ...data,
    }));
    entries.sort((a, b) => b.revenue - a.revenue);
    return entries;
  }, [orders]);

  // Send WhatsApp message to customer
  const handleNotifyCustomer = (order: RestaurantOrder) => {
    let msg = `Hi ${order.customerName}! 👋\n`;
    if (order.status === "new") {
      msg += `Your order *#${order.orderNumber}* at *${RESTAURANT_INFO.name}* has been received and confirmed! We will start preparing it right away. 🍳`;
    } else if (order.status === "preparing") {
      msg += `Your order *#${order.orderNumber}* is currently being prepared fresh in our kitchen! Almost ready for you. 🔥🍔`;
    } else if (order.status === "out_for_delivery") {
      msg += `Great news! Your order *#${order.orderNumber}* is out for delivery with our rider and will arrive shortly! 🛵💨`;
    } else if (order.status === "completed") {
      msg += `Thank you for dining with *${RESTAURANT_INFO.name}*! Your order *#${order.orderNumber}* is marked as completed. We hope you enjoyed your meal! ⭐`;
    } else {
      msg += `Regarding your order *#${order.orderNumber}* at *${RESTAURANT_INFO.name}*: `;
    }

    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
    const waPhone = cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // =========================================================================
  // AUTHENTICATION GUARD: SECURE MASTER PASSWORD SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f2ea] flex items-center justify-center p-4 selection:bg-[#eb4d23] selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-center">
          {/* Lock Brand Icon */}
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#eb4d23] to-[#c7350e] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#eb4d23]/25 mb-4">
            <Shield className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-black uppercase tracking-wider text-[#eb4d23] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Owner Access Protected
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-heading mt-3">
            Restaurant Owner Login
          </h2>

          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Enter your secure master password to access order logs, live kitchen controls, and sales records.
          </p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Owner Master Password:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  disabled={lockoutRemaining > 0}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  placeholder="Enter owner master password"
                  className="w-full text-sm font-semibold pl-11 pr-11 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#eb4d23] focus:ring-2 focus:ring-[#eb4d23]/10 disabled:bg-stone-100 disabled:cursor-not-allowed"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold mt-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {lockoutRemaining > 0 && (
                <p className="text-xs font-bold text-rose-600 mt-2">
                  Locked for security: retry in {lockoutRemaining}s
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={lockoutRemaining > 0}
              className="w-full py-3.5 bg-[#eb4d23] hover:bg-[#d43f16] active:scale-[0.98] text-white font-extrabold text-sm rounded-2xl shadow-md shadow-[#eb4d23]/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unlock Owner Dashboard
            </button>

            <div className="text-center pt-1">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Customer Storefront</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#f4f2ea] text-[#020202] selection:bg-[#eb4d23] selection:text-white">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-stone-900 text-white shadow-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Branding & Back Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Store</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#eb4d23] to-[#c7350e] flex items-center justify-center text-white font-black text-sm shadow-sm">
                <Flame className="w-4 h-4 fill-white/20 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight font-heading uppercase text-white leading-none">
                    THE HUNGER <span className="text-[#eb4d23]">FOOD</span>
                  </h1>
                  <span className="bg-amber-400 text-stone-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    OWNER PORTAL
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5">
                  Live Orders, Revenue Analytics & Kitchen Management
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Test Order Button */}
            <button
              onClick={handleCreateTestOrder}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Simulate receiving a new customer order"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Simulate Test Order</span>
            </button>

            {/* Audio Alert Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playOrderChime();
                if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
                  Notification.requestPermission();
                }
              }}
              className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                soundEnabled
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-stone-800 text-stone-400 hover:text-white"
              }`}
              title={soundEnabled ? "Order sound chime enabled (click to mute)" : "Order sound chime muted (click to enable)"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? "Sound ON" : "Muted"}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => loadData(false)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh order results"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Kitchen Status Toggle */}
            <button
              onClick={() => {
                const nextState = !isStoreOpen;
                setIsStoreOpen(nextState);
                try {
                  localStorage.setItem("thf_is_store_open", String(nextState));
                } catch {}
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isStoreOpen
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isStoreOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              <span className="hidden sm:inline">{isStoreOpen ? "Kitchen Open" : "Store Closed"}</span>
            </button>

            {/* Lock / Log Out Button */}
            <button
              onClick={handleLock}
              className="p-2 rounded-xl bg-stone-800 hover:bg-rose-950 text-stone-300 hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Lock owner portal"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Real-time New Order Sound & Banner Alert */}
        {newOrderAlert && (
          <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#eb4d23] via-orange-600 to-amber-600 text-white shadow-xl shadow-[#eb4d23]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-white/20 transition-all">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <BellRing className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-white text-[#eb4d23] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    NEW ORDER JUST RECEIVED!
                  </span>
                  <span className="text-xs text-white/80 font-mono">#{newOrderAlert.orderNumber}</span>
                </div>
                <h4 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                  {newOrderAlert.customerName} • ₹{newOrderAlert.grandTotal} ({newOrderAlert.items.length} dishes)
                </h4>
                <p className="text-xs text-white/90">
                  {newOrderAlert.deliveryAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => {
                  playOrderChime();
                  setNewOrderAlert(null);
                  setStatusFilter("new");
                }}
                className="px-4 py-2 rounded-xl bg-white text-[#eb4d23] hover:bg-orange-50 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                View Order
              </button>
              <button
                onClick={() => setNewOrderAlert(null)}
                aria-label="Dismiss alert"
                className="w-8 h-8 rounded-xl bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Sales</span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-heading">
                ₹{metrics.totalRevenue.toLocaleString("en-IN")}
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Real-time order revenue
              </p>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Orders</span>
              <div className="w-9 h-9 rounded-2xl bg-orange-50 text-[#eb4d23] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-heading">
                {metrics.totalOrders}
              </div>
              <p className="text-[11px] text-stone-500 font-medium mt-1">
                Avg. ₹{metrics.avgOrderValue} per order
              </p>
            </div>
          </div>

          {/* New Pending Orders */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-soft relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">New Orders</span>
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 font-heading flex items-center gap-2">
                {metrics.newOrders}
                {metrics.newOrders > 0 && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    Action Needed
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 font-medium mt-1">
                {metrics.preparingOrders} dishes currently cooking
              </p>
            </div>
          </div>

          {/* Completed Deliveries */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Completed</span>
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-heading">
                {metrics.completedOrders}
              </div>
              <p className="text-[11px] text-stone-500 font-medium mt-1">
                {metrics.deliveryOrders} via Home Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-300 pb-3 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: "orders", label: "Live Orders & Results", icon: ShoppingBag, count: orders.length },
            { id: "analytics", label: "Sales Analytics", icon: TrendingUp },
            { id: "menu", label: "Menu & Stock Status", icon: Utensils, count: outOfStockIds.length > 0 ? `${outOfStockIds.length} out` : undefined },
            { id: "settings", label: "WhatsApp & Store Config", icon: SlidersHorizontal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isCurrent
                    ? "bg-[#eb4d23] text-white shadow-md shadow-[#eb4d23]/20"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isCurrent ? "bg-white/25 text-white" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: LIVE ORDERS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Filter Bar & Search */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {[
                  { id: "all", label: "All Orders", count: orders.length },
                  { id: "new", label: "New Orders", count: orders.filter((o) => o.status === "new").length, dot: "bg-amber-500 animate-pulse" },
                  { id: "preparing", label: "In Kitchen", count: orders.filter((o) => o.status === "preparing").length, dot: "bg-blue-500" },
                  { id: "out_for_delivery", label: "Out for Delivery", count: orders.filter((o) => o.status === "out_for_delivery").length, dot: "bg-purple-500" },
                  { id: "completed", label: "Delivered", count: orders.filter((o) => o.status === "completed").length, dot: "bg-emerald-500" },
                  { id: "cancelled", label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length, dot: "bg-rose-500" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStatusFilter(item.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      statusFilter === item.id
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-600"
                    }`}
                  >
                    {item.dot && <span className={`w-2 h-2 rounded-full ${item.dot}`} />}
                    <span>{item.label}</span>
                    <span className="opacity-70">({item.count})</span>
                  </button>
                ))}
              </div>

              {/* Search Orders */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, ID or dish..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#eb4d23]"
                />
              </div>
            </div>

            {/* Orders List / Cards */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-stone-800 text-base font-heading">
                  No orders match this filter
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Try switching status tabs or clear your search query.
                </p>
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
                >
                  View All Orders
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredOrders.map((order) => {
                  const date = new Date(order.createdAt);
                  const formattedTime = date.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const formattedDate = date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  });

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-soft hover:shadow-md transition-all"
                    >
                      {/* Top Order Row: ID, Time, Type, Status Pill */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-stone-100 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-black text-stone-900 font-heading">
                            #{order.orderNumber}
                          </span>

                          <span className="text-xs font-semibold text-stone-500">
                            {formattedDate} • {formattedTime}
                          </span>

                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                            {order.orderType === "delivery"
                              ? "Home Delivery"
                              : order.orderType === "takeaway"
                              ? "Takeaway"
                              : `Table ${order.tableNumber || "Dine-in"}`}
                          </span>
                        </div>

                        {/* Status Dropdown / Pill */}
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] font-bold text-stone-400 uppercase">Status:</label>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                              order.status === "new"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : order.status === "preparing"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : order.status === "out_for_delivery"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : order.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            <option value="new">New Order</option>
                            <option value="preparing">In Kitchen</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="completed">Delivered / Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle Grid: Customer Details & Items Ordered */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-3.5">
                        {/* Customer Info (Left) */}
                        <div className="md:col-span-5 space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-stone-900 text-sm">{order.customerName}</span>
                            <span className="text-stone-400">•</span>
                            <span className="font-semibold text-stone-600">{order.customerPhone}</span>
                          </div>

                          <div className="flex items-start gap-2 text-stone-600">
                            <MapPin className="w-3.5 h-3.5 text-[#eb4d23] shrink-0 mt-0.5" />
                            <span className="leading-tight">{order.deliveryAddress}</span>
                          </div>

                          {order.locationUrl && (
                            <a
                              href={order.locationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                            >
                              <span>View GPS Location on Maps</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          <div className="text-[11px] text-stone-500 font-medium">
                            Payment: <span className="font-bold text-stone-700">{order.paymentMethod}</span>
                          </div>
                        </div>

                        {/* Items Breakdown (Right) */}
                        <div className="md:col-span-7 bg-stone-50 rounded-2xl p-3 border border-stone-100">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                            Ordered Dishes ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
                          </h4>

                          <div className="space-y-1.5">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-start justify-between text-xs">
                                <div>
                                  <span className="font-bold text-stone-800">
                                    {item.quantity}x {item.name}
                                  </span>
                                  {item.instructions && (
                                    <span className="block text-[11px] text-[#eb4d23] font-medium italic">
                                      Note: &ldquo;{item.instructions}&rdquo;
                                    </span>
                                  )}
                                </div>
                                <span className="font-bold text-stone-900 shrink-0 ml-2">
                                  ₹{item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action & Total Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-stone-100 gap-3">
                        <div className="flex items-center gap-4 text-xs">
                          <div>
                            <span className="text-stone-400">Subtotal:</span> ₹{order.subtotal}
                          </div>
                          {order.discount > 0 && (
                            <div className="text-emerald-600 font-semibold">
                              <span>Discount:</span> -₹{order.discount}
                            </div>
                          )}
                          <div>
                            <span className="text-stone-400">Total:</span>{" "}
                            <span className="text-base sm:text-lg font-black text-[#eb4d23] font-heading">
                              ₹{order.grandTotal}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Send WhatsApp Status Update to Customer */}
                          <button
                            onClick={() => handleNotifyCustomer(order)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Notify on WhatsApp</span>
                          </button>

                          {/* Delete Order Button */}
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove order record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SALES & PERFORMANCE ANALYTICS */}
        {/* ========================================================= */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Sales Breakdown */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-soft">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#eb4d23]" />
                    <h3 className="font-extrabold text-base text-stone-900 font-heading">
                      Sales by Category
                    </h3>
                  </div>
                  <span className="text-xs text-stone-400 font-semibold">Volume & Revenue</span>
                </div>

                <div className="space-y-4 mt-5">
                  {categoryAnalytics.map((item) => {
                    const pct = metrics.totalRevenue > 0 ? Math.round((item.revenue / metrics.totalRevenue) * 100) : 0;
                    return (
                      <div key={item.category}>
                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                          <span className="capitalize text-stone-800">
                            {item.category === "burgers"
                              ? "Burgers"
                              : item.category === "noodles"
                              ? "Hakka & Wok Noodles"
                              : item.category === "chaap"
                              ? "Soya Chaap Specials"
                              : item.category === "chinese"
                              ? "Manchurian & Chilli Potato"
                              : item.category === "fries"
                              ? "Crispy French Fries"
                              : "Toasted Sandwiches"}
                          </span>
                          <span className="text-stone-900">
                            ₹{item.revenue} <span className="text-stone-400 font-normal">({pct}%)</span>
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#eb4d23] rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Fulfillment Distribution */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-soft">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-[#eb4d23]" />
                    <h3 className="font-extrabold text-base text-stone-900 font-heading">
                      Fulfillment Channels
                    </h3>
                  </div>
                  <span className="text-xs text-stone-400 font-semibold">Distribution</span>
                </div>

                <div className="space-y-4 mt-5">
                  {[
                    { label: "Home Delivery", count: orders.filter((o) => o.orderType === "delivery").length },
                    { label: "Takeaway / Self Pickup", count: orders.filter((o) => o.orderType === "takeaway").length },
                    { label: "Dine-in Service", count: orders.filter((o) => o.orderType === "dine_in").length },
                  ].map((chan) => {
                    const pct = orders.length > 0 ? Math.round((chan.count / orders.length) * 100) : 0;
                    return (
                      <div key={chan.label}>
                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                          <span className="text-stone-800">{chan.label}</span>
                          <span className="text-stone-900">
                            {chan.count} orders ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-stone-900 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <h4 className="text-xs font-bold text-[#eb4d23]">Owner Growth Insight</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Over 70% of customer orders happen through Home Delivery. Offering free delivery above ₹299 boosts average order size by 24%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: MENU & STOCK INVENTORY CONTROL */}
        {/* ========================================================= */}
        {activeTab === "menu" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 font-heading">
                    Menu & Inventory Availability
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Toggle items out of stock if ingredients run out. Customers will see them as &ldquo;Sold Out&rdquo; instantly.
                  </p>
                </div>

                <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl w-fit">
                  {INITIAL_PRODUCTS.length} Dishes on Menu • {outOfStockIds.length} Sold Out
                </span>
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
                {INITIAL_PRODUCTS.map((prod) => {
                  const isSoldOut = outOfStockIds.includes(prod.id);

                  return (
                    <div
                      key={prod.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isSoldOut
                          ? "bg-stone-50 border-stone-300 opacity-60"
                          : "bg-white border-stone-200 hover:border-[#eb4d23]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          {prod.isVeg ? (
                            <span className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            </span>
                          ) : (
                            <span className="w-3.5 h-3.5 border border-rose-600 flex items-center justify-center shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                            </span>
                          )}
                          <h4 className="text-xs sm:text-sm font-extrabold text-stone-900">
                            {prod.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-[#eb4d23]">₹{prod.price}</span>
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider capitalize">
                            {prod.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleStock(prod.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSoldOut
                            ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        }`}
                      >
                        {isSoldOut ? "Sold Out" : "In Stock"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: STORE & WHATSAPP CONFIGURATION */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-stone-900 font-heading">
                Store & WhatsApp Ordering Settings
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Configure where customer orders are routed, customize delivery rules, and update your security PIN.
              </p>
            </div>

            <div className="space-y-4">
              {/* Owner Master Password Management Card */}
              <div className="p-5 bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-200/90 rounded-3xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-stone-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#eb4d23]" />
                    <span>Owner Master Password</span>
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Active &amp; Protected
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Only the restaurant owner should know this password. It protects your kitchen orders, customer phone numbers, and daily revenue stats.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      New Password (min 8 chars):
                    </label>
                    <input
                      type="text"
                      value={newPasswordInput}
                      onChange={(e) => {
                        setNewPasswordInput(e.target.value);
                        if (passwordChangeError) setPasswordChangeError(null);
                      }}
                      placeholder="e.g. Hunger@2026#Secure"
                      className="w-full text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#eb4d23] bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Confirm New Password:
                    </label>
                    <input
                      type="text"
                      value={confirmPasswordInput}
                      onChange={(e) => {
                        setConfirmPasswordInput(e.target.value);
                        if (passwordChangeError) setPasswordChangeError(null);
                      }}
                      placeholder="Re-type new password"
                      className="w-full text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#eb4d23] bg-white font-mono"
                    />
                  </div>
                </div>

                {passwordChangeError && (
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{passwordChangeError}</span>
                  </p>
                )}

                {passwordChangeSuccess && (
                  <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Master Password updated successfully!</span>
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    className="px-4 py-2 rounded-xl bg-[#eb4d23] hover:bg-[#d43f16] text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    Save New Password
                  </button>

                  <button
                    type="button"
                    onClick={generateStrongPassword}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Generate Strong Password</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Owner WhatsApp Number (with Country Code)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="916284636756"
                    className="w-full text-xs sm:text-sm font-semibold pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#eb4d23]"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  All customer orders generated on the website open directly with this WhatsApp phone number.
                </span>
              </div>

              {/* Free Delivery Threshold */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Free Delivery Minimum Order Amount (₹)
                </label>
                <input
                  type="number"
                  value={freeDeliveryThreshold}
                  onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#eb4d23]"
                />
              </div>

              {/* Standard Delivery Fee */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Standard Delivery Fee (for orders below free threshold) (₹)
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#eb4d23]"
                />
              </div>

              {/* Kitchen Open Toggle */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Kitchen Accepting Orders</h4>
                  <p className="text-[11px] text-stone-500">Toggle off when closed or out of service</p>
                </div>
                <button
                  onClick={() => setIsStoreOpen(!isStoreOpen)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    isStoreOpen ? "bg-emerald-600 text-white" : "bg-stone-300 text-stone-700"
                  }`}
                >
                  {isStoreOpen ? "Accepting Orders" : "Kitchen Paused"}
                </button>
              </div>

              {/* Discount Coupons & Offers Management */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-[#eb4d23]" />
                  <h4 className="text-xs font-bold text-stone-900">Discount Coupons & Offers</h4>
                </div>
                <p className="text-[11px] text-stone-500 mb-3">
                  Create promo codes that customers can apply on checkout to get instant discounts.
                </p>

                {/* List of Active Coupons */}
                <div className="space-y-2 mb-3">
                  {coupons.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs font-mono font-extrabold text-[#eb4d23]">
                          {c.code}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-800">
                            {c.discountPercent}% OFF
                          </p>
                          <p className="text-[10px] text-stone-500">
                            {c.minOrder && c.minOrder > 0 ? `Min order ₹${c.minOrder}` : "No minimum order"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCoupon(c.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Coupon Form */}
                <div className="p-3.5 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-2.5">
                  <h5 className="text-[11px] font-bold text-[#eb4d23] uppercase tracking-wider">
                    Add New Promo Code
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-stone-600 block mb-0.5">
                        Coupon Code
                      </label>
                      <input
                        type="text"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. FESTIVE20"
                        className="w-full text-xs font-semibold p-2 rounded-xl bg-white border border-stone-300 uppercase focus:outline-none focus:border-[#eb4d23]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-stone-600 block mb-0.5">
                        Discount (% OFF)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={newCouponDiscount}
                        onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                        className="w-full text-xs font-semibold p-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#eb4d23]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-stone-600 block mb-0.5">
                        Min Order Amount (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newCouponMinOrder}
                        onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                        placeholder="0 for no min"
                        className="w-full text-xs font-semibold p-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#eb4d23]"
                      />
                    </div>
                  </div>

                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleAddCoupon}
                    className="w-full py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#eb4d23]" />
                    <span>Create Promo Coupon</span>
                  </button>
                </div>
              </div>

              {/* Save Success Notice */}
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700 font-semibold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Configuration saved successfully!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 py-3 bg-[#eb4d23] hover:bg-[#d43f16] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>

                <button
                  onClick={handleResetOrders}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-2xl transition-colors cursor-pointer"
                  title="Reset demo data"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
