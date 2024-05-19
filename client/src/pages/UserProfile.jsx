import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

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
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default UserProfile;
