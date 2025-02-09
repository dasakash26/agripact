import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from 'react-router-dom';
import { Wheat, FileText, MessageSquare, DollarSign, Calendar, Send, Check, X, MapPin, CreditCard } from 'lucide-react'
import api, { negotiationRoute } from '@/api/axiosConfig';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ContractNegotiationPage = () => {
  const [counterOffer, setCounterOffer] = useState({
    quantity: '',
    price: '',
    harvestTime: '',
    location: '',
    paymentTerms: '',
    logistics: '',
  })
const {currentTermsId} = useParams();
const [initialOffer, setInitialOffer] = useState<any>({});
const {toast} = useToast();
const [date, setDate] = useState<string>('');
const navigate = useNavigate();
  // const [messages, setMessages] = useState([
  //   { sender: 'Farmer', content: 'I can offer 1000 kg of wheat at $0.50 per kg.' },
  //   { sender: 'You', content: 'Can we negotiate on the price? How about $0.48 per kg?' },
  //   { sender: 'Farmer', content: 'I can do $0.49 per kg, but that\'s my final offer.' },
  // ])
  const getCurrentTerms = async () => {
    const response = await api.get(`${negotiationRoute}/${currentTermsId}`);
    setInitialOffer(response.data.currentTerms);
    console.log(response.data.currentTerms);
    const d = new Date(response.data.currentTerms.harvestTime);
    setDate(d.toLocaleDateString());
  }
  useEffect(()=>{
    getCurrentTerms();
  },[])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounterOffer({ ...counterOffer, [e.target.name]: e.target.value })
  }
  const handleSelectChange = (name: string, value: string) => {
    setCounterOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCounterOffer = async () => {
    console.log('Sending counter offer:', counterOffer)
    // setMessages([...messages, { sender: 'You', content: `I propose: ${counterOffer.quantity} kg at $${counterOffer.price}/kg, delivered by ${counterOffer.deliveryDate} at ${counterOffer.location} with payment terms of ${counterOffer.paymentTerms}` }])
    try{
      const response = await api.post(`${negotiationRoute}/update/${currentTermsId}`, counterOffer);
      console.log(response);
      toast({
        title: "Counter Offer Sent",
        description: "Your counter offer has been sent successfully",
      })
      
    }catch(error){
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      })
    }
  }
  const handleAcceptOffer = async () => {
    const res = await api.post(`${negotiationRoute}/complete/${currentTermsId}`,{status: "ACCEPTED"});
    toast({
      title: "Offer Accepted",
      description: "The offer has been accepted successfully",
    })
    navigate("/negotiations");
    console.log(res);
  }
  const handleRejectOffer = async () => {
    const res = await api.post(`${negotiationRoute}/complete/${currentTermsId}`,{status: "REJECTED"});
    toast({
      title: "Offer Rejected",
      description: "The offer has been rejected successfully",
    })
    navigate("/negotiations");
    console.log(res);
  }

  return (
    <div className="mx-auto mt-16 min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Contract Negotiation</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Column - Current Terms */}
        <Card className="bg-white shadow-lg border-l-4 border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center text-green-700">
              <FileText className="mr-2" />
              Current Contract Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-2 bg-green-50 rounded-md">
                <Wheat className="text-green-600 mr-2" />
                <span className="font-medium">{initialOffer?.cropName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{initialOffer?.quantity} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">{initialOffer?.price} per kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Harvest Time:</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{initialOffer?.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment terms:</span>
                <span className="font-medium">{initialOffer?.paymentTerms}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Logistical preference:</span>
                <span className="font-medium">{initialOffer?.logistics}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between bg-green-50 gap-10">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleAcceptOffer}>
              <Check className="h-4 w-4" /> Accept Offer
            </Button>
            <Button onClick={handleRejectOffer} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500">
              <X className="h-4 w-4" /> Reject Offer
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column - Counter Offer */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <MessageSquare className="mr-2" />
              Counter Offer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="relative">
                <Input
                  id="quantity"
                  name="quantity"
                  value={counterOffer.quantity}
                  onChange={handleInputChange}
                  className="peer pl-8 border-b border-green-300 focus:border-green-500 transition-all"
                  placeholder=" "
                />
                <Label htmlFor="quantity" className="absolute left-8 top-2 text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-green-500">
                  Quantity (kg)
                </Label>
                <Wheat className="absolute left-2 top-3 h-5 w-5 text-green-500" />
              </div>
              <div className="relative">
                <Input
                  id="price"
                  name="price"
                  value={counterOffer.price}
                  onChange={handleInputChange}
                  className="peer pl-8 border-b border-green-300 focus:border-green-500 transition-all"
                  placeholder=" "
                />
                <Label htmlFor="price" className="absolute left-8 top-2 text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-green-500">
                  Price per kg ($)
                </Label>
                <DollarSign className="absolute left-2 top-3 h-5 w-5 text-green-500" />
              </div>
              <div className="relative">
                <Input
                  id="harvestTime"
                  name="harvestTime"
                  type="date"
                  value={counterOffer.harvestTime}
                  onChange={handleInputChange}
                  className="peer pl-8 border-b border-green-300 focus:border-green-500 transition-all"
                />
                <Label htmlFor="harvestTime" className="absolute left-8 top-2 text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-green-500">
                  Delivery Date
                </Label>
                <Calendar className="absolute left-2 top-3 h-5 w-5 text-green-500" />
              </div>
              <div className="relative">
                <Input
                  id="location"
                  name="location"
                  value={counterOffer.location}
                  onChange={handleInputChange}
                  className="peer pl-8 border-b border-green-300 focus:border-green-500 transition-all"
                  placeholder=" "
                />
                <Label htmlFor="location" className="absolute left-8 top-2 text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-green-500">
                  Location
                </Label>
                <MapPin className="absolute left-2 top-3 h-5 w-5 text-green-500" />
              </div>
              <div className="relative">
              <Select onValueChange={(value) => {handleSelectChange("paymentTerms", value)}}>
                  <SelectTrigger className="w-full pl-8 border-b border-green-300 focus:border-green-500 transition-all">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time payment</SelectItem>
                    <SelectItem value="installments">Installments</SelectItem>
                    <SelectItem value="on-delivery">Payment on delivery</SelectItem>
                    <SelectItem value="advance">Advance payment</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Label htmlFor="paymentTerms" className="absolute left-8 top-2 text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-green-500">
                  Payment Terms
                </Label> */}
                <CreditCard className="absolute left-2 top-3 h-5 w-5 text-green-500" />
              </div>
              {/*  Logistics */}
            <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => {
              handleSelectChange("logistics", value);
            }}>
                  <SelectTrigger className="w-full pl-8 border-b border-green-300 focus:border-green-500 transition-all">
                    <SelectValue placeholder="Select logistics preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">Arranged by farmer</SelectItem>
                    <SelectItem value="installments">Arranged by buyer</SelectItem>
                    <SelectItem value="on-delivery">Arranged by AgriPact</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="logistics" className="absolute left-8 top-2 text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-green-500">
                  Logistics
                </Label>
                <CreditCard className="absolute left-2 top-3 h-5 w-5 text-green-500" />
            </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-green-700 hover:bg-green-800 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCounterOffer}
            >
              <Send className="mr-2 h-5 w-5" /> Send Counter Offer
            </Button>
          </CardFooter>
        </Card>

        {/* Negotiation History */}
        {/* <Card className="md:col-span-2 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <MessageSquare className="mr-2" />
              Negotiation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border border-green-100 p-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                  <span className="font-medium text-green-700">{message.sender}: </span>
                  <span className={`inline-block rounded-lg px-3 py-2 ${
                    message.sender === 'You' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.content}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card> */}
      </div>
      <Toaster />
    </div>
  )
}

export default ContractNegotiationPage;