import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LegalDisputeProps {
  contract: {
    id: string
  }
}

export function LegalDispute({ contract }: LegalDisputeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal and Dispute Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>If you're experiencing any issues with this contract, please use the button below to flag a dispute.</p>
        <Button variant="destructive" className="w-full">Flag Dispute</Button>
        <div>
          <p className="font-semibold mb-2">Contract Summary</p>
          <p>Contract ID: {contract.id}</p>
          {/* Add more contract summary details here */}
        </div>
      </CardContent>
    </Card>
  )
}

