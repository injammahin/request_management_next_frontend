// Dashboard.tsx
"use client";
import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "@/app/components/navigation/page";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Active Users",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div
      className={`bg-gray-100 pt-0 min-h-screen ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[230px]" : ""
        }`}
      >
        <div className="bg-gray-100 pt-20 min-h-screen">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold  text-center">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Cards with smaller title */}
              <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">Service Requests</h2>
                  <p className="text-gray-600">You have 42 pending requests.</p>
                </div>
                <button className="relative p-2 rounded-full text-white bg-blue-700">
                  <FiBell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                    3
                  </span>
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">Service Requests</h2>
                  <p className="text-gray-600">You have 14 pending requests.</p>
                </div>
                <button className="relative p-2 rounded-full text-white bg-blue-700">
                  <FiBell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                    3
                  </span>
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">Service Requests</h2>
                  <p className="text-gray-600">You have 5 unread message</p>
                </div>
                <button className="relative p-2 rounded-full text-white bg-blue-700">
                  <FiBell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                    7
                  </span>
                </button>
              </div>
              {/* Repeat for other cards */}

              {/* Chart */}
              <div className="md:col-span-2 lg:col-span-4 bg-white p-5 rounded-xl shadow-md mt-3">
                <h2 className="font-semibold text-xl mb-4">
                  Monthly Active Users
                </h2>
                <div className="h-96 ">
                  <Line data={data} />
                </div>
              </div>
            </div>

            {/* Task List */}

            {/* Overview Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h3 className="font-semibold text-lg">
                    Total accepted form this month
                  </h3>
                  <p className="text-3xl">1,204</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h3 className="font-semibold text-lg">
                    Declined form in this moth
                  </h3>
                  <p className="text-3xl">234</p>
                </div>
                {/* Add more overview cards as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
