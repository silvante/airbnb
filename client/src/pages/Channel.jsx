import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageTotalLink } from "..";
import check from "../assets/check.svg";
import axios from "axios";
import GridPlaces from "../components/GridPlaces";
import PageIsEmpty from "../components/PageIsEmpty";

const Channel = () => {
  const { username } = useParams();
  const [user, setuser] = useState(null);
  const [placeCount, setplaceCount] = useState(0);
  const [api, setapi] = useState(null);

  async function getUserByUsername() {
    const { data } = await axios.get(`/api/users`);
    const user = data.find((u) => u.username === username);
    setuser(user);
    const { data: response } = await axios.get(`/places-of/${user._id}`);
    setplaceCount(response.length);
    setapi(response);
  }
  useEffect(() => {
    getUserByUsername();
  }, []);

  if (!user || !api) {
    return "loading...";
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
        </div>
        <div>
          <nav className="w-full flex justify-between items-center">
            <h3 className="text-2xl font-semibold">User's posts</h3>
            <button className="text-2xl font-semibold">Places</button>
          </nav>
          {api.length > 0 && <GridPlaces places={api} />}
          {api.length <= 0 && (
            <PageIsEmpty text={"This user has no posts yet"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
