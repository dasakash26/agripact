import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import api, { negotiationRoute } from "@/api/axiosConfig";
import { CurrentTerms } from "@/components/negotiate/CurrentTerms";
import { CounterOfferForm } from "@/components/negotiate/CounterOfferForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function NegotiateOffer() {
  const [counterOffer, setCounterOffer] = useState({
    quantity: "",
    price: "",
    harvestTime: "",
    location: "",
    paymentTerms: "",
    logistics: "",
  });
  const { currentTermsId } = useParams();
  const [initialOffer, setInitialOffer] = useState<any>({});
  const { toast } = useToast();
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();
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
  const [newMessage, setNewMessage] = useState("");

  const getCurrentTerms = async () => {
    const response = await api.get(`${negotiationRoute}/${currentTermsId}`);
    setInitialOffer(response.data.currentTerms);
    console.log(response.data.currentTerms);
    const d = new Date(response.data.currentTerms.harvestTime);
    setDate(d.toLocaleDateString());
  };
  useEffect(() => {
    getCurrentTerms();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounterOffer({ ...counterOffer, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name: string, value: string) => {
    setCounterOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCounterOffer = async () => {
    console.log("Sending counter offer:", counterOffer);
    setMessages([
      ...messages,
      {
        sender: "You",
        content: `I propose: ${counterOffer.quantity} kg at $${counterOffer.price}/kg, delivered by ${counterOffer.deliveryDate} at ${counterOffer.location} with payment terms of ${counterOffer.paymentTerms}`,
      },
    ]);
    try {
      const response = await api.post(
        `${negotiationRoute}/update/${currentTermsId}`,
        counterOffer
      );
      console.log(response);
      toast({
        title: "Counter Offer Sent",
        description: "Your counter offer has been sent successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  const handleAcceptOffer = async () => {
    const res = await api.post(
      `${negotiationRoute}/complete/${currentTermsId}`,
      { status: "ACCEPTED" }
    );
    toast({
      title: "Offer Accepted",
      description: "The offer has been accepted successfully",
    });
    navigate("/negotiations");
    console.log(res);
  };
  const handleRejectOffer = async () => {
    const res = await api.post(
      `${negotiationRoute}/complete/${currentTermsId}`,
      { status: "REJECTED" }
    );
    toast({
      title: "Offer Rejected",
      description: "The offer has been rejected successfully",
    });
    navigate("/negotiations");
    console.log(res);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "You",
        content: newMessage,
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="container mx-auto p-20 space-y-6 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Contract Negotiation
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CurrentTerms
          initialOffer={initialOffer}
          date={date}
          onAccept={handleAcceptOffer}
          onReject={handleRejectOffer}
          isLoading={false}
        />

        <CounterOfferForm
          counterOffer={counterOffer}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleCounterOffer}
        />

        <div className="lg:col-span-2">
          <div className="border rounded-lg p-4">
            <div className="space-y-4 h-[400px] overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "You"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
