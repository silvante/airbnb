import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handeleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      alert("login success...");
    } catch (err) {
      console.log(err);
      alert("login filed");
    }
  }
  return (
    <div className="w-full flex justify-center px-16">
      <div className="w-base flex items-center flex-col">
        <h2 className="text-2xl font-bold">Login</h2>
        <form className=" space-y-2 w-80" onSubmit={hendleLogin}>
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
            Login
          </button>
          <p className="text-center">
            don't have account yet?{" "}
            <Link to={"/sing-up"} className="text-base">
              singup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
