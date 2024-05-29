import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const Addnew = () => {
  const { user, ready } = useContext(UserContext);

  const [title, settitle] = useState("");
  const [adress, setadress] = useState("");
  const [linkedPhoto, setlinkedPhoto] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [descriptions, setdescriptions] = useState("");
  const [checkin, setcheckin] = useState(0);
  const [checkout, setcheckout] = useState(0);
  const [perks, setperks] = useState([]);
  const [maxGests, setmaxGests] = useState(0);

  const [addingPhoto, setaddingPhoto] = useState(false);

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

  const handleAddDoc = (e) => {
    e.preventDefault();
  };

  const hendleResetForm = (e) =>{
    e.preventDefault()
    settitle("")
    setaddedPhotos([])
    setadress("")
    setcheckin(0)
    setcheckout(0)
    setmaxGests(0)
    setdescriptions("")
    setlinkedPhoto("")
    setperks([])
  }
  return (
    <div className="w-full flex justify-center px-16">
      <div className="w-base">
        <nav className="w-full flex justify-between items-center py-5">
          <h2 className="font-bold text-2xl">Add new place</h2>
          <Link className="px-5 py-2 rounded-full bg-base text-white" to={"/"}>
            Cancle editing
          </Link>
        </nav>
        <form className="space-y-5" onSubmit={handleAddDoc}>
          {/* name and adress */}
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">name & adress</h3>
            <div className="flex flex-col space-y-1">
              <label>enter place name*</label>
              <input
                type="text"
                placeholder="name here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>
                enter adress here* and enter valiable adress please*
              </label>
              <input
                type="text"
                placeholder="full adress here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                value={adress}
                onChange={(e) => setadress(e.target.value)}
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
                  className="w-hight bg-fun p-3 rounded border outline-none"
                  value={linkedPhoto}
                  onChange={(e) => setlinkedPhoto(e.target.value)}
                />
                <button
                  onClick={UploadImageByLink}
                  disabled={addingPhoto}
                  className={`w-44 text-white py-2 rounded-full ${
                    addingPhoto ? "bg-base/55" : "bg-base"
                  }`}
                >
                  {!addingPhoto ? "add image" : "adding..."}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label>more photos is better*</label>
              <div className="bg-fun w-normal h-64 p-2 grid grid-cols-5 grid-rows-2 rounded gap-2">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => {
                    return (
                      <div key={link} className="rounded overflow-hidden flex">
                        <img
                          src={"http://localhost:7000/uploads/" + link}
                          alt={link}
                          className="w-full object-cover"
                        />
                      </div>
                    );
                  })}
                <label className="bg-white text-3xl text-gray-500 rounded flex justify-center items-center cursor-pointer">
                  <input
                    multiple
                    type="file"
                    className="hidden"
                    onChange={uploadPhotoFromDevice}
                  />
                  <i className="bx bxs-layer-plus"></i>
                </label>
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
                className="w-hight bg-fun p-3 rounded border outline-none resize-none h-40"
                value={descriptions}
                onChange={(e) => setdescriptions(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">perks</h3>
            <label>check perks which you have*</label>
            <div className="w-normal space-y-1 grid grid-cols-2 grid-rows-3">
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  name="wi-fi"
                />
                <i className="bx bx-wifi text-3xl px-2"></i>
                <span>Free Wi-Fi</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  name="parking"
                />
                <i className="bx bxs-car-garage text-2xl px-2"></i>
                <span>Free parking spot</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center">
                <input type="checkbox" onChange={handeleCbChange} name="tv" />
                <i className="bx bx-tv text-3xl px-2"></i>
                <span>TV station</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center">
                <input type="checkbox" onChange={handeleCbChange} name="pets" />
                <i className="bx bxs-dog text-3xl px-2"></i>
                <span>allowed for pets</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  name="private"
                />
                <i className="bx bx-door-open text-3xl px-2"></i>
                <span>Private extrance</span>
              </label>
              <label className="w-smally p-3 rounded hover:bg-fun flex items-center">
                <input
                  type="checkbox"
                  onChange={handeleCbChange}
                  name="radio"
                />
                <i className="bx bx-radio text-3xl px-2"></i>
                <span>radio</span>
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
                className="w-hight bg-fun p-3 rounded border outline-none"
                value={checkin}
                onChange={(e) => setcheckin(e.target.value)}
              />
            </div>
            <div className="flex flex-col spay">
              <label>Check out time*</label>
              <input
                type="time"
                placeholder="time here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                value={checkout}
                onChange={(e) => setcheckout(e.target.value)}
              />
            </div>
            <div className="flex flex-col spay">
              <label>maximum number of guests*</label>
              <input
                type="number"
                placeholder="number here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                value={maxGests}
                onChange={(e) => setmaxGests(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Submit or clear</h3>
            <label className="">submit if you are ready*</label>
            <div className="space-x-3">
              <button
                type="submit"
                className="py-2 px-5 bg-base rounded-full text-white"
              >
                Submit & publish
              </button>
              <button
                onClick={hendleResetForm}
                type="reset"
                className="py-2 px-5 bg-black text-white rounded-full"
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
