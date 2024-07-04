import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const SingleRequest = () => {
  const { id } = useParams();
  const { user, ready } = useContext(UserContext);
  const [booking, setBooking] = useState(null);

  async function getMyBooking() {
    const { data } = await axios.get("/api/bookings/" + id);
    setBooking(data[0]);
  }
  useEffect(() => {
    getMyBooking();
  }, []);

  if (booking && user._id !== booking.place.owner) {
    return <Navigate to={"/profile/request"} />;
  }
  return <div>SingleRequest: {id}</div>;
};

export default SingleRequest;
