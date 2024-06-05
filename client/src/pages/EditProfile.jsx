import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);
  const [name, setname] = useState("");
  if (!ready) {
    return "Loading";
  }
  if (!user) {
    navigate("/login");
  }
  const fatchData = async () => {
    const { data } = await axios.get(`/api/users/${user._id}`);
    setname(data[0].name);
  };

  useEffect(() => {
    fatchData();
  }, []);

  return (
    <div className="w-full flex justify-center px-basic">
      <div className="w-base">
        <nav className="w-full flex justify-between items-center py-5">
          <h3 className="text-2xl font-bold">Edit profile "{user.name}"</h3>
          <Link
            to={"/profile"}
            className="py-2 px-5 bg-base text-white rounded-full"
          >
            cancle editing
          </Link>
        </nav>
        <form className=" space-y-5">
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Edit your proofile</h3>
            <div className="flex flex-col space-y-1">
              <label>edit your name*</label>
              <input
                type="text"
                placeholder="edit name here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                onChange={(e) => setname(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>enter some bio here*</label>
              <input
                type="text"
                placeholder="bio here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Submit</h3>
            <p>submit if you are ready*</p>
            <button className="bg-base text-white py-2 px-4 rounded-full">
              save profile changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
