import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Register = () => {
  const { user } = useContext(UserContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [direct, setDirect] = useState(false);

  const { setuser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
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
    <div className="w-full flex justify-center px-basic">
      <div className="w-base flex items-center flex-col">
        <h2 className="text-2xl font-bold">Log in</h2>
        <form className=" space-y-2 w-80" onSubmit={handleLogin}>
          <div className="space-y-1 flex flex-col">
            <label>email*</label>
            <input
              type="email"
              className="bg-gray-200 outline-none px-5 py-2 rounded-full"
              placeholder="email here"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label>password*</label>
            <input
              type="password"
              className="bg-gray-200 outline-none px-5 py-2 rounded-full"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
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
