import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PaymentPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="payment-method">Preferred Payment Method</Label>
          <Select>
            <SelectTrigger id="payment-method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="check">Check</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bank-account">Bank Account Number</Label>
          <Input id="bank-account" type="text" placeholder="Enter bank account number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="routing-number">Routing Number</Label>
          <Input id="routing-number" type="text" placeholder="Enter routing number" />
        </div>
        <Button className="w-full">Save Payment Preferences</Button>
      </CardContent>
    </Card>
  )
}

