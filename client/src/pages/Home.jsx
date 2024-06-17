import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PORT } from "../septer";
import { Link } from "react-router-dom";
import { imageTotalLink } from "..";
import GridPlaces from "../components/GridPlaces";

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
        <GridPlaces places={api} />
      </div>
    </div>
  );
};

export default Home;
