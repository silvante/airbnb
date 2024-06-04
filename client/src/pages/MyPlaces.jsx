import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

const MyPlaces = () => {
  const { user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  async function getMyPlaces() {
    const { data } = await axios.get(`/places-of/${user._id}`);
    setPlaces(data);
  }
  useEffect(() => {
    getMyPlaces();
  }, []);

  return (
    <div className="w-full">
      <header className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">
          Your <span className="text-baseRed">places</span>
        </h2>
        <h2 className="text-2xl font-bold">total number - {places.length}</h2>
      </header>
      <ul className="my-5">
        {places.map((place) => {
          return (
            <li
              key={place._id}
              className="w-full bg-white p-5 rounded flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <div className="w-48 h-32 overflow-hidden rounded ">
                  <img
                    src={`http://localhost:7000/uploads/${place.photos[0]}`}
                    alt={place.title}
                    className="w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold truncate w-96">
                    {place.title}
                  </h3>
                  <p className="truncate w-56">{place.descriptions}</p>
                </div>
              </div>
              <div>
              <h3 className="text-xl font-bold">{place.price}$ - per night</h3>
              <p>max munber of guests - {place.maxGuests}</p>
              </div>
              <div className="flex flex-col items-end space-y-3">
                <Link className="bg-base py-2 px-5 text-white rounded-full ">
                  view datails
                </Link>
                <button className="bg-black py-2 px-5 text-white rounded-full ">Delete place</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyPlaces;
