import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import check from "../assets/check.svg";
import { imageTotalLink } from "..";
import BookingWidget from "../components/BookingWidget";

const Booking = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [owner, setOwner] = useState(null);
  const [show, setShow] = useState(false);

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

  // show all photos event

  if (show) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-y-scroll scroll-none">
        <header className="w-full bg-white py-5 px-5 flex justify-between items-center fixed top-0">
          <button
            className="flex items-center text-xl"
            onClick={() => setShow(false)}
          >
            <i className="bx bx-chevron-left text-3xl"></i>exit
          </button>
          <p className="text-xl">total photos - {place.photos.length}</p>
        </header>
        <section className="w-full flex justify-center py-28">
          <div className="w-normal space-y-3">
            {place.photos &&
              place.photos.map((photo) => {
                return (
                  <img
                    key={photo}
                    src={`${imageTotalLink}${photo}`}
                    alt={photo}
                    className="w-full rounded"
                  />
                );
              })}
            <div className="w-full text-center pt-10">
              <h3 className=" truncate text-xl font-semibold">{place.title}</h3>
              <a
                href={`https://maps.google.com/?q=${place.adress}`}
                target="_blanck"
                className=" hover:underline"
              >
                {place.adress}
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // if event

  if (!place) return;

  // main booking returns
  return (
    <div className="w-full flex justify-center">
      <div className="w-booking">
        <header className="flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold truncate">{place.title}</h1>
          <button className="felx items-center underline text-gray-700">
            save this <i className="bx bx-heart"></i>
          </button>
        </header>
        <div className="w-full grid gap-2 grid-cols-2 overflow-hidden rounded-xl relative">
          <div>
            {place.photos?.[0] && (
              <img
                src={`${imageTotalLink}${place.photos[0]}`}
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
                      src={`${imageTotalLink}${photo}`}
                      alt={place.title}
                      className="aspect-square object-cover"
                    />
                  );
                })}
              </div>
            )}
          </div>
          {place.photos[5] && (
            <button
              onClick={() => setShow(true)}
              className=" absolute bottom-3 right-3 bg-white rounded py-2 px-5 flex items-center gap-1"
            >
              <i className="bx bxs-grid"></i> show all photos
            </button>
          )}
        </div>
        <div className="my-5 grid grid-cols-[2fr_1fr] gap-20">
          <div className="space-y-6">
            <a
              target="_blanck"
              href={`https://maps.google.com/?q=${place.adress}`}
              className="text-2xl font-semibold truncate hover:underline"
            >
              {place.adress}
            </a>
            {owner && (
              <div className="flex items-center gap-2">
                <img
                  src={`${imageTotalLink}${owner.avatar}`}
                  alt={owner.name}
                  width={"60px"}
                  className="border-base border-2 rounded-full p-1"
                />
                <div>
                  <p className="font-semibold flex items-center gap-1">
                    {owner.name}{" "}
                    <img
                      src={check}
                      alt="verify icon"
                      className=" w-5 select-none"
                    />
                  </p>
                  <p>username: {owner.username}</p>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Perks</h3>
              <div className="space-y-2">
                {place.perks.map((perk) => {
                  return <p key={perk}>{perk}</p>;
                })}
              </div>
            </div>
            <div className=" space-y-2">
              <h3 className="text-xl font-semibold">About this place</h3>
              <p>{place.descriptions}</p>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">checking times</h1>
              <div className="grid-cols-2 grid gap-5">
                <div className="bg-white p-5 rounded border-base border-2">
                  <p className="font-semibold">Check in</p>
                  <p>{place.checkin} morning</p>
                </div>
                <div className="bg-white p-5 rounded border-base border-2">
                  <p className="font-semibold">Check out</p>
                  <p>{place.checkout} evening</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
