import React, { Profiler, useContext, useState } from "react";
import logo from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import pfp from "../assets/avatar.jpg";
import { UserContext } from "../UserContext";
import { imageTotalLink } from "..";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Logout from "./Logout";

const Header = () => {
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [model, setModel] = useState(false);

  if (redirect) {
    <Navigate to={"/"} />;
  }

  return (
    <header className="w-full flex justify-center px-basic shadow-md">
      <div className="w-base py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo of this site" width={"110px"} />
        </Link>
        <div className="flex items-center justify-between rounded-lg py-2 shadow-lg border border-gray-300">
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
        <div className="flex space-x-2">
          <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
              <div>
                {!!user && (
                  <button
                    variant="contained"
                    {...bindToggle(popupState)}
                    to={user ? "/profile" : "/login"}
                    className="flex items-center justify-between border rounded-lg p-2 border-gray-300"
                  >
                    <i className="bx bx-menu text-xl mr-3 ml-2"></i>
                    <img
                      src={user ? imageTotalLink + user.avatar : pfp}
                      alt="logo"
                      width={"32px"}
                      height={"32px"}
                      className="rounded-full"
                    />
                    {!!user && <p className="ml-2 mr-2">{user.name}</p>}
                  </button>
                )}
                {!user && (
                  <Link
                    to={"/login"}
                    className="flex items-center justify-between border rounded-lg p-2 border-gray-300"
                  >
                    <i className="bx bx-menu text-xl mr-3 ml-2"></i>
                    <img
                      src={pfp}
                      alt="logo"
                      width={"32px"}
                      height={"32px"}
                      className="rounded-full"
                    />
                  </Link>
                )}
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper>
                        <div className="mt-2">
                          {!!user && (
                            <div className="border-b">
                              <Link
                                to={"/profile"}
                                {...bindToggle(popupState)}
                                className="hover:bg-gray-100 transition-all py-2 px-2 w-64 flex items-center"
                              >
                                <i className="bx bx-user text-xl mr-2"></i> My
                                profile
                              </Link>
                              <Link
                                to={`/edit-profile/${user._id}`}
                                {...bindToggle(popupState)}
                                className="hover:bg-gray-100 transition-all py-2 px-2 w-64 flex items-center"
                              >
                                <i className="bx bx-cog text-xl mr-2"></i>{" "}
                                Profile settings
                              </Link>
                              <Link
                                to={`/profile/places`}
                                {...bindToggle(popupState)}
                                className="hover:bg-gray-100 transition-all py-2 px-2 w-64 flex items-center"
                              >
                                <i className="bx bx-home text-xl mr-2"></i> My
                                places
                              </Link>
                              <Link
                                to={`/profile/bookings`}
                                {...bindToggle(popupState)}
                                className="hover:bg-gray-100 transition-all py-2 px-2 w-64 flex items-center"
                              >
                                <i className="bx bx-list-ul text-xl mr-2"></i> My bookings
                              </Link>
                            </div>
                          )}
                          {!!user && (
                            <Link
                              // {...bindToggle(popupState)}
                              onClick={() =>
                                setModel(true) && { ...bindToggle(popupState) }
                              }
                              className="hover:bg-gray-100 transition-all py-2 px-2 w-64 flex items-center text-baseRed"
                            >
                              <i className="bx bx-log-out text-xl mr-2"></i>
                              log out
                            </Link>
                          )}
                        </div>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </div>
            )}
          </PopupState>
          {!!user && (
            <Link
              to={"/add-new"}
              className="bg-base rounded-lg px-3 text-white flex items-center"
            >
              <i className="bx bx-plus text-2xl"></i> Add new place
            </Link>
          )}
        </div>
      </div>
      {model && <Logout model={setModel} direct={setRedirect} />}
    </header>
  );
};

export default Header;
