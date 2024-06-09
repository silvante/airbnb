import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import Logout from "../components/Logout";
import check from "../assets/check.svg";

const UserProfile = () => {
  const { ready, user, setuser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [logingout, setlogingout] = useState(false);
  const [PlacesLength, setPlacesLength] = useState(0);
  const [model, setmodel] = useState(false);

  async function getPlaceLength() {
    const { data } = await axios.get(`/places-of/${user._id}`);
    setPlacesLength(data.length);
  }
  useEffect(() => {
    getPlaceLength();
  }, []);

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

  console.log(PlacesLength);
  console.log(ready);

  return (
    <div className="w-full flex justify-center px-basic">
      <div className="w-base">
        <div className="w-full flex space-y-3 py-6 items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="w-[200px] h-[200px] bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={`http://localhost:7000/uploads/${user.avatar}`}
                alt={user.name}
                className="w-full h-full"
              />
            </div>
            <div className=" space-y-4">
              <div>
                <h2 className="font-semibold text-3xl flex items-center">
                  {user.name}{" "}
                  {user.verificated && (
                    <img
                      src={check}
                      alt="verification mark"
                      width={"25px"}
                      className="ml-2 select-none"
                    />
                  )}
                </h2>
                <p>username: {user.username}</p>
                <p>
                  user has <span className="font-semibold">{PlacesLength}</span>{" "}
                  appartment posts
                </p>
              </div>
              <button
                onClick={LogOut}
                className="bg-base text-white py-2 px-16 rounded-full"
              >
                Log out
              </button>
            </div>
          </div>
          <div>
            <Link
              to={`/edit-profile/${user._id}`}
              className="py-2 px-4 flex items-center rounded-full hover:bg-gray-200 transition-all"
            >
              Edit profile <i className="bx bx-edit-alt text-xl"></i>
            </Link>
          </div>
        </div>
        <div className="py-5 flex justify-center space-x-8 profile-navigation">
          <div className="profile-navigation flex rounded-full shadow-lg border border-gray-300 overflow-hidden">
            <NavLink
              className="px-5 py-2 transition-all flex items-center"
              to={"/profile/bookings"}
            >
              <i className="bx bx-list-ul text-xl mr-1"></i> My bookings
            </NavLink>
            <NavLink
              className="px-5 py-2 border-l border-gray-300 transition-all flex items-center"
              to={"/profile/places"}
            >
              <i className="bx bx-home text-xl mr-1"></i> My accommodations
            </NavLink>
          </div>
        </div>
        <section>
          <Outlet />
        </section>
      </div>
      {model && (
        <Logout model={setmodel} resLog={setlogingout} direct={setRedirect} />
      )}
    </div>
  );
};

export default UserProfile;
