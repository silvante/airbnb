import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { imageTotalLink } from "..";
import { format, differenceInCalendarDays } from "date-fns";

const SingleRequest = () => {
  const { id } = useParams();
  const { user, ready } = useContext(UserContext);
  const [booking, setBooking] = useState(null);

  async function getMyBooking() {
    const { data } = await axios.get(`/api/bookings/${id}`);
    setBooking(data[0]);
  }
  useEffect(() => {
    getMyBooking();
  }, []);

  if (!booking) {
    return "loading...";
  }

  if (booking && user._id !== booking.place.owner) {
    return <Navigate to={"/profile/request"} />;
  }

  console.log(booking);
  return (
    <div className="w-full flex justify-center px-basic">
      <div className="w-base py-5 space-y-5">
        <header className="flex justify-between items-center my-5">
          <h2 className="text-xl font-semibold">{booking.place.title}</h2>
        </header>
        <div className="w-full bg-white rounded-2xl shadow-xl p-5 gap-5 flex">
          <div className="w-96 rounded-xl overflow-hidden">
            <img
              src={imageTotalLink + booking.place.photos[0]}
              alt={booking.place.title}
              className=" aspect-square w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold truncate">Request from</h3>
              <p>{booking.name}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold truncate">checking times</h3>
              <p className=" truncate">
                check in{" "}
                <span className="text-xl font-semibold bg-fun p-3 flex border-2 border-base rounded-lg">
                  {format(new Date(booking.checkin), "yyyy-MM-dd")}
                </span>{" "}
                check out
                <span className="text-xl font-semibold bg-fun p-3 flex border-2 border-base rounded-lg">
                  {format(new Date(booking.checkout), "yyyy-MM-dd")}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center">
                for{" "}
                {Math.abs(
                  differenceInCalendarDays(
                    new Date(booking.checkin),
                    new Date(booking.checkout)
                  )
                )}{" "}
                nights
                <i className="bx bx-moon text-2xl mr-1"></i>
              </h3>
            </div>
            <div>
              <h3 className="text-xl  flex items-center">
                phone number:{" "}
                <span className="font-semibold">{booking.mobile}</span>{" "}
                <i className="bx bx-phone text-2xl"></i>
              </h3>
            </div>
            <h3 className="text-xl">
              payment <span className="font-semibold">{booking.price}$</span>
            </h3>
          </div>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-xl p-5 space-y-3">
          <h3 className="text-xl font-semibold">{booking.closed === false ? "Controls" : "This request has already closed"}</h3>
          {booking.closed === false && (
            <div className="flex w-full gap-5">
              <button className="bg-base text-white py-2 px-5 rounded-lg flex flex-1 justify-center items-center">
                Close request{" "}
                <i className="bx bx-check-double text-xl ml-1"></i>
              </button>
              <button className="bg-green-600 text-white py-2 px-5 rounded-lg flex flex-1 justify-center items-center">
                Call to {booking.mobile}
                <i className="bx bx-phone text-xl ml-1"></i>
              </button>
            </div>
          )}
          <p>
            <span className="font-semibold">{booking.closed === false ? "close" : "click to"}</span> {booking.closed === false ? "button will cose this request and never reactivate again" : "learn more to read about this site "}
            <Link className="text-blue-600 hover:underline ml-1">Learn more...</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleRequest;
