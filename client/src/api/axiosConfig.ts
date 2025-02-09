import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    // Production URL
    return "https://project-backend-ji25.onrender.com/api/v1/";
  } else {
    // Development URL
    return "http://localhost:3000/api/v1/";
  }
};
const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export const offerSearchRoute = "search/offer";
export const initOfferRoute = "search/all";
export const createOfferRoute = "offer/create";
export const negotiationRoute = "negotiation";
export const profileRoute = "user/me";
export const profileUrl = "user/me";
export const editProfileRoute = "user/edit";
export const notificationsRoute = "myNotifications";

export default api;
