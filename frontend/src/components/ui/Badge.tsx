import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "subtle";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-brand-100 text-brand-700": variant === "brand",
          "bg-orange-50 text-orange-600 border border-orange-200": variant === "subtle",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
