import type { Caterer, ApiResponse, FilterState, NewCatererForm } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function buildQueryString(filters: Partial<FilterState>): string {
  const params = new URLSearchParams();

  if (filters.search?.trim()) params.set("search", filters.search.trim());
  if (filters.minPrice?.trim()) params.set("minPrice", filters.minPrice.trim());
  if (filters.maxPrice?.trim()) params.set("maxPrice", filters.maxPrice.trim());
  if (filters.cuisine?.trim()) params.set("cuisine", filters.cuisine.trim());
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.order) params.set("order", filters.order);

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function fetchCaterers(
  filters: Partial<FilterState> = {}
): Promise<ApiResponse<Caterer[]>> {
  const qs = buildQueryString(filters);
  const res = await fetch(`${BASE}/api/caterers${qs}`, { cache: "no-store" });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Failed to fetch caterers.");
  }

  return res.json();
}

export async function fetchCatererById(id: string): Promise<ApiResponse<Caterer>> {
  const res = await fetch(`${BASE}/api/caterers/${id}`, { cache: "no-store" });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Caterer not found.");
  }

  return res.json();
}

export async function createCaterer(
  form: NewCatererForm
): Promise<ApiResponse<Caterer>> {
  const payload = {
    name: form.name.trim(),
    location: form.location.trim(),
    pricePerPlate: parseFloat(form.pricePerPlate),
    cuisines: form.cuisines
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
    rating: parseFloat(form.rating),
  };

  const res = await fetch(`${BASE}/api/caterers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.errors?.join(" ") ?? data?.message ?? "Failed to create caterer.";
    throw new Error(message);
  }

  return data;
}
