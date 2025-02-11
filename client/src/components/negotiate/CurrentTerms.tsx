import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check, FileText, Wheat, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface CurrentTermsProps {
  initialOffer: {
    cropName?: string;
    quantity?: number;
    price?: number;
    harvestTime?: string;
    location?: string;
    paymentTerms?: string;
    logistics?: string;
  };
  date: string;
  onAccept: () => void;
  onReject: () => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
}

export function CurrentTerms({
  initialOffer,
  date,
  onAccept,
  onReject,
  isLoading = false,
  isSubmitting = false,
}: CurrentTermsProps) {
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleAccept = () => {
    setShowAcceptDialog(false);
    onAccept();
  };

  const handleReject = () => {
    setShowRejectDialog(false);
    onReject();
  };

  if (isLoading) {
    return (
      <Card className="border-l-4 border-l-primary max-w-2xl">
        <CardHeader className="pb-0">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <Skeleton className="h-14 w-full" />
          <div className="space-y-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-8 w-full" />
                  {i < 5 && <Separator className="mt-3" />}
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pt-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  const hasOffer = initialOffer && Object.keys(initialOffer).length > 0;

  if (!hasOffer) {
    return (
      <Card className="border-l-4 border-l-destructive">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No offer details available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-l-4 border-l-primary max-w-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium flex items-center">
            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
            Current Terms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="flex items-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
            <Wheat className="text-primary h-5 w-5 mr-3" />
            <span className="text-base font-medium">
              {initialOffer?.cropName || "N/A"}
            </span>
          </div>
          <div className="space-y-4">
            {[
              [
                "Quantity",
                initialOffer?.quantity
                  ? `${formatNumber(initialOffer.quantity)} kg`
                  : "N/A",
              ],
              [
                "Price",
                initialOffer?.price
                  ? `₹${formatNumber(initialOffer.price)} per kg`
                  : "N/A",
              ],
              ["Harvest Time", date || "N/A"],
              ["Location", initialOffer?.location || "N/A"],
              ["Payment terms", initialOffer?.paymentTerms || "N/A"],
              ["Logistics", initialOffer?.logistics || "N/A"],
            ].map(([label, value], index, arr) => (
              <div key={label}>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">{label}</span>
                  <span className="font-medium text-sm">{value}</span>
                </div>
                {index < arr.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="default"
                variant="outline"
                className="w-full border-green-500/50 hover:bg-green-50 hover:text-green-600"
                onClick={() => setShowAcceptDialog(true)}
                disabled={isSubmitting}
              >
                <Check className="h-4 w-4 mr-2 text-green-500" />
                {isSubmitting ? "Processing..." : "Accept"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Accept and finalize these contract terms</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="default"
                variant="outline"
                className="w-full border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setShowRejectDialog(true)}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-2 text-destructive" />
                {isSubmitting ? "Processing..." : "Reject"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Reject these terms and propose new ones</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>

      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Contract Terms</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to accept these terms? This will finalize
              the contract.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAcceptDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm Accept
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Contract Terms</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject these terms? You can propose new
              terms afterward.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirm Reject
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
