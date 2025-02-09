export type CropType =
  | "Fruits"
  | "Vegetables"
  | "Grains"
  | "Nuts"
  | "Spices"
  | "Herbs"
  | "Other"
  | "";

export interface User {
  id: string;
  name: string;
  location: string;
  email: string;
  role: string;
  imageUrl?: string;
  crops?: string[];
  createdAt: string;
  updatedAt: string;
  offers: string[];
  contracts: string[];
}

export interface OfferDetails {
  cropName: string;
  cropType: string;
  description: string;
  price: string;
  quantity: string;
  harvestTime: string;
  location: string;
  offerDuration: string;
  paymentTerms: string;
}
