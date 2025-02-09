import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

export function FarmPhotos() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Farm Photos</h3>
          <Button variant="outline" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Add Photos
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Farm photo 1"
            className="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"  
            //   className="object-cover"
            />
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Farm photo 2"
            //   fill
              className="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"  
            />
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Farm photo 3"
            //   fill
            //   className="object-cover"
            className="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"  
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
