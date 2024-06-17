import React from "react";
import { Link, useLocation } from "react-router-dom";
import { imageTotalLink } from "..";

const GridPlaces = ({ places }) => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  return (
    <section className="w-full grid grid-cols-4 gap-8 my-5">
      {places.map((place) => {
        return (
          <Link
            to={`/place/${place._id}`}
            key={place._id}
            className="space-y-2"
          >
            <div className="bg-slate-300 rounded-2xl overflow-hidden relative">
              {path == "/profile/places" && (
                <Link
                  href={"#"}
                  to={`/profile/places/settings/${place._id}`}
                  download={`${imageTotalLink}${place.photos[0]}`}
                  className="absolute bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center top-3 right-3 text-lg opacity-70 hover:opacity-100 transition-all"
                >
                  <i className="bx bx-cog text-xl"></i>
                </Link>
              )}
              <img
                src={`${imageTotalLink}${place.photos[0]}`}
                alt={place.title + "image"}
                className="aspect-square object-cover"
              />
            </div>
            <div>
              <p className="w-full truncate font-semibold">{place.title}</p>
              <p className="truncate">{place.adress}</p>
              <p>
                <span className="font-semibold truncate">{place.price}$</span>{" "}
                per night
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default GridPlaces;
