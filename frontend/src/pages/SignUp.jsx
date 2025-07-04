import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";

function SignUp() {
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData } = useContext(userDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let {loading, setLoading} = useContext(authDataContext)
  const handleSignUp = async (e) => {
    setLoading(true)
    e.preventDefault();

    // Basic validation for input fields
    if (!name || !email || !password) {
      console.log("Please fill all fields");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return;
    }

    try {
      // Send sign-up request to server
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
setLoading(false)
      // Save user data to context
      setUserData(result.data);

      // Redirect to home page on successful signup
      // inside signup success:
navigate("/profile"); // ✅ send them to profile


      console.log("Sign-up successful:", result.data);
    } catch (error) {
      // Handle errors (e.g., validation errors from the server)
      console.log("Error during sign-up:", error.response?.data || error);
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
        onSubmit={handleSignUp}
      >
        <h1 className="text-[30px] text-[black]">Welcome to Wanderlust</h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
          <label htmlFor="name" className="text-[20px]">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="w-[90%] h-[40px] border-[2px] border-[#2f2f2f] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#2f2f2f] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className="text-[20px]">
            Password
          </label>
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
        <button className="px-[50px] py-[10px] bg-slate-900 text-white md:px-100px rounded-lg mt-[20px]"
        disabled= {loading}>
         { loading? "loading...": "SignUp" }
        </button>
        <p className="text-[18px]">
          Already have an account?{" "}
          <span
            className="text-[red] text-[19px] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
