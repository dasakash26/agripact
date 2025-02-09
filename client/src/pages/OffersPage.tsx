"use client";

import { useState } from "react";
import { Edit, Trash2, PlusCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface Offer {
  id: number;
  cropName: string;
  price: number;
  quantity: number;
  harvestDate: string;
  status: "Negotiation" | "Finalized" | "Completed";
}

const initialOffers: Offer[] = [
  {
    id: 1,
    cropName: "Organic Tomatoes",
    price: 2.5,
    quantity: 1000,
    harvestDate: "2024-03-15",
    status: "Negotiation",
  },
  {
    id: 2,
    cropName: "Sweet Corn",
    price: 1.8,
    quantity: 1500,
    harvestDate: "2024-03-10",
    status: "Finalized",
  },
  {
    id: 3,
    cropName: "Bell Peppers",
    price: 3.2,
    quantity: 800,
    harvestDate: "2024-03-05",
    status: "Completed",
  },
  {
    id: 4,
    cropName: "Carrots",
    price: 1.75,
    quantity: 1200,
    harvestDate: "2024-03-01",
    status: "Completed",
  },
];

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [activeTab, setActiveTab] = useState("active");

  const handleDelete = (id: number) => {
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  const handleEdit = (offer: Offer) => {
    console.log("Edit offer", offer);
  };

  const filteredOffers = offers.filter((offer) => {
    if (activeTab === "active") {
      return offer.status === "Negotiation" || offer.status === "Finalized";
    } else {
      return offer.status === "Completed";
    }
  });

  return (
    <div className="container mx-auto py-24 px-4 max-w-5xl bg-background min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Crop Offers</h1>
        <Link to="/offer/new">
          <Button>
            <PlusCircle className="mr-2" />
            Create Offer
          </Button>
        </Link>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Active Offers
          </TabsTrigger>
          <TabsTrigger
            value="previous"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Previous Offers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <OffersList
            offers={filteredOffers}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </TabsContent>
        <TabsContent value="previous">
          <OffersList offers={filteredOffers} onDelete={handleDelete} onEdit={handleEdit}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OffersList({
  offers,
  onEdit,
  onDelete,
}: {
  offers: Offer[];
  onEdit: (offer: Offer) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="space-y-4 mt-4">
      {offers.map((offer) => (
        <Card key={offer.id} className="bg-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold text-primary">
                  {offer.cropName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(offer.harvestDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="secondary"
                  className={
                    offer.status === "Negotiation"
                      ? "bg-warning"
                      : offer.status === "Finalized"
                      ? "bg-primary"
                      : "bg-success"
                  }
                >
                  {offer.status}
                </Badge>
                <p className="text-xl font-bold text-primary">
                  ₹{offer.price.toFixed(2)}/kg
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Quantity
                </p>
                <p className="text-base text-primary">
                  {offer.quantity.toLocaleString()} kg
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <Edit className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(offer)}>
                    <Pencil className="mr-2 h-4 w-4 text-secondary-foreground" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(offer.id)}>
                    <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                    <span className="text-destructive">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
