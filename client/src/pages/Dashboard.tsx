import { useUser } from "@/hooks/useUser";
import { DashboardSkeleton } from "@/components/Dashboard/Skeleton";
import { SomethingWentWrong } from "@/components/SomethingWentWrong";
import { ProfileCard } from "@/components/Dashboard/ProfileCard";
import { NegotiationsCard } from "@/components/Dashboard/NegotiationsCard";
import { HarvestStatusCard } from "@/components/Dashboard/HarvestStatusCard";
import { memo, useMemo } from "react";

const mockData = {
  stats: {
    totalHarvests: 12,
    totalNegotiations: 5,
    totalRevenue: 120000,
    activeNegotiations: 2,
    activeContracts: 3,
  },
  negotiations: [
    {
      buyerName: "John Doe",
      crop: "Rice",
      priceOffered: "₹ 50,000",
      lastUpdated: "2 days ago",
    },
    {
      buyerName: "Jane Doe",
      crop: "Wheat",
      priceOffered: "₹ 60,000",
      lastUpdated: "1 day ago",
    },
  ],

  currentHarvest: [
    {
      id: "1",
      crop: "Rice",
      buyer: "John Doe",
      dateOfDelivery: "12th October 2021",
      progress: 50,
    },
    {
      id: "2",
      crop: "Rice",
      buyer: "John Doe",
      dateOfDelivery: "12th October 2021",
      progress: 50,
    },
  ],
};

export default memo(function FarmerDashboard() {
  const { user, isLoading } = useUser();

  const dashboardData = useMemo(() => mockData, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="min-h-screen mx-auto mt-16 text-gray-900 dark:text-gray-100">
      <main className="p-4 md:p-6 space-y-6">
        <ProfileCard user={user} stats={dashboardData.stats} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <NegotiationsCard negotiations={dashboardData.negotiations} />
          </div>
          <div className="lg:col-span-8">
            <HarvestStatusCard harvest={dashboardData.currentHarvest} />
          </div>
        </div>
      </main>
    </div>
  );
});
