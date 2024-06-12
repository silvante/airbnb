import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { imageTotalLink } from "..";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, ready, setuser } = useContext(UserContext);
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");
  const [bio, setbio] = useState("");
  const [username, setusername] = useState("");
  const [redirect, setredirect] = useState(false);

  const fatchData = async () => {
    const { data } = await axios.get(`/api/users/${user._id}`);
    setname(data[0].name);
    setusername(data[0].username);
    setavatar(data[0].avatar);
    setbio(data[0].bio);
  };

  useEffect(() => {
    fatchData();
  }, [ready]);

  async function handleImageChange(img) {
    const files = img.target.files;
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
        const filename = filenames[0];
        setavatar(filename);
      });
  }

  async function handleEdit(e) {
    e.preventDefault();
    const { data } = await axios.put(`/api/users/${user._id}`, {
      avatar,
      name,
      username,
      bio,
    });
    setuser(data[0]);
    setredirect(true);
  }

  if (redirect) {
    return <Navigate to={"/profile"} />;
  }

  if (!ready) {
    return "Loading";
  }
  if (!user) {
    navigate("/login");
  }

  return (
    <div className="w-full flex justify-center px-basic">
      <div className="w-base">
        <nav className="w-full flex justify-between items-center py-5">
          <h3 className="text-2xl font-bold">Edit profile "{user.name}"</h3>
          <Link
            to={"/profile"}
            className="py-2 px-5 bg-base text-white rounded-full"
          >
            cancle editing
          </Link>
        </nav>
        <form className=" space-y-5" onSubmit={handleEdit}>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Edit your proofile</h3>
            <div className="space-y-1">
              <label>edit your pfp*</label>
              <div className="relative w-40 h-40">
                <div className="w-full h-full rounded-full border-2 overflow-hidden">
                  <img src={`${imageTotalLink}${avatar}`} alt={name} />
                </div>
                <label className="absolute bottom-0 flex justify-center items-center right-0 border-2 w-10 h-10 bg-slate-100 z-50 rounded-full hover:bg-base hover:border-none hover:text-white transition-all">
                  <input
                    type="file"
                    className="hidden w-full h-full"
                    onChange={handleImageChange}
                  />
                  <i className="bx bx-edit"></i>
                </label>
              </div>
              {/* <button className="rounded-full bg-base text-white py-2 px-5">
                delete avatar
              </button> */}
            </div>
            <div className="flex flex-col space-y-1">
              <label>edit your name*</label>
              <input
                type="text"
                placeholder="edit name here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                onChange={(e) => setname(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>edit your username*</label>
              <input
                type="text"
                placeholder="edit username here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>enter some bio here*</label>
              <input
                type="text"
                placeholder="bio here..."
                className="w-hight bg-fun p-3 rounded border outline-none"
                value={bio}
                onChange={(e) => setbio(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white rounded w-full p-5 space-y-3">
            <h3 className="text-xl font-bold">Submit</h3>
            <p>submit if you are ready*</p>
            <button className="bg-base text-white py-2 px-4 rounded-full">
              save profile changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
