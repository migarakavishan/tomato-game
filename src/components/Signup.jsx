import React, { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoIosMail } from "react-icons/io";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="box-content h-4/6 w-4/6 p-4 flex justify-center items-center bg-indigo-200">
        <div className="max-w-md w-full p-8 h-5/6 bg-purple-400 shadow-md rounded-3xl flex flex-col justify-center items-center">
          <h2 className="text-2xl mb-4 text-white font-bold">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">
            <div className="relative w-full">
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 pl-10 border rounded-2xl focus:outline-none"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700" />
            </div>
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 pl-10 border rounded-2xl focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <IoIosMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700" />
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 pl-10 border rounded-2xl focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-700"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-700"
                  onClick={togglePasswordVisibility}
                />
              )}
              <IoIosLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"/>
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-3 py-2 pl-10 border rounded-2xl focus:outline-none"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-700"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-700"
                  onClick={togglePasswordVisibility}
                />
              )}
              <IoIosLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"/>
            </div>
            <button
              type="submit"
              className=" bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none self-center"
            >
              Sign up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white font-medium">
              I have an account? <a href="/login" className="text-blue-200">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
