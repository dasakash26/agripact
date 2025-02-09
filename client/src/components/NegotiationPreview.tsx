// import { OfferDetails } from "./utils/types";
import { Separator } from "@/components/ui/separator";
import { Wheat, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { Offer } from "./Offer";
// import { OfferPreviewProps } from "./utils/types";
// import { NegotiationCardProps } from "./utils/types";
import { NegotiationDetail } from "./utils/types";
interface NegotiationPreview{
  negotiation: NegotiationDetail;
  closeDetail?: () => void;
}

export const NegotiationPreview: React.FC<NegotiationPreview> = ({negotiation,closeDetail})=> {
  const validity = (negotiation.offerDuration)?parseInt(negotiation.offerDuration, 10):0 ;
  return (
    <div className="min-h-screen relative p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wheat className="w-8 h-8" />
            <h1 className="text-2xl font-semibold">Crop Offer Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>
              Negotiation ID : {negotiation.id}
            </span>
          </div>
        </div>

        <Separator className="bg-[#2a2f2a] mb-8" />

        <Offer offerDetails = {negotiation} />
        {/* Footer */}
        <Separator className="bg-[#2a2f2a] my-8" />
        <div className="flex justify-between text-sm">
          <span>Generated on: {new Date().toLocaleDateString()}</span>
          <span>
            Valid until:{" "}
            {new Date(
              Date.now() + 1000 * 60 * 60 * 24 * validity
            ).toLocaleDateString()}
          </span>
        </div>
        <Button
          className="absolute right-10 top-0 h-12 w-12 rounded-lg"
          variant="secondary"
          onClick={closeDetail}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
