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
import axios from "axios";

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
  date: string;
  requestedBy: string;
  requestFor: string;
  department: string;
  employeeId: string;
  designation: string;
  reasonOfRequest: string;
  serviceDetails: string;
  user: string;
  accessDateDuration: string;
  accessTimeDuration: string;
  vandorName: string;
  vandorAssignedReason: string;
  deviceRequired: string;
  WorkTeamWithId: string;
  readBy: string;
  ReturnTimeDate: string;
  revokeBy: string;
  execusion: string;
  deviceApprovedBy: string;

  supervisorStatus: string;

  showFullForm: boolean;
}
interface MaintenanceRequest {
  id: number;
  requestNumber: string;
  approvalStatus: string;
  supervisorStatus: string;
  // Define other properties as needed...

  subofChange: string;

  date: string;

  requesterName: string;

  EmployeeId: string;

  department: string;

  contractNo: string;

  MaintenanceType: string;

  purposeOfActivity: string;
  referenceServiceRequest: string;

  priority: string;

  impactLevel: string;

  requiredDowntime: string;

  mentionDowntime: string;

  startDate: string;

  startTime: string;

  endDate: string;

  endTime: string;
  ////////////////////////////////* part -2 *////////////////////////////////
  changeLocation: string;
  targetedSystemFor: string;
  IPaddress: string;
  ImpactedSystemform: string;
  DetailedDescriptionOfChange: string;
  DetailedWorkedPlanTask: string;
  DetailedWorkedPlanStartTime: string;
  DetailedWorkedPlanEndTime: string;
  RequirementTools: string;
  Implementationteam: string;
  Communication: string;
  RollBackPlan: string;
  checklistStatusOne: string;
  checklistStatusTwo: string;
  checklistStatusThree: string;
  checklistStatusFour: string;
  ////////////////////////////////* part -3 *////////////////////////////////
  ImpactedSystemfor: string;
  ActualPriority: string;
  Actualimpactlevel: string;
  ////////////////////////////////* part -4 *////////////////////////////////
  ExecusionTeamMenbers: string;
  ExecusionTeamleaders: string;
  ////////////////////////////////* part -5 *////////////////////////////////
  ChangeReviewForperformed: string;
  ChangeReviewForSuccess: string;
  ActualDowntime: string;
  WorkExecutionStatus: string;
  /////////////////////////////////////

