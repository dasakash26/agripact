import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Negotiation } from "@/types/dashboard";
import { memo } from "react";

interface NegotiationsCardProps {
  negotiations: Negotiation[];
}

export const NegotiationsCard = memo(
  ({ negotiations }: NegotiationsCardProps) => {
    return (
      <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-none sticky top-20">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-foreground flex items-center justify-between">
            Ongoing Negotiations
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/10"
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-hide">
            {negotiations.map((item, index) => (
              <NegotiationCard key={index} negotiation={item} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

const NegotiationCard = ({ negotiation }: { negotiation: Negotiation }) => (
  <div className="p-4 bg-accent/10 rounded-xl hover:bg-accent/20 transition-all duration-200 border border-accent/20">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="font-semibold text-foreground">{negotiation.buyerName}</p>
        <p className="text-sm text-muted-foreground">{negotiation.crop}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">{negotiation.priceOffered}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {negotiation.lastUpdated}
        </p>
      </div>
    </div>
  </div>
);
