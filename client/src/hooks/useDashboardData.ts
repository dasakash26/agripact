import { useQuery } from "@tanstack/react-query";
import { HarvestItem, Negotiation, FarmerStats } from "@/types/dashboard";

interface DashboardData {
  negotiations: Negotiation[];
  currentHarvest: HarvestItem[];
  stats: FarmerStats;
}

export function useDashboardData() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      // Replace with actual API call
      return {
        negotiations: [
          {
            buyerName: "ABC Corp",
            crop: "Wheat",
            priceOffered: "$0.5/kg",
            lastUpdated: "2h ago",
          },
          {
            buyerName: "XYZ Foods",
            crop: "Paddy",
            priceOffered: "$0.4/kg",
            lastUpdated: "3h ago",
          },
        ],
        currentHarvest: [
          {
            id: "1",
            crop: "Wheat (Premium)",
            buyer: "ABC Corp",
            dateOfDelivery: "2024-03-15",
            progress: 75,
          },
          // ... other harvest items
        ],
        stats: {
          totalRevenue: 24500,
          activeContracts: 12,
        },
      };
    },
  });
}
