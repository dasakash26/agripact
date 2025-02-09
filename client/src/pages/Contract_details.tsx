'use client'

import { useState } from 'react'
// import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContractOverview } from '@/components/Contract/contract-overview' 
import { StatusPage } from '@/components/Contract/status-page'
import { DeliveryLogistics } from '@/components/Contract/delivery-logistics'
import { IssuesPage } from '@/components/Contract/issues-page'
import { Communication } from '@/components/Contract/communication'
import { PaymentStatus } from '@/components/Contract/payment-status'

// Mock data for a single contract

export interface ContractData {
  id: string; // Unique identifier for the contract
  buyerName: string; // Name of the buyer
  buyerImage: string; // URL or path to the buyer's image
  farmerName: string; // Name of the farmer
  farmerImage: string; // URL or path to the farmer's image
  cropName: string; // Name of the crop
  quantity: string; // Quantity of the crop (e.g., "1000 kg")
  price: string; // Price of the crop in currency format
  status: 'Ongoing' | 'Completed' | 'Pending'; // Status of the contract
  paymentTerms: string; // Payment terms (e.g., "Net 30")
  harvestTime: string; // Expected delivery date
  deliveryStatus: 'Pending' | 'Dispatched' | 'Delivered'; // Status of the delivery
  trackingId: string; // Tracking ID for delivery
  totalAmount: string; // Total amount for the contract
  paidAmount: string; // Amount already paid
}

const contractData:ContractData = {
  id: '1',
  buyerName: 'John Doe',
  buyerImage: '/placeholder.svg?height=40&width=40',
  farmerName: 'Alice Smith',
  farmerImage: '/placeholder.svg?height=40&width=40',
  cropName: 'Wheat',
  quantity: '1000 kg',
  price: '₹20,000',
  status: 'Ongoing',
  paymentTerms: 'Net 30',
  harvestTime: '2023-12-31',
  deliveryStatus: 'Dispatched',
  trackingId: 'TRK123456789',
  totalAmount: '₹20,000',
  paidAmount: '₹10,000',
}

export const ContractDetailsPage : React.FC<ContractData>= (contractData) =>{
  // const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  // In a real application, you would fetch the contract data based on the ID
  // console.log('Contract ID:', params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contract Details</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contract {contractData.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={contractData.buyerImage} alt={contractData.buyerName} />
                {/* <AvatarFallback>{contractData.buyerName.charAt(0)}</AvatarFallback> */}
              </Avatar>
              <div>
                <h3 className="font-semibold">{contractData.buyerName}</h3>
                <p className="text-sm text-gray-500">Buyer</p>
              </div>
            </div>
            <Badge className="text-lg px-3 py-1">{contractData.status}</Badge>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={contractData.farmerImage} alt={contractData.farmerName} />
                {/* <AvatarFallback>{contractData.farmerName.charAt(0)}</AvatarFallback> */}
              </Avatar>
              <div>
                <h3 className="font-semibold">{contractData.farmerName}</h3>
                <p className="text-sm text-gray-500">Farmer</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ContractOverview contract={contractData} />
        </TabsContent>

        <TabsContent value="status">
          <StatusPage contract={contractData} />
        </TabsContent>

        <TabsContent value="delivery">
          <DeliveryLogistics contract={contractData} />
        </TabsContent>

        <TabsContent value="issues">
          <IssuesPage contract={contractData} />
        </TabsContent>

        <TabsContent value="communication">
          <Communication />
        </TabsContent>
        <TabsContent value="payment">
          <PaymentStatus contract={contractData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

