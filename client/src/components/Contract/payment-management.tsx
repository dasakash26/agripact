import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PaymentManagementProps {
  contract: {
    paymentStatus: string
  }
}

export function PaymentManagement({ contract }: PaymentManagementProps) {
  const getPaymentProgress = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 0
      case 'in-progress':
        return 50
      case 'completed':
        return 100
      default:
        return 0
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold mb-2">Payment Status</p>
          <Progress value={getPaymentProgress(contract.paymentStatus)} className="w-full" />
          <p className="text-center mt-2">{contract.paymentStatus}</p>
        </div>
        <Button className="w-full">View Payment History</Button>
      </CardContent>
    </Card>
  )
}

