import React, { useContext, useEffect, useState } from "react";
import PageIsEmpty from "../components/PageIsEmpty";
import axios from "axios";
import { UserContext } from "../UserContext";

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
      <ul>
        {bookings.map((booking) => {
          return (
            <li key={booking._id}>
              <p>
                {booking.checkin} → {booking.checkout}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyBookings;
