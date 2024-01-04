import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-gray-300 text-white w-72 min-h-screen">
      <div className="p-4"></div>
      <nav className="mt-4">
        <Link
          href="/user/service_request"
          className="block py-2 px-4 uppercase text-black hover:text-white text- hover:bg-gray-700"
        >
          Service request
        </Link>
        <Link
          href="/user/profile"
          className="block py-2 px-4 uppercase text-black hover:text-white hover:bg-gray-700"
        >
          view requested forms
        </Link>
        <Link
          href="/department/department_information"
          className="block py-2 px-4 uppercase text-black hover:text-white hover:bg-gray-700"
        >
          department Information
        </Link>
        <Link
          href="/department/employee_information"
          className="block py-2 px-4 uppercase text-black hover:text-white hover:bg-gray-700"
        >
          employee information
        </Link>
        <Link
          href="/user/changepassword"
          className="block py-2 px-4 uppercase text-black hover:text-white hover:bg-gray-700"
        >
          change password
        </Link>
        {/* <Link
          href="/user/logout"
          className="block py-2 px-4 uppercase text-black hover:text-white hover:bg-gray-700"
        >
          logout
        </Link> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
