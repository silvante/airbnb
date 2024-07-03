import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { imageTotalLink } from "..";
import { format, differenceInCalendarDays } from "date-fns";
import PageIsEmpty from "../components/PageIsEmpty";

const MyRequests = () => {
  const { user, ready } = useContext(UserContext);
  const [bookings, setbookings] = useState([]);

  async function getMyBookings() {
    const { data } = await axios.get("/api/bookings/");
    const filteredData = data.filter((e) => e.place.owner == user._id);
    setbookings(filteredData);
  }
  useEffect(() => {
    getMyBookings();
  }, []);
  return (
    <div>
      <header className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold">
          Your <span className="text-baseRed">requests</span>
        </h2>
        <h2 className="text-2xl font-semibold">
          total number - {bookings.length}
        </h2>
      </header>
      {bookings.length <= 0 && (
        <PageIsEmpty text={"Nobody Requested you yet"} />
      )}
      <section className="py-5 space-y-5">
        {bookings.map((booking) => {
          return (
            <Link
              key={booking._id}
              className="w-full p-5 bg-white rounded-xl shadow-lg flex items-center justify-between transition-all hover:scale-105"
            >
              <div className="flex items-center  gap-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={`${imageTotalLink}${booking.place.photos[0]}`}
                    alt={booking.place.title}
                    className=" aspect-square object-cover"
                  />
                </div>
                <div>
                  <p>
                    from:{" "}
                    <span className="font-semibold text-xl">
                      {booking.name}
                    </span>
                  </p>
                  <p>
                    mobile:{" "}
                    <span className="font-semibold">{booking.mobile}</span>
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p>
                  {format(new Date(booking.checkin), "yyyy-MM-dd")} →{" "}
                  {format(new Date(booking.checkout), "yyyy-MM-dd")}
                </p>
                <p className="font-semibold">
                  (for
                  <span className="mx-1">
                    {Math.abs(
                      differenceInCalendarDays(
                        new Date(booking.checkin),
                        new Date(booking.checkout)
                      )
                    )}
                  </span>
                  nights)
                </p>
              </div>
              <div>
                <p>
                  payment:{" "}
                  <span className="font-semibold text-xl">
                    ${booking.price}
                  </span>
                </p>
                {!booking.closed ? (
                  <p className="flex items-center text-green-600">
                    Active <i className="bx bx-check text-xl"></i>
                  </p>
                ) : (
                  <p className="flex items-center text-red-600">
                    closed <i className="bx bx-check-double text-xl"></i>
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default MyRequests;
