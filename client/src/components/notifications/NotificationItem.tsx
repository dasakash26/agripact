import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    status: boolean;
    createdAt: string;
  };
}

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <Card className="w-96rem mb-2">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{notification.title}</h3>
            <p className="text-muted-foreground mt-1">{notification.message}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
