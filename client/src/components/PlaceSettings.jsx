import { tabScrollButtonClasses } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { imageTotalLink } from "..";

const PlaceSettings = () => {
  const { id } = useParams();
  const [place, setplace] = useState(null);
  const [deleting, setdeleting] = useState(false);
  const [danger, setdanger] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [value, setvalue] = useState("");
  const [titleThis, setTitleThis] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [loading, setloading] = useState(false);

  if (!id) {
    return <Navigate to={"/profile/places"} />;
  }
  async function getPlace() {
    const { data } = await axios.get(`/api/places/${id}`);
    setplace(data[0]);
    setTitleThis(data[0].title);
  }

  useEffect(() => {
    if (place && value == place.title) {
      setdisabled(false);
    }
  }, [getPlace]);

  useEffect(() => {
    getPlace();
  }, []);

  const handleCopy = () => {
    // Using the Clipboard API
    navigator.clipboard
      .writeText(titleThis)
      .then(() => {
        console.log("Text copied to clipboard");
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  if (!place) {
    return;
  }

  async function handleDelete() {
    setloading(true);
    const { data } = await axios.delete(`/api/places/${place._id}`);
    setloading(false);
    console.log(data);
    setRedirect("/profile/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="fixed top-0 left-0 bg-black/50 bg-blur z-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white w-[400px] rounded-2xl p-5 space-y-2 transition-all">
        <header className="w-full flex justify-between my-3">
          <h2 className="flex items-center font-semibold">
            <i className="bx bx-cog text-xl mr-1"></i> Settings
          </h2>
          <Link
            to={!deleting && "/profile/places"}
            onClick={() => setdeleting(false)}
            className="hover:text-baseRed hover:underline"
          >
            Cancle →
          </Link>
        </header>
        {!deleting && (
          <div className="space-y-2">
            <div className="rounded-xl overflow-hidden">
              <img
                src={imageTotalLink + place.photos[0]}
                alt={place.title}
                className=" aspect-video object-cover"
              />
            </div>
            <div>
              <h3 className="truncate font-semibold">{place.title}</h3>
              <p className="truncate">{place.adress}</p>
              <p className="truncate">
                <span className="font-semibold">{place.price}$</span> per night
              </p>
            </div>
            <h3 className="text-xl font-semibold">Menu</h3>
            <div className="space-y-1">
              <Link
                to={`/place/${place._id}`}
                className="flex items-center py-2 px-4 transition-all hover:bg-base hover:text-white rounded-full"
              >
                <i className="bx bx-low-vision text-xl mr-1"></i> View your
                place
              </Link>
              <Link
                to={`/edit-place/${place._id}`}
                className="flex items-center py-2 px-4 transition-all hover:bg-base hover:text-white rounded-full"
              >
                <i className="bx bx-edit-alt text-xl mr-1"></i> Edit your place
              </Link>
            </div>
          </div>
        )}
        <h3 className="text-xl font-semibold text-baseRed">Danger zone</h3>
        {!deleting && (
          <button
            onClick={() => setdeleting(true)}
            className="w-full bg-base text-white rounded-xl py-3 flex items-center justify-center"
          >
            <i className="bx bx-trash text-xl mr-1"></i>delete place
          </button>
        )}
        {!danger && deleting && (
          <div className="space-y-3">
            <p>
              do you actually want to delete your place post?{" "}
              <button className="text-blue-500 underline">lern more</button>
            </p>
            <div className="w-full flex flex-col space-y-2">
              <button
                onClick={() => setdeleting(false)}
                className="rounded-full bg-basedark text-white py-3"
              >
                Cancle
              </button>
              <button
                onClick={() => setdanger(true)}
                className="rounded-full bg-base text-white py-3"
              >
                Delete anyway
              </button>
            </div>
          </div>
        )}
        {deleting && danger && (
          <div className="space-y-3">
            <p>
              Now, you should paste a title of your post to the field you can
              copy it easily{" "}
              <button className="text-blue-500 underline">lern more</button>
            </p>
            <p>
              if you fill every step your post will be deleted from our server
              and never apper again, sure?
            </p>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">title here</h3>
              <button
                onClick={handleCopy}
                className="py-2 px-3 rounded-xl bg-gray-200 border-2 border-gray-300 w-full flex items-center"
              >
                <input
                  className=" truncate bg-transparent w-full outline-none"
                  type="text"
                  value={titleThis}
                  readOnly
                />
                <button onClick={handleCopy} className="pl-3">
                  <i className="bx bx-copy-alt text-xl "></i>
                </button>
              </button>
              <p>paste it right there</p>
              <h3 className="text-xl font-semibold">Field here</h3>
              <input
                type="text"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                className="w-full rounded-xl py-2 px-3 border border-black outline-none"
                placeholder="paste it here..."
              />
              <p className="text-center">_and_</p>
              <button
                disabled={disabled}
                onClick={handleDelete}
                className={`${
                  !disabled
                    ? "bg-base text-white"
                    : "bg-slate-300 text-slate-500"
                } ${loading ? "opacity-50" : ""} w-full rounded-xl py-3`}
              >
                {loading ? "DELETING..." : "DELETE"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Link
        to={"/profile/places"}
        className="text-white absolute top-5 right-5"
      >
        <i className="bx bx-x text-4xl"></i>
      </Link>
    </div>
  );
};

export default PlaceSettings;
