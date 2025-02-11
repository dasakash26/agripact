import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  sender: string;
  content: string;
}

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Negotiation History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("mb-4", message.sender === "You" && "text-right")}
            >
              <div
                className={cn(
                  "inline-block rounded-lg px-3 py-2 text-sm",
                  message.sender === "You"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="font-medium mb-0.5">{message.sender}</p>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
