"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Flame,
  MapPin,
  Shuffle,
  Search,
  ArrowLeft,
  Heart,
  MessageSquareHeart,
  Share2,
} from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CUx5tiquTRdrEBM/review";

interface ReviewTemplate {
  id: number;
  category: "all" | "gobindgarh" | "burgers" | "chinese" | "chaap" | "delivery";
  tag: string;
  stars: number;
  text: string;
}

const REVIEW_TEMPLATES: ReviewTemplate[] = [
  // 1-10: Gobindgarh Local Favorites
  {
    id: 1,
    category: "gobindgarh",
    tag: "Best in Gobindgarh",
    stars: 5,
    text: "Hands down the best fast food place in Mandi Gobindgarh! The taste, hygiene, and quick service are unmatched. Highly recommended to everyone!",
  },
  {
    id: 2,
    category: "gobindgarh",
    tag: "Gobindgarh Gem",
    stars: 5,
    text: "Finally a top-quality food spot in Gobindgarh! Everything from their burgers to noodles is piping hot, super fresh, and very reasonably priced.",
  },
  {
    id: 3,
    category: "gobindgarh",
    tag: "Local Favorite",
    stars: 5,
    text: "The Hunger Food is easily my favorite evening hangout spot in Mandi Gobindgarh. Delicious fast food and very polite staff. 5 stars all the way!",
  },
  {
    id: 4,
    category: "gobindgarh",
    tag: "Gobindgarh Special",
    stars: 5,
    text: "Best fast food joint near Main Road Gobindgarh. Freshly made to order, clean kitchen, and amazing flavor. Must visit with family and friends!",
  },
  {
    id: 5,
    category: "gobindgarh",
    tag: "Must Visit",
    stars: 5,
    text: "Whenever I'm in Mandi Gobindgarh, The Hunger Food is my first choice. Great portion sizes, consistent taste, and pocket-friendly rates.",
  },
  {
    id: 6,
    category: "gobindgarh",
    tag: "Gobindgarh Foodies",
    stars: 5,
    text: "Mandi Gobindgarh's best-kept secret for fast food lovers! Every dish is loaded with rich flavors and prepared fresh. Truly finger lickin' good!",
  },
  {
    id: 7,
    category: "gobindgarh",
    tag: "Student Favorite",
    stars: 5,
    text: "Best food spot in Gobindgarh for college students and friends! Affordable prices, huge portions, and incredible taste. Love this place!",
  },
  {
    id: 8,
    category: "gobindgarh",
    tag: "Top Rated",
    stars: 5,
    text: "If you live in or around Gobindgarh, you have to try The Hunger Food. The food quality beats big brand chains easily. Absolutely 10/10!",
  },
  {
    id: 9,
    category: "gobindgarh",
    tag: "Family Choice",
    stars: 5,
    text: "Ordered for my whole family in Gobindgarh and everyone loved it! Clean packaging, great quantity, and authentic taste in every bite.",
  },
  {
    id: 10,
    category: "gobindgarh",
    tag: "Gobindgarh Best",
    stars: 5,
    text: "Top notch fast food experience in Gobindgarh. Whether you dine in or order delivery, the quality is always 100% consistent and tasty.",
  },

  // 11-20: Burgers & Fries
  {
    id: 11,
    category: "burgers",
    tag: "Burger Lovers",
    stars: 5,
    text: "The crispy burgers here are unbeatable! Soft fresh buns, perfectly seasoned crunchy patty, and mouthwatering sauces. Best burger in Gobindgarh!",
  },
  {
    id: 12,
    category: "burgers",
    tag: "Double Cheese",
    stars: 5,
    text: "Tried their Double Cheese Burger with Peri-Peri French Fries — absolute perfection! The cheese melt was incredible. A must-try combo!",
  },
  {
    id: 13,
    category: "burgers",
    tag: "Paneer Deluxe",
    stars: 5,
    text: "Their Paneer Deluxe Burger is pure bliss! Thick paneer slice, fresh crunchy lettuce, and spicy chipotle mayo. Definitely ordering again!",
  },
  {
    id: 14,
    category: "burgers",
    tag: "Crispy Aloo Tikki",
    stars: 5,
    text: "Authentic crispy aloo tikki burger done right! Nostalgic street flavor with premium hygiene and quality buns. Loved it!",
  },
  {
    id: 15,
    category: "burgers",
    tag: "Fries & Combo",
    stars: 5,
    text: "The golden french fries are so crispy and seasoned generously. Paired with their signature burger, it is the ultimate comfort meal!",
  },
  {
    id: 16,
    category: "burgers",
    tag: "Pocket Friendly",
    stars: 5,
    text: "Burgers starting from just ₹30 that taste ten times better than McDonald's! Unbelievable value for money at The Hunger Food Gobindgarh.",
  },
  {
    id: 17,
    category: "burgers",
    tag: "Loaded Burger",
    stars: 5,
    text: "Super juicy and loaded burgers! They don't skimp on veggies or sauces. Every bite is packed with pure flavor. Highly recommended!",
  },
  {
    id: 18,
    category: "burgers",
    tag: "Cheese Lovers",
    stars: 5,
    text: "Cheese overload! If you love cheesy burgers and cheesy fries, The Hunger Food is paradise. Freshly prepared and delivered steaming hot.",
  },
  {
    id: 19,
    category: "burgers",
    tag: "Snack Combo",
    stars: 5,
    text: "Ordered the Burger + Fries combo. Portions were hearty, fries were golden crispy, and the burger was sensational. Keep up the great work!",
  },
  {
    id: 20,
    category: "burgers",
    tag: "Juicy Patty",
    stars: 5,
    text: "The burger patty was freshly fried with an incredible crunch. Easily the finest burger joint in Mandi Gobindgarh. 5 stars!",
  },

  // 21-30: Noodles & Chinese
  {
    id: 21,
    category: "chinese",
    tag: "Hakka Noodles",
    stars: 5,
    text: "The Hakka Noodles here are out of this world! Perfect wok smokiness, fresh crunchy veggies, and not oily at all. Best noodles in Gobindgarh!",
  },
  {
    id: 22,
    category: "chinese",
    tag: "Chilli Potato",
    stars: 5,
    text: "Their Crispy Honey Chilli Potato is a masterpiece! Crunchy potato fingers coated in a spicy, tangy glaze with toasted sesame. 10/10!",
  },
  {
    id: 23,
    category: "chinese",
    tag: "Manchurian Gravy",
    stars: 5,
    text: "Delicious Veg Manchurian with piping hot Hakka Noodles! The gravy was rich, flavorful, and loaded with soft manchurian balls. Super satisfying!",
  },
  {
    id: 24,
    category: "chinese",
    tag: "Spicy Schezwan",
    stars: 5,
    text: "If you love spicy desi Chinese, try their Schezwan Noodles. The spice kick and garlic aroma are spot on. One of my favorites!",
  },
  {
    id: 25,
    category: "chinese",
    tag: "Chinese Platter",
    stars: 5,
    text: "Ordered noodles, chilli potato, and manchurian for an evening get-together. Every item was fresh, spicy, and loved by everyone!",
  },
  {
    id: 26,
    category: "chinese",
    tag: "Wok Specials",
    stars: 5,
    text: "Authentic wok-tossed street noodles with zero grease. The Hunger Food serves the best Chinese food in all of Mandi Gobindgarh!",
  },
  {
    id: 27,
    category: "chinese",
    tag: "Dry Manchurian",
    stars: 5,
    text: "Crispy Dry Manchurian was super flavorful with finely chopped capsicum and onions. Perfect snack with drinks or evening chai!",
  },
  {
    id: 28,
    category: "chinese",
    tag: "Garlic Noodles",
    stars: 5,
    text: "Rich chilli garlic noodles tossed with spring onions and cabbage. Flavour explosion in every forkful. Must order!",
  },
  {
    id: 29,
    category: "chinese",
    tag: "Street Style",
    stars: 5,
    text: "Craving street-style Chinese with clean, hygienic restaurant preparation? The Hunger Food Gobindgarh delivers both with perfection!",
  },
  {
    id: 30,
    category: "chinese",
    tag: "Chinese Lovers",
    stars: 5,
    text: "The noodles portion is huge and easily serves two people! Great price, wonderful taste, and fast delivery. 5 stars well deserved!",
  },

  // 31-40: Soya Chaap & Sandwiches
  {
    id: 31,
    category: "chaap",
    tag: "Malai Chaap",
    stars: 5,
    text: "Their Malai Soya Chaap is melt-in-the-mouth soft! Loaded with fresh cream, butter, and mild aromatic spices. Absolute heaven!",
  },
  {
    id: 32,
    category: "chaap",
    tag: "Tandoori Chaap",
    stars: 5,
    text: "The Tandoori Chaap platter is charred to perfection in authentic tandoor style! Smoky, juicy, and served with mint chutney and onions.",
  },
  {
    id: 33,
    category: "chaap",
    tag: "Kurkure Chaap",
    stars: 5,
    text: "Crunchiest Kurkure Chaap in Mandi Gobindgarh! Super crispy exterior and juicy tender chaap inside. Simply addictive!",
  },
  {
    id: 34,
    category: "chaap",
    tag: "Afghani Chaap",
    stars: 5,
    text: "Creamy, rich, and mildly spiced Afghani Chaap. One of the best appetizers I have ever tasted in Punjab. Do not miss this!",
  },
  {
    id: 35,
    category: "chaap",
    tag: "Grilled Sandwiches",
    stars: 5,
    text: "Ordered their Grilled Paneer & Cheese Sandwich. Toasted golden brown with buttery crunch and generous stuffing. Super delicious!",
  },
  {
    id: 36,
    category: "chaap",
    tag: "Chaap Special",
    stars: 5,
    text: "Best soya chaap variety in Gobindgarh! The marination penetrates deep into the chaap and every single bite is succulent and flavorful.",
  },
  {
    id: 37,
    category: "chaap",
    tag: "Paneer Sandwich",
    stars: 5,
    text: "The Paneer Sandwich is healthy, filling, and packed with fresh spiced paneer. Perfect breakfast or evening snack on the go!",
  },
  {
    id: 38,
    category: "chaap",
    tag: "Tandoori Platter",
    stars: 5,
    text: "Piping hot tandoori chaap straight off the grill! Fresh green coriander-mint chutney complemented it wonderfully. 5/5 stars!",
  },
  {
    id: 39,
    category: "chaap",
    tag: "Cheese Sandwich",
    stars: 5,
    text: "Golden toasted cheese sandwich with herbs and spices. Simple, comforting, and delicious. My kids' absolute favorite snack!",
  },
  {
    id: 40,
    category: "chaap",
    tag: "Authentic Flavor",
    stars: 5,
    text: "Great variety of tandoori items and chaap platters. The quality of soya chaap is premium, not rubbery at all. Top notch!",
  },

  // 41-50: Delivery & Customer Service
  {
    id: 41,
    category: "delivery",
    tag: "Super Fast Delivery",
    stars: 5,
    text: "Lightning fast doorstep delivery! Ordered on WhatsApp and received piping hot food within 20 minutes in Gobindgarh. Amazing service!",
  },
  {
    id: 42,
    category: "delivery",
    tag: "WhatsApp Ordering",
    stars: 5,
    text: "Ordering directly on WhatsApp through their website is so convenient! Seamless checkout, instant order confirmation, and zero hassle.",
  },
  {
    id: 43,
    category: "delivery",
    tag: "Hot & Fresh",
    stars: 5,
    text: "Even during peak evening hours, the food arrived steaming hot and neatly packed. No spills, no sogginess. Best delivery in Gobindgarh!",
  },
  {
    id: 44,
    category: "delivery",
    tag: "Clean Packaging",
    stars: 5,
    text: "Impression packaging and excellent hygiene standards! The burgers stayed crispy and noodles stayed hot. Kudos to the team!",
  },
  {
    id: 45,
    category: "delivery",
    tag: "Polite Delivery Rider",
    stars: 5,
    text: "The delivery executive was very polite and reached right on time using Google Maps location pin. Wonderful overall customer experience!",
  },
  {
    id: 46,
    category: "delivery",
    tag: "Late Night Delivery",
    stars: 5,
    text: "Open till 11:30 PM! Saved our late-night study session with hot burgers and noodles. Best late-night food in Mandi Gobindgarh!",
  },
  {
    id: 47,
    category: "delivery",
    tag: "Free Delivery Deal",
    stars: 5,
    text: "Free home delivery on orders above ₹299 is such a great deal for family meals. Generous quantity and delicious food every single time.",
  },
  {
    id: 48,
    category: "delivery",
    tag: "Courteous Staff",
    stars: 5,
    text: "The staff is super courteous and accommodating with special instructions like extra spicy or extra napkins. Truly customer-first service!",
  },
  {
    id: 49,
    category: "delivery",
    tag: "Consistent Quality",
    stars: 5,
    text: "I have ordered more than 10 times now and every single time the taste has been consistently 5-star quality. The Hunger Food never disappoints!",
  },
  {
    id: 50,
    category: "delivery",
    tag: "5-Star Experience",
    stars: 5,
    text: "Outstanding taste, unbeatable prices, and lightning-fast WhatsApp delivery. The Hunger Food has become Mandi Gobindgarh's pride!",
  },
];

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "gobindgarh" | "burgers" | "chinese" | "chaap" | "delivery"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [randomModalReview, setRandomModalReview] = useState<ReviewTemplate | null>(null);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return REVIEW_TEMPLATES.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesText = item.text.toLowerCase().includes(query);
        const matchesTag = item.tag.toLowerCase().includes(query);
        if (!matchesText && !matchesTag) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Copy & Auto-Redirect
  const handleSelectReview = async (review: ReviewTemplate) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(review.text);
      } else {
        // Fallback for older mobile browsers
        const textArea = document.createElement("textarea");
        textArea.value = review.text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedId(review.id);

      // Brief delay so user sees "Copied!" feedback before opening Google Reviews
      setTimeout(() => {
        window.open(GOOGLE_REVIEW_URL, "_blank");
      }, 500);

      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    } catch {
      // If clipboard fails, still open Google Reviews
      window.open(GOOGLE_REVIEW_URL, "_blank");
    }
  };

  // Pick Random Review
  const handlePickRandom = () => {
    const randomIndex = Math.floor(Math.random() * REVIEW_TEMPLATES.length);
    const chosen = REVIEW_TEMPLATES[randomIndex];
    setRandomModalReview(chosen);
    handleSelectReview(chosen);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#020202] flex flex-col justify-start pb-20 selection:bg-[#eb4d23] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#ede8dc]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-700 hover:text-[#eb4d23] font-bold text-xs sm:text-sm transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-[#ede8dc] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <ArrowLeft className="w-4 h-4 text-stone-600 group-hover:text-[#eb4d23]" />
            </div>
            <span>Back to Storefront</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#eb4d23] to-[#c7350e] flex items-center justify-center shadow-sm text-white">
              <Flame className="w-4 h-4 fill-white/20 text-white" />
            </div>
            <div className="text-left hidden min-[380px]:block">
              <span className="text-xs font-black tracking-tight uppercase font-heading text-stone-900 block leading-tight">
                The Hunger <span className="text-[#eb4d23]">Food</span>
              </span>
              <span className="text-[10px] text-stone-500 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#eb4d23]" /> Mandi Gobindgarh
              </span>
            </div>
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open</span> Google Reviews
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 pt-6 sm:pt-10 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-[#eb4d23] text-xs font-bold mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Love Our Food? Share the Love on Google!</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#020202] font-heading tracking-tight max-w-2xl mx-auto leading-tight">
          1-Tap Review Generator for <span className="text-[#eb4d23]">The Hunger Food</span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mt-2 leading-relaxed">
          Tap any review template below. It will <strong>automatically copy to your clipboard</strong> and open our Google Reviews page so you can just paste and hit post in 5 seconds!
        </p>

        {/* 3 Step Interactive Workflow Card */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-6 p-3 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-[#ede8dc] shadow-soft">
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-50 text-[#eb4d23] font-black text-xs sm:text-sm flex items-center justify-center mb-1.5 border border-orange-200">
              1
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-stone-800">Choose Review</p>
            <p className="text-[9px] sm:text-[10px] text-stone-400 hidden min-[360px]:block">Tap any card below</p>
          </div>

          <div className="flex flex-col items-center text-center p-2 border-x border-stone-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs sm:text-sm flex items-center justify-center mb-1.5 border border-emerald-200">
              2
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-stone-800">Auto-Copied</p>
            <p className="text-[9px] sm:text-[10px] text-stone-400 hidden min-[360px]:block">Copies to clipboard</p>
          </div>

          <div className="flex flex-col items-center text-center p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-blue-600 font-black text-xs sm:text-sm flex items-center justify-center mb-1.5 border border-blue-200">
              3
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-stone-800">Paste & Post</p>
            <p className="text-[9px] sm:text-[10px] text-stone-400 hidden min-[360px]:block">On Google Maps</p>
          </div>
        </div>

        {/* Big Instant Shuffle Button */}
        <div className="mt-5">
          <button
            onClick={handlePickRandom}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#eb4d23] to-[#d43f16] hover:from-[#d43f16] hover:to-[#b8330e] text-white font-extrabold text-sm shadow-md shadow-[#eb4d23]/25 transition-all transform active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Pick a Random Review for Me (1-Click)</span>
          </button>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-5xl mx-auto px-4 mt-6 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All 50 Reviews" },
              { id: "gobindgarh", label: "📍 Gobindgarh" },
              { id: "burgers", label: "🍔 Burgers & Fries" },
              { id: "chinese", label: "🍜 Noodles & Chinese" },
              { id: "chaap", label: "🍢 Tandoori Chaap" },
              { id: "delivery", label: "🛵 Fast Delivery" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? "bg-[#020202] text-white border-[#020202] shadow-xs"
                    : "bg-white text-stone-700 border-[#ede8dc] hover:bg-stone-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by food or tag..."
              className="w-full text-xs font-semibold pl-9 pr-3 py-2 rounded-xl bg-white border border-[#ede8dc] focus:outline-none focus:border-[#eb4d23] shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-5xl mx-auto px-4 mt-6 w-full">
        <div className="flex items-center justify-between mb-3 text-xs text-stone-500 font-semibold">
          <span>Showing {filteredTemplates.length} templates</span>
          <span className="text-[#eb4d23]">⭐ Tap any card to copy & open Google</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTemplates.map((review) => {
            const isCopied = copiedId === review.id;
            return (
              <div
                key={review.id}
                onClick={() => handleSelectReview(review)}
                className={`group p-4 bg-white rounded-2xl sm:rounded-3xl border transition-all duration-200 flex flex-col justify-between cursor-pointer relative shadow-soft hover:shadow-md hover:border-[#eb4d23]/50 hover:-translate-y-0.5 ${
                  isCopied
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20"
                    : "border-[#ede8dc]"
                }`}
              >
                <div>
                  {/* Top: Tag + 5 Stars */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-[#eb4d23] border border-orange-200">
                      {review.tag}
                    </span>
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-[13px] text-stone-800 font-medium leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Bottom Action Indicator */}
                <div className="pt-3.5 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  {isCopied ? (
                    <span className="text-emerald-600 flex items-center gap-1 animate-pulse">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied! Opening Google...</span>
                    </span>
                  ) : (
                    <span className="text-stone-500 group-hover:text-[#eb4d23] flex items-center gap-1.5 transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                      <span>Tap to Copy & Review</span>
                    </span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#eb4d23] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#ede8dc] mt-4">
            <p className="text-sm font-bold text-stone-700">No review templates found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 px-4 py-2 bg-[#eb4d23] text-white text-xs font-bold rounded-xl"
            >
              Show All Reviews
            </button>
          </div>
        )}
      </section>

      {/* Floating Floating Google Reviews CTA at bottom for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noreferrer"
          className="w-full py-3.5 px-5 bg-[#020202] hover:bg-stone-900 text-white rounded-2xl shadow-xl border border-stone-800 flex items-center justify-between font-bold text-xs sm:text-sm cursor-pointer transition-all active:scale-95"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Already have your own text?</span>
          </div>
          <span className="flex items-center gap-1 text-[#eb4d23]">
            <span>Open Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </div>
  );
}
