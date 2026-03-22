import { Button } from "./ui/Button";
import { HiSearch } from "react-icons/hi";

interface EmptyStateProps {
  hasFilters: boolean;
  onReset: () => void;
}

export function EmptyState({ hasFilters, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-400 text-3xl">
        <HiSearch />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-800">No caterers found</p>
        <p className="text-sm text-gray-500 mt-1">
          {hasFilters
            ? "Try adjusting your search or filters to find caterers."
            : "No caterers are available at the moment."}
        </p>
      </div>
      {hasFilters && (
        <Button variant="secondary" size="sm" onClick={onReset}>
          Clear all filters
        </Button>
      )}
    </div>
  );
}
