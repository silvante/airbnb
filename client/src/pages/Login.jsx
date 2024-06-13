import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Register = () => {
  const { user } = useContext(UserContext);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [direct, setDirect] = useState(false);

  const { setuser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username: "@" + username,
        password,
      });
      setuser(response.data);
      alert("login success...");
      setDirect(true);
    } catch (err) {
      console.log(err);
      alert("login filed");
    }
  }

  if (direct) {
    return <Navigate to={"/"} />;
  }
  if (user) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className="w-full flex justify-center px-basic py-5">
      <div className="w-base flex items-center flex-col">
        <h2 className="text-2xl font-bold">Log in</h2>
        <form className=" space-y-2 w-80" onSubmit={handleLogin}>
          <div className="space-y-1 flex flex-col">
            <label>username*</label>
            <input
              type="text"
              className="bg-gray-200 outline-none px-5 py-2 rounded-lg"
              placeholder="email here"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label>password*</label>
            <input
              type="password"
              className="bg-gray-200 outline-none px-5 py-2 rounded-lg"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <p className="text-center">ready?</p>
          <button
            className="bg-base w-full text-white py-2 rounded-lg"
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            don't have account yet?{" "}
            <Link to={"/sing-up"} className="text-baseRed">
              singup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
