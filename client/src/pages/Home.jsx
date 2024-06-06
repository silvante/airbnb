import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PORT } from "../septer";

const Home = () => {
  const [api, setapi] = useState([]);
  async function getApi() {
    const { data: response } = await axios.get("/api/places");
    setapi(response);
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className="w-full flex justify-center px-basic">
      <div className="w-base">
        <section className="w-full grid grid-cols-4 gap-8">
          {api.map((place) => {
            return (
              <div key={place._id} className="space-y-2">
                <div className="bg-slate-300 rounded-2xl overflow-hidden relative">
                  <a
                    href={"#"}
                    download={`http://localhost:7000/uploads/${place.photos[0]}`}
                    className="absolute bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center top-3 right-3 text-lg opacity-70 hover:opacity-100 transition-all"
                  >
                    <i className="bx bxs-download"></i>
                  </a>
                  <img
                    src={`${API_PORT}/uploads/${place.photos[0]}`}
                    alt={place.title + "image"}
                    className="aspect-square object-cover"
                  />
                </div>
                <div>
                  <p className="w-full truncate font-semibold">{place.title}</p>
                  <p className="truncate">{place.adress}</p>
                  <p>
                    <span className="font-semibold truncate">{place.price}$</span> per
                    night
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Home;
