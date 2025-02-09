import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  MapPinIcon,
  Wheat,
  IndianRupeeIcon,
  Scale,
  Info,
} from "lucide-react";
import { DetailItem, DetailSection } from "./DetailCard";
import { OfferDetails } from "./utils/types";

interface OfferPreviewProps {
  offerDetails: OfferDetails;
  resetForm?: () => void;
}

export const Offer: React.FC<OfferPreviewProps> = ({ offerDetails }) => {
  const {
    cropName = "Not specified",
    cropType = "Not specified",
    price = 0,
    quantity = 0,
    harvestTime,
    location = "Not specified",
    paymentTerms = "Not specified",
    description = cropName,
    logistics = "Not specified",
  } = offerDetails || {};
  const date = harvestTime ? new Date(harvestTime) : null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DetailSection
          title="Crop Information"
          icon={<Wheat className="w-5 h-5 " />}
        >
          <DetailItem label="Crop Name" value={cropName} />
          <DetailItem label="Crop Type" value={cropType} />
        </DetailSection>

        <DetailSection
          title="Pricing Details"
          icon={<IndianRupeeIcon className="w-5 h-5 " />}
        >
          <DetailItem
            label="Price"
            value={`₹${price.toLocaleString()} per kg`}
          />
          <DetailItem
            label="Quantity"
            value={`${quantity.toLocaleString()} kg`}
          />
          <DetailItem
            label="Total Value"
            value={`₹${(price * quantity).toLocaleString()}`}
          />
        </DetailSection>

        <DetailSection
          title="Timing & Location"
          icon={<CalendarIcon className="w-5 h-5" />}
        >
          <DetailItem
            label="Harvest Date"
            value={date?.toLocaleDateString()}
            icon={<CalendarIcon className="w-4 h-4" />}
          />
          <DetailItem
            label="Location"
            value={location}
            icon={<MapPinIcon className="w-4 h-4" />}
          />
        </DetailSection>

        <DetailSection
          title="Terms & Conditions"
          icon={<Scale className="w-5 h-5" />}
        >
          <DetailItem label="Payment Terms" value={paymentTerms} />
          <DetailItem label="Logistical preference" value={logistics} />
        </DetailSection>
      </div>

      <Separator className="my-8" />
      <DetailSection
        title="Crop Description"
        icon={<Info className="w-5 h-5 " />}
      >
        <div className="mt-1 space-y-4">
          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className=" p-4 rounded-md">{description}</p>
          </div>
        </div>
      </DetailSection>
    </>
  );
};
