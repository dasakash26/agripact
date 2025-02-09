import api, { profileUrl } from "@/api/axiosConfig";
import { User } from "@/components/utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(profileUrl);
        console.log("> from use user hook:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading };
};
