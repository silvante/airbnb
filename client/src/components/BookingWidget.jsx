import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import BookingPopup from "./BookingPopup";

const BookingWidget = ({ place }) => {
  const [request, setRequest] = useState(false);
  const [tel, settel] = useState(null);
  const [numberOfGuests, setnumberOfGuests] = useState(null);

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
      <form className="flex flex-col text-start space-y-2">
        <div className="space-y-1">
          <label>number of guests</label>
          <input
            type="number"
            max={place.maxGuests}
            placeholder="number here"
            className="bg-fun w-full outline-none py-2 px-4 border-b-2 border-slate-300 rounded-lg"
            onChange={(e) => setnumberOfGuests(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label>your phone number</label>
          <IMaskInput
            mask="+(#00) 00-000-0000"
            definitions={{
              "#": /[1-9]/,
            }}
            onAccept={(value) =>
              onChange({ target: { name: props.name, value } })
            }
            placeholder="+(00) 00-000-0000"
            overwrite
            onChange={(e) => settel(e.target.value)}
            className="bg-fun w-full outline-none py-2 px-4 border-b-2 border-slate-300 rounded-lg"
          />
        </div>
      </form>
      <button
        onClick={() => setRequest(true)}
        className={`w-full bg-base text-white rounded-lg py-2 ${
          !tel || !numberOfGuests ? "opacity-80" : ""
        }`}
        disabled={!tel || !numberOfGuests}
      >
        Request
      </button>
      {request && (
        <BookingPopup popup={setRequest} tel={tel} num={numberOfGuests} />
      )}
    </div>
  );
};

export default BookingWidget;
