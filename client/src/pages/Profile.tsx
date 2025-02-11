import { useEffect, useState } from "react";
import { PaymentPreferences } from "@/components/profile/payment-preferences";
import { FarmPhotos } from "@/components/profile/farm-photos";
import { UserDetail } from "@/components/profile/UserDetail";
import api, { profileRoute } from "@/api/axiosConfig";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { User } from "@/components/utils/types";

export default function FarmerProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get(profileRoute);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 space-y-6">
        <Card className="shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold text-foreground">
              Farmer Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {user && <UserDetail user={user} />}
              <div className="lg:col-span-2">
                <ProfileTabs />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <PaymentPreferences />
          </Card>
          <Card className="shadow-md">
            <FarmPhotos />
          </Card>
        </div>
        <Footer className="mt-8" />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <Card className="shadow-md">
          <CardHeader className="border-b">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Skeleton className="h-[400px] rounded-lg" />
              <Skeleton className="h-[400px] lg:col-span-2 rounded-lg" />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[300px] rounded-lg" />
          <Skeleton className="h-[300px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-xl">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
        <AlertDescription className="mt-1">{message}</AlertDescription>
      </Alert>
    </div>
  );
}
