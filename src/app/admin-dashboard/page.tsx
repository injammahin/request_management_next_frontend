import React from "react";
import Navbar from "../components/navigation/page";

const page = () => {
  return (
    <div>
      <Navbar userRole={"admin"} />

      <div className="container mx-auto p-8 pt text-center">
        <div className="mb-8  relative group">
          <h2 className="text-3xl uppercase font-bold mb-2 pt-16 group-hover:text-blue-500">
            welcome to your admin dashboard
          </h2>
          <h2 className="text-xl uppercase font-bold mb-2 pt-16 group-hover:text-gray-900">
            click the menu button to show more
          </h2>
        </div>
      </div>
    </div>
  );
};

export default page;
