"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCaterers } from "@/lib/api";
import { useDebounce } from "./useDebounce";
import type { Caterer, FilterState } from "@/types";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  minPrice: "",
  maxPrice: "",
  cuisine: "",
  sortBy: "",
  order: "asc",
};

export function useCaterers() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce text fields to avoid hammering the API on every keystroke
  const debouncedSearch = useDebounce(filters.search, 400);
  const debouncedMin = useDebounce(filters.minPrice, 500);
  const debouncedMax = useDebounce(filters.maxPrice, 500);
  const debouncedCuisine = useDebounce(filters.cuisine, 400);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCaterers({
        search: debouncedSearch,
        minPrice: debouncedMin,
        maxPrice: debouncedMax,
        cuisine: debouncedCuisine,
        sortBy: filters.sortBy,
        order: filters.order,
      });
      setCaterers(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setCaterers([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, debouncedMin, debouncedMax, debouncedCuisine, filters.sortBy, filters.order]);

  useEffect(() => {
    load();
  }, [load]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.cuisine !== "" ||
    filters.sortBy !== "";

  return { caterers, loading, error, filters, updateFilter, resetFilters, hasActiveFilters, refetch: load };
}
