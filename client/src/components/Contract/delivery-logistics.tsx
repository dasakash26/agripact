import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Truck } from 'lucide-react'

interface DeliveryLogisticsProps {
  contract: {
    deliveryStatus: string
    deliveryDate?: string
    trackingId: string
  }
}

export function DeliveryLogistics({ contract }: DeliveryLogisticsProps) {
  const deliverySteps = [
    { name: 'Dispatched', completed: true },
    { name: 'In Transit', completed: contract.deliveryStatus === 'In Transit' },
    { name: 'Delivered', completed: contract.deliveryStatus === 'Delivered' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery/Logistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          {deliverySteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {step.completed ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <Circle className="w-8 h-8 text-gray-300" />
              )}
              <p className="mt-2 text-sm">{step.name}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div>
            <p className="font-semibold">Estimated Delivery Date</p>
            <p>{contract.deliveryDate}</p>
          </div>
          <div>
            <p className="font-semibold">Tracking ID</p>
            <p>{contract.trackingId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

