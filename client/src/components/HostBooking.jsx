import React from "react";
import { imageTotalLink } from "..";
import check from "../assets/check.svg";

const HostBooking = ({ owner }) => {
  if (!owner) {
    return;
  }
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold">Meet your Host</h3>
      <div className="flex flex-col bg-white rounded-2xl w-[400px] shadow-xl px-5 py-10 justify-center items-center space-y-3">
        <div className=" relative">
          <img
            src={imageTotalLink + owner.avatar}
            alt={owner.name}
            className="rounded-full"
            width={"110px"}
            height={"110px"}
          />
          <img
            src={check}
            alt="verify icon"
            width={"30px"}
            className="absolute bottom-0 right-0"
          />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold truncate">{owner.name}</h3>
          {owner.bio && <p className=" truncate">{owner.bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default HostBooking;
