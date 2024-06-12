import { tabScrollButtonClasses } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { imageTotalLink } from "..";

const PlaceSettings = () => {
  const { id } = useParams();
  const [place, setplace] = useState(null);
  if (!id) {
    return <Navigate to={"/profile/places"} />;
  }
  async function getPlace() {
    const { data } = await axios.get(`/api/places/${id}`);
    setplace(data[0]);
  }

  useEffect(() => {
    getPlace();
  }, []);

  if (!place) {
    return;
  }

  return (
    <div className="fixed top-0 left-0 bg-black/50 bg-blur z-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white w-96 rounded-2xl p-2 space-y-2">
        <header className="w-full flex justify-between my-3">
          <h2 className="flex items-center font-semibold">
            <i className="bx bx-cog text-xl mr-1"></i> Settings
          </h2>
          <Link
            to={"/profile/places"}
            className="hover:text-baseRed hover:underline"
          >
            Cancle →
          </Link>
        </header>
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
            <i className="bx bx-low-vision text-xl mr-1"></i> View your place
          </Link>
          <Link
            to={`/edit-place/${place._id}`}
            className="flex items-center py-2 px-4 transition-all hover:bg-base hover:text-white rounded-full"
          >
            <i className="bx bx-edit-alt text-xl mr-1"></i> Edit your place
          </Link>
        </div>
        <h3 className="text-xl font-semibold">Danger zone</h3>
        <button className="w-full bg-base text-white rounded-xl py-3 flex items-center justify-center">
          <i className="bx bx-trash text-xl mr-1"></i>delete place
        </button>
      </div>
      <Link to={"/profile/places"} className="text-white absolute top-5 right-5"><i className='bx bx-x text-4xl' ></i></Link>
    </div>
  );
};

export default PlaceSettings;
