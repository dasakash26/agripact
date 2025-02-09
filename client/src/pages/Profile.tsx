import { useEffect, useState } from "react"
import { PaymentPreferences } from "@/components/profile/payment-preferences"
import { FarmPhotos } from "@/components/profile/farm-photos"
import { UserDetail } from "@/components/profile/UserDetail"
import api, { profileRoute } from "@/api/axiosConfig"
import { ProfileTabs } from "@/components/profile/ProfileTabs"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { User } from "@/components/utils/types"

export default function FarmerProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await api.get(profileRoute)
        setUser(response.data.user)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setError("Failed to load user data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  return (
    <div className="container mx-auto px-4 py-20 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Farmer Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {user && <UserDetail user={user} />}
            <div className="lg:col-span-2">
              <ProfileTabs />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PaymentPreferences />
        <FarmPhotos />
      </div>
      <Footer />
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-64 lg:col-span-2" />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  )
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}

