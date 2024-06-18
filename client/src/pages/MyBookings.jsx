import React, { useState } from "react";
import empty from "../assets/page-is-empty.svg";
import PageIsEmpty from "../components/PageIsEmpty";

const MyBookings = () => {
  const [bookings, setbookings] = useState([]);
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
        <PageIsEmpty text={"You have no bookings yet"}/>
      )}
    </div>
  );
};

export default MyBookings;
