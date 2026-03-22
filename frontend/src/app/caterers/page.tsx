"use client";

import { useState } from "react";
import { useCaterers } from "@/hooks/useCaterers";
import { CatererCard } from "@/components/CatererCard";
import { SearchBar } from "@/components/SearchBar";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorBanner } from "@/components/ErrorBanner";
import { AddCatererModal } from "@/components/AddCatererModal";
import { Button } from "@/components/ui/Button";
import { HiPlus } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

export default function CaterersPage() {
  const { caterers, loading, error, filters, updateFilter, resetFilters, hasActiveFilters, refetch } =
    useCaterers();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddSuccess = () => {
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MdOutlineRestaurantMenu className="text-brand-500 text-xl" />
            <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
              Caterers Directory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Find Your Perfect Caterer
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Search, filter and compare top catering services across India
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="md" className="sm:self-auto self-start">
          <HiPlus />
          Add Caterer
        </Button>
      </div>

      {/* Filters */}
      <SearchBar
        filters={filters}
        onChange={updateFilter}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
        resultCount={caterers.length}
      />

      {/* Results area */}
      {error ? (
        <ErrorBanner message={error} onRetry={refetch} />
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : caterers.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} onReset={resetFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {caterers.map((caterer, idx) => (
            <CatererCard
              key={caterer.id}
              caterer={caterer}
              style={{ animationDelay: `${idx * 50}ms`, opacity: 0 }}
            />
          ))}
        </div>
      )}

      {/* Add Caterer Modal */}
      <AddCatererModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
