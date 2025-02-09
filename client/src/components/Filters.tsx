import { Card, CardContent } from "./ui/card";
import { FilterIcon } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { cropTypes } from "./utils/consts";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

interface FilterProps {
  cropType: string;
  priceRange: number[];
  maxPrice: number;
  filterByCropType: (e: string) => void;
  filterByPrice: (e: number[]) => void;
  resetFilters: () => void;
}

export const Filters = ({
  cropType,
  priceRange,
  maxPrice,
  filterByCropType,
  filterByPrice,
  resetFilters,
}: FilterProps) => {
  return (
    <Card className="lg:col-span-3 bg-background/95 backdrop-blur shadow-lg h-fit sticky top-20 transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-primary">
          <FilterIcon className="w-5 h-5" />
          <span>Filter Options</span>
        </h2>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide text-muted-foreground">
              Select Crop Type
            </label>
            <Select value={cropType} onValueChange={filterByCropType}>
              <SelectTrigger className="bg-background/50 backdrop-blur hover:bg-background/80 transition-colors">
                <SelectValue placeholder="Choose crop type" />
              </SelectTrigger>
              <SelectContent>
                {cropTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="hover:bg-primary/10 cursor-pointer transition-colors"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide text-muted-foreground">
              Price Range
            </label>
            <Slider
              value={priceRange}
              max={maxPrice}
              step={10}
              className="my-6"
              onValueChange={filterByPrice}
            />
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span className="bg-secondary/50 px-3 py-1 rounded-full">
                ₹{priceRange[0]}
              </span>
              <span className="bg-secondary/50 px-3 py-1 rounded-full">
                ₹{priceRange[1]}
              </span>
            </div>
          </div>

          <Button
            className="w-full hover:bg-secondary/50 transition-colors"
            variant="outline"
            onClick={resetFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
