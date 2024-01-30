// src/app/user/profile/page.tsx

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import LoadingSpinner from "@/app/components/loading/page";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
}

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
  approvalStatus: string;
  supervisorStatus: string;
  cisoStatus: string;
  HeadOfDivisionStatus: string;
  showFullForm: boolean;
}

interface UserWithServiceRequests extends UserDetails {
  serviceRequests?: ServiceRequest[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserWithServiceRequests | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("../dashboard/user-dashboard");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(localStorage.getItem("userId"));

        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("userId")}`,
          },
        });

        const fetchedUserData = response.data as UserWithServiceRequests;

        fetchedUserData.serviceRequests?.forEach((request) => {
          request.showFullForm = false;
        });

        setUserData(fetchedUserData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (request: ServiceRequest) => {
    localStorage.setItem("selectedRequestDetails", JSON.stringify(request));
    window.location.href = "/user/request-details"; // Change to your details page path
  };
  const toggleShowFullForm = (request: ServiceRequest) => {
    setUserData((prevUserData) => {
      if (prevUserData) {
        const updatedRequests = prevUserData.serviceRequests?.map((r) =>
          r.id === request.id ? { ...r, showFullForm: !r.showFullForm } : r
        );
        return { ...prevUserData, serviceRequests: updatedRequests };
      }
      return null;
    });
  };

  const filteredServiceRequests = userData?.serviceRequests?.filter((request) =>
    request.requestNo.includes(searchQuery)
  );

  const toggleDeleteConfirmation = (requestId: number | null) => {
    setSelectedRequestId(requestId);
    setIsDeleteConfirmationOpen((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    toggleDeleteConfirmation(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/service-requests/${selectedRequestId}`
      );
      setUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            serviceRequests: prevUserData.serviceRequests?.filter(
              (request) => request.id !== selectedRequestId
            ),
          };
        }
        return null;
      });
    } catch (error) {
      console.error("Error deleting service request:", error);
    } finally {
      toggleDeleteConfirmation(null);
    }
  };
  const handleEditServiceRequest = (id: number) => {
    router.push(`/user/updatedata?requestId=${id}`);
  };
  const cancelDelete = () => {
    toggleDeleteConfirmation(null);
  };
  const handleDownloadPDF = (id: number) => {
    if (userData) {
      const selectedRequest = userData.serviceRequests?.find(
        (request) => request.id === id
      );

      if (selectedRequest) {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");

        const lineHeight = 10;
        let currentY = 20;

        // Function to draw text within a box, handling multiple fields
        const drawBoxedText = (
          labelsAndTexts: any[],
          y: number,
          isSingleLine = true
        ) => {
          const boxWidth = isSingleLine ? 180 : 90; // Adjusted for half-width boxes
          labelsAndTexts.forEach((item, index) => {
            const offsetX = isSingleLine ? 15 : 15 + index * 90; // Adjusting X position for second box on the same line
            pdf.rect(offsetX, y, boxWidth, lineHeight); // x, y, width, height
            pdf.text(`${item.label}: ${item.text}`, offsetX + 5, y + 5); // adding padding for x and y
          });
        };

        // Drawing boxes with text
        drawBoxedText(
          [
            { label: "Request No", text: selectedRequest.requestNo },
            { label: "Date", text: selectedRequest.date },
          ],
          currentY,
          false
        );
        currentY += lineHeight;

        drawBoxedText(
          [
            { label: "Requested By", text: selectedRequest.requestedBy },
            { label: "Request For", text: selectedRequest.requestFor },
          ],
          currentY,
          false
        );
        currentY += lineHeight;

        drawBoxedText(
          [
            { label: "Department", text: selectedRequest.department },
            { label: "Employee Id", text: selectedRequest.employeeId },
          ],
          currentY,
          false
        );
        currentY += lineHeight;

        // Individual lines
        drawBoxedText(
          [{ label: "Designation", text: selectedRequest.designation }],
          currentY
        );
        currentY += lineHeight;
        drawBoxedText(
          [
            {
              label: "Reason of Request",
              text: selectedRequest.reasonOfRequest,
            },
          ],
          currentY
        );
        currentY += lineHeight;
        drawBoxedText(
          [{ label: "Service Details", text: selectedRequest.serviceDetails }],
          currentY
        );
        currentY += lineHeight;

        // Approval statuses in one line
        drawBoxedText(
          [
            {
              label: "Supervisor Status",
              text: selectedRequest.supervisorStatus,
            },
            { label: "CISO Status", text: selectedRequest.cisoStatus },
          ],
          currentY,
          false
        );
        currentY += lineHeight;
        drawBoxedText(
          [
            {
              label: "Head Of Division",
              text: selectedRequest.HeadOfDivisionStatus,
            },
            { label: "Approval Status", text: selectedRequest.approvalStatus },
          ],
          currentY,
          false
        );
        currentY += lineHeight;
        pdf.save(`service_request_${id}.pdf`);
      }
    }
  };

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };
  const determineOverallStatus = (request: {
    supervisorStatus: string;
    approvalStatus: string;
    cisoStatus: string;
    HeadOfDivisionStatus: string;
  }) => {
    const isApproved =
      request.supervisorStatus === "Released" &&
      request.approvalStatus === "approve" &&
      request.cisoStatus === "approveed" &&
      request.HeadOfDivisionStatus === "confirm";

    return isApproved ? "Approved" : "On Process";
  };

  if (!userData) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[200px]" : ""
        }`}
      >
        <div className="w-full pt-16  bg-white p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Service Request
            </h2>
          </div>
          <div className="space-y-4">
            {/* <p className="text-sm text-gray-700">
              <span className="font-bold">Your user ID is:</span> {userData.id}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Email:</span> {userData.email}
            </p> */}
            {userData.serviceRequests &&
              userData.serviceRequests.length > 0 && (
                <div className="bg-gray-200 p-6 rounded-lg">
                  <h1 className="text-lg font-semibold mb-2">
                    Search your requested form
                  </h1>
                  <input
                    type="text"
                    placeholder="Search by Request No"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-[1px] p-2 mb-4"
                  />
                  {filteredServiceRequests &&
                  filteredServiceRequests.length > 0 ? (
                    <div className=" ">
                      <table className=" w-auto border-collapse   border border-gray-600">
                        <thead>
                          <tr>
                            <th className="border-[1px] px-56  border-gray-600">
                              Request No
                            </th>

                            <th className="border-[1px] p-2 border-gray-600">
                              Status
                            </th>
                            {/* <th className="border-1 p-2 border-gray-600">
                              Show More
                            </th> */}
                            <th className="border-[1px] p-2 border-gray-600">
                              Delete
                            </th>
                            <th className="border-[1px] p-2 border-gray-600">
                              Edit
                            </th>
                            <th className="border-[1px] p-2 border-gray-600">
                              Download
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredServiceRequests.map((request) => (
                            <React.Fragment key={request.id}>
                              <tr>
                                <td className=" flex border-[1px] p-2 border-gray-600">
                                  {request.requestNo} |{" "}
                                  {request.reasonOfRequest.slice(0, 30)}
                                  {" ....."}
                                  <td className=" p-2 border-gray-600">
                                    <button
                                      onClick={() =>
                                        toggleShowFullForm(request)
                                      }
                                      className="bg-[#43766C] rounded-lg h-6 w-24 hover:underline text-white"
                                    >
                                      {request.showFullForm
                                        ? "Show Less"
                                        : "Show More"}
                                    </button>
                                  </td>
                                </td>
                                <td className="border-[1px] p-2 border-gray-600">
                                  {determineOverallStatus(request)}
                                </td>
                                {/* <td className="border-[1px] p-2 border-gray-600">
                                  <button
                                    onClick={() => toggleShowFullForm(request)}
                                    className="bg-[#43766C] rounded-lg h-6 w-24 hover:underline text-white"
                                  >
                                    {request.showFullForm
                                      ? "Show Less"
                                      : "Show More"}
                                  </button>
                                </td> */}
                                <td className="border-[1px]   p-2 border-gray-600">
                                  <button
                                    onClick={() => handleDelete(request.id)}
                                    className="bg-[#9A031E] rounded-lg h-6 w-24 hover:underline text-white"
                                  >
                                    Delete
                                  </button>
                                </td>
                                <td className="border-[1px] p-2 border-gray-600">
                                  {/* <button
                                    onClick={() =>
                                      handleEditServiceRequest(request.id)
                                    }
                                    className="bg-[#4CB9E7] rounded-lg h-8 w-28 text-white"
                                  >
                                    Edit
                                  </button> */}
                                  <button
                                    onClick={() => handleDetailsClick(request)}
                                    className="bg-[#4CB9E7] rounded-lg h-6 w-24 text-white"
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td className="border-[1px] p-2 border-gray-600">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDownloadPDF(request.id)
                                    }
                                    className="bg-green-500 text-white h-6 w-28 rounded hover:bg-green-700"
                                  >
                                    PDF
                                  </button>
                                </td>
                              </tr>
                              {request.showFullForm && (
                                <div>
                                  <table className="w-full  bg-gray-100">
                                    <tbody>
                                      <tr>
                                        {/* Request No and Date in one row */}
                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              {" "}
                                              Request No:
                                            </label>{" "}
                                            {request.requestNo}
                                          </div>
                                        </td>

                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              Date:
                                            </label>{" "}
                                            {request.date}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Request No and Date in one row */}
                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              Requested By:{" "}
                                            </label>
                                            {request.requestedBy}
                                          </div>
                                        </td>

                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              Request For:{" "}
                                            </label>
                                            {request.requestFor}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Request No and Date in one row */}
                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              Department:{" "}
                                            </label>
                                            {request.department}
                                          </div>
                                        </td>

                                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              Employee Id:{" "}
                                            </label>
                                            {request.employeeId}
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
                                            <label className="font-semibold">
                                              Designation:{" "}
                                            </label>
                                            {request.designation}
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
                                            <label className="font-semibold">
                                              Request For Persons:{" "}
                                            </label>
                                            {request.reasonOfRequest}
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
                                            <label className="font-semibold">
                                              Access Date Duration:{" "}
                                            </label>
                                            {request.accessDateDuration}
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
                                            <label className="font-semibold">
                                              Access Time Duration:{" "}
                                            </label>
                                            {request.accessTimeDuration}
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
                                            <label className="font-semibold">
                                              Reason Of Request :{" "}
                                            </label>
                                            {request.reasonOfRequest}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Service Details in a separate row */}
                                        <td
                                          colSpan={2}
                                          className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                                        >
                                          <div className=" text-sm text-gray-900">
                                            <label className="font-semibold">
                                              Service Details:
                                            </label>
                                            {request.serviceDetails}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {/* Service Details in a separate row */}
                                        <td
                                          colSpan={2}
                                          className="border-[1px] border-b-1 py-2 px-4 text-center border-gray-600"
                                        >
                                          <div className="font-semibold text-sm text-gray-900">
                                            show all approval status
                                            {/* {request.id} */}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        <tr className="flex">
                                          <td
                                            colSpan={1}
                                            className="py-2 px-4"
                                            style={{
                                              borderBottom: "8px solid",
                                              borderColor:
                                                request.supervisorStatus ===
                                                "Released"
                                                  ? "#294B29"
                                                  : "#D24545",
                                            }}
                                          >
                                            <div className=" text-sm text-gray-900">
                                              <label className="font-semibold mr-10 underline">
                                                Team Lead{" "}
                                              </label>
                                              {request.supervisorStatus}
                                            </div>
                                          </td>

                                          <td
                                            colSpan={1}
                                            className="py-2 px-4"
                                            style={{
                                              borderBottom: "8px solid",
                                              borderColor:
                                                request.approvalStatus ===
                                                "approve"
                                                  ? "#294B29"
                                                  : "#D24545",
                                            }}
                                          >
                                            <div className=" text-sm text-gray-900">
                                              <label className="font-semibold mr-10 underline ">
                                                Head of Ifra/App{" "}
                                              </label>

                                              {request.approvalStatus}
                                            </div>
                                          </td>

                                          <td
                                            colSpan={1}
                                            className="py-2 px-4"
                                            style={{
                                              borderBottom: "8px solid",
                                              borderColor:
                                                request.cisoStatus ===
                                                "approveed"
                                                  ? "#294B29"
                                                  : "#D24545",
                                            }}
                                          >
                                            <div className=" text-sm text-gray-900">
                                              <label className="font-semibold  mr-10 underline">
                                                CISO
                                              </label>{" "}
                                              {request.cisoStatus}
                                            </div>
                                          </td>

                                          <td
                                            colSpan={1}
                                            className="py-2 px-4 pt-2"
                                            style={{
                                              borderBottom: "8px solid",
                                              borderColor:
                                                request.HeadOfDivisionStatus ===
                                                "confirm"
                                                  ? "#294B29"
                                                  : "#D24545",
                                            }}
                                          >
                                            <div className=" text-sm text-gray-900">
                                              <label className="font-semibold mr-10  underline">
                                                Head of Division{" "}
                                              </label>{" "}
                                              {request.HeadOfDivisionStatus}
                                            </div>
                                          </td>
                                        </tr>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">
                      No matching service requests found.
                    </p>
                  )}
                </div>
              )}
          </div>
          <div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
                onClick={handleBackButtonClick}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this request?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
