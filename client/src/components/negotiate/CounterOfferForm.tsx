import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

interface CounterOfferFormProps {
  counterOffer: {
    quantity: string;
    price: string;
    harvestTime: string;
    location: string;
    paymentTerms: string;
    logistics: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

export function CounterOfferForm({
  counterOffer,
  onInputChange,
  onSelectChange,
  onSubmit,
}: CounterOfferFormProps) {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Make Counter Offer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input
              id="quantity"
              name="quantity"
              value={counterOffer.quantity}
              onChange={onInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price per kg</Label>
            <Input
              id="price"
              name="price"
              value={counterOffer.price}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="harvestTime">Harvest Time</Label>
          <Input
            id="harvestTime"
            name="harvestTime"
            type="date"
            value={counterOffer.harvestTime}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={counterOffer.location}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Payment Terms</Label>
          <Select
            onValueChange={(value) => onSelectChange("paymentTerms", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time payment</SelectItem>
              <SelectItem value="installments">Installments</SelectItem>
              <SelectItem value="on-delivery">Payment on delivery</SelectItem>
              <SelectItem value="advance">Advance payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Logistics</Label>
          <Select onValueChange={(value) => onSelectChange("logistics", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select logistics preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farmer">Arranged by farmer</SelectItem>
              <SelectItem value="buyer">Arranged by buyer</SelectItem>
              <SelectItem value="platform">Arranged by AgriPact</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit}>
          <Send className="mr-2 h-4 w-4" /> Send Counter Offer
        </Button>
      </CardFooter>
    </Card>
  );
}
