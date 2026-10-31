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
} from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CUx5tiquTRdrEBM/review";

export type ReviewCategory =
  | "all"
  | "burgers"
  | "noodles"
  | "manchurian"
  | "chaap"
  | "fries"
  | "sandwiches";

interface ReviewTemplate {
  id: number;
  category: "burgers" | "noodles" | "manchurian" | "chaap" | "fries" | "sandwiches";
  tag: string;
  stars: number;
  text: string;
}

const REVIEW_TEMPLATES: ReviewTemplate[] = [
  // ------------------ BURGER (1-17) ------------------
  {
    id: 1,
    category: "burgers",
    tag: "Double Tikki",
    stars: 5,
    text: "Double Tikki Burger try kiya, do patty ke saath kaafi filling tha. Price ke hisaab se badhiya deal.",
  },
  {
    id: 2,
    category: "burgers",
    tag: "₹30 Veg Burger",
    stars: 5,
    text: "Gobindgarh mein ₹30 mein itna accha veg burger milna mushkil hai. Bun soft tha aur garam mila.",
  },
  {
    id: 3,
    category: "burgers",
    tag: "Maharaja Burger",
    stars: 5,
    text: "Maharaja Burger sach mein bada hai, ek se pet bhar gaya. Sauce thoda aur hota toh perfect.",
  },
  {
    id: 4,
    category: "burgers",
    tag: "Kurkure Burger",
    stars: 5,
    text: "Kurkure Burger ka crunch alag hi level ka hai. Bachon ko bahut pasand aaya.",
  },
  {
    id: 5,
    category: "burgers",
    tag: "Cheese Burger",
    stars: 5,
    text: "Cheese Burger mein cheese achhi quantity mein tha. Order WhatsApp pe kiya, time pe aa gaya.",
  },
  {
    id: 6,
    category: "burgers",
    tag: "Friends Hangout",
    stars: 5,
    text: "College ke baad dosto ke saath aaye, sabne alag alag burger liye. Sab fresh bane hue the.",
  },
  {
    id: 7,
    category: "burgers",
    tag: "Loaded Burger",
    stars: 5,
    text: "Loaded Burger ki toppings acchi thi. Thoda spicy pasand ho toh ye zaroor try karo.",
  },
  {
    id: 8,
    category: "burgers",
    tag: "Fast Delivery",
    stars: 5,
    text: "Website se order karna easy laga, burger 30 minute mein ghar pe tha.",
  },
  {
    id: 9,
    category: "burgers",
    tag: "Daily Snack",
    stars: 5,
    text: "Simple veg burger, simple price, taste bhi theek thaak se upar. Roz ke snack ke liye sahi jagah.",
  },
  {
    id: 10,
    category: "burgers",
    tag: "Burger & Fries Combo",
    stars: 5,
    text: "Double Tikki Burger aur fries ka combo liya. Combo mein paise bachte hain aur portion bhi accha hai.",
  },
  {
    id: 11,
    category: "burgers",
    tag: "Garam & Crispy",
    stars: 5,
    text: "Burger garam aur crispy aaya, packing bhi saaf thi. Delivery wale bhaiya ka behaviour bhi accha tha.",
  },
  {
    id: 12,
    category: "burgers",
    tag: "Quick Service",
    stars: 5,
    text: "Shaam ko bhook lagi toh yahan aaye. Burger turant bana diya, wait zyada nahi karna pada.",
  },
  {
    id: 13,
    category: "burgers",
    tag: "Heavy Size",
    stars: 5,
    text: "Maharaja Burger dekh ke laga itna bada kaise khayenge, par khatam ho gaya. Taste mast tha.",
  },
  {
    id: 14,
    category: "burgers",
    tag: "Cheese Lovers",
    stars: 5,
    text: "Cheese Burger thoda aur cheesy ho sakta tha, baaki sab badhiya. Phir aayenge.",
  },
  {
    id: 15,
    category: "burgers",
    tag: "Weekly Favorite",
    stars: 5,
    text: "Kurkure Burger mera favourite ban gaya hai. Hafte mein ek baar toh order hota hi hai.",
  },
  {
    id: 16,
    category: "burgers",
    tag: "Family Order",
    stars: 5,
    text: "Family ke liye 4 burger order kiye, sab ek jaise fresh the. Total bill bhi kam aaya.",
  },
  {
    id: 17,
    category: "burgers",
    tag: "Budget Best",
    stars: 5,
    text: "Gobindgarh mein budget burger chahiye toh The Hunger Food best option hai.",
  },

  // ------------------ NOODLES (18-34) ------------------
  {
    id: 18,
    category: "noodles",
    tag: "Hakka Noodles",
    stars: 5,
    text: "Hakka Noodles ekdum street style wale, wok ki khushboo aa rahi thi. Quantity bhi achhi.",
  },
  {
    id: 19,
    category: "noodles",
    tag: "Garlic Noodles",
    stars: 5,
    text: "Garlic Noodles try kiye, garlic ka flavour strong tha jo mujhe pasand hai.",
  },
  {
    id: 20,
    category: "noodles",
    tag: "Special Noodles",
    stars: 5,
    text: "Special Noodles full plate do logon ke liye kaafi thi. Thodi spicy thi, maza aaya.",
  },
  {
    id: 21,
    category: "noodles",
    tag: "Fresh Veggies",
    stars: 5,
    text: "Veg Noodles mein sabziyan fresh thi aur noodles chipke hue nahi the.",
  },
  {
    id: 22,
    category: "noodles",
    tag: "Late Night Cravings",
    stars: 5,
    text: "Raat 10 baje order kiya, phir bhi garam noodles aaye. Late night ke liye bhi sahi.",
  },
  {
    id: 23,
    category: "noodles",
    tag: "Noodles & Manchurian",
    stars: 5,
    text: "Hakka Noodles aur Manchurian saath mein order karo, combo set hai.",
  },
  {
    id: 24,
    category: "noodles",
    tag: "Chatpata Flavor",
    stars: 5,
    text: "Noodles ka taste ghar jaisa nahi, bilkul bahar wala chatpata. Wahi chahiye tha.",
  },
  {
    id: 25,
    category: "noodles",
    tag: "Garlic Loaded",
    stars: 5,
    text: "Garlic Noodles mein thoda namak zyada laga, baaki taste aur portion dono badhiya.",
  },
  {
    id: 26,
    category: "noodles",
    tag: "Custom Spices",
    stars: 5,
    text: "Bachon ke liye kam teekha bolke order kiya, unhone waisa hi bana ke bheja. Accha laga.",
  },
  {
    id: 27,
    category: "noodles",
    tag: "Gobindgarh Choice",
    stars: 5,
    text: "Gobindgarh mein noodles ke liye ab yahi jagah fix hai.",
  },
  {
    id: 28,
    category: "noodles",
    tag: "Full Worth",
    stars: 5,
    text: "Special Noodles ki price thodi zyada lagi pehle, par quantity dekh ke worth it hai.",
  },
  {
    id: 29,
    category: "noodles",
    tag: "WhatsApp Order",
    stars: 5,
    text: "WhatsApp pe order kiya, unhone turant confirm kiya aur time bhi bata diya.",
  },
  {
    id: 30,
    category: "noodles",
    tag: "₹80 Veg Noodles",
    stars: 5,
    text: "Veg Noodles ₹80 mein itni achhi plate, students ke liye perfect.",
  },
  {
    id: 31,
    category: "noodles",
    tag: "Spill-Proof Packing",
    stars: 5,
    text: "Noodles garam aur fresh the, packing mein bhi leak nahi hua.",
  },
  {
    id: 32,
    category: "noodles",
    tag: "Perfect Sauce Balance",
    stars: 5,
    text: "Hakka Noodles mein soya sauce ka balance sahi tha, na zyada na kam.",
  },
  {
    id: 33,
    category: "noodles",
    tag: "Live Wok Tossed",
    stars: 5,
    text: "Dukaan pe baith ke khaye, saamne hi wok pe bana rahe the. Fresh dekh ke bharosa hua.",
  },
  {
    id: 34,
    category: "noodles",
    tag: "Friends Meal",
    stars: 5,
    text: "Doston ke saath 3 plate noodles khatam kar di. Dobara zaroor aayenge.",
  },

  // ------------------ MANCHURIAN (35-50) ------------------
  {
    id: 35,
    category: "manchurian",
    tag: "Thick Gravy",
    stars: 5,
    text: "Manchurian ki gravy thick aur tasty thi. Balls andar tak soft the.",
  },
  {
    id: 36,
    category: "manchurian",
    tag: "Half Plate ₹50",
    stars: 5,
    text: "Half plate Manchurian ₹50 mein, chhoti bhook ke liye perfect.",
  },
  {
    id: 37,
    category: "manchurian",
    tag: "Full Plate Shareable",
    stars: 5,
    text: "Full plate Manchurian do log aaram se kha sakte hain. Spice level medium tha.",
  },
  {
    id: 38,
    category: "manchurian",
    tag: "Classic Chinese Combo",
    stars: 5,
    text: "Manchurian aur Hakka Noodles ka combo liya, dono garam aaye. Full satisfied.",
  },
  {
    id: 39,
    category: "manchurian",
    tag: "Dry Manchurian",
    stars: 5,
    text: "Dry Manchurian thoda aur crispy hota toh aur maza aata. Taste phir bhi accha tha.",
  },
  {
    id: 40,
    category: "manchurian",
    tag: "Best in Gobindgarh",
    stars: 5,
    text: "Gobindgarh mein itni sasti aur tasty Manchurian pehli baar khayi.",
  },
  {
    id: 41,
    category: "manchurian",
    tag: "Ginger Garlic Aroma",
    stars: 5,
    text: "Gravy mein garlic aur adrak ka flavour achha aaya. Chawal ke saath bhi try karunga.",
  },
  {
    id: 42,
    category: "manchurian",
    tag: "25 Min Delivery",
    stars: 5,
    text: "Shaam ke snack ke liye Manchurian order kiya, 25 minute mein aa gaya.",
  },
  {
    id: 43,
    category: "manchurian",
    tag: "Sunday Routine",
    stars: 5,
    text: "Ghar pe sabko pasand aayi, ab har Sunday yahin se mangwate hain.",
  },
  {
    id: 44,
    category: "manchurian",
    tag: "Family Favorite",
    stars: 5,
    text: "Manchurian thodi meethi lagi mujhe, par family ko yahi pasand aaya.",
  },
  {
    id: 45,
    category: "manchurian",
    tag: "Non-Greasy & Fresh",
    stars: 5,
    text: "Fresh bani hui thi, tel zyada nahi tha. Pet bhi heavy nahi hua.",
  },
  {
    id: 46,
    category: "manchurian",
    tag: "Clean Kitchen",
    stars: 5,
    text: "Dukaan saaf suthri hai aur Manchurian saamne hi bana ke dete hain.",
  },
  {
    id: 47,
    category: "manchurian",
    tag: "Clear Pricing",
    stars: 5,
    text: "Website pe menu dekh ke order kiya, price saaf likhe the. Koi confusion nahi.",
  },
  {
    id: 48,
    category: "manchurian",
    tag: "Portion & Value",
    stars: 5,
    text: "Manchurian Full plate ki quantity price ke hisaab se badhiya hai.",
  },
  {
    id: 49,
    category: "manchurian",
    tag: "Extra Spicy Kick",
    stars: 5,
    text: "Teekha pasand hai toh extra chilli bolna, wo bana dete hain.",
  },
  {
    id: 50,
    category: "manchurian",
    tag: "Fries & Manchurian",
    stars: 5,
    text: "Manchurian ke saath fries bhi liye, dono crispy aur garam.",
  },

  // ------------------ KURKURE CHAAP (51-67) ------------------
  {
    id: 51,
    category: "chaap",
    tag: "Signature Kurkure Chaap",
    stars: 5,
    text: "Kurkure Chaap bahar se crunchy aur andar se soft. Is shop ki best cheez yahi hai.",
  },
  {
    id: 52,
    category: "chaap",
    tag: "Chaap Lover's Must",
    stars: 5,
    text: "Chaap lover ho toh Kurkure Chaap miss mat karna. Chutney ke saath aur bhi achhi lagti hai.",
  },
  {
    id: 53,
    category: "chaap",
    tag: "Gobindgarh Top Chaap",
    stars: 5,
    text: "Gobindgarh mein Kurkure Chaap ke liye ye jagah sabse sahi lagi.",
  },
  {
    id: 54,
    category: "chaap",
    tag: "Top Recommendation",
    stars: 5,
    text: "Pehli baar Kurkure Chaap khayi, ab doston ko bhi yahi recommend karta hoon.",
  },
  {
    id: 55,
    category: "chaap",
    tag: "Big Portion",
    stars: 5,
    text: "Plate mein pieces kaafi the, do log share kar sakte hain.",
  },
  {
    id: 56,
    category: "chaap",
    tag: "Fresh & Balanced",
    stars: 5,
    text: "Chaap fresh fry karke di, tel ki smell nahi thi. Masala bhi balanced.",
  },
  {
    id: 57,
    category: "chaap",
    tag: "Special Chaap",
    stars: 5,
    text: "Special Chaap bhi try ki, par mujhe Kurkure Chaap zyada pasand aayi.",
  },
  {
    id: 58,
    category: "chaap",
    tag: "Crispy Crunch",
    stars: 5,
    text: "Thodi aur spicy hoti toh mere liye perfect hoti. Crunch ekdum badhiya.",
  },
  {
    id: 59,
    category: "chaap",
    tag: "Party Hit",
    stars: 5,
    text: "Ghar pe party thi, 3 plate Kurkure Chaap mangwayi. Sab khatam ho gayi.",
  },
  {
    id: 60,
    category: "chaap",
    tag: "Chaap Fry",
    stars: 5,
    text: "Chaap Fry bhi achhi hai, par Kurkure Chaap ka crunch alag hai.",
  },
  {
    id: 61,
    category: "chaap",
    tag: "Hot on Delivery",
    stars: 5,
    text: "WhatsApp pe order kiya aur 30 minute mein garam chaap ghar pe thi.",
  },
  {
    id: 62,
    category: "chaap",
    tag: "₹150 Value Deal",
    stars: 5,
    text: "₹150 mein itni tasty chaap, price bilkul theek hai.",
  },
  {
    id: 63,
    category: "chaap",
    tag: "Pure Veg Delight",
    stars: 5,
    text: "Veg logon ke liye chaap best option hai, aur yahan ki chaap acchi bani hoti hai.",
  },
  {
    id: 64,
    category: "chaap",
    tag: "Crispy Packaging",
    stars: 5,
    text: "Delivery mein thoda late hua, par chaap phir bhi crispy thi. Packing acchi thi.",
  },
  {
    id: 65,
    category: "chaap",
    tag: "Dine-in Fresh",
    stars: 5,
    text: "Shaam ko dukaan pe khayi, garam garam plate turant mil gayi.",
  },
  {
    id: 66,
    category: "chaap",
    tag: "Chaap & Tandoori Fries",
    stars: 5,
    text: "Kurkure Chaap aur Tandoori Fries saath mein lo, combo zabardast hai.",
  },
  {
    id: 67,
    category: "chaap",
    tag: "Weekly Habit",
    stars: 5,
    text: "Har hafte ek baar yahan se chaap aati hai ghar pe. Taste kabhi change nahi hua.",
  },

  // ------------------ FRIES (68-83) ------------------
  {
    id: 68,
    category: "fries",
    tag: "French Fries",
    stars: 5,
    text: "French Fries crispy aur garam the, namak bhi sahi tha.",
  },
  {
    id: 69,
    category: "fries",
    tag: "Tandoori Fries",
    stars: 5,
    text: "Tandoori Fries ka masala mast hai. Normal fries se zyada tasty.",
  },
  {
    id: 70,
    category: "fries",
    tag: "Half Plate ₹30",
    stars: 5,
    text: "Half plate fries ₹30 mein, burger ke saath perfect side.",
  },
  {
    id: 71,
    category: "fries",
    tag: "Always Crunchy",
    stars: 5,
    text: "Fries delivery ke baad bhi soft nahi hue, ye dekh ke accha laga.",
  },
  {
    id: 72,
    category: "fries",
    tag: "Kids Favorite",
    stars: 5,
    text: "Bachon ke liye Full plate fries li, sabne khushi se khayi.",
  },
  {
    id: 73,
    category: "fries",
    tag: "Spicy Tandoori",
    stars: 5,
    text: "Tandoori Fries thode aur spicy ho sakte the, baaki sab badhiya.",
  },
  {
    id: 74,
    category: "fries",
    tag: "Gobindgarh Fries",
    stars: 5,
    text: "Gobindgarh mein crispy fries chahiye toh yahan try karo.",
  },
  {
    id: 75,
    category: "fries",
    tag: "Sauces & Ketchup",
    stars: 5,
    text: "Fries ke saath ketchup achhi quantity mein diya, chhoti baat par acchi lagi.",
  },
  {
    id: 76,
    category: "fries",
    tag: "Movie Night Snack",
    stars: 5,
    text: "Doston ke saath movie dekhte hue fries aur burger mangwaye. Time pe aa gaya.",
  },
  {
    id: 77,
    category: "fries",
    tag: "Freshly Fried",
    stars: 5,
    text: "Fries fresh fry karke diye, purane wale nahi lage.",
  },
  {
    id: 78,
    category: "fries",
    tag: "Regular Order",
    stars: 5,
    text: "Tandoori Fries aur Kurkure Burger, mera regular order ban gaya hai.",
  },
  {
    id: 79,
    category: "fries",
    tag: "Full Plate Value",
    stars: 5,
    text: "Full plate fries ki quantity price ke hisaab se zyada hai. Worth it.",
  },
  {
    id: 80,
    category: "fries",
    tag: "Website Order",
    stars: 5,
    text: "Website se order kiya, fries aur noodles dono garam pahunche.",
  },
  {
    id: 81,
    category: "fries",
    tag: "Crispy Finger Bites",
    stars: 5,
    text: "Fries thode oily lage is baar, baaki taste theek tha. Phir bhi aayenge.",
  },
  {
    id: 82,
    category: "fries",
    tag: "5 Minute Ready",
    stars: 5,
    text: "Dukaan pe khade khade fries kha liye, 5 minute mein ready the.",
  },
  {
    id: 83,
    category: "fries",
    tag: "Chef Special Fries",
    stars: 5,
    text: "Tandoori Fries yahan ki special cheez hai. Ek baar zaroor try karo.",
  },

  // ------------------ SANDWICH (84-100) ------------------
  {
    id: 84,
    category: "sandwiches",
    tag: "Paneer Grilled",
    stars: 5,
    text: "Paneer Sandwich mein paneer ki filling kaafi thi. Toast bhi achha hua tha.",
  },
  {
    id: 85,
    category: "sandwiches",
    tag: "Cheese Melt",
    stars: 5,
    text: "Cheese Sandwich garam aaya, cheese pighla hua tha. Breakfast ke liye best.",
  },
  {
    id: 86,
    category: "sandwiches",
    tag: "₹60 Veg Sandwich",
    stars: 5,
    text: "Veg Sandwich ₹60 mein, sabziyan fresh aur chutney tasty.",
  },
  {
    id: 87,
    category: "sandwiches",
    tag: "Morning Office Snack",
    stars: 5,
    text: "Subah office jaane se pehle sandwich order kiya, time pe mil gaya.",
  },
  {
    id: 88,
    category: "sandwiches",
    tag: "Spicy Paneer",
    stars: 5,
    text: "Paneer Sandwich thoda aur spicy hota toh perfect, baaki bahut badhiya.",
  },
  {
    id: 89,
    category: "sandwiches",
    tag: "Gobindgarh Grilled",
    stars: 5,
    text: "Gobindgarh mein grilled sandwich ke liye ye jagah try karo.",
  },
  {
    id: 90,
    category: "sandwiches",
    tag: "Sandwich & Fries",
    stars: 5,
    text: "Cheese Sandwich aur fries ka combo liya, halka aur tasty khana.",
  },
  {
    id: 91,
    category: "sandwiches",
    tag: "Crispy Toast",
    stars: 5,
    text: "Sandwich ki packing acchi thi, ghar tak garam aur crispy raha.",
  },
  {
    id: 92,
    category: "sandwiches",
    tag: "Tiffin Favorite",
    stars: 5,
    text: "Bachon ke tiffin ke liye Veg Sandwich mangwaya, unhe bahut pasand aaya.",
  },
  {
    id: 93,
    category: "sandwiches",
    tag: "Stuffed Paneer",
    stars: 5,
    text: "Paneer Sandwich ki price thodi zyada lagi, par filling dekh ke theek hai.",
  },
  {
    id: 94,
    category: "sandwiches",
    tag: "Live Grilled",
    stars: 5,
    text: "Dukaan pe baith ke sandwich khaya, saamne hi grill kiya. Fresh tha.",
  },
  {
    id: 95,
    category: "sandwiches",
    tag: "Cheesy Snack",
    stars: 5,
    text: "Cheese Sandwich mein cheese thoda kam laga is baar, baaki taste sahi.",
  },
  {
    id: 96,
    category: "sandwiches",
    tag: "Easy WhatsApp Order",
    stars: 5,
    text: "WhatsApp pe order karna aasan hai, menu se seedha cart mein daal do.",
  },
  {
    id: 97,
    category: "sandwiches",
    tag: "Sandwich & Noodles",
    stars: 5,
    text: "Sandwich aur noodles dono mangwaye, dono ka taste accha tha.",
  },
  {
    id: 98,
    category: "sandwiches",
    tag: "Evening Chai Partner",
    stars: 5,
    text: "Shaam ki chai ke saath Veg Sandwich, simple aur accha.",
  },
  {
    id: 99,
    category: "sandwiches",
    tag: "Consistent Taste",
    stars: 5,
    text: "Paneer Sandwich ab mera regular order hai. Har baar same taste milta hai.",
  },
  {
    id: 100,
    category: "sandwiches",
    tag: "All-Rounder Menu",
    stars: 5,
    text: "Saare items try kar liye hain, sandwich bhi utna hi accha jitna burger. Overall bahut badhiya shop.",
  },
];

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ReviewCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Filter templates based on category & search
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

  // Handle Copy & Auto-Redirect to Google Review
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

      // 400ms delay so user sees "Copied!" feedback before opening Google Reviews
      setTimeout(() => {
        window.open(GOOGLE_REVIEW_URL, "_blank");
      }, 400);

      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    } catch {
      // If clipboard throws security warning, still redirect to Google
      window.open(GOOGLE_REVIEW_URL, "_blank");
    }
  };

  // Pick Random Review from currently selected category or all
  const handlePickRandom = () => {
    const pool = filteredTemplates.length > 0 ? filteredTemplates : REVIEW_TEMPLATES;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];
    handleSelectReview(chosen);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#020202] flex flex-col justify-start pb-24 selection:bg-[#eb4d23] selection:text-white">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#ede8dc]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-700 hover:text-[#eb4d23] font-bold text-xs sm:text-sm transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-[#ede8dc] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <ArrowLeft className="w-4 h-4 text-stone-600 group-hover:text-[#eb4d23]" />
            </div>
            <span>Back to Menu</span>
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
          <span>Love Our Food? Share a 5-Star Review on Google!</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#020202] font-heading tracking-tight max-w-2xl mx-auto leading-tight">
          1-Tap Google Review Generator for <span className="text-[#eb4d23]">The Hunger Food</span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mt-2 leading-relaxed">
          Choose a category below and tap any review card. The text will <strong>automatically copy to your clipboard</strong> and open our Google Review page so you can just paste and submit!
        </p>

        {/* 3 Step Interactive Workflow Card */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-5 p-3 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-[#ede8dc] shadow-soft">
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-50 text-[#eb4d23] font-black text-xs sm:text-sm flex items-center justify-center mb-1.5 border border-orange-200">
              1
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-stone-800">Tap Any Card</p>
            <p className="text-[9px] sm:text-[10px] text-stone-400 hidden min-[360px]:block">100 real reviews</p>
          </div>

          <div className="flex flex-col items-center text-center p-2 border-x border-stone-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs sm:text-sm flex items-center justify-center mb-1.5 border border-emerald-200">
              2
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-stone-800">Auto-Copied</p>
            <p className="text-[9px] sm:text-[10px] text-stone-400 hidden min-[360px]:block">To your phone clipboard</p>
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
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#eb4d23] to-[#d43f16] hover:from-[#d43f16] hover:to-[#b8330e] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#eb4d23]/25 transition-all transform active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Pick a Random Review for Me (1-Tap Copy & Open)</span>
          </button>
        </div>
      </section>

      {/* Category Pills & Search */}
      <section className="max-w-5xl mx-auto px-4 mt-6 w-full">
        <div className="flex flex-col gap-3">
          {/* Scrollable Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All Reviews (100)", count: 100 },
              { id: "burgers", label: "🍔 Burger (17)", count: 17 },
              { id: "noodles", label: "🍜 Noodles (17)", count: 17 },
              { id: "manchurian", label: "🥣 Manchurian (16)", count: 16 },
              { id: "chaap", label: "🍢 Kurkure Chaap (17)", count: 17 },
              { id: "fries", label: "🍟 Fries (16)", count: 16 },
              { id: "sandwiches", label: "🥪 Sandwich (17)", count: 17 },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ReviewCategory)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? "bg-[#020202] text-white border-[#020202] shadow-sm scale-[1.02]"
                    : "bg-white text-stone-700 border-[#ede8dc] hover:bg-stone-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in 100 reviews (e.g. Maharaja, Garlic Noodles, Tandoori Fries, Gobindgarh)..."
              className="w-full text-xs font-semibold pl-10 pr-3 py-2.5 rounded-xl bg-white border border-[#ede8dc] focus:outline-none focus:border-[#eb4d23] shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-5xl mx-auto px-4 mt-5 w-full">
        <div className="flex items-center justify-between mb-3 text-xs text-stone-500 font-semibold">
          <span>Showing <strong>{filteredTemplates.length}</strong> reviews</span>
          <span className="text-[#eb4d23] font-bold">⭐ Tap any review to copy & redirect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  {/* Top Bar: Review #ID + Tag + 5 Stars */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-black flex items-center justify-center">
                        #{review.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-[#eb4d23] border border-orange-200">
                        {review.tag}
                      </span>
                    </div>
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Hindi / Hinglish Text */}
                  <p className="text-xs sm:text-[13px] text-stone-800 font-medium leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Bottom Action Prompt */}
                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  {isCopied ? (
                    <span className="text-emerald-600 flex items-center gap-1 animate-pulse">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied! Opening Google...</span>
                    </span>
                  ) : (
                    <span className="text-stone-500 group-hover:text-[#eb4d23] flex items-center gap-1.5 transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                      <span>Tap to Copy & Paste</span>
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
            <p className="text-sm font-bold text-stone-700">No reviews found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 px-4 py-2 bg-[#eb4d23] text-white text-xs font-bold rounded-xl"
            >
              Show All 100 Reviews
            </button>
          </div>
        )}
      </section>

      {/* Floating Sticky Mobile CTA at Bottom */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noreferrer"
          className="w-full py-3.5 px-5 bg-[#020202] hover:bg-stone-900 text-white rounded-2xl shadow-xl border border-stone-800 flex items-center justify-between font-bold text-xs sm:text-sm cursor-pointer transition-all active:scale-95"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Already have your text?</span>
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
