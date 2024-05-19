import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import pfp from "../assets/home.jpg";
import { UserContext } from "../UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <header className="w-full flex justify-center px-16">
      <div className="w-base py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo of this site" width={"110px"} />
        </Link>
        <div className="flex items-center justify-between rounded-full py-2 shadow-lg border border-gray-300">
          <Link className="font-normal px-4">Stays</Link>
          <Link className="font-normal px-4 border-l border-gray-300">
            Experiences
          </Link>
          <Link className="font-normal px-4 border-l border-gray-300">
            Search envoirment{" "}
            <span className="bg-base text-white rounded-full mypadding">
              <i className="bx bx-search"></i>
            </span>
          </Link>
        </div>
        <Link
          to={user ? "/profile" : "/login"}
          className="flex items-center justify-between border rounded-full p-2 border-gray-300"
        >
          <i className="bx bx-menu text-xl mr-3 ml-2"></i>
          <img
            src={pfp}
            alt="logo"
            width={"32px"}
            height={"32px"}
            className="rounded-full"
          />
          {!!user && <p className="ml-2">{user.name}</p>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
