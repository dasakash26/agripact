import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api, {
  offerSearchRoute,
  negotiationRoute,
  initOfferRoute,
} from "@/api/axiosConfig";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import OfferCard from "@/components/OfferCard";
import { OfferDetails, CropType } from "@/components/utils/types";
import { OfferPreview } from "@/components/OfferPreview";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Flame, X } from "lucide-react";
import { OfferCardSkeleton } from "@/components/OfferCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

interface Offer {
  id: string;
  cropName: string;
  description?: string;
  cropType: CropType;
  price: number;
  quantity: number;
  harvestTime?: string;
  location: string;
  offerDuration: string;
  paymentTerms: string;
  createdBy: string;
  createdAt: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [visibleOffers, setVisibleOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cropType, setCropType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();
  const [viewDetails, setViewDetails] = useState(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetails | null>(null);
  const [initOffers, setInitOffers] = useState<Offer[]>([]);
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filterByCropType = (e: string) => {
    setCropType(e);
    const filtered = offers.filter((offer) => offer.cropType === e);
    setVisibleOffers(filtered);
  };

  //get all offers at first render
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const result = await api.get(initOfferRoute);
        setInitOffers(result.data.offers);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error fetching data",
          description:
            error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const filterByPrice = (e: number[]) => {
    setPriceRange(e);
    setVisibleOffers(visibleOffers.filter((offer) => offer.price >= e[0]));
  };

  const handleSort = (offers: Offer[]) => {
    switch (sortBy) {
      case "newest":
        return offers.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "price-low":
        return offers.sort((a, b) => b.price - a.price);
      case "price-high":
        return offers.sort((a, b) => a.price - b.price);
      case "rating":
        return offers;
      default:
        return offers;
    }
  };

  //get max price of visible offers
  const getMaxPrice = (offers: Offer[]) => {
    return Math.max(...(offers.map((offer) => offer.price) || 0));
  };

  useEffect(() => {
    setVisibleOffers(handleSort(visibleOffers));
  }, [sortBy, visibleOffers]);

  useEffect(() => {
    const maxPrice = getMaxPrice(visibleOffers);
    setMaxPrice(maxPrice);
    setPriceRange([0, maxPrice]);
  }, [cropType, offers]);

  const resetFilters = () => {
    setVisibleOffers(offers);
    setCropType("");
    setPriceRange([0, getMaxPrice(offers)]);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      return;
    }
    try {
      setIsLoading(true);
      resetFilters();
      const params = new URLSearchParams({
        cropName: searchQuery,
      });
      const result = await api.get(`${offerSearchRoute}?${params}`);
      if (result.data.offers) {
        setOffers(result.data.offers);
        setVisibleOffers(result.data.offers);
        if (result.data.message) {
          toast({
            title: "No exact offers found",
            description: result.data.message,
          });
        }
      } else {
        setOffers([]);
        setVisibleOffers([]);
        toast({
          title: "No offers found",
          description: result.data.message,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error fetching data",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNegotiate = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await api.post(`${negotiationRoute}/create`, offerDetails);
      toast({
        title: "Negotiation Started",
        description: "Negotiation with the seller has been started",
      });
      navigate("/negotiations");
    } catch (error) {
      toast({
        title: "Cannot create negotiation",
        //@ts-ignore
        description: error.response.data?.error,
        variant: "destructive",
      });
    }
  };

  // Add this function to group offers by category
  const groupOffersByCategory = (offers: Offer[]) => {
    return offers.reduce((acc, offer) => {
      const category = offer.cropType;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(offer);
      return acc;
    }, {} as Record<string, Offer[]>);
  };

  // Modify the handleCategorySelect function
  const handleCategorySelect = (category: string) => {
    setIsLoading(true);
    try {
      if (selectedCategory === category) {
        // Unselect category if it's already selected
        setSelectedCategory(null);
        setOffers([]);
        setVisibleOffers([]);
      } else {
        // Select new category
        setSelectedCategory(category);
        const filteredOffers = initOffers.filter(
          (offer) => offer.cropType === category
        );
        setOffers(filteredOffers);
        setVisibleOffers(filteredOffers);
      }
    } catch (error) {
      console.error("Error filtering offers:", error);
      toast({
        title: "Error filtering offers",
        description: "Failed to filter offers by category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return viewDetails ? (
    <div className="w-full py-24 px-8 sm:px-12 md:px-16">
      <div className="min-h-screen w-full bg-gradient-to-br from-background to-primary/5">
        <main className="w-full ">
          <div className="max-w-7xl mx-auto space-y-6 px-4">
            <Button
              variant="ghost"
              onClick={() => setViewDetails(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to search
            </Button>

            <Card className="p-8">
              <OfferPreview
                offerDetails={offerDetails!}
                resetForm={() => setViewDetails(false)}
              />
              <div className="flex items-center justify-center mt-8 pb-4">
                <Button
                  className="px-8 py-6 text-lg font-medium transition-all hover:scale-105"
                  onClick={handleNegotiate}
                >
                  Start Negotiation
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Toaster />
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-primary/5">
      <main className="w-full px-8 sm:px-12 md:px-16 pt-24">
        <div className="space-y-8 mb-12 max-w-5xl mx-auto">
          {/* Existing title and search bar */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Crops
            </h1>
            <p className="text-muted-foreground">
              Search through thousands of available crops from verified farmers
            </p>
          </div>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isLoading={isLoading}
          />
          <BreadcrumbNav
            category={selectedCategory}
            resultsCount={visibleOffers.length}
            onClear={() => handleCategorySelect(selectedCategory!)}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {offers.length > 0 ? (
            <aside className="lg:col-span-3">
              <div className="sticky top-24">
                {isLoading ? (
                  <Card className="p-6 space-y-6">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-8 w-1/2" />
                  </Card>
                ) : (
                  <Filters
                    cropType={cropType}
                    priceRange={priceRange}
                    maxPrice={maxPrice}
                    filterByCropType={filterByCropType}
                    filterByPrice={filterByPrice}
                    resetFilters={resetFilters}
                  />
                )}
              </div>
            </aside>
          ) : (
            <div className=""></div>
          )}

          <div className="lg:col-span-9 space-y-8">
            {offers.length > 0 && !isLoading && (
              <div className="flex justify-between items-center bg-card p-4 rounded-lg shadow-sm mx-auto w-full">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] border-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="secondary">
                  Showing {visibleOffers.length} results
                </Badge>
              </div>
            )}

            <div className="space-y-12 mx-auto w-full">
              {isLoading ? (
                // Skeleton loading state
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="transform transition-all">
                      <OfferCardSkeleton />
                    </div>
                  ))
              ) : offers.length > 0 || selectedCategory ? (
                // Show filtered/searched results
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleOffers.map((offer) => (
                    <div
                      className="transform transition-all hover:scale-[1.02]"
                      key={offer.id}
                    >
                      <OfferCard
                        offer={offer}
                        setViewDetails={setViewDetails}
                        setOfferDetails={setOfferDetails}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Show initial offers grouped by category
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Flame className="text-primary" />
                      <h1 className="font-semibold text-2xl text-foreground">
                        Explore Crops by Category
                      </h1>
                    </div>
                    {selectedCategory && (
                      <Button
                        variant="outline"
                        onClick={() => handleCategorySelect(selectedCategory)}
                        className="gap-2"
                      >
                        <X size={16} />
                        Clear Selection
                      </Button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(groupOffersByCategory(initOffers)).map(
                      ([category, offers]) => (
                        <CategoryCard
                          key={category}
                          category={category}
                          offerCount={offers.length}
                          isSelected={selectedCategory === category}
                          onClick={() => handleCategorySelect(category)}
                        />
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
