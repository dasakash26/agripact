import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api, { editProfileRoute, profileRoute } from "@/api/axiosConfig";
import { Toast } from "@radix-ui/react-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

interface UserData {
  name: string;
  aadharNumber: string;
  phone: string;
  crops: string;
  state: string;
  district: string;
  village: string;
  pin: string;
}

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    aadharNumber: "",
    phone: "",
    crops: "",
    state: "",
    district: "",
    village: "",
    pin: "",
  });

  useEffect(() => {
    //get user data from api
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(profileRoute);
        setUserData(response.data.user);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStateChange = (value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      state: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      //get from edit profile form axios
      const response = await api.put(editProfileRoute, userData);
      toast({
        title: "Profile updated successfully",
        description: response.data.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Accordion type="single" collapsible defaultValue="personal">
              <AccordionItem value="personal">
                <AccordionTrigger>Personal Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt="Profile picture"
                        />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Change Picture
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove Picture
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="aadharNumber">Aadhar</Label>
                        <Input
                          id="aadharNumber"
                          name="aadharNumber"
                          value={userData.aadharNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your Aadhar number"
                        />
                      </div>
                      <div className="grid gap-4">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your valid phone number..."
                        />
                        <Label htmlFor="crops">Crops</Label>
                        <Input
                          id="crops"
                          name="crops"
                          type="text"
                          value={userData.crops}
                          onChange={handleInputChange}
                          placeholder="Enter your fav crops"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Address</Label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="state">State</Label>
                          <Select
                            onValueChange={handleStateChange}
                            value={userData.state}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>States</SelectLabel>
                                {states.map((state, i) => (
                                  <SelectItem key={i} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="district">District</Label>
                          <Input
                            id="district"
                            name="district"
                            value={userData.district}
                            onChange={handleInputChange}
                            className="form-select border rounded-md p-2"
                            placeholder="Enter your district"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="village">Village</Label>
                          <Input
                            id="village"
                            name="village"
                            value={userData.village}
                            onChange={handleInputChange}
                            className="form-select border rounded-md p-2"
                            placeholder="Enter your village"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="pin">PIN</Label>
                          <Input
                            id="pin"
                            name="pin"
                            value={userData.pin}
                            onChange={handleInputChange}
                            placeholder="Enter your PIN code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
