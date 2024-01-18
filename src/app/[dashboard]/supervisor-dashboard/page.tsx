// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import Sidebar from "react-sidebar";
import Chart from "chart.js/auto";
import Navbar from "@/app/components/navigation/page";

const Home: React.FC = () => {
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Sample Data",
            data: [10, 20, 30, 40, 50, 60, 30],
            backgroundColor: "#3490dc",
          },
        ],
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="">
      <Navbar userRole={"supervisor"} />
      <Sidebar
        sidebar={
          <div className="bg-gray-800 text-white h-screen w-1/4 p-4">
            <p>Sidebar Content</p>
          </div>
        }
        docked
      >
        <div className="flex flex-col w-full">
          <header className=" text-white p-4">
            <p>Header Content</p>
          </header>
          <div className="flex-grow flex p-4">
            <canvas id="myChart" width="400" height="200"></canvas>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Home;
