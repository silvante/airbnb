import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import GridPlaces from "../components/GridPlaces";
import empty from "../assets/page-is-empty.svg";
import PageIsEmpty from "../components/PageIsEmpty";

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
        <h2 className="text-2xl font-semibold">
          Your <span className="text-baseRed">places</span>
        </h2>
        <h2 className="text-2xl font-semibold">
          total number - {places.length}
        </h2>
      </header>
      {places.length > 0 && <GridPlaces places={places} />}
      {places.length <= 0 && <PageIsEmpty text={"You have no places yet"} />}
    </div>
  );
};

export default MyPlaces;
