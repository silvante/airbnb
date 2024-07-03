import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import UserProfile from "./pages/UserProfile";
import MyBookings from "./pages/MyBookings";
import MyPlaces from "./pages/MyPlaces";
import Addnew from "./pages/Addnew";
import EditProfile from "./pages/EditProfile";
import Booking from "./pages/Booking";
import PlaceSettings from "./components/PlaceSettings";
import Channel from "./pages/Channel";
import MyRequests from "./pages/MyRequests";

axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sing-up" element={<Singup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile" element={<UserProfile />}>
          <Route path="/profile/bookings" element={<MyBookings />} />
          <Route index path="/profile/places" element={<MyPlaces />} />
          <Route
            path="/profile/places/settings/:id"
            element={<PlaceSettings />}
          />
          <Route index path="/profile/request" element={<MyRequests />} />
        </Route>
        <Route path="/add-new" element={<Addnew />} />
        <Route path="/place/:id" element={<Booking />} />
        <Route path="/profile/place/:id" element={<Booking />} />
        <Route path="/edit-place/:id" element={<Addnew />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/user/:username" element={<Channel />} />
      </Route>
    )
  );
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
