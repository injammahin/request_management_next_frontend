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

// Define a TypeScript interface for the Navbar props
interface NavbarProps {
  userRole: string;
  onMenuToggle: (isOpen: boolean) => void; // New prop
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onMenuToggle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setMenuOpen(newMenuState);
    onMenuToggle(newMenuState); // Notify the parent component about the menu state change
  };
  const logout = async () => {
    try {
      // Make an API request or perform any necessary logout actions
      // ...

      // Redirect the user to the logout page or perform any necessary navigation
      window.location.href = "/user/logout";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-700 p-4 fixed top-0 pt-3 w-full z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Information Box (conditionally rendered based on isMenuOpen) */}
        {isMenuOpen && (
          <div className="bg-[#365486] text-white w-80 min-h-screen overflow-hidden rounded  absolute left-0 h-auto mt-[800px] z-10 ">
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
            {userRole === "admin" && (
              <>
                <Link
                  href="/department/department_information"
                  className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
                >
                  <InformationCircleIcon className="w-5 h-5" />
                  <span>Create Department Information</span>
                </Link>
                <Link
                  href="/department/employee_information"
                  className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700"
                >
                  <UsersIcon className="w-5 h-5" />
                  <span>Create Employee Information</span>
                </Link>
              </>
            )}
            <Link
              href="/user/service_request"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-gray-700 "
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span> Create Service Request Form</span>
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
              href="/user/department_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#6DA4AA]"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span> View Department Information</span>
            </Link>
            <Link
              href="/user/employee_information"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#6DA4AA]"
            >
              <ClipboardCheckIcon className="w-5 h-5" />
              <span>View Employee Information</span>
            </Link>
            <Link
              href="/dashboard/subadmin-dashboard"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#5F0F40]"
            >
              <UserIcon className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </Link>
            <Link
              href="/user/changepassword"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#5F0F40]"
            >
              <KeyIcon className="w-5 h-5" />
              <span>Change Password</span>
            </Link>
            <Link
              href="/dashboard/role"
              className="text-sm py-2 px-4 flex items-center space-x-2 uppercase text-white hover:bg-[#5F0F40]"
            >
              <KeyIcon className="w-5 h-5" />
              <span>role</span>
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
          {/* <Link href="/dashboard" className="text-white">
            Home
          </Link> */}

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={logout} // Call the logout function on click
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
