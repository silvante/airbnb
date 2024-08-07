import React, { useContext, useEffect, useState } from "react";
import PageIsEmpty from "../components/PageIsEmpty";
import axios from "axios";
import { UserContext } from "../UserContext";
import { imageTotalLink } from "..";
import { format, differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user, ready } = useContext(UserContext);
  const [bookings, setbookings] = useState([]);
  async function getMyBookings() {
    const { data } = await axios.get(`/bookings-of/${user._id}`);
    setbookings(data);
  }
  useEffect(() => {
    getMyBookings();
  }, []);

  return (
    <div>
      <header className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold">
          Your <span className="text-baseRed">Bookings</span>
        </h2>
        <h2 className="text-2xl font-semibold">
          total number - {bookings.length}
        </h2>
      </header>
      {bookings.length <= 0 && (
        <PageIsEmpty text={"You have no bookings yet"} />
      )}
      <section className="py-5 space-y-5">
        {bookings.map((booking) => {
          return (
            <div
              key={booking._id}
              className="w-full p-5 bg-white rounded-xl shadow-lg flex items-center justify-between transition-all"
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
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default MyBookings;
