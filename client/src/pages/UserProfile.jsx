import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, NavLink, Outlet } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { ready, user, setuser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const LogOut = () => {
    axios.post("/logout");
    setuser(null);
    setRedirect("/");
  };
  if (!ready) {
    return "loading...";
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="w-full flex justify-center px-16">
      <div className="w-base">
        <div className="w-full flex flex-col space-y-3 py-6">
          <div className="flex items-center space-x-5">
            <div className="w-[200px] h-[200px] bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full"
                />
              ) : (
                <i className="bx bxs-user text-gray-400 text-7xl"></i>
              )}
            </div>
            <div className=" space-y-4">
              <div>
                <h2 className="font-bold text-3xl">{user.name}</h2>
                <p>{user.email}</p>
              </div>
              <button
                onClick={LogOut}
                className="bg-base text-white py-2 px-16 rounded-full"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
        <div className="py-5 flex justify-center space-x-8 profile-navigation">
          <div className="profile-navigation rounded-full shadow-lg border border-gray-300 overflow-hidden">
            <NavLink
              className="px-5 py-2 inline-block transition-all"
              to={"/profile/bookings"}
            >
              My bookings
            </NavLink>
            <NavLink
              className="px-5 py-2 border-l border-gray-300 inline-block transition-all"
              to={"/profile/places"}
            >
              My accommodations
            </NavLink>
          </div>
        </div>
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
