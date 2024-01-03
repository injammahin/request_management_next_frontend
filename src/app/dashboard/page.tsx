import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="mb-8 relative group">
        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-500">
          Are you ready to create a service request?
        </h2>
        <button className="hidden bg-blue-500 text-white p-2 rounded hover:bg-blue-700 absolute top-1/2 right-0 transform -translate-y-1/2 group-hover:block">
          <Link href="user/service_request">Create</Link>
        </button>
      </div>

      <div className="mb-8 relative group">
        <h2 className="text-xl font-bold mb-2 group-hover:text-green-500">
          View all your requested forms
        </h2>
        <button className="hidden bg-green-500 text-white p-2 rounded hover:bg-green-700 absolute top-1/2 right-0 transform -translate-y-1/2 group-hover:block">
          <Link href="user/profile">View Forms</Link>
        </button>
      </div>

      <div className="mb-8 relative group">
        <h2 className="text-xl font-bold mb-2 group-hover:text-red-500">
          Do you want to change your password?
        </h2>
        <button className="hidden bg-red-500 text-white p-2 rounded hover:bg-red-700 absolute top-1/2 right-0 transform -translate-y-1/2 group-hover:block">
          <Link href="user/changepassword">Change Password</Link>
        </button>
      </div>

      <div className="relative group">
        <h2 className="text-xl font-bold mb-2 group-hover:text-red-500">
          Do you want to log out?
        </h2>
        <button className="hidden bg-red-500 text-white p-2 rounded hover:bg-red-700 absolute top-1/2 right-0 transform -translate-y-1/2 group-hover:block">
          <Link href="user/logout">Logout</Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
