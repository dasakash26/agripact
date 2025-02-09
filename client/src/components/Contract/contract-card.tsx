import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface ContractCardProps {
  contract: {
    id: string
    buyerName: string
    buyerImage: string
    cropName: string
    quantity: string
    price: string
    status: string
  }
}

export function ContractCard({ contract }: ContractCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500'
      case 'ongoing':
        return 'bg-yellow-500'
      case 'pending':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={contract.buyerImage} alt={contract.buyerName} />
            <AvatarFallback>{contract.buyerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{contract.buyerName}</h3>
            <Badge className={`${getStatusColor(contract.status)} text-white`}>
              {contract.status}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <p><span className="font-medium">Crop:</span> {contract.cropName}</p>
          <p><span className="font-medium">Quantity:</span> {contract.quantity}</p>
          <p><span className="font-medium">Price:</span> {contract.price}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/contracts/${contract.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

