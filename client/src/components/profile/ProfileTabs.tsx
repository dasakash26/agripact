import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CropPortfolio } from "@/components/profile/crop-portfolio";
import {Offers} from "@/components/profile/Offers";
import { FarmDetails } from "./FarmDetails";
import { Stats } from "./Stats";

export function ProfileTabs() {
  return (
    <>
      <Tabs defaultValue="farm" className="space-y-2">
        <TabsList className="h-10">
          <TabsTrigger value="farm">Farm Details</TabsTrigger>
          <TabsTrigger value="crops">Crop Portfolio</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="farm" className="space-y-4">
          <FarmDetails />
        </TabsContent>

        <TabsContent value="crops">
          <CropPortfolio />
        </TabsContent>

        <TabsContent value="offers">
          <Offers />
        </TabsContent>

        <TabsContent value="statistics">
         <Stats/>
        </TabsContent>
      </Tabs>
    </>
  );
}
