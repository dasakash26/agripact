'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function BankDetails() {
  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Bank details are securely stored and only shared with verified buyers after contract confirmation.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountName">Account Holder Name</Label>
          <Input
            id="accountName"
            placeholder="Enter account holder name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            type="password"
            placeholder="Enter account number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code</Label>
          <Input
            id="ifsc"
            placeholder="Enter IFSC code"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="upi">UPI ID (Optional)</Label>
          <Input
            id="upi"
            placeholder="Enter UPI ID"
          />
        </div>
      </div>
    </div>
  )
}

