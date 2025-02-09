import { useState } from 'react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContractCard } from '@/components/Contract/contract-card'

// Mock data for contracts
const contracts = [
  {
    id: '1',
    buyerName: 'John Doe',
    buyerImage: '/placeholder.svg?height=40&width=40',
    farmerName: 'Alice Smith',
    cropName: 'Wheat',
    quantity: '1000 kg',
    price: '₹20,000',
    status: 'Ongoing',
  },
  {
    id: '2',
    buyerName: 'Jane Smith',
    buyerImage: '/placeholder.svg?height=40&width=40',
    farmerName: 'Bob Johnson',
    cropName: 'Rice',
    quantity: '500 kg',
    price: '₹15,000',
    status: 'Completed',
  },
  {
    id: '3',
    buyerName: 'Mike Brown',
    buyerImage: '/placeholder.svg?height=40&width=40',
    farmerName: 'Carol Williams',
    cropName: 'Corn',
    quantity: '750 kg',
    price: '₹18,000',
    status: 'Pending',
  },
]

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContracts = contracts.filter(contract => 
    (contract.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contract.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contract.cropName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || contract.status.toLowerCase() === statusFilter.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Contracts</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by buyer, farmer, or crop name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.map(contract => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </div>
    </div>
  )
}