  user: string;
}

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [acceptedForms, setAcceptedForms] = useState(0);
  const [declinedForms, setDeclinedForms] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);

  ////////////////////////////////////////////////////////////////
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRequests, setExpandedRequests] = useState<number[]>([]);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [showAllMaintenanceRequests, setShowAllMaintenanceRequests] =
    useState(false);
  useEffect(() => {
    const targetAccepted = 1204; // Target number for accepted forms
    const targetDeclined = 234; // Target number for declined forms

    const incrementAccepted = targetAccepted / 10; // Increment for accepted forms
    const incrementDeclined = targetDeclined / 10; // Increment for declined forms

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

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const toggleShowAllRequests = () => {
    setShowAllRequests((prev) => !prev);
  };
  const toggleShowAllMaintenanceRequests = () => {
    setShowAllMaintenanceRequests((prev) => !prev);
  };
  const confirmAction = (action: string, id: number) =>
    window.confirm(`Are you sure you want to ${action} request ${id}?`);

  const handleApprove = async (id: number) => {
    if (confirmAction("release", id)) {
      try {
        await axios.patch(
          `http://localhost:3001/service-requests/release/${id}`
        );
        setPendingRequests((prev) =>
          prev.filter((request) => request.id !== id)
        );
        setSuccessMessage(`Request ${id} approved successfully`);
      } catch (error) {
        console.error(`Error approving request ${id}:`, error);
      }
    }
  };

  const handleDecline = async (id: number) => {
    if (confirmAction("decline", id)) {
      try {
        await axios.patch(`http://localhost:3001/service-requests/block/${id}`);
        setPendingRequests((prev) =>
          prev.map((request) =>
            request.id === id
              ? { ...request, approvalStatus: "Declined" }
              : request
          )
        );
        setSuccessMessage(`Request ${id} declined successfully`);
      } catch (error) {
        console.error(`Error declining request ${id}:`, error);
      }
    }
  };
  const handleMaintenanceAction = async (
    id: number,
    action: "release" | "decline"
  ) => {
    try {
      await fetch(`http://localhost:3001/maintenance/${action}/${id}`, {
        // Update this URL to your actual API endpoint
        method: "PATCH",
      });
      // Update the maintenance request status in the local state
      setMaintenanceRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                supervisorStatus:
                  action === "release" ? "Released" : "Declined",
              }
            : req
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to perform action on maintenance request");
    }
  };

  const pendingToRelease = serviceRequests.filter(
    (request) => request.supervisorStatus === "Pending "
  );
  const released = serviceRequests.filter(
    (request) => request.supervisorStatus === "Pending"
  );
  const pendingToReleaseMaintenance = maintenanceRequests.filter(
    (request) => request.supervisorStatus === "Pending "
  );
  const ToReleaseMaintenance = pendingToReleaseMaintenance.length;

  const totalPendingToRelease = pendingToRelease.length;
  const totalReleased = released.length;
  const toggleExpand = (id: number) => {
    setExpandedRequests((prev) =>
      prev.includes(id) ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };
  // New state definitions for tracking released and declined counts
  const [releasedCount, setReleasedCount] = useState(0);
  const [declinedCount, setDeclinedCount] = useState(0);

  // Function to calculate and set the released and declined counts
  const calculateStatusCounts = () => {
    const releasedServiceRequests = serviceRequests.filter(
      (request) => request.supervisorStatus === "Released"
    ).length;
    const declinedServiceRequests = serviceRequests.filter(
      (request) => request.supervisorStatus === "Decline"
    ).length;

    const releasedMaintenanceRequests = maintenanceRequests.filter(
      (request) => request.supervisorStatus === "Released"
    ).length;
    const declinedMaintenanceRequests = maintenanceRequests.filter(
      (request) => request.supervisorStatus === "Declined"
    ).length;

    // Summing up the counts from both service and maintenance requests
    setReleasedCount(releasedServiceRequests + releasedMaintenanceRequests);
    setDeclinedCount(declinedServiceRequests + declinedMaintenanceRequests);
  };

  // Call calculateStatusCounts whenever serviceRequests or maintenanceRequests change
  useEffect(() => {
    calculateStatusCounts();
  }, [serviceRequests, maintenanceRequests]);

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
        <div className="bg-gray-100 p-[-400px] min-h-screen ">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
            </div>

            <div>
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
                  <animated.div style={fadeInUp}>
                    <animated.button
                      style={fadeInUp}
                      onClick={toggleShowAllRequests}
                      className="text-gray-900 bg-[#E0CCBE] pl-2 text-start  h-10 w-60 font-bold  rounded"
                    >
                      {showAllRequests
                        ? "Hide Requests"
                        : "Show All Service Requests "}
                    </animated.button>

                    <button className="relative   p-2 mr-16 rounded-full text-gray-200 bg-[#0B60B0]">
                      <FiBell className="w-6 h-6" />
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-red-500 rounded-full">
                        {totalPendingToRelease}
                      </span>
                    </button>

                    <animated.p
                      style={fadeInUp}
                      className="text-gray-800 font-semibold"
                    >
                      You have {totalPendingToRelease} pending Service Request
                    </animated.p>

                    {showAllRequests && (
                      <ul>
                        {serviceRequests.map((request) => (
                          <li
                            key={request.id}
                            className="bg-white shadow-lg text-start border-b-2 border-[2px]  border-gray-400 p-4 mb-4"
                          >
                            <div className="flex justify-between items-center ">
                              <h2 className="">
                                <label className="font-semibold">
                                  Request No:
                                </label>{" "}
                                {request.requestNo} |{" "}
                                {request.reasonOfRequest.slice(0, 30)}...|
                                {request.supervisorStatus}
                              </h2>
                              <button
                                onClick={() => toggleExpand(request.id)}
                                className="text-white bg-[#40A2D8] hover:bg-[#0B60B0] rounded-lg px-2 py-1"
                              >
                                {expandedRequests.includes(request.id)
                                  ? "Show Less"
                                  : "Show More"}
                              </button>
                            </div>
                            {expandedRequests.includes(request.id) && (
                              <div className="mt-4">
                                <>
                                  <div>
                                    <tbody className="max-w-3xl   mx-auto mt-8 p-4 border pt-20">
                                      <div className="grid  grid-cols-2 gap-4 ">
                                        <div className="mb-2 flex flex-row items-center">
                                          <label className=" font-semibold  text-sm flex flex-none mr-2">
                                            Request No:
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.requestNo}
                                          </div>
                                        </div>

                                        <div className=" flex flex-row items-center">
                                          <label className="font-semibold text-sm flex flex-none mr-2">
                                            Date:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.date}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4 ">
                                        <div className=" flex flex-row items-center">
                                          <label className="font-semibold  text-sm flex flex-none mr-2">
                                            Request By :{" "}
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.requestedBy}
                                          </div>
                                        </div>

                                        <div className=" flex flex-row items-center">
                                          <label className="font-semibold text-sm flex flex-none mr-2">
                                            Request For:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.requestFor}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4 ">
                                        <div className=" flex flex-row items-center">
                                          <label className="font-semibold  text-sm flex flex-none mr-2">
                                            Department:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.department}
                                          </div>
                                        </div>

                                        <div className=" flex flex-row items-center">
                                          <label className="font-semibold flex  text-sm flex-none mr-2">
                                            Employee Id:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.employeeId}
                                          </div>
                                        </div>
                                      </div>

                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Designation:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.designation}
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Request For Person:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.reasonOfRequest}
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Access Date Duration:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.accessDateDuration}
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Access Time Duration:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.accessTimeDuration}
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2 ">
                                          Details of Access/Service:
                                          <span style={{ color: "red" }}>
                                            {" "}
                                            *
                                          </span>
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.serviceDetails}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2  ">
                                        <div className="mb-2  flex flex-row items-center">
                                          <label className=" font-semibold flex text-sm flex-none mr-2">
                                            Change/Execusion/
                                            <br />
                                            request ID :
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.execusion}
                                          </div>
                                        </div>

                                        <div className=" flex flex-row items-center text-center">
                                          <label className=" mx-20 lex flex-none text-sm ">
                                            referred from change/ Maintenance
                                            <br /> request Form
                                          </label>
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Vendor Name:
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.vandorName}
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          vendor Assigned Reason:
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.vandorAssignedReason}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 ">
                                        <div className="mb-1 flex flex-row items-center">
                                          <label className="font-semibold flex flex-none text-sm mr-2">
                                            Tools/Device
                                            <br />
                                            required
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.deviceRequired}
                                          </div>
                                        </div>

                                        <div className="mb-1 flex flex-row items-center">
                                          <label className="font-semibold  text-center flex flex-none text-sm mr-2">
                                            Device
                                            <br /> Approved By
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.deviceApprovedBy}
                                          </div>
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Work Team With Id
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.WorkTeamWithId}
                                        </div>
                                      </div>
                                      <div className=" flex flex-row items-center">
                                        <label className="font-semibold flex flex-none text-sm mr-2">
                                          Read By
                                        </label>
                                        <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                          {request.readBy}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 ">
                                        <div className="mb-1 flex flex-row items-center">
                                          <label className="font-semibold flex flex-none text-sm mr-2">
                                            Revoke/return date <br /> & time:
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.ReturnTimeDate}
                                          </div>
                                        </div>

                                        <div className="mb-1 flex flex-row items-center">
                                          <label className="font-semibold flex flex-none text-sm mr-2">
                                            revoked BY:
                                          </label>
                                          <div className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            {request.revokeBy}
                                          </div>
                                        </div>
                                      </div>
                                    </tbody>
                                  </div>

                                  <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                      className={`font-bold ${
                                        request.supervisorStatus === "Pending"
                                          ? "text-yellow-500"
                                          : request.supervisorStatus ===
                                            "Released"
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {request.supervisorStatus}
                                    </span>
                                  </p>
                                  <div className="flex space-x-2 mt-3">
                                    <button
                                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => handleApprove(request.id)}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => handleDecline(request.id)}
                                    >
                                      Decline
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => toggleExpand(request.id)}
                                    className="text-blue-500 mt-2 cursor-pointer"
                                  ></button>
                                </>
                                {/* Add more details as needed */}

                                {/* <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleAction(request.id, "release")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Release
                      </button>
                      <button
                        onClick={() => handleAction(request.id, "block")}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Block
                      </button>
                    </div> */}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </animated.div>
                </div>
                {/* Maintenance Requests Section */}
                <div
                  className={`p-4 bg-white text-gray-900 rounded-xl shadow-md ${
                    showAllMaintenanceRequests ? "col-span-full" : ""
                  }`}
                >
                  <animated.div style={fadeInUp}>
                    <div className="flex justify-between">
                      <animated.button
                        style={fadeInUp}
                        onClick={toggleShowAllMaintenanceRequests}
                        className="text-gray-900 bg-[#E0CCBE]  pl-2 text-start h-10 w-72 font-bold rounded"
                      >
                        {showAllMaintenanceRequests
                          ? "Hide Maintenance Requests"
                          : "Show All Maintenance "}
                      </animated.button>
                      <div className="pl-10">
                        <button className="relative   p-2 mr-16 rounded-full text-gray-200 bg-[#0B60B0]">
                          <FiBell className="w-6 h-6 " />
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-red-500 rounded-full">
                            {ToReleaseMaintenance}
                          </span>
                        </button>
                      </div>
                    </div>
                    <animated.p
                      style={fadeInUp}
                      className="text-gray-800 font-semibold"
                    >
                      You have {ToReleaseMaintenance} pending Maintenance
                      Request
                    </animated.p>

                    {showAllMaintenanceRequests && (
                      <ul>
                        {maintenanceRequests.map((request) => (
                          <li
                            key={request.id}
                            className="bg-white shadow-lg text-start border-b-2 border-gray-400 p-4 mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <h2 className="">
                                <label className="font-semibold">
                                  Request Numner:
                                </label>{" "}
                                {request.requestNumber} |{" "}
                                {/* {request.reasonOfRequest.slice(0, 30)}...| */}
                                {request.approvalStatus}
                              </h2>
                              <button
                                onClick={() => toggleExpand(request.id)}
                                className="text-white bg-[#40A2D8] hover:bg-[#0B60B0] rounded-lg px-2 py-1"
                              >
                                {expandedRequests.includes(request.id)
                                  ? "Show Less"
                                  : "Show More"}
                              </button>
                            </div>
                            {expandedRequests.includes(request.id) && (
                              <div className="mt-4">
                                <>
                                  <div>
                                    <tbody>
                                      <tr>
                                        {/* Request No and Date in one row */}
                                        <td className="border-[1px]    border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Request Number:{" "}
                                            </label>{" "}
                                            {request.requestNumber}
                                          </div>
                                        </td>

                                        <td className="border-[1px] border-b-1 py-2 px-4  border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Date{" "}
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Request No and Date in one row */}
                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Requested By{" "}
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>

                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Request For
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Request No and Date in one row */}
                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Department
                                            </label>{" "}
                                            {request.department}
                                          </div>
                                        </td>

                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Employee Id
                                            </label>{" "}
                                            {request.EmployeeId}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Designation in a separate row */}
                                        <td
                                          colSpan={2}
                                          className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                                        >
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Designation
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Reason of Request in a separate row */}
                                        <td
                                          colSpan={2}
                                          className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                                        >
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Reason Of Request
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Service Details in a separate row */}
                                        <td
                                          colSpan={2}
                                          className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                                        >
                                          <div className="font-semibold text-sm text-gray-900">
                                            <label className="font-semibold ">
                                              Service Details
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </div>

                                  <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                      className={`font-bold ${
                                        request.supervisorStatus === "Pending"
                                          ? "text-yellow-500"
                                          : request.supervisorStatus ===
                                            "Released"
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {request.supervisorStatus}
                                    </span>
                                  </p>
                                  <div className="flex space-x-2 mt-3">
                                    <button
                                      onClick={() =>
                                        handleMaintenanceAction(
                                          request.id,
                                          "release"
                                        )
                                      }
                                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                      Release
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleMaintenanceAction(
                                          request.id,
                                          "decline"
                                        )
                                      }
                                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                      Blocked
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => toggleExpand(request.id)}
                                    className="text-blue-500 mt-2 cursor-pointer"
                                  ></button>
                                </>
                                {/* Add more details as needed */}

                                {/* <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleAction(request.id, "release")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Release
                      </button>
                      <button
                        onClick={() => handleAction(request.id, "block")}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Block
                      </button>
                    </div> */}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </animated.div>
                </div>

                <div className="bg-gay-100 rounded-lg shadow-lg text-start p-4 pr-4">
                  <animated.div style={fadeInUp} className="font-bold">
                    {" "}
                    Show All Maintenance Request
                    <animated.button
                      style={fadeInUp}
                      className="relative   p-2 mr-16 rounded-full text-gray-200 bg-[#0B60B0]"
                    >
                      <FiBell className="w-6 h-6 " />
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-red-500 rounded-full">
                        6
                      </span>
                    </animated.button>
                  </animated.div>
                  <animated.p
                    style={fadeInUp}
                    className="text-gray-800 font-semibold"
                  >
                    You have 6 unread messages
                  </animated.p>{" "}
                </div>
                <animated.div
                  style={jumpAnimation}
                  onMouseEnter={() => setIsHovered(false)}
                  onMouseLeave={() => setIsHovered(false)}
                ></animated.div>
              </div>
              <animated.div
                style={fadeInUp}
                className="md:col-span-2 lg:col-span-4 bg-white p-5 rounded-xl shadow-md mt-3"
              >
                <animated.h2
                  style={fadeInUp}
                  className="font-semibold text-xl mb-4"
                >
                  Monthly Form Submit
                </animated.h2>
                <div className="h-96 ">
                  <Line data={data} />
                </div>
              </animated.div>

              {/* Other sections that should be hidden when showAllRequests is true */}
              {/* {!showAllRequests && (
                <>
                  
                </>
              )} */}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <animated.div
                  style={fadeInUp}
                  className="bg-white p-4 rounded-xl shadow-md"
                >
                  <animated.h3
                    style={fadeInUp}
                    className="font-semibold text-lg"
                  >
                    Total accepted forms this month
                  </animated.h3>
                  <animated.p style={fadeInUp} className="text-3xl">
                    {Math.floor(releasedCount)} +
                  </animated.p>
                </animated.div>

                <animated.div
                  style={fadeInUp}
                  className="bg-white p-4 rounded-xl shadow-md"
                >
                  <animated.h3
                    style={fadeInUp}
                    className="font-semibold text-lg"
                  >
                    Declined forms this month
                  </animated.h3>
                  <animated.p style={fadeInUp} className="text-3xl">
                    {Math.floor(declinedCount)} +
                  </animated.p>
                </animated.div>
              </div>
            </div>
            {/* Additional dashboard sections */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
function setSuccessMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
