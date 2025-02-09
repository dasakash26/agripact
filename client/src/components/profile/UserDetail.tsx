import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Edit, Calendar, Briefcase } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { User } from "../utils/types"
import { Link } from "react-router-dom"

interface UserDetailProps {
  user: User
}

export function UserDetail({ user }: UserDetailProps) {
  const rating = 4; // Example rating
  const crops = ['Tomatoes', 'Cucumbers', 'Peppers'];
  const date = new Date(user.createdAt);
  return (
    <Card className="bg-card">
      <CardContent className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src="https://hips.earstapps.com/hmg-prod/images/ana-de-armas-1626771511.jpg?crop=0.6923333333333334xw:1xh;center,top&resize=640:*" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant="secondary" className="text-xs">{user.role}</Badge>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <Link to="/profile/edit"  className="w-full">
          <Button className="w-full" variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          </Link>
        </div>

        <Separator />

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>Purulia</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Member since: {date.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Contracts: 7 ongoing, 0 finished</span>
          </div>
        </div>

        <Separator />

        {/* Crops Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Crops Produced</h3>
          <div className="flex flex-wrap gap-2">
            {crops.map((crop) => (
              <Badge
                key={crop}
                variant="secondary"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Contacts</h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-primary"
            >
              <Phone className="mr-2 h-4 w-4" />
              +1 234 567 8900
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-primary"
            >
              <Mail className="mr-2 h-4 w-4" />
              iamana@farmer.ap
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

