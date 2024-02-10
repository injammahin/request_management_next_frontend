"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Replace with your login API endpoint
      const response = await axios.post("http://localhost:3001/auth/signin", {
        email,
        password,
      });
      // Handle login success
      console.log(response.data);
      setSuccessMessage("Login successful!");
      // Redirect to dashboard or appropriate page
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pt-2 relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center text-sm leading-5">
                {isPasswordVisible ? (
                  <FaEyeSlash
                    className="text-gray-700"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-gray-700"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
          {successMessage && (
            <div className="text-green-500 text-center">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default SigninPage;
