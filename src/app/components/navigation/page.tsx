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
  const [isMenuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-700 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Information Box (conditionally rendered based on isMenuOpen) */}
        {isMenuOpen && (
          <div className="bg-[#365486] text-white w-80 min-h-screen overflow-hidden rounded  absolute left-0 h-auto mt-[1000px] z-10 ">
            <div className="p-4 flex items-center justify-center ">
              <span className="text-2xl font-bold"></span>
            </div>
            {/* Add your information content here */}
            <svg
              className="absolute -top-0 -left-0 right-0 h-16 w-full "
              viewBox="230 4 1140 220"
            >
              <path
                fill="#374151"
                fillOpacity="1"
                d="M0,192L48,197.3C96,203,192,213,288,186.7C384,160,480,96,576,69.3C672,43,768,53,864,74.7C960,96,1056,128,1152,144C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
            <br />
            <Link
              href="/user/service_request"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700 "
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>Service Request</span>
            </Link>
            <Link
              href="/user/profile"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#6DA4AA]"
            >
              <UserIcon className="w-5 h-5" />
              <span>View Requested Forms</span>
            </Link>
            <Link
              href="/user/maintenance-request-form"
              className=" text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span> Create Maintenance Request Form</span>
            </Link>
            <Link
              href="/user/view_maintenance_request_form"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#6DA4AA]"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>View Maintenance Request Form</span>
            </Link>
            <Link
              href="/department/department_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <InformationCircleIcon className="w-5 h-5" />
              <span>Department Information</span>
            </Link>
            <Link
              href="/user/department_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#6DA4AA]"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span> View Department Information</span>
            </Link>
            <Link
              href="/department/employee_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
            >
              <UsersIcon className="w-5 h-5" />
              <span>Employee Information</span>
            </Link>
            <Link
              href="/user/employee_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#6DA4AA]"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>View Employee Information</span>
            </Link>
            <Link
              href="/user/changepassword"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#5F0F40]"
            >
              <KeyIcon className="w-5 h-5" />
              <span>Change Password</span>
            </Link>
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
