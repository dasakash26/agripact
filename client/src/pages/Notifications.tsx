import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Bell } from 'lucide-react'
import api from '@/api/axiosConfig'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { NotificationItem } from '@/components/notifications/NotificationItem'
import { notificationsRoute } from '@/api/axiosConfig'

interface Notification {
  id: string
  title: string
  message: string
  status: boolean
  userId: string
  offerId: string[]
  createdAt: string
  updatedAt: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`${notificationsRoute}`)
      setNotifications(response.data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch notifications. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/api/v1/myNotifications/`, { status: true })
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, status: true } : notif
      ))
      toast({
        title: 'Success',
        description: 'Notification marked as read.',
      })
    } catch (error) {
      console.error('Error marking notification as read:', error)
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-20 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-center text-muted-foreground">No notifications found.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={markAsRead}
                  />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

