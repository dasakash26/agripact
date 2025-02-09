export interface Negotiation {
  buyerName: string;
  crop: string;
  priceOffered: string;
  lastUpdated: string;
}

export interface HarvestItem {
  id: string;
  crop: string;
  buyer: string;
  dateOfDelivery: string;
  progress: number;
}

export interface FarmerStats {
  totalRevenue: number;
  activeContracts: number;
}
