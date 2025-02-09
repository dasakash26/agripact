import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee, Wheat, Calendar, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { NegotiationDetail } from "./utils/types";
import { Separator } from "@/components/ui/separator";

interface NegotiationCardProps {
  negotiation: NegotiationDetail;
  setViewDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setgetData: React.Dispatch<React.SetStateAction<NegotiationDetail>>;
  myTurn: boolean;
  currentTermsId: string;
}

export const NegotiationCard: React.FC<NegotiationCardProps> = ({
  negotiation,
  setViewDetail,
  setgetData,
  myTurn,
  currentTermsId,
}) => {
  const handleClick = (): void => {
    setViewDetail(true);
    setgetData(negotiation);
  };

  const formatDate = (date: string | Date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-6 ">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-2xl font-bold text-primary">
            {negotiation.cropName}
          </h2>
          <Badge
            variant="secondary"
            className="text-xs font-semibold px-2 py-1"
          >
            {negotiation.ongoing ? "Ongoing" : negotiation.status}
          </Badge>
        </div>
        <Separator orientation="horizontal" className="w-full  my-4" />

        <div className="space-y-3">
         
          <div className="flex items-center justify-between gap-24">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Negotiation id</span>
            </div>
            <span className="font-semibold text-foreground text-sm">
              {negotiation?.id.split("-")[0]}
            </span>
          </div>

		  <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <User2 className="w-4 h-4 mr-2" />
              <span>Other party name</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                {negotiation.buyerName}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Wheat className="w-4 h-4 mr-2" />
              <span>Quantity</span>
            </div>
            <span className="font-semibold text-foreground">
              {negotiation.quantity} units
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <IndianRupee className="w-4 h-4 mr-2" />
              <span>
                {negotiation.ongoing ? "Proposed Price" : "Final Price"}
              </span>
            </div>
            <span className="font-semibold text-foreground">
              ₹{negotiation.proposedPrice?.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Harvest Date</span>
            </div>
            <span className="font-semibold text-foreground">
              {formatDate(negotiation?.harvestTime)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 bg-muted p-4">
        <Button className="w-full" variant="outline" onClick={handleClick}>
          View Details
        </Button>
        {negotiation.ongoing ? (
          myTurn ? (
            <Link to={`/negotiations/${currentTermsId}`} className="w-full">
              <Button className="w-full">Negotiate</Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>
              Waiting for response
            </Button>
          )
        ) : (
          <Button className="w-full" disabled>
            Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
