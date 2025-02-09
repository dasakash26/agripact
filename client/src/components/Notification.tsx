// import React from 'react'
import api, { notificationsRoute } from "@/api/axiosConfig";
import { Badge, Bell, BellIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { NotificationItem } from "./notifications/NotificationItem";

function Notification() {
  const [notify, setNotify] = useState([
    { id: "0", title: "", message: "", status: false, createdAt: "" },
  ]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`${notificationsRoute}`);
      setNotify(response.data);
      //
      console.log("Notifications:", response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <BellIcon />
          {notify.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[40rem]">
        {notify.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
