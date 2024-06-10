import React from "react";

const BookingWidget = ({place}) => {
  return (
    <div className="bg-white p-5 rounded-xl text-center space-y-3">
      <div>
        <h3 className="text-xl truncate">
          <span className="font-semibold">{place.price}$</span> per night
        </h3>
        <p className=" truncate w-full">
          maximum number of guests {place.maxGuests}
        </p>
      </div>
      <button className="w-full bg-base text-white rounded-lg py-3">
        Request
      </button>
    </div>
  );
};

export default BookingWidget;
