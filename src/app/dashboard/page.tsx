import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">
        Are you ready to create a service request?
        <button className="ml-2 bg-blue-500 text-white p-2 rounded">
          <Link href="user/service_request">Create</Link>
        </button>
      </h2>
      <h3 className="text-lg font-bold">
        View all your requested forms
        <button className="ml-2 bg-green-500 text-white p-2 rounded">
          <Link href="user/profile">View Forms</Link>
        </button>
      </h3>
      <br />
      <h3 className="text-lg font-bold">
        do you want to change password?
        <button className="ml-2 bg-red-500 text-white p-2 rounded">
          <Link href="user/changepassword">change password</Link>
        </button>
      </h3>
    </div>
  );
};

export default Page;
