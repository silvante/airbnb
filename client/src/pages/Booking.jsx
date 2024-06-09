import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import check from "../assets/check.svg";

const Booking = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [owner, setOwner] = useState(null);

  async function GetPlace() {
    if (!id) {
      return;
    }
    const { data } = await axios.get(`/api/places/${id}`);
    setPlace(data[0]);
  }
  useEffect(() => {
    GetPlace();
  }, [id]);

  async function getOwnerDoc() {
    const { data } = await axios.get(`/api/users/${place.owner}`);
    setOwner(data[0]);
  }

  useEffect(() => {
    getOwnerDoc();
  }, [place]);

  if (!place) return;

  return (
    <div className="w-full flex justify-center">
      <div className="w-booking">
        <header className="flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold truncate">{place.title}</h1>
          <button className="felx items-center underline text-gray-700">
            save this <i className="bx bx-heart"></i>
          </button>
        </header>
        <div className="w-full grid gap-2 grid-cols-2 overflow-hidden rounded-xl">
          <div>
            {place.photos?.[0] && (
              <img
                src={`http://localhost:7000/uploads/${place.photos[0]}`}
                alt={place.title}
                className="aspect-square object-cover"
              />
            )}
          </div>
          <div>
            {place.photos[4] && (
              <div className="w-full grid grid-cols-2 grid-rows-2 gap-2">
                {place.photos.slice(1, 5).map((photo) => {
                  return (
                    <img
                      key={photo}
                      src={`http://localhost:7000/uploads/${photo}`}
                      alt={place.title}
                      className="aspect-square object-cover"
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="my-5 grid grid-cols-[2fr_1fr]">
          <div>
            <a
              target="_blanck"
              href={`https://maps.google.com/?q=${place.adress}`}
              className="text-xl font-semibold truncate hover:underline"
            >
              {place.adress}
            </a>
            {owner && (
              <div className="py-5 flex items-center gap-2">
                <img
                  src={`http://localhost:7000/uploads/${owner.avatar}`}
                  alt={owner.name}
                  width={"60px"}
                  className="border-base border-2 rounded-full p-1"
                />
                <div>
                  <p className="font-semibold flex items-center gap-1">
                    {owner.name}{" "}
                    <img src={check} alt="verify icon" className=" w-5" />
                  </p>
                  <p>username: {owner.username}</p>
                </div>
              </div>
            )}
          </div>
          <div>data</div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
