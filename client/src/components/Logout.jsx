import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ model, resLog, direct }) => {
  const { user, setuser } = useContext(UserContext);
  const LogOut = () => {
    axios.post("/logout");
    setuser(null);
    direct("/");
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/50 bg-blur flex justify-center items-center">
      <div className="bg-white rounded p-10 text-center space-y-2">
        <h2 className="text-2xl font-bold">Sure to logout?</h2>
        <p className="w-72">
          if you logout now you should login again or create a new account to
          post or write a comments!?
        </p>
        <div className="w-full flex flex-col space-y-2">
          <button
            onClick={() => model(false)}
            className="bg-black py-2 px-5 text-white rounded-full"
          >
            Cancle
          </button>
          <button
            onClick={LogOut}
            className="bg-base py-2 px-5 text-white rounded-full"
          >
            Logout anyway
          </button>
        </div>
      </div>
      <button
        onClick={() => model(false)}
        className="text-4xl font-bold text-white absolute top-5 right-5"
      >
        <i class="bx bx-x"></i>
      </button>
    </div>
  );
};

export default Logout;
