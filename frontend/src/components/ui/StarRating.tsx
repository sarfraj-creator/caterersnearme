import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StarRating({
  rating,
  max = 5,
  size = "md",
  showValue = true,
  className,
}: StarRatingProps) {
  const clampedRating = Math.min(Math.max(rating, 0), max);
  const fullStars = Math.floor(clampedRating);
  const hasHalf = clampedRating - fullStars >= 0.25 && clampedRating - fullStars < 0.75;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className={cn("flex items-center gap-0.5 text-brand-400", sizeMap[size])}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalf && <FaStarHalfAlt />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </span>
      {showValue && (
        <span className={cn("font-semibold text-gray-700", sizeMap[size])}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
