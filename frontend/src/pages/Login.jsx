import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  let { loading,setLoading} = useContext(authDataContext)

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();

    // Validation
    if (!email || !password) {
      console.log("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return;
    }

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
setLoading(false)
      setUserData(result.data);
      console.log("Login successful:", result.data);
      navigate("/");
    } catch (error) {
      setLoading(false)
      console.log("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10px] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px] text-white" />
      </div>
      <form
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-[30px] text-[black]">Welcome Back To WanderLust</h1>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px]">Email</label>
          <input
            type="email"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#2f2f2f] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className="text-[20px]">Password</label>
          <input
            type={show ? "text" : "password"}
            id="password"
            className="w-[90%] h-[40px] border-[2px] border-[#2f2f2f] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!show ? (
            <IoMdEye
              className="cursor-pointer w-[22px] h-[22px] absolute right-[12%] bottom-[10px]"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <IoMdEyeOff
              className="cursor-pointer w-[22px] h-[22px] absolute right-[12%] bottom-[10px]"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>

        <button className="px-[50px] py-[10px] bg-slate-900 text-white md:px-100px rounded-lg mt-[20px] " 
        disabled= {loading}>
          {loading? "loading..." : "login"}
        </button>

        <p className="text-[18px]">
          Don't have an account?{" "}
          <span
            className="text-[red] text-[19px] cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
