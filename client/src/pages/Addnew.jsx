import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import wifi from "../assets/wifi.svg";
import privateroom from "../assets/private.svg";
import tv from "../assets/tv.svg";
import radio from "../assets/radio.svg";
import pets from "../assets/pets.svg";
import cosino from "../assets/cosino.svg";
import game from "../assets/game.svg";
import parking from "../assets/parking.svg";
import { imageTotalLink } from "..";

const Addnew = () => {
  const { user, ready } = useContext(UserContext);
  const { id } = useParams();
  const [placeDoc, setplaceDoc] = useState({});

  // states

  const [title, settitle] = useState("");
  const [adress, setadress] = useState("");
  const [linkedPhoto, setlinkedPhoto] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [descriptions, setdescriptions] = useState("");
  const [checkin, setcheckin] = useState(0);
  const [checkout, setcheckout] = useState(0);
  const [perks, setperks] = useState([]);
  const [maxGests, setmaxGests] = useState(0);
  const [price, setprice] = useState(0);

  const [addingPhoto, setaddingPhoto] = useState(false);
  const [redirect, setRedirect] = useState("");

  // functions of edit place

  async function getPlace() {
    if (!id) {
      return;
    }
    const { data } = await axios.get(`/api/places/${id}`);
    const res = data[0];
    settitle(res.title);
    setadress(res.adress);
    setaddedPhotos(res.photos);
    setdescriptions(res.descriptions);
    setcheckin(res.checkin);
    setcheckout(res.checkout);
    setmaxGests(res.maxGuests);
    setperks(res.perks);
    setprice(res.price);
    setplaceDoc(res);
  }

  useEffect(() => {
    getPlace();
  }, id);

  const deletePhoto = (filename) => {
    setaddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  // functions on add new place
  // if managemants

  if (!ready) {
    return "loading...";
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  // uploading images by link

  async function UploadImageByLink(ev) {
    ev.preventDefault();
    setaddingPhoto(true);
    const { data: filename } = await axios.post("/upload-by-link", {
      link: linkedPhoto,
    });
    setaddedPhotos((prev) => {
      return [...prev, filename];
    });
    setlinkedPhoto("");
    setaddingPhoto(false);
  }

  // loading photos to server

  async function uploadPhotoFromDevice(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    await axios
      .post("/upload", data, {
        headers: { "Content-Type": "mulipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setaddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  // uploading perks

  const handeleCbChange = (ev) => {
    const { checked, name } = ev.target;
    if (checked) {
      setperks([...perks, name]);
    } else {
      setperks([...perks.filter((sn) => sn !== name)]);
    }
  };

  // upload all the info to database

  const hendleResetForm = (e) => {
    e.preventDefault();
    settitle("");
    setaddedPhotos([]);
    setadress("");
    setcheckin(0);
    setcheckout(0);
    setmaxGests(0);
    setdescriptions("");
    setlinkedPhoto("");
    setperks([]);
    setprice(0);
  };

  // handleSubmitForm
  async function savePlace(ev) {
    ev.preventDefault();
    if (addedPhotos.length < 5) {
      alert("Minimum 5 photos of place");
    } else {
      try {
        if (id) {
          // update place
          const { data } = await axios.put(`/api/places/${id}`, {
            title: title,
            adress: adress,
            photos: addedPhotos,
            descriptions: descriptions,
            perks: perks,
            checkin: checkin,
            checkout: checkout,
            maxGuests: maxGests,
            price: price,
          });
          setRedirect("/profile/places");
          console.log(true);
        } else if (perks.length > 0 && addedPhotos.length > 0) {
          // add new place
          const { data } = await axios.post("/api/places", {
            title: title,
            adress: adress,
            photos: addedPhotos,
            descriptions: descriptions,
            perks: perks,
            checkin: checkin,
            checkout: checkout,
            maxGuests: maxGests,
            price: price,
            owner: user._id,
          });
          setRedirect("/profile/places");
        } else {
          alert("enter full information");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (ready && id && placeDoc.owner !== user._id) {
    return (
      <div className="w-full h-[60vh] px-basic flex flex-col items-center justify-center space-y-10">
        <div className=" w-[50%] text-center">
          <h1 className="text-4xl font-semibold">
            Mr {user.name} this post is not belongs to you 🍘
          </h1>
          <p>
            so please don't cheat anymore{" "}
            <span className=" font-bold">OK?</span> 😁
          </p>
        </div>
        <div className="space-x-10">
          <Link className="text-baseRed hover:underline" to={"/"}>
            go to homepage →
          </Link>
          <Link className="hover:underline" to={"/profile"}>
            go to profile →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-basic">
      <div className="w-base">
        <nav className="w-full flex justify-between items-center py-5">
          <h2 className="font-bold text-2xl">Form for place</h2>
          <Link className="px-5 py-2 rounded-lg bg-base text-white" to={"/"}>
            Cancle editing
          </Link>
        </nav>
        <form className="space-y-5" onSubmit={savePlace}>
          {/* name and adress */}
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">name & adress</h3>
            <div className="flex flex-col space-y-1">
              <label>enter place name*</label>
              <input
                type="text"
                placeholder="name here..."
                className="w-hight bg-tra p-3 rounded-xl bg-fun outline-none"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>
                enter adress here* and enter valiable adress please*
              </label>
              <input
                type="text"
                placeholder="full adress here..."
                className="w-hight bg-tra p-3 rounded-xl bg-fun outline-none"
                value={adress}
                onChange={(e) => setadress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">photos</h3>
            <div className="flex flex-col space-y-1">
              <label>enter image address if you want*</label>
              <div className="space-x-3">
                <input
                  type="text"
                  placeholder="full adress here..."
                  className="w-hight bg-tra p-3 rounded-xl bg-fun outline-none"
                  value={linkedPhoto}
                  onChange={(e) => setlinkedPhoto(e.target.value)}
                />
                {addedPhotos.length < 15 && (
                  <button
                    onClick={UploadImageByLink}
                    disabled={addingPhoto}
                    className={`w-44 text-white py-3 rounded-lg ${
                      addingPhoto ? "bg-base/55" : "bg-base"
                    }`}
                  >
                    {!addingPhoto ? "add image" : "adding..."}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label>more photos are better*</label>
              <div className="bg-tra w-normal h-96 p-2 grid grid-cols-5 grid-rows-3 bg-fun rounded-xl gap-2">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => {
                    return (
                      <div
                        key={link}
                        className="rounded-lg overflow-hidden flex relative"
                      >
                        <button
                          onClick={() => deletePhoto(link)}
                          className="absolute bg-white w-8 h-8 rounded-lg bottom-2 right-2"
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                        <img
                          src={imageTotalLink + link}
                          alt={link}
                          className="w-full object-cover"
                        />
                      </div>
                    );
                  })}
                {addedPhotos.length < 15 && (
                  <label className="text-3xl text-gray-300 bg-white rounded-lg flex justify-center items-center cursor-pointer border border-gray-300">
                    <input
                      multiple
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={uploadPhotoFromDevice}
                    />
                    <i className="bx bxs-image"></i>
                  </label>
                )}
              </div>
              <label>choise nice photos of your place*</label>
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Descriptions</h3>
            <div className="flex flex-col space-y-1">
              <label>enter your descriptions here*</label>
              <textarea
                type="text"
                placeholder="Descriptions here..."
                className="w-hight bg-tra p-3 rounded-xl bg-fun outline-none resize-none h-40"
                value={descriptions}
                onChange={(e) => setdescriptions(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">perks</h3>
            <label>check perks which you have*</label>
            <div className="w-normal space-y-1 grid grid-cols-2 grid-rows-3">
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("wi-fi")}
                  name="wi-fi"
                />
                <img src={wifi} alt={"wifi"} width={"23px"} />
                <span>Free Wi-Fi</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("parking")}
                  name="parking"
                />
                <img src={parking} alt={"parking"} width={"23px"} />
                <span>Free parking spot</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("tv")}
                  name="tv"
                />
                <img src={tv} alt={"tv"} width={"23px"} />
                <span>TV station</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("pets")}
                  name="pets"
                />
                <img src={pets} alt={"pets"} width={"23px"} />
                <span>allowed for pets</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("private")}
                  name="private"
                />
                <img src={privateroom} alt={"privateroom"} width={"23px"} />
                <span>Private extrance</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("radio")}
                  name="radio"
                />
                <img src={radio} alt={"radio"} width={"23px"} />
                <span>radio</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("game")}
                  name="game"
                />
                <img src={game} alt={"game"} width={"23px"} />
                <span>game</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  checked={perks.includes("cosino")}
                  name="cosino"
                />
                <img src={cosino} alt={"cosino"} width={"23px"} />
                <span>cosino</span>
              </label>
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Cheack time & guest number</h3>
            <label>
              add check in and out time and maximum number of guests*
            </label>
            <div className="flex flex-col spay">
              <label>Check in time*</label>
              <input
                type="time"
                placeholder="time here..."
                className="w-hight bg-transparent p-3 rounded-xl bg-fun outline-none"
                value={checkin}
                onChange={(e) => setcheckin(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col spay">
              <label>Check out time*</label>
              <input
                type="time"
                placeholder="time here..."
                className="w-hight bg-transparent p-3 rounded-xl bg-fun outline-none"
                value={checkout}
                onChange={(e) => setcheckout(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col spay">
              <label>maximum number of guests*</label>
              <input
                type="number"
                placeholder="number here..."
                className="w-hight bg-transparent p-3 rounded-xl bg-fun outline-none"
                value={maxGests}
                onChange={(e) => setmaxGests(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Final fields</h3>
            <div className="flex flex-col space-y-1">
              <label>enter price for place with valute dollar ($)*</label>
              <input
                type="number"
                placeholder="price...$"
                className="w-hight bg-transparent p-3 rounded-xl bg-fun outline-none"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                required
              />
            </div>
            <label className="">submit if you are ready*</label>
            <div className="space-x-3">
              <button
                type="submit"
                className="py-2 px-5 bg-base rounded-lg text-white"
              >
                Submit & publish
              </button>
              <button
                onClick={hendleResetForm}
                type="reset"
                className="py-2 px-5 bg-black text-white rounded-lg"
              >
                clear all
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addnew;
