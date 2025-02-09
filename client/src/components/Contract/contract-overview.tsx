import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContractOverviewProps {
  contract: {
    cropName: string
    quantity: string
    price: string
    paymentTerms: string
    deliveryDate?: string
  }
}

export function ContractOverview({ contract }: ContractOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Crop</p>
            <p>{contract.cropName}</p>
          </div>
          <div>
            <p className="font-semibold">Quantity</p>
            <p>{contract.quantity}</p>
          </div>
          <div>
            <p className="font-semibold">Price</p>
            <p>{contract.price}</p>
          </div>
          <div>
            <p className="font-semibold">Payment Terms</p>
            <p>{contract.paymentTerms}</p>
          </div>
          <div>
            <p className="font-semibold">Agreed Delivery Date</p>
            <p>{contract.deliveryDate}</p>
          </div>
        </div>
        <Button className="w-full">Download PDF</Button>
      </CardContent>
    </Card>
  )
}

