"use client";
import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { useSpring, animated } from "react-spring";
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
// Adjust the import path based on your file structure

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ServiceRequest {
  id: number;
  requestNo: string;
  // Define other properties as needed...
}

interface MaintenanceRequest {
  id: number;
  requestNumber: string;
  // Define other properties as needed...
}

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchServiceRequests = fetch(
      "http://localhost:3001/service-requests/ApplicationUser-Management"
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch service requests");
        return response.json();
      })
      .then(setServiceRequests)
      .catch((error) => {
        console.error("Service Requests Fetch Error:", error);
        setError("Failed to load service requests");
      });

    const fetchMaintenanceRequests = fetch(
      "http://localhost:3001/maintaintance/ApplicationUser-Management"
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Failed to fetch maintenance requests");
        return response.json();
      })
      .then(setMaintenanceRequests)
      .catch((error) => {
        console.error("Maintenance Requests Fetch Error:", error);
        setError("Failed to load maintenance requests");
      });

    Promise.all([fetchServiceRequests, fetchMaintenanceRequests]).finally(() =>
      setIsLoading(false)
    );
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`dashboard ${isMenuOpen ? "menu-open" : ""}`}>
      <Navbar onMenuToggle={toggleMenu} userRole={""} />
      <div className="dashboard-content">
        <h1>Dashboard</h1>

        {/* Service Requests Section */}
        <section>
          <h2>Service Requests</h2>
          {serviceRequests.map((request) => (
            <div key={request.id} className="request-card">
              Request #{request.requestNo}
              {/* Add more details here */}
            </div>
          ))}
        </section>

        {/* Maintenance Requests Section */}
        <section>
          <h2>Maintenance Requests</h2>
          {maintenanceRequests.map((request) => (
            <div key={request.id} className="request-card">
              Maintenance #{request.requestNumber}
              {/* Add more details here */}
            </div>
          ))}
        </section>

        {/* Additional sections as needed... */}
      </div>
    </div>
  );
};

export default Dashboard;
