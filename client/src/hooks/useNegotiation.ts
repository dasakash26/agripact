import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { negotiationRoute } from "@/api/axiosConfig";
import { useToast } from "@/hooks/use-toast";

export const useNegotiation = (currentTermsId: string) => {
  const [initialOffer, setInitialOffer] = useState<any>({});
  const [date, setDate] = useState<string>("");
  const [counterOffer, setCounterOffer] = useState({
    quantity: "",
    price: "",
    harvestTime: "",
    location: "",
    paymentTerms: "",
    logistics: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const getCurrentTerms = async () => {
    try {
      const response = await api.get(`${negotiationRoute}/${currentTermsId}`);
      setInitialOffer(response.data.currentTerms);
      const d = new Date(response.data.currentTerms.harvestTime);
      setDate(d.toLocaleDateString());
    } catch (error) {
      toast({ title: "Error", description: "Failed to load terms" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounterOffer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCounterOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCounterOffer = async () => {
    try {
      await api.post(
        `${negotiationRoute}/update/${currentTermsId}`,
        counterOffer
      );
      toast({
        title: "Success",
        description: "Counter offer sent successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send counter offer",
      });
    }
  };

  const handleOfferStatus = async (status: "ACCEPTED" | "REJECTED") => {
    try {
      await api.post(`${negotiationRoute}/complete/${currentTermsId}`, {
        status,
      });
      toast({
        title: `Offer ${status.toLowerCase()}`,
        description: `The offer has been ${status.toLowerCase()} successfully`,
      });
      navigate("/negotiations");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${status.toLowerCase()} offer`,
      });
    }
  };

  useEffect(() => {
    getCurrentTerms();
  }, [currentTermsId]);

  return {
    initialOffer,
    date,
    counterOffer,
    handleInputChange,
    handleSelectChange,
    handleCounterOffer,
    handleOfferStatus,
  };
};
