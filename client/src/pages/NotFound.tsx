import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Home } from 'lucide-react'
import { Link } from "react-router-dom"


const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#e8f5e9] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-3xl font-bold text-primary">
            <AlertCircle className="w-8 h-8 mr-2" />
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/dashboard" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NotFound

