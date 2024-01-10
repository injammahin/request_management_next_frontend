// Navbar.js
"use client";
import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import {
  ClipboardCheckIcon,
  UserIcon,
  InformationCircleIcon,
  UsersIcon,
  KeyIcon,
} from "@heroicons/react/outline"; // Use outline icons from v2

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-700 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Information Box (conditionally rendered based on isMenuOpen) */}
        {isMenuOpen && (
          <div className="bg-white p-4 rounded-xl shadow-lg absolute left-0 h-auto mt-[460px] w-80">
            {/* Add your information content here */}
            <Link
              href="/user/service_request"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300 hover:border-blue-800"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>Service Request</span>
            </Link>
            <Link
              href="/user/profile"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <UserIcon className="w-5 h-5" />
              <span>View Requested Forms</span>
            </Link>
            <Link
              href="/user/maintenance-request-form"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>Create Maintenance Request Form</span>
            </Link>
            <Link
              href="/user/view_maintenance_request_form"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>View Maintenance Request Form</span>
            </Link>
            <Link
              href="/department/department_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <InformationCircleIcon className="w-5 h-5" />
              <span>Department Information</span>
            </Link>
            <Link
              href="/user/department_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>View Department Information</span>
            </Link>
            <Link
              href="/department/employee_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <UsersIcon className="w-5 h-5" />
              <span>Employee Information</span>
            </Link>
            <Link
              href="/user/changepassword"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-gray-800 hover:bg-gray-300"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>Change Password</span>
            </Link>

            {/* Add other menu items here */}
          </div>
        )}

        {/* Hamburger Toggle Button */}
        <button className="text-white focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? (
            <XIcon className="h-10 w-10" />
          ) : (
            <MenuIcon className="h-10 w-10" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/dhaka_bank_logo.png"
            alt="Logo"
            className="h-12 w-max mr-2"
          />
        </div>

        {/* Navigation Links (conditionally rendered based on isMenuOpen) */}
        <div className={`lg:flex ${isMenuOpen ? "flex" : "hidden"} space-x-4`}>
          <Link href="/dashboard" className="text-white">
            Home
          </Link>

          <Link href="/about" className="text-white">
            About Us
          </Link>

          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            <Link href="/user/logout">Logout</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
