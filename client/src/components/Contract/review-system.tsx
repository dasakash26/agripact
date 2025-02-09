import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

export function ReviewSystem() {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmitReview = () => {
    console.log('Submitting review:', { rating, review })
    // Here you would typically send this data to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review System</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold mb-2">Rate your experience</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Write your review</p>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
          />
        </div>
        <Button onClick={handleSubmitReview} className="w-full">Submit Review</Button>
      </CardContent>
    </Card>
  )
}

