import React, { useState } from "react";

const BookingPopup = ({ popup, tel, num }) => {
  const [number, setnumber] = useState(num);
  const [phone, setphone] = useState(tel);
  const [name, setname] = useState(null);
  const [checkin, setcheckin] = useState(null);
  const [checkout, setcheckout] = useState(null);
  const [disabled, setdisabled] = useState(false);

  return (
    <div className="fixed top-[-2%] left-0 bg-black/50 bg-blur z-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white p-5 rounded-xl">
        <div>
          <h2 className="text-xl font-semibold">Booking form</h2>
          <p className="py-2">{phone}</p>
        </div>
        <form className="space-y-2">
          <div className="text-start space-y-1">
            <label>number of guests*</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              className="bg-fun w-full outline-none py-2 px-4 border-b-2 border-slate-300 rounded-lg"
            />
          </div>
          <div className="text-start space-y-1">
            <label className="text-lg font-semibold">date of visit</label>
            <div className="flex gap-1">
              <div>
                <label>Check in*</label>
                <input
                  type="date"
                  className="bg-fun w-full outline-none py-2 px-4 border-b-2 border-slate-300 rounded-lg"
                  onChange={(e) => setcheckin(e.target.value)}
                  value={checkin}
                />
              </div>
              <div>
                <label>Check out*</label>
                <input
                  type="date"
                  className="bg-fun w-full outline-none py-2 px-4 border-b-2 border-slate-300 rounded-lg"
                  onChange={(e) => setcheckout(e.target.value)}
                  value={checkout}
                />
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Private date</h3>
          <div className="text-start space-y-1">
            <label>enter your full name*</label>
            <input
              type="text"
              value={name}
              placeholder="Name & surname"
              onChange={(e) => setname(e.target.value)}
              className="bg-fun w-full outline-none py-2 px-4 border-b-2 border-slate-300 rounded-lg"
            />
          </div>
          <p>if you are ready</p>
          <button
            disabled={!checkin || !checkout || !name}
            className={`bg-base w-full rounded-lg py-2 text-white ${
              !checkin || !checkout || !name ? "opacity-80" : ""
            }`}
          >
            Submit & send
          </button>
        </form>
      </div>
      <button
        className={`text-white absolute top-5 right-5 `}
        onClick={() => popup(false)}
      >
        <i className="bx bx-x text-4xl"></i>
      </button>
    </div>
  );
};

export default BookingPopup;
