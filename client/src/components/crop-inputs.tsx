'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Crop {
  id: number
  name: string
  quantity: string
  unit: string
  harvestDate: Date | undefined
}

export function CropInputs() {
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: 1,
      name: '',
      quantity: '',
      unit: 'kg',
      harvestDate: undefined,
    },
  ])

  const addCrop = () => {
    setCrops([
      ...crops,
      {
        id: crops.length + 1,
        name: '',
        quantity: '',
        unit: 'kg',
        harvestDate: undefined,
      },
    ])
  }

  const removeCrop = (id: number) => {
    setCrops(crops.filter(crop => crop.id !== id))
  }

  const updateCrop = (id: number, field: keyof Crop, value: any) => {
    setCrops(
      crops.map(crop =>
        crop.id === id ? { ...crop, [field]: value } : crop
      )
    )
  }

  return (
    <div className="space-y-4">
      {crops.map((crop) => (
        <div key={crop.id} className="flex gap-4 items-start">
          <div className="grid gap-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Name</label>
                <Select
                  value={crop.name}
                  onValueChange={(value) => updateCrop(crop.id, 'name', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={crop.quantity}
                    onChange={(e) => updateCrop(crop.id, 'quantity', e.target.value)}
                    placeholder="Enter quantity"
                  />
                  <Select
                    value={crop.unit}
                    onValueChange={(value) => updateCrop(crop.id, 'unit', value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="quintal">quintal</SelectItem>
                      <SelectItem value="ton">ton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Harvest Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !crop.harvestDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {crop.harvestDate ? (
                        format(crop.harvestDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={crop.harvestDate}
                      onSelect={(date) => updateCrop(crop.id, 'harvestDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="mt-8"
            onClick={() => removeCrop(crop.id)}
            disabled={crops.length === 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={addCrop}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Another Crop
      </Button>
    </div>
  )
}

