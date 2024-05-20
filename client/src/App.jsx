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
          <Route index path="/profile/bookings" element={<MyBookings />} />
          <Route path="/profile/places" element={<MyPlaces />} />
        </Route>
        <Route path="/add-new" element={<Addnew />} />
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
