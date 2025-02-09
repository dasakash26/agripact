import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/MainLayout.tsx";
import LoginPage from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Search from "./pages/Search.tsx";
import CreateOffer from "./pages/CreateOffer.tsx";
import Negotiations from "./pages/Negotiations.tsx";
import Settings from "./pages/Settings.tsx";
import Notification from "./components/Notification.tsx";
import NotFound from "./pages/NotFound.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import SignupPage from "./pages/Signup.tsx";
import ContractNegotiationPage from "./pages/NegotiateOffer.tsx";
import Profile from "./pages/Profile.tsx";
import OffersPage from "./pages/OffersPage.tsx";
import EditProfilePage from "./pages/EditProfile.tsx";
import SignupPagePDF from "./pages/test.tsx";
import ContractsPage from "./pages/Contract_card_list.tsx";
import { ContractDetailsPage } from "./pages/Contract_details.tsx";
import Notifications from "./pages/Notifications.tsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/agripact" element={<LandingPage />} />
        <Route path="/test" element={<SignupPagePDF />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="" element={<Layout />}>
          <Route path="notifications" element={<Notifications />} />
          <Route path="offer/new" element={<CreateOffer />} />
          <Route path="offer/all" element={<OffersPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="create-offer" element={<CreateOffer />} />
          <Route path="negotiations" element={<Negotiations />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notification />} />
          <Route
            path="negotiations/:currentTermsId"
            element={<ContractNegotiationPage />}
          />
          <Route path="contracts" element={<ContractsPage />} />
          <Route
            path="contracts/:contractId"
            element={<ContractDetailsPage />}
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
