"use client";

import { useState, useRef, useEffect } from "react";
import { createCaterer } from "@/lib/api";
import { NewCatererForm } from "@/types";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { HiX } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

interface AddCatererModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EMPTY_FORM: NewCatererForm = {
  name: "",
  location: "",
  pricePerPlate: "",
  cuisines: "",
  rating: "",
};

export function AddCatererModal({ open, onClose, onSuccess }: AddCatererModalProps) {
  const [form, setForm] = useState<NewCatererForm>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<NewCatererForm>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setFieldErrors({});
      setSubmitError(null);
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const setField = (key: keyof NewCatererForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errors: Partial<NewCatererForm> = {};

    if (!form.name.trim() || form.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters.";
    if (!form.location.trim() || form.location.trim().length < 2)
      errors.location = "Location must be at least 2 characters.";

    const price = parseFloat(form.pricePerPlate);
    if (!form.pricePerPlate || isNaN(price) || price <= 0)
      errors.pricePerPlate = "Enter a valid price greater than 0.";

    if (!form.cuisines.trim())
      errors.cuisines = "Enter at least one cuisine.";

    const rating = parseFloat(form.rating);
    if (!form.rating || isNaN(rating) || rating < 0 || rating > 5)
      errors.rating = "Rating must be between 0 and 5.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await createCaterer(form);
      onSuccess();
      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to add caterer.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 flex flex-col gap-5 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdOutlineRestaurantMenu className="text-brand-500 text-xl" />
            <h2 id="modal-title" className="text-lg font-bold text-gray-900">
              Add New Caterer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <HiX className="text-lg" />
          </button>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-3">
          <Input
            ref={firstInputRef}
            id="add-name"
            label="Caterer Name *"
            placeholder="e.g. Royal Feast Caterers"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            error={fieldErrors.name}
          />
          <Input
            id="add-location"
            label="Location *"
            placeholder="e.g. Mumbai, Maharashtra"
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            error={fieldErrors.location}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="add-price"
              label="Price per Plate (₹) *"
              type="number"
              placeholder="e.g. 850"
              min={1}
              value={form.pricePerPlate}
              onChange={(e) => setField("pricePerPlate", e.target.value)}
              error={fieldErrors.pricePerPlate}
            />
            <Input
              id="add-rating"
              label="Rating (0–5) *"
              type="number"
              placeholder="e.g. 4.5"
              step={0.1}
              min={0}
              max={5}
              value={form.rating}
              onChange={(e) => setField("rating", e.target.value)}
              error={fieldErrors.rating}
            />
          </div>
          <Input
            id="add-cuisines"
            label="Cuisines * (comma-separated)"
            placeholder="e.g. North Indian, Mughlai, Chinese"
            value={form.cuisines}
            onChange={(e) => setField("cuisines", e.target.value)}
            error={fieldErrors.cuisines}
          />
        </div>

        {/* Server error */}
        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {submitError}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSubmit} loading={loading}>
            Add Caterer
          </Button>
        </div>
      </div>
    </div>
  );
}
