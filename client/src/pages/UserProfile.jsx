import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, NavLink } from "react-router-dom";

const UserProfile = () => {
  const { ready, user } = useContext(UserContext);
  if (!ready) {
    return "loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="w-full flex justify-center px-16">
      <div className="w-base">
        <div className="w-full flex items-center flex-col space-y-3">
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
          <div className="text-center">
            <h2 className="font-bold text-3xl">{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="py-5 flex justify-center space-x-8 profile-navigation">
          <div className="profile-navigation rounded-full shadow-lg border border-gray-300 overflow-hidden">
            <NavLink
              className="px-5 py-2 rounded inline-block transition-all"
              to={"/profile"}
            >
              My profile
            </NavLink>
            <NavLink
              className="px-5 py-2 rounded border-l border-gray-300 inline-block transition-all"
              to={"/profile/bookings"}
            >
              My bookings
            </NavLink>
            <NavLink
              className="px-5 py-2 rounded border-l border-gray-300 inline-block transition-all"
              to={"/profile/places"}
            >
              My accommodations
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
