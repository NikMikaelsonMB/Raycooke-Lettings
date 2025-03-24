
export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  address: {
    street: string;
    area: string;
    county: string;
    eircode?: string;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertySize: number; // in square meters
  description: string;
  features: string[];
  availableFrom: string; // ISO date string
  status: PropertyStatus;
  images: string[];
  bER: BERRating;
  isFeatured?: boolean;
  isNew?: boolean;
  virtualTour?: string;
  createdAt: string; // ISO date string
}

export type PropertyType = 
  | 'apartment'
  | 'house'
  | 'studio'
  | 'duplex'
  | 'penthouse'
  | 'bungalow'
  | 'cottage'
  | 'farmhouse'
  | 'villa'
  | 'land';

export type PropertyStatus = 
  | 'available'
  | 'reserved'
  | 'rented'
  | 'unavailable';

export type BERRating = 
  | 'A1' | 'A2' | 'A3'
  | 'B1' | 'B2' | 'B3'
  | 'C1' | 'C2' | 'C3'
  | 'D1' | 'D2'
  | 'E1' | 'E2'
  | 'F'
  | 'G'
  | 'Exempt';

export interface PropertyFilters {
  search: string;
  priceMin: number;
  priceMax: number;
  bedrooms: number | null;
  propertyType: PropertyType | null;
  area: string | null;
}
