import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Offer {
  title: string;
  date: string;
  status: "Negotiation" | "Finalized" | "Completed";
  price: string;
}

export function Offers() {
  const [isExpanded, setIsExpanded] = useState(false);
  const offers: Offer[] = [
    {
      title: "Organic Tomatoes",
      date: "2024-03-15",
      status: "Negotiation",
      price: "$2.50/kg",
    },
    {
      title: "Sweet Corn",
      date: "2024-03-10",
      status: "Finalized",
      price: "$1.80/kg",
    },
    {
      title: "Bell Peppers",
      date: "2024-03-05",
      status: "Completed",
      price: "$3.20/kg",
    },
    {
      title: "Carrots",
      date: "2024-03-01",
      status: "Completed",
      price: "$1.75/kg",
    },
    {
      title: "Organic Tomatoes",
      date: "2024-03-15",
      status: "Negotiation",
      price: "$2.50/kg",
    },
    {
      title: "Sweet Corn",
      date: "2024-03-10",
      status: "Finalized",
      price: "$1.80/kg",
    },
    {
      title: "Bell Peppers",
      date: "2024-03-05",
      status: "Completed",
      price: "$3.20/kg",
    },
    {
      title: "Carrots",
      date: "2024-03-01",
      status: "Completed",
      price: "$1.75/kg",
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Offers</CardTitle>
        <div className="flex gap-2">
          <Link to="/offer/new">
            <Button>
              <PlusCircle className="mr-2" />
              Create Offer
            </Button>
          </Link>
          <Link to="/offer/all">
            <Button className="text-center" variant={"secondary"}>
              View
              <ChevronRight className="mr-2" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {offers
            .slice(0, isExpanded ? offers.length : 4)
            .map((offer, index) => (
              <OfferItem key={index} offer={offer} />
            ))}
        </div>
        {offers.length > 3 && (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4"
          />
        )}
      </CardContent>
    </Card>
  );
}

function OfferItem({ offer }: { offer: Offer }) {
  return (
    <div className="flex items-center justify-between p-4 bg-accent rounded-lg w-fill">
      <div>
        <h3 className="font-semibold">{offer.title}</h3>
        <p className="text-sm text-muted-foreground">{offer.date}</p>
      </div>
      <div className="text-right">
        <Badge
          variant={offer.status === "Completed" ? "default" : "secondary"}
          className={`mb-1 ${
            offer.status === "Completed" ? "bg-green-500" : ""
          }`}
        >
          {offer.status}
        </Badge>
        <p className="text-sm font-medium">{offer.price}</p>
      </div>
    </div>
  );
}

function ExpandButton({
  isExpanded,
  onClick,
  className,
}: {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full justify-center ${className}`}
    >
      {isExpanded ? (
        <>
          <span className="mr-2">Show Less</span>
          <ChevronUp className="w-4 h-4" />
        </>
      ) : (
        <>
          <span className="mr-2">Show More</span>
          <ChevronDown className="w-4 h-4" />
        </>
      )}
    </Button>
  );
}
