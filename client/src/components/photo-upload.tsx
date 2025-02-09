'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Camera, Trash2, Upload } from 'lucide-react'

interface Photo {
  id: number
  url: string
}

export function PhotoUpload() {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: '/placeholder.svg' },
    { id: 2, url: '/placeholder.svg' },
    { id: 3, url: '/placeholder.svg' },
  ])

  const removePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square">
            <img
              src={photo.url}
              alt={`Farm photo ${photo.id}`}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg "
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removePhoto(photo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <Camera className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Drag and drop photos here, or click to select
          </div>
          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="photo-upload"
          />
          <Button variant="outline" size="sm" asChild>
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </label>
          </Button>
        </div>
      </div>
    </div>
  )
}