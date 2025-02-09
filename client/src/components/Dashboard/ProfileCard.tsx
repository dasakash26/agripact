import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { FarmerStats } from "@/types/dashboard";
import { User } from "../utils/types";
import { memo } from "react";

interface ProfileCardProps {
  user: User;
  stats: FarmerStats;
}

const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  });
};

export const ProfileCard = memo(({ user, stats }: ProfileCardProps) => {
  console.log("ProfileCard rendered !!");
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-all duration-200 border-none">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-emerald-600/20 ring-offset-4">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback className="bg-[#2e7d32]">
              {user.name.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-grow space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {toTitleCase(user.name)}
              </h2>
              <p className="text-base flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-5 w-5 text-primary" /> {user.location}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {user.crops &&
                user.crops?.map((crop, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-accent/10 text-accent-foreground text-sm font-medium rounded-full border border-accent/20"
                  >
                    {crop}
                  </span>
                ))}
            </div>
            <div className="flex gap-4 mt-4">
              <Link to="/profile/edit">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Edit Profile
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-accent/10"
                >
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block border-l border-border pl-6 ml-6 space-y-3">
            <StatsDisplay stats={stats} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

const StatsDisplay = ({ stats }: { stats: FarmerStats }) => (
  <>
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
        <IndianRupee />
        {stats.totalRevenue.toLocaleString()}
      </p>
    </div>
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Active Contracts
      </p>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {stats.activeContracts}
      </p>
    </div>
  </>
);
