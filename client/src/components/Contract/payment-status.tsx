import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Circle, DollarSign } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface PaymentStatusProps {
  contract: {
    id: string
    totalAmount: string
    paidAmount: string
  }
}

const paymentStages = [
  { name: 'Deposit', amount: '20%', completed: true },
  { name: 'Planting', amount: '30%', completed: true },
  { name: 'Mid-Season', amount: '30%', completed: false },
  { name: 'Harvest', amount: '20%', completed: false },
]

export function PaymentStatus({ contract }: PaymentStatusProps) {
  const paidPercentage = (parseFloat(contract.paidAmount) / parseFloat(contract.totalAmount)) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Total Paid: {contract.paidAmount}</span>
              <span className="text-sm font-medium">Total Amount: {contract.totalAmount}</span>
            </div>
            <Progress value={paidPercentage} className="w-full h-2" />
          </div>
          
          {paymentStages.map((stage, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                {stage.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{stage.name}</h3>
                <p className="text-sm text-gray-500">
                  {stage.completed ? 'Paid' : 'Pending'} - {stage.amount}
                </p>
                {!stage.completed && (
                  <div className="mt-2">
                    <Button className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Make Payment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

