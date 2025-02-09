import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee, Wheat, MapPin, Calendar } from 'lucide-react';
// import { Toaster } from '@/components/ui/toaster';
// import { useToast } from "@/hooks/use-toast";
import { OfferDetails } from "./utils/types";
import { useEffect } from "react";

interface OfferCardProps {
  // offer?: {
  //   cropName: string;
  //   cropType: string;
  //   price: number;
  //   quantity: number;
  //   harvestTime?: string | Date;
  //   location: string;
  // },
  offer?: OfferDetails,
  setViewDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setOfferDetails: React.Dispatch<React.SetStateAction<OfferDetails | null>>;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, setViewDetails, setOfferDetails}) => {
  if (!offer) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <p className="text-muted-foreground">No offer data available</p>
        </CardContent>
      </Card>
    );
  }
  
  useEffect(() => {
    const getCount = async () => {
      const count = await new Promise((res) => {setTimeout(res, 1000)});
    }
    getCount();
  }, []);
  
  const handleViewDetails = () => {
    setViewDetails(true);
    setOfferDetails(offer);
  }
  
  const formatDate = (date: string | Date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
    <Card className="w-full max-w-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-primary">{offer.cropName}</h2>
          <Badge variant="secondary" className="text-xs font-semibold px-2 py-1">
            {offer.cropType}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <IndianRupee className="w-4 h-4 mr-2" />
              <span>Price</span>
            </div>
            <span className="font-semibold text-foreground">
              ₹{offer.price.toFixed(2)} / {offer.quantity} kg
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Wheat className="w-4 h-4 mr-2" />
              <span>Quantity</span>
            </div>
            <span className="font-semibold text-foreground">{offer.quantity} units</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Location</span>
            </div>
            <span className="font-semibold text-foreground">{offer.location}</span>
          </div>
          {offer.harvestTime && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Harvest Date</span>
              </div>
              <span className="font-semibold text-foreground">{formatDate(offer.harvestTime)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 bg-muted p-4">
        <Button className="w-full" variant="outline" onClick={handleViewDetails}>View Details</Button>
        
      </CardFooter>
    </Card>
    {/* <Toaster /> */}
    </>
  );
};

export default OfferCard;

