import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Circle } from 'lucide-react'

interface StatusPageProps {
  contract: {
    id: string
    status: string
  }
}

const stages = [
  { name: 'Plowing', completed: true, approved: true },
  { name: 'Sowing', completed: true, approved: true },
  { name: 'Harvesting', completed: true, approved: false },
  { name: 'Packaging', completed: false, approved: false },
  { name: 'Delivery', completed: false, approved: false },
]

export function StatusPage({ contract }: StatusPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name)
      // Here you would typically handle the file upload to your server
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Status: {contract.status}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                {stage.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{stage.name}</h3>
                <p className="text-sm text-gray-500">
                  {stage.completed
                    ? `Completed${stage.approved ? ' and Approved' : ', Pending Approval'}`
                    : 'Not Started'}
                </p>
                {stage.completed && !stage.approved && (
                  <div className="mt-2">
                    <Label htmlFor={`file-upload-${index}`}>Upload Image</Label>
                    <Input
                      id={`file-upload-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                    <Button onClick={handleUpload} className="mt-2">
                      Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

