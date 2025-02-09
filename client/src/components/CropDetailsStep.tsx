import * as React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OfferDetails } from "./utils/types";
import { Textarea } from "./ui/textarea";
import { cropTypes } from "@/components/utils/consts";

interface CropDetailsStepProps {
  offerDetails: OfferDetails;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export const CropDetailsStep: React.FC<CropDetailsStepProps> = ({
  offerDetails,
  handleInputChange,
  handleSelectChange,
}) => {
  const { cropName, cropType, description } = offerDetails;

  return (
    <>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-semibold">Crop Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form>
          <div className="grid w-full items-center gap-4">
            {/* cropName */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cropName">Crop Name</Label>
              <Input
                id="cropName"
                name="cropName"
                placeholder="e.g. Wheat"
                value={cropName}
                onChange={handleInputChange}
              />
            </div>
            {/* cropType */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select
                value={cropType}
                onValueChange={(value) => handleSelectChange("cropType", value)}
              >
                <SelectTrigger id="cropType">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {cropTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* cropDescription */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Organic Wheat, grown without pesticides..."
                value={description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </>
  );
};
