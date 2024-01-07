"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ClipboardCheckIcon,
  UserIcon,
  InformationCircleIcon,
  UsersIcon,
  KeyIcon,
} from "@heroicons/react/outline"; // Use outline icons from v2

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className=" bg-gray-600 text-white px-4 py-2 rounded focus:outline-none"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="bg-gray-800 text-white w-80 min-h-screen">
          <div className="p-4 flex items-center justify-center">
            <span className="text-2xl font-bold"></span>
          </div>
          <nav className="mt-4">
            <Link
              href="/user/service_request"
              className=" py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>Service Request</span>
            </Link>
            <Link
              href="/user/profile"
              className=" py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <UserIcon className="w-5 h-5" />
              <span>View Requested Forms</span>
            </Link>
            <Link
              href="/department/department_information"
              className=" py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <InformationCircleIcon className="w-5 h-5" />
              <span>Department Information</span>
            </Link>
            <Link
              href="/department/employee_information"
              className=" py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <UsersIcon className="w-5 h-5" />
              <span>Employee Information</span>
            </Link>
            <Link
              href="/user/changepassword"
              className=" py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <KeyIcon className="w-5 h-5" />
              <span>Change Password</span>
            </Link>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
