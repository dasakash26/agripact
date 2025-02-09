import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrapeIcon as Grain } from "lucide-react";
import { HarvestItem } from "@/types/dashboard";

interface HarvestStatusCardProps {
  harvest: HarvestItem[];
}

export const HarvestStatusCard = ({ harvest }: HarvestStatusCardProps) => (
  <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-none">
    <CardHeader className="p-6 flex flex-row items-center justify-between sticky top-0 z-10">
      <CardTitle className="text-xl font-bold text-foreground">
        Current Harvest Status
      </CardTitle>
      <Button
        variant="outline"
        size="sm"
        className="border-primary text-primary hover:bg-primary/10"
      >
        Download Report
      </Button>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="space-y-4">
        {harvest.map((item) => (
          <HarvestItemCard key={item.id} item={item} />
        ))}
      </div>
    </CardContent>
  </Card>
);

const HarvestItemCard = ({ item }: { item: HarvestItem }) => (
  <div className="p-5 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors">
    <div className="flex items-start gap-4">
      <Grain className="h-6 w-6 text-primary mt-1" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground">{item.crop}</h3>
        <div className="mt-1 space-y-1">
          <p className="text-sm text-muted-foreground">
            Buyer:{" "}
            <span className="font-medium text-foreground">{item.buyer}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Delivery:{" "}
            <span className="font-medium text-foreground">
              {item.dateOfDelivery}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <ProgressBar progress={item.progress} />
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-primary">
              {item.progress}% Complete
            </span>
            <Button
              variant="link"
              className="text-sm text-primary hover:text-primary/90 h-auto p-0"
            >
              View contract
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-2.5 bg-accent/20 rounded-full overflow-hidden">
    <div
      className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);
