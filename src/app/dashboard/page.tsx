import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Are you ready to create a service request?
        <button className="ml-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          <Link href="user/service_request">Create</Link>
        </button>
      </h2>
      <h2 className="text-3xl font-bold mb-6">
        View all your requested forms
        <button className="ml-4 bg-green-500 text-white p-2 rounded hover:bg-green-700">
          <Link href="user/profile">View Forms</Link>
        </button>
      </h2>
      <h2 className="text-3xl font-bold mb-6">
        Do you want to change your password?
        <button className="ml-4 bg-red-500 text-white p-2 rounded hover:bg-red-700">
          <Link href="user/changepassword">Change Password</Link>
        </button>
      </h2>
      <h2 className="text-3xl font-bold">
        Do you want to log out?
        <button className="ml-4 bg-red-500 text-white p-2 rounded hover:bg-red-700">
          <Link href="user/logout">Logout</Link>
        </button>
      </h2>
    </div>
  );
};

export default Page;
