import { Separator } from "@/components/ui/separator";
import { Wheat, FileText, ChevronLeft, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Offer } from "./Offer";
import { NegotiationDetail } from "./utils/types";
import { format } from "date-fns";
import { Card } from "./ui/card";

interface NegotiationPreview {
  negotiation: NegotiationDetail;
  closeDetail?: () => void;
  isLoading?: boolean;
}

export const NegotiationPreview: React.FC<NegotiationPreview> = ({
  negotiation,
  closeDetail,
  isLoading = false,
}) => {
  const validity = negotiation.offerDuration
    ? parseInt(negotiation.offerDuration, 10)
    : 0;
  const validUntil = new Date(Date.now() + 1000 * 60 * 60 * 24 * validity);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300" />
      </div>
    );
  }

  return (
    <>
      <Button
        className="flex items-center ml-14"
        variant="ghost"
        onClick={closeDetail}
        aria-label="Go back"
      >
        <ArrowLeft size={16} />
        Back to Negotiations
      </Button>
      <Card className="bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl py-6 shadow-lg mt-4 max-w-5xl mx-auto">
        <div className="max-w-5xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 hover:text-primary transition-colors">
                <Wheat className="w-8 h-8" />
                <h1 className="text-3xl font-bold tracking-tight">
                  Crop Offer Details
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="w-5 h-5" />
              <span className="font-mono">ID: {negotiation.id}</span>
            </div>
          </div>

          <Separator className="bg-[#2a2f2a]/20 mb-8" />

          <Offer offerDetails={negotiation} />

          <Separator className="bg-[#2a2f2a]/20 my-8" />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Generated: {format(new Date(), "PPP")}</span>
            <span>Valid until: {format(validUntil, "PPP")}</span>
          </div>
        </div>
      </Card>
    </>
  );
};
