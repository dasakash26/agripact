import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export function ContractHistory() {
  const ongoingContracts = [
    {
      id: 1,
      cropName: 'Rice',
      buyerName: 'AgriCorp Inc.',
      buyerImage: '/placeholder.svg',
      status: 'In Progress',
      quantity: '200 kg',
      price: '₹40/kg',
    },
    {
      id: 2,
      cropName: 'Wheat',
      buyerName: 'FoodTech Ltd.',
      buyerImage: '/placeholder.svg',
      status: 'Negotiating',
      quantity: '300 kg',
      price: '₹35/kg',
    },
  ]

  const completedContracts = [
    {
      id: 3,
      cropName: 'Corn',
      buyerName: 'Global Foods',
      buyerImage: '/placeholder.svg',
      status: 'Completed',
      quantity: '150 kg',
      price: '₹30/kg',
      rating: 4,
    },
    {
      id: 4,
      cropName: 'Soybeans',
      buyerName: 'Organic Traders',
      buyerImage: '/placeholder.svg',
      status: 'Completed',
      quantity: '250 kg',
      price: '₹45/kg',
      rating: 5,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ongoing Contracts</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ongoingContracts.map((contract) => (
              <div key={contract.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{contract.cropName}</h4>
                    <div className="flex items-center mt-1">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={contract.buyerImage} />
                        <AvatarFallback>{contract.buyerName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{contract.buyerName}</span>
                    </div>
                  </div>
                  <Badge>{contract.status}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Quantity: {contract.quantity}</p>
                  <p>Price: {contract.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Completed Contracts</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {completedContracts.map((contract) => (
              <div key={contract.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{contract.cropName}</h4>
                    <div className="flex items-center mt-1">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={contract.buyerImage} />
                        <AvatarFallback>{contract.buyerName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{contract.buyerName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{contract.status}</Badge>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < contract.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Quantity: {contract.quantity}</p>
                  <p>Price: {contract.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

