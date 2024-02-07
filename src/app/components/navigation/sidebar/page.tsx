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
  requestedBy: string;
  department: string;
  designation: string;
  date: string;
  requestFor: string;
  employeeId: string;
  reasonOfRequest: string;
  serviceDetails: string;
  approvalStatus: string;
  supervisorStatus: string;
}

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [acceptedForms, setAcceptedForms] = useState(0);
  const [declinedForms, setDeclinedForms] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  ////////////////////////////////////////////////////////////////
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRequests, setExpandedRequests] = useState<number[]>([]);
  const [showAllRequests, setShowAllRequests] = useState(false);

  useEffect(() => {
    const targetAccepted = 1204; // Target number for accepted forms
    const targetDeclined = 234; // Target number for declined forms

    const incrementAccepted = targetAccepted / 300; // Increment for accepted forms
    const incrementDeclined = targetDeclined / 300; // Increment for declined forms

    const animateAcceptedForms = () => {
      if (acceptedForms < targetAccepted) {
        setAcceptedForms((prev) => prev + incrementAccepted);
      }
    };

    const animateDeclinedForms = () => {
      if (declinedForms < targetDeclined) {
        setDeclinedForms((prev) => prev + incrementDeclined);
      }
    };

    const intervalAccepted = setInterval(animateAcceptedForms, 20);
    const intervalDeclined = setInterval(animateDeclinedForms, 20);

    return () => {
      clearInterval(intervalAccepted);
      clearInterval(intervalDeclined);
    };
  }, [acceptedForms, declinedForms]);
  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1200 },
  });
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
  const jumpAnimation = useSpring({
    to: { transform: isHovered ? "translateY(-10px)" : "translateY(0px)" },
    from: { transform: "translateY(0px)" },
    config: { mass: 1, tension: 180, friction: 12 },
  });

  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetch("http://localhost:3001/service-requests/ApplicationUser-Management")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setServiceRequests(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const toggleShowAllRequests = () => {
    setShowAllRequests((prev) => !prev);
  };
  const handleAction = async (id: number, action: "release" | "decline") => {
    try {
      await fetch(`http://localhost:3001/service-requests/${action}/${id}`, {
        method: "PATCH",
      });
      // Update the status in the local state
      setServiceRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                supervisorStatus:
                  action === "release" ? "Released" : "declined",
              }
            : req
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to perform action");
    }
  };
  const pendingToRelease = serviceRequests.filter(
    (request) => request.supervisorStatus === "Pending "
  );
  const released = serviceRequests.filter(
    (request) => request.supervisorStatus === "Pending"
  );
  const totalPendingToRelease = pendingToRelease.length;
  const totalReleased = released.length;
  const toggleExpand = (id: number) => {
    setExpandedRequests((prev) =>
      prev.includes(id) ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
            </div>

            <div
              className={`grid ${
                showAllRequests
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              } gap-4`}
            >
              {/* Service Requests Section */}
              <div
                className={`p-4 bg-white text-gray-900 rounded-xl shadow-md ${
                  showAllRequests ? "col-span-full" : ""
                }`}
              >
                <div>
                  <button
                    onClick={toggleShowAllRequests}
                    className="text-gray-900 h-10 w-60 font-bold rounded"
                  >
                    {showAllRequests
                      ? "Hide Requests"
                      : "Show All Service Requests"}
                  </button>
                  {showAllRequests && (
                    <ul>
                      {serviceRequests.map((request) => (
                        <li
                          key={request.id}
                          className="bg-white shadow-lg text-start border-b-2 border-gray-400 p-4 mb-4"
                        >
                          <div className="flex justify-between items-center">
                            <h2 className="">
                              <label className="font-semibold">
                                Request No:
                              </label>{" "}
                              {request.requestNo} |{" "}
                              {request.reasonOfRequest.slice(0, 30)}...
                            </h2>
                            <button
                              onClick={() => toggleExpand(request.id)}
                              className="text-white bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2"
                            >
                              {expandedRequests.includes(request.id)
                                ? "Show Less"
                                : "Show More"}
                            </button>
                          </div>
                          {expandedRequests.includes(request.id) && (
                            <div>{/* Detailed request information */}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Other sections that should be hidden when showAllRequests is true */}
              {!showAllRequests && <>{/* Additional sections here */}</>}
            </div>

            {/* Additional dashboard sections */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
