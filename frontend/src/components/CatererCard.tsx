"use client";

import { Caterer } from "@/types";
import { StarRating } from "./ui/StarRating";
import { Badge } from "./ui/Badge";
import { cn } from "@/lib/utils";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";

interface CatererCardProps {
  caterer: Caterer;
  style?: React.CSSProperties;
}

// A simple colour palette cycled per card for the top accent strip
const ACCENT_COLORS = [
  "bg-brand-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-rose-500",
];

function getAccentColor(id: string) {
  const charSum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return ACCENT_COLORS[charSum % ACCENT_COLORS.length];
}

export function CatererCard({ caterer, style }: CatererCardProps) {
  const accent = getAccentColor(caterer.id);

  return (
    <article
      style={style}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm",
        "hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-slide-up"
      )}
    >
      {/* Coloured top strip */}
      <div className={cn("h-1.5 w-full", accent)} />

      <div className="flex flex-col gap-3 p-5">
        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
            {caterer.name}
          </h2>
          <StarRating rating={caterer.rating} size="sm" className="shrink-0 mt-0.5" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <HiOutlineLocationMarker className="text-brand-400 shrink-0 text-base" />
          <span className="truncate">{caterer.location}</span>
        </div>

        {/* Cuisines */}
        <div className="flex items-start gap-1.5">
          <MdOutlineRestaurantMenu className="text-brand-400 shrink-0 text-base mt-0.5" />
          <div className="flex flex-wrap gap-1.5">
            {caterer.cuisines.slice(0, 4).map((cuisine) => (
              <Badge key={cuisine} variant="subtle">
                {cuisine}
              </Badge>
            ))}
            {caterer.cuisines.length > 4 && (
              <Badge variant="default">+{caterer.cuisines.length - 4} more</Badge>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100 mt-auto">
          <IoPricetagOutline className="text-brand-400 text-base" />
          <span className="text-sm text-gray-500">Price per plate</span>
          <span className="ml-auto text-base font-bold text-brand-600">
            ₹{caterer.pricePerPlate.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </article>
  );
}
