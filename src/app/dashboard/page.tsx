import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Are you ready to create a service request?
        </h2>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          <Link href="user/service_request">Create</Link>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          View all your requested forms
        </h2>
        <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700">
          <Link href="user/profile">View Forms</Link>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Do you want to change your password?
        </h2>
        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
          <Link href="user/changepassword">Change Password</Link>
        </button>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2">Do you want to log out?</h2>
        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
          <Link href="user/logout">Logout</Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
