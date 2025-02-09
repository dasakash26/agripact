import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CropPortfolio() {
  const currentCrops = [
    {
      name: "Rice",
      quantity: "500 kg",
      harvestDate: "March 2024",
      status: "Growing",
    },
    {
      name: "Wheat",
      quantity: "750 kg",
      harvestDate: "April 2024",
      status: "Growing",
    },
    {
      name: "Corn",
      quantity: "300 kg",
      harvestDate: "May 2024",
      status: "Seeding",
    },
  ];

  const pastCrops = [
    {
      name: "Soybeans",
      quantity: "400 kg",
      harvestDate: "December 2023",
      status: "Completed",
    },
    {
      name: "Cotton",
      quantity: "600 kg",
      harvestDate: "November 2023",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card className="md:h-[34rem] md:w-[40rem]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold my-4">Current Crops</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCrops.map((crop, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{crop.name}</h4>
                  <Badge variant="outline">{crop.status}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Quantity: {crop.quantity}</p>
                  <p>Expected Harvest: {crop.harvestDate}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold my -4">Past Crops</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastCrops.map((crop, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{crop.name}</h4>
                  <Badge variant="secondary">{crop.status}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Quantity: {crop.quantity}</p>
                  <p>Harvested: {crop.harvestDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
