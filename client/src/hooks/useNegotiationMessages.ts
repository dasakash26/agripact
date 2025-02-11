import { useState } from "react";

export const useNegotiationMessages = () => {
  const [messages, setMessages] = useState([
    {
      sender: "Farmer",
      content: "I can offer 1000 kg of wheat at $0.50 per kg.",
    },
    {
      sender: "You",
      content: "Can we negotiate on the price? How about $0.48 per kg?",
    },
    {
      sender: "Farmer",
      content: "I can do $0.49 per kg, but that's my final offer.",
    },
  ]);

  const addMessage = (content: string, sender = "You") => {
    setMessages((prev) => [...prev, { sender, content }]);
  };

  return { messages, addMessage };
};
