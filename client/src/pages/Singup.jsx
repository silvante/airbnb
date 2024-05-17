import React, { useState } from "react";
import { Link } from "react-router-dom";

const Singup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) =>{
    e.pereventDefault()
    
  }
  return (
    <div className="w-full flex justify-center px-16">
      <div className="w-base flex items-center flex-col">
        <h2 className="text-2xl font-bold">Sing up</h2>
        <form className=" space-y-2 w-80" onSubmit={handleSubmit}>
          <div className="space-y-1 flex flex-col">
            <label>name*</label>
            <input
              type="text"
              className="bg-gray-200 outline-none px-5 py-2 rounded-full"
              placeholder="name here"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label>email*</label>
            <input
              type="text"
              className="bg-gray-200 outline-none px-5 py-2 rounded-full"
              placeholder="email here"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label>password*</label>
            <input
              type="text"
              className="bg-gray-200 outline-none px-5 py-2 rounded-full"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <p className="text-center">ready?</p>
          <button
            className="bg-base w-full text-white py-2 rounded-full"
            type="submit"
          >
            Sing up
          </button>
          <p className="text-center">
            allredy member?{" "}
            <Link to={"/login"} className="text-base">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Singup;
