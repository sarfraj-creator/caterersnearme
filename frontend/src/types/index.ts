export interface Caterer {
  id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
}

export interface ApiResponse<T> {
  success: boolean;
  total?: number;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
}

export interface FilterState {
  search: string;
  minPrice: string;
  maxPrice: string;
  cuisine: string;
  sortBy: "pricePerPlate" | "rating" | "name" | "";
  order: "asc" | "desc";
}

export interface NewCatererForm {
  name: string;
  location: string;
  pricePerPlate: string;
  cuisines: string;
  rating: string;
}
