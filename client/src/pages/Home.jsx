import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <div className="w-full flex justify-center px-16">
      <div className="w-base">
        <section>
          {api.map((place) => {
            return <div key={place._id}>{place.title}</div>;
          })}
        </section>
      </div>
    </div>
  );
};

export default Home;
