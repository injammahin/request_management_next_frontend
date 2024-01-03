// HomePage.tsx

import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between w-full max-w-5xl px-6 md:px-10">
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img src="./dhaka_bank.png" alt=" dhaka bank" className="w-96 h-44" />
        </div>
        <div className=" text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-extrabold mb-4">
            Please login to your portal
          </h1>

          <div className="flex space-x-4">
            <a
              href="/user/login"
              className="bg-orange-500 text-white rounded-full px-6 py-2 hover:bg-orange-600 hover:text-black hover:underline"
            >
              Sign In
            </a>
            <a
              href="/user/registration"
              className="bg-green-500 text-white rounded-full px-6 py-3 hover:bg-green-600 hover:text-black hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
