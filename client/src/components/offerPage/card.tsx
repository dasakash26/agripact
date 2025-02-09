import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Calendar, Package, DollarSign } from 'lucide-react'

interface CropOfferProps {
  id: number
  cropName: string
  cropType: string
  price: number
  quantity: number
  totalValue: number
  harvestDate: string
  status: "Active" | "Expired" | "Completed"
}

export function CropOfferCard({
  cropName,
  cropType,
  price,
  quantity,
  totalValue,
  harvestDate,
  status
}: CropOfferProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-primary">{cropName}</h3>
            <p className="text-sm text-muted-foreground">{cropType}</p>
          </div>
          <Badge
            variant={
              status === "Active"
                ? "default"
                : status === "Expired"
                ? "secondary"
                : "outline"
            }
            className="text-xs font-medium"
          >
            {status}
          </Badge>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-lg">₹{price.toLocaleString()} per kg</p>
            </div>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Quantity</p>
              <p className="text-lg">{quantity.toLocaleString()} kg</p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Value</p>
            <p className="text-xl font-semibold">₹{totalValue.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Harvest Date</p>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <p className="text-sm">{new Date(harvestDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <div className="flex justify-end w-full">
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

