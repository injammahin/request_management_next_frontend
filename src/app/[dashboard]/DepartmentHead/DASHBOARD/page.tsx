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
import Navbar from "@/app/components/navigation/page"; // Ensure this path is correct based on your project structure

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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`bg-gray-100 pt-20 min-h-screen ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <Navbar userRole="supervisor" onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[230px]" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards */}
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg">
            <button className="relative p-2 bg-blue-500 rounded-full text-white ">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                3
              </span>
            </button>
            <h2 className="font-semibold text-xl">Service Requests</h2>
            <p className="text-gray-600">You have 42 pending requests.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg">
            <button className="relative p-2 bg-blue-500 rounded-full text-white">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                3
              </span>
            </button>
            <h2 className="font-semibold text-xl">Maintenance Requests</h2>
            <p className="text-gray-600">5 new maintenance tasks.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg">
            <button className="relative p-2 bg-blue-500 rounded-full text-white">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                3
              </span>
            </button>
            <h2 className="font-semibold text-xl">User Feedback</h2>
            <p className="text-gray-600">You have 89 unread messages.</p>
          </div>
        </div>

        {/* Chart */}

        <div className="bg-white p-10 rounded-xl h-[500px] w-[900px] shadow-md mt-6">
          <h2 className="font-semibold text-xl mb-4">Monthly Active Users</h2>
          <Line className="h-96 w-96" data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
