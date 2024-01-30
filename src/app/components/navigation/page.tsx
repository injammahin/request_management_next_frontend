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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [IsDropdownOpen, setisDropdownOpen] = useState(true);
  const userEmail = localStorage.getItem("userId");
  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setMenuOpen(newMenuState);
    onMenuToggle(newMenuState); // Notify the parent component about the menu state change
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        <div className="flex items-center ">
          <img src="/new-logo.png" alt="Logo" className="h-12 w-max mr-2" />
        </div>

        {/* Navigation Links (conditionally rendered based on isMenuOpen) */}
        <div className={`lg:flex ${isMenuOpen ? "flex" : "hidden"} space-x-4`}>
          {/* <Link href="/dashboard" className="text-white">
            Home
          </Link> */}

          {/* <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={logout} // Call the logout function on click
          >
            Logout
          </button> */}
          <div className="relative flex items-center">
            <div
              className="block px-4 py-2 text-sm  mx-[-20px] text-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onMouseEnter={toggleDropdown}
            >
              {userEmail}
            </div>
            {isDropdownOpen && (
              <div className="absolute mt-52 mx-[-30px] right-0 w-52 bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-100 dark:bg-gray-700 dark:border-gray-600">
                <ul className="py-2" aria-labelledby="user-menu-button ">
                  <li>
                    <a
                      href="/user/user_information"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      User Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="/user/changepassword"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <Link
                      href={""}
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <button
              type="button"
              className={`ml-2 text-gray-100 hover:text-white focus:outline-none ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              onClick={toggleDropdown}
            >
              {/* You can replace the icon with your preferred one */}
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-blue-400 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={handleDropdownToggle}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/image.jpeg"
                alt="user photo"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
