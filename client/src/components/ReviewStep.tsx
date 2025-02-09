import { OfferDetails } from "./utils/types";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//@ts-ignore
import { Offer } from "./Offer.tsx";

interface ReviewStepProps {
  offerDetails: OfferDetails;
}

export function ReviewStep({ offerDetails }: ReviewStepProps) {

  return (
    <>
      <CardHeader className="border-b border-[#2a2f2a]">
        <CardTitle className="text-2xl font-semibold text-[#9ab88d]">
          Review Your Offer
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Offer offerDetails={offerDetails}/>
      </CardContent>
    </>
  );
}

