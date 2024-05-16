import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import pfp from "../assets/home.jpg";

const Header = () => {
  return (
    <header className="w-full flex justify-center px-16">
      <div className="w-base py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo of this site" width={"110px"} />
        </Link>
        <div className="space-x-8">
          <Link className="text-lg text-gray-500 font-normal">Stays</Link>
          <Link className="text-lg text-gray-500 font-normal">Experiences</Link>
          <Link className="text-lg text-gray-500 font-normal">Online Experiences</Link>
        </div>
        <Link to={"/login"} className="flex items-center justify-between border rounded-full p-2 border-gray-300">
          <i className="bx bx-menu text-xl mr-3 ml-2"></i>
          <img
            src={pfp}
            alt="logo"
            width={"32px"}
            height={"32px"}
            className="rounded-full"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
