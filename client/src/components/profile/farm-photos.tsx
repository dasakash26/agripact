import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'

export function FarmPhotos() {
  const photos = [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Photos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Farm photo ${index + 1}`}
              className="w-full h-24 object-cover rounded-md"
            />
          ))}
        </div>
        <Button className="w-full">
          <Upload className="mr-2 h-4 w-4" /> Upload New Photo
        </Button>
      </CardContent>
    </Card>
  )
}

