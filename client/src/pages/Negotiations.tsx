import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NegotiationCard } from "@/components/Negotiation-card";
import { NegotiationPreview } from "@/components/NegotiationPreview";
import api, { profileRoute, negotiationRoute } from "@/api/axiosConfig";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

const Negotiations = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [viewDetail, setViewDetail] = useState(false);
  const [selectedData, setSelectedData] = useState<NegotiationDetail>();
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNegotiations = async () => {
      try {
        setIsLoading(true);
        const [meResponse, negotiationsResponse] = await Promise.all([
          api.get(profileRoute),
          api.get(negotiationRoute),
        ]);

        const processed = negotiationsResponse.data.negotiations.map(
          (item: any) => {
            const terms = negotiationsResponse.data.currentTerms.find(
              (term: any) => item.currentTermsId === term.id
            );
            return {
              ...terms,
              id: item.id,
              buyerName: "Krishi Co-operative",
              ongoing: item.ongoing,
              proposedPrice: terms?.price,
              myTurn: item.turn === meResponse.data.user.id,
              currentTermsId: item.currentTermsId,
              status: item.status,
            };
          }
        );

        setNegotiations(processed);
      } catch (error) {
        console.error("Failed to fetch negotiations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNegotiations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Negotiations</h1>
        <p className="text-muted-foreground">
          Track and manage all your ongoing and completed negotiations
        </p>
      </div>

      {viewDetail ? (
        <NegotiationPreview
          negotiation={selectedData}
          closeDetail={() => setViewDetail(false)}
        />
      ) : (
        <Tabs defaultValue="ongoing" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              <TabsContent value="ongoing" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {negotiations
                    .filter((item) => item.ongoing)
                    .map((item) => (
                      <NegotiationCard
                        key={item.id}
                        negotiation={item}
                        setViewDetail={setViewDetail}
                        setgetData={setSelectedData}
                        myTurn={item.myTurn}
                        currentTermsId={item.currentTermsId}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {negotiations
                    .filter((item) => !item.ongoing)
                    .map((item) => (
                      <NegotiationCard
                        key={item.id}
                        negotiation={item}
                        setViewDetail={setViewDetail}
                        setgetData={setSelectedData}
                      />
                    ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      )}
      <Toaster />
    </div>
  );
};

export default Negotiations;
