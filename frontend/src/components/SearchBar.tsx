"use client";

import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FilterState } from "@/types";
import { Select } from "./ui/Select";
import { HiSearch, HiX } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

interface SearchBarProps {
  filters: FilterState;
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "pricePerPlate", label: "Price" },
  { value: "rating", label: "Rating" },
  { value: "name", label: "Name" },
];

const ORDER_OPTIONS = [
  { value: "asc", label: "Low → High" },
  { value: "desc", label: "High → Low" },
];

export function SearchBar({ filters, onChange, onReset, hasActiveFilters, resultCount }: SearchBarProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 flex flex-col gap-4">
      {/* Top row: search + cuisine */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="search"
          placeholder="Search caterers by name…"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          icon={<HiSearch />}
          aria-label="Search by name"
        />
        <Input
          id="cuisine"
          placeholder="Filter by cuisine (e.g. Mughlai)"
          value={filters.cuisine}
          onChange={(e) => onChange("cuisine", e.target.value)}
          icon={<MdOutlineRestaurantMenu />}
          aria-label="Filter by cuisine"
        />
      </div>

      {/* Bottom row: price range + sort */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <Input
          id="minPrice"
          type="number"
          placeholder="Min ₹"
          min={0}
          value={filters.minPrice}
          onChange={(e) => onChange("minPrice", e.target.value)}
          label="Min price"
          aria-label="Minimum price"
        />
        <Input
          id="maxPrice"
          type="number"
          placeholder="Max ₹"
          min={0}
          value={filters.maxPrice}
          onChange={(e) => onChange("maxPrice", e.target.value)}
          label="Max price"
          aria-label="Maximum price"
        />
        <Select
          id="sortBy"
          label="Sort by"
          options={SORT_OPTIONS}
          value={filters.sortBy}
          onChange={(e) => onChange("sortBy", e.target.value as FilterState["sortBy"])}
        />
        <Select
          id="order"
          label="Order"
          options={ORDER_OPTIONS}
          value={filters.order}
          onChange={(e) => onChange("order", e.target.value as FilterState["order"])}
          disabled={!filters.sortBy}
        />
      </div>

      {/* Result count + reset */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{resultCount}</span>{" "}
          {resultCount === 1 ? "caterer" : "caterers"} found
        </p>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <HiX />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
