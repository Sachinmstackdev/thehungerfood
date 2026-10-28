import React from "react";

interface CategoryIconProps {
  id: string;
  className?: string;
  isActive?: boolean;
}

export default function CategoryIcon({ id, className = "w-6 h-6", isActive = false }: CategoryIconProps) {
  const strokeColor = isActive ? "#eb4d23" : "#44403c";
  const fillColor = isActive ? "rgba(235, 77, 35, 0.12)" : "rgba(0,0,0,0.03)";

  switch (id) {
    case "burgers":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Top Bun */}
          <path d="M4 11a8 8 0 0 1 16 0H4z" fill={fillColor} />
          {/* Sesame seeds */}
          <circle cx="9" cy="7" r="0.6" fill={strokeColor} stroke="none" />
          <circle cx="12" cy="5.5" r="0.6" fill={strokeColor} stroke="none" />
          <circle cx="15" cy="7.2" r="0.6" fill={strokeColor} stroke="none" />
          {/* Cheese / Patty */}
          <path d="M3 14h18" strokeWidth="2.2" stroke={strokeColor} />
          <path d="M5 14l2 3 3-2 3 2 3-2 3 2" />
          {/* Bottom Bun */}
          <path d="M5 17a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3H5z" fill={fillColor} />
        </svg>
      );

    case "noodles":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Bowl */}
          <path d="M3 11a9 9 0 0 0 18 0H3z" fill={fillColor} />
          {/* Base */}
          <path d="M9 20h6" />
          {/* Wavy noodles rising */}
          <path d="M7 11V7c0-1 1-2 2-2s2 1 2 2v4" />
          <path d="M12 11V6c0-1 1-2 2-2s2 1 2 2v5" />
          {/* Chopsticks */}
          <path d="M18 3L9 11" strokeWidth="1.5" />
          <path d="M21 3L11 11" strokeWidth="1.5" />
        </svg>
      );

    case "chinese":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Hot Wok */}
          <path d="M2 13c1.5 6 6 8 10 8s8.5-2 10-8H2z" fill={fillColor} />
          <path d="M2 13h20" strokeWidth="2" />
          {/* Handles */}
          <path d="M1 11a2 2 0 0 1 2-2" />
          <path d="M23 11a2 2 0 0 0-2-2" />
          {/* Sizzling steam */}
          <path d="M8 8c0-1.5 1-2.5 1-3.5" />
          <path d="M12 7c0-1.5 1-2 1-3" />
          <path d="M16 8c0-1.5 1-2.5 1-3.5" />
        </svg>
      );

    case "fries":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Fries Box */}
          <path d="M6 10l1.5 11h9l1.5-11" fill={fillColor} />
          <path d="M5 10c2 2 4 2 7 0 3 2 5 2 7 0" strokeWidth="1.8" />
          {/* French Fries Sticks */}
          <path d="M8 10V4h2v6" fill={fillColor} />
          <path d="M11 10V2h2v8" fill={fillColor} />
          <path d="M14 10V5h2v5" fill={fillColor} />
        </svg>
      );

    case "chaap":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Skewer stick */}
          <path d="M3 21l6-6" strokeWidth="2.2" stroke={strokeColor} />
          {/* Tandoori chaap chunks */}
          <circle cx="11" cy="13" r="3" fill={fillColor} />
          <circle cx="15" cy="9" r="3" fill={fillColor} />
          <circle cx="19" cy="5" r="2.5" fill={fillColor} />
          {/* Grill marks */}
          <path d="M9.5 12.5l3-1" strokeWidth="1.2" />
          <path d="M13.5 8.5l3-1" strokeWidth="1.2" />
          <path d="M17.5 4.5l3-1" strokeWidth="1.2" />
        </svg>
      );

    case "sandwiches":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Toasted Triangle Sandwich */}
          <path d="M3 18L19 4v14H3z" fill={fillColor} />
          <path d="M19 18l2 2V8l-2-4" />
          <path d="M6 18l10-9" strokeWidth="1.2" />
          <path d="M10 18l6-5" strokeWidth="1.2" />
          {/* Cheese slice dripping */}
          <path d="M11 11l-2 3 3 1" />
        </svg>
      );

    case "all":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill={fillColor} />
          <path d="M12 7v10" strokeDasharray="2 2" />
          {/* Fork */}
          <path d="M7 8v4a2 2 0 0 0 2 2v5" />
          <path d="M6 8v3" />
          <path d="M8 8v3" />
          {/* Knife */}
          <path d="M16 8v11" />
          <path d="M16 8c1 0 2 1 2 3v3h-2" />
        </svg>
      );
  }
}
