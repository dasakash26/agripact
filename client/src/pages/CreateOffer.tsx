import React, { useState } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { CropDetailsStep } from "@/components/CropDetailsStep";
import { OfferDetailsStep } from "@/components/OfferDetailsStep";
import { ReviewStep } from "@/components/ReviewStep";
import { OfferDetails } from "@/components/utils/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OfferPreview } from "@/components/OfferPreview";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import api, { createOfferRoute } from "@/api/axiosConfig";

export default function CreateOffer() {
  const [offerDetails, setOfferDetails] = useState<OfferDetails>({
    cropName: "",
    cropType: "",
    description: "",
    price: "",
    quantity: "",
    harvestTime: "",
    location: "",
    offerDuration: "",
    paymentTerms: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const getSubHeading = () => {
    switch (currentStep) {
      case 1:
        return "Enter details about the crop.";
      case 2:
        return "Enter details about the offer.";
      case 3:
        return "view all details before submitting.";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "harvestTime") {
      setOfferDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === "price" || name === "quantity") {
      setOfferDetails((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setOfferDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setOfferDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post(createOfferRoute, offerDetails);
      toast({
        title: "Offer Submitted Successfully",
        description: (
          <div className="mt-2 grid gap-1">
            <p>
              Your offer for{" "}
              <span className="font-semibold">{offerDetails.cropName}</span> has
              been submitted successfully.
            </p>
            <p className="text-xs opacity-80">
              Submitted at: {new Date().toLocaleTimeString()}
            </p>
            <p className="text-xs mt-2">You can review it in your dashboard.</p>
          </div>
        ),
      });
      console.log("Submitting offer:", offerDetails);
      handleNext();
    } catch (error: any) {
      // console.error("Failed to submit offer:", error);
      toast({
        title: error.response?.data?.message || "Something went wrong!",
      });
      console.log(offerDetails);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setOfferDetails({
      cropName: "",
      cropType: "",
      description: "",
      price: "",
      quantity: "",
      harvestTime: "",
      location: "",
      offerDuration: "",
      paymentTerms: "",
    });
    setCurrentStep(1);
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  return (
    <>
      <div className="container mx-auto p-6 max-w-4xl mt-12">
        {currentStep <= 3 && (
          <>
            <h1 className="text-3xl font-bold text-center mb-2">
              Create New Offer
            </h1>
            <h2 className="text-base text-center mb-8">{getSubHeading()}</h2>
            <StepIndicator currentStep={currentStep} />
          </>
        )}
        <Card className="w-full border-[#2a2f2a]  rounded-lg shadow-lg overflow-hidden">
          <div className="">
            {/* step:1 */}
            {currentStep === 1 && (
              <CropDetailsStep
                offerDetails={offerDetails}
                //@ts-ignore
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            )}

            {/* step:2 */}
            {currentStep === 2 && (
              <OfferDetailsStep
                offerDetails={offerDetails}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            )}

            {/* step:3 */}
            {currentStep === 3 && <ReviewStep offerDetails={offerDetails} />}

            {/* step:4 */}
            {currentStep === 4 && (
              <OfferPreview offerDetails={offerDetails} resetForm={resetForm} />
            )}
          </div>

          <Separator />

          {currentStep <= 3 && (
            <CardFooter className="flex justify-between p-6">
              {/* prev button */}
              {currentStep > 1 && (
                <Button onClick={handlePrevious} variant="outline">
                  <ChevronLeft />
                  Prev
                </Button>
              )}
              {/* next button */}
              {currentStep < 3 ? (
                <Button onClick={handleNext} variant="outline">
                  Next
                  <ChevronRight />
                </Button>
              ) : (
                // submit button
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  variant={"outline"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      <Check />
                      Submit
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
      <Toaster />
    </>
  );
}
