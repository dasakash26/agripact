import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Leaf, X, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface CategoryCardProps {
  category: string;
  offerCount: number;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({
  category,
  offerCount,
  isSelected,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all hover:scale-[1.02] relative overflow-hidden group border-2",
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      )}
    >
      <div className="relative z-10">
        {/* Category Icon */}
        <div className="mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-xl">{category}</h3>
          <p className="text-muted-foreground">{offerCount} offers available</p>
        </div>

        {/* Action Area */}
        <div className="flex items-center justify-between">
          {isSelected ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="hover:text-destructive gap-2"
            >
              <X size={16} />
              Unselect
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity gap-2"
            >
              View Offers
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
