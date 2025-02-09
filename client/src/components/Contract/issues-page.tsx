import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IssuesPageProps {
  contract: {
    id: string
  }
}

export function IssuesPage({ contract }: IssuesPageProps) {
  const [issueType, setIssueType] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Submitting issue:', { issueType, description, selectedFile })
    // Here you would typically handle the form submission to your server
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raise an Issue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select onValueChange={setIssueType}>
              <SelectTrigger id="issue-type">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment-delay">Payment Delay</SelectItem>
                <SelectItem value="delivery-issue">Delivery Issue</SelectItem>
                <SelectItem value="contract-dispute">Contract Dispute</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="evidence">Upload Evidence</Label>
            <Input
              id="evidence"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <Button type="submit">Submit Issue</Button>
        </form>
      </CardContent>
    </Card>
  )
}

