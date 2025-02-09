import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function OfferCardSkeleton() {
  return (
    <Card className="p-4 space-y-4">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </Card>
  );
}
