import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Communication() {
  const [messages, setMessages] = useState([
    { sender: 'Buyer', content: 'Hello, I have a question about the delivery.' },
    { sender: 'Farmer', content: 'Sure, what would you like to know?' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', content: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                <Avatar>
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div className={`p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <p className="text-sm font-semibold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
        <Button className="w-full">Contact Support</Button>
      </CardContent>
    </Card>
  )
}

