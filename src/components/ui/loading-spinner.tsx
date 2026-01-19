// Hanya Spinner, tanpa Button wrapper
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "gray" | "blue" | "white";
}

export function LoadingSpinner({
  className,
  size = "md",
  color = "gray",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-8 h-8 border-3",
  };

  const colorClasses = {
    gray: "border-gray-300 border-t-gray-600",
    blue: "border-blue-200 border-t-blue-600",
    white: "border-white/30 border-t-white",
  };

  return (
    <div
      className={cn(
        "rounded-full animate-spin inline-block",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
