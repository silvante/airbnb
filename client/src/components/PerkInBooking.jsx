import React, { useEffect, useState } from "react";
import wifi from "../assets/wifi.svg";
import privateroom from "../assets/private.svg";
import tv from "../assets/tv.svg";
import radio from "../assets/radio.svg";
import pets from "../assets/pets.svg";
import cosino from "../assets/cosino.svg";
import game from "../assets/game.svg";
import parking from "../assets/parking.svg";

const PerkInBooking = ({ perks }) => {
  const [count, setcount] = useState(4);
  const [newArr, setnewArr] = useState([]);
  const [perksArr, setPerksArr] = useState([
    {
      id: 1,
      icon: privateroom,
      title: "private room",
      pass: "private",
      shortly: "you can have your private room",
    },
    {
      id: 2,
      icon: wifi,
      title: "Free wi-fi network",
      pass: "wi-fi",
      shortly: "this place has free wifi network",
    },
    {
      id: 3,
      icon: parking,
      title: "Free parking spot",
      pass: "parking",
      shortly: "You can park your car for free",
    },
    {
      id: 4,
      icon: radio,
      title: "Radio Listening",
      pass: "radio",
      shortly: "this place has radio",
    },
    {
      id: 5,
      icon: pets,
      title: "pats park",
      pass: "pats",
      shortly: "allowed for pets and there is park for pats",
    },
    {
      id: 6,
      icon: tv,
      title: "television room",
      pass: "tv",
      shortly: "this place has room with tv",
    },
    {
      id: 7,
      icon: cosino,
      title: "local cosino",
      pass: "cosino",
      shortly: "this place hav own cosino or gaming room",
    },
    {
      id: 8,
      icon: game,
      title: "Play station",
      pass: "game",
      shortly: "you can play playstation here",
    },
  ]);
  const filteredArray = perksArr.filter((item) => perks.includes(item.pass));
  return (
    <div>
      <h1 className="text-xl font-semibold mb-5">Perks</h1>
      <div className="space-y-7">
        {filteredArray.slice(0, count).map((perk) => {
          return (
            <div key={perk.id} className="flex space-x-3 items-center">
              <div className="w-8">
                <img src={perk.icon} alt={perk.icon} />
              </div>
              <div>
                <h1 className="font-semibold">{perk.title}</h1>
                <p>{perk.shortly}</p>
              </div>
            </div>
          );
        })}
        {perks.length > 4 && (
          <button
            onClick={() =>
              count == Infinity ? setcount(4) : setcount(Infinity)
            }
            className="text-blue-600"
          >
            {count == 4 ? "show all" : "hide all"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PerkInBooking;
