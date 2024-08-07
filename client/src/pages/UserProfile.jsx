import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import Logout from "../components/Logout";
import check from "../assets/check.svg";
import { imageTotalLink } from "..";

const UserProfile = () => {
  const { ready, user, setuser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [logingout, setlogingout] = useState(false);
  const [placeCount, setplaceCount] = useState(0);
  const [model, setmodel] = useState(false);

  async function getPlaceLength() {
    const { data } = await axios.get(`/places-of/${user._id}`);
    setplaceCount(data.length);
  }
  useEffect(() => {
    getPlaceLength();
  }, [ready]);

  const LogOut = () => {
    setmodel(true);
    if (logingout) {
      axios.post("/logout");
      setuser(null);
      setRedirect("/");
    }
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
    <div className="w-full flex justify-center px-basic">
      <div className="w-base">
        <div className="w-full flex space-y-3 py-6 items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="w-[200px] h-[200px] bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={`${imageTotalLink}${user.avatar}`}
                alt={user.name}
                className="w-full h-full"
              />
            </div>
            <div className=" space-y-4">
              <div>
                <h2 className="font-semibold text-4xl flex items-center">
                  {user.name}{" "}
                  {user.verificated && (
                    <img
                      src={check}
                      alt="verification mark"
                      width={"30px"}
                      className="ml-2 select-none"
                    />
                  )}
                </h2>
                <p className="text-md">username: {user.username}</p>
                <p className="text-md">
                  user has <span className="font-semibold">{placeCount}</span>{" "}
                  appartment posts
                </p>
                {user.bio && user.bio != "" && (
                  <p className="text-md">
                    bio: <span className=" font-semibold">{user.bio}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <Link
              to={`/edit-profile/${user._id}`}
              className="py-2 px-4 flex items-center rounded-lg hover:bg-base hover:text-white transition-all"
            >
              Edit profile <i className="bx bx-edit-alt text-xl"></i>
            </Link>
          </div>
        </div>
        <div className="py-5 flex justify-center space-x-8 profile-navigation">
          <div className="profile-navigation flex rounded-lg shadow-lg border border-gray-300 overflow-hidden">
            <NavLink
              className="px-5 py-2 transition-all flex items-center"
              to={"/profile/places"}
            >
              <i className="bx bx-home text-xl mr-1"></i> My accommodations
            </NavLink>
            <NavLink
              className="px-5 py-2 transition-all flex items-center border-l border-gray-300"
              to={"/profile/bookings"}
            >
              <i className="bx bx-list-ul text-xl mr-1"></i> My bookings
            </NavLink>
            <NavLink
              className="px-5 py-2 transition-all flex items-center border-l border-gray-300"
              to={"/profile/request"}
            >
              <i className="bx bx-message-dots text-xl mr-1"></i> My requests
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
