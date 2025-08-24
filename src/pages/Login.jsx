import React, { useState } from "react";
// import { NavBar } from "../navbar/NavBar";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { NavBar } from "../component/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmitRegister = () => {
    // setPasswordVisible(!passwordVisible);
  };
  const handleSubmitLogin = () => {
    // setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {/* <NavBar /> */}
      <div className="relative w-full bg-red-500 overflow-hidden min-h-screen flex items-center justify-center text-white px-5 sm:px-14 md:px-32 ">
        {createAccount ? (
          <motion.div
            initial={{ top: "20%", opacity: 0 }}
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mt-14 p-5 sm:p-10 rounded-lg w-full max-w-xl flex flex-col items-center border border-gray-700 "
          >
            <h2 className="text-3xl text-white font-normal text-center mb-3">Log in</h2>
            <div className="text-center mb-10">
              <p className="text-sm text-gray-300">
                New to our community?{" "}
                <h2
                  onClick={() => setCreateAccount(!createAccount)}
                  className="text-white underline"
                >
                  Sign up
                </h2>
              </p>
            </div>

            {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

            <form onSubmit={handleSubmitLogin} className="flex flex-col gap-1 max-w-sm w-full">
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="email" className="text-base font-light text-gray-300">
                  Email
                </label>
                <input
                  className="w-full text-lg px-3 py-2 bg-transparent border border-white focus:border-red-600 rounded-lg outline-none duration-300"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1">
                <div className="w-full flex justify-between items-center">
                  <label htmlFor="password" className="text-base font-light text-gray-300">
                    Password
                  </label>
                  <div
                    onClick={togglePasswordVisibility}
                    className="flex items-center gap-1 font-light cursor-pointer text-gray-300 hover:text-white"
                  >
                    {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    {passwordVisible ? "Hide" : "Show"}
                  </div>
                </div>
                <input
                  className="w-full text-lg p-3 bg-transparent border border-white focus:border-red-600 rounded-lg outline-none duration-300"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className={`w-full ${
                  loading ? "bg-red-600 cursor-not-allowed" : "bg-red-900 hover:bg-red-700"
                } text-white py-2 rounded-md transition duration-200 font-normal`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ top: "20%", opacity: 0 }}
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mt-24 p-5 sm:p-10 rounded-lg w-full max-w-xl flex flex-col items-center border border-gray-700 "
          >
            <h2 className="text-3xl text-white font-normal text-center mb-3">Log in</h2>
            <div className="text-center mb-10">
              <p className="text-sm text-gray-300">
                New to our community?{" "}
                <h2
                  onClick={() => setCreateAccount(!createAccount)}
                  className="text-white underline"
                >
                  Sign up
                </h2>
              </p>
            </div>

            {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

            <form onSubmit={handleSubmitRegister} className="flex flex-col gap-1 max-w-sm w-full">
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="email" className="text-base font-light text-gray-300">
                  Email
                </label>
                <input
                  className="w-full text-lg px-3 py-2 bg-transparent border border-white focus:border-red-600 rounded-lg outline-none duration-300"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1">
                <div className="w-full flex justify-between items-center">
                  <label htmlFor="password" className="text-base font-light text-gray-300">
                    Password
                  </label>
                  <div
                    onClick={togglePasswordVisibility}
                    className="flex items-center gap-1 font-light cursor-pointer text-gray-300 hover:text-white"
                  >
                    {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    {passwordVisible ? "Hide" : "Show"}
                  </div>
                </div>
                <input
                  className="w-full text-lg p-3 bg-transparent border border-white focus:border-red-600 rounded-lg outline-none duration-300"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className={`w-full ${
                  loading ? "bg-red-600 cursor-not-allowed" : "bg-red-900 hover:bg-red-700"
                } text-white py-2 rounded-md transition duration-200 font-normal`}
                disabled={loading}
              >
                {loading ? "Registering" : "Register Account"}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
