import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { OfferDetails } from "./utils/types";

interface CategorySectionProps {
  title: string;
  offers: Offer[];
  setViewDetails: (value: boolean) => void;
  setOfferDetails: (value: OfferDetails | null) => void;
  onCategoryClick: () => void;
}

export function CategorySection({
  title,
  offers,
  onCategoryClick,
}: CategorySectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">{title}</h2>
        <Button variant="ghost" onClick={onCategoryClick} className="gap-2">
          View all <ChevronRight size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {offers.slice(0, 4).map((offer) => (
          <Card
            key={offer.id}
            className="p-4 hover:shadow-lg transition-shadow"
          >
            <div className="space-y-2">
              <h3 className="font-medium truncate">{offer.cropName}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {offer.location}
              </p>
              <p className="font-semibold">₹{offer.price}/kg</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
