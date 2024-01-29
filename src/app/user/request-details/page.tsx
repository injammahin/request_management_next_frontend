"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import { useRouter } from "next/navigation";

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
  submissionDateTime: "";
  superadmin: string;
  approvalStatus: string;
  supervisorStatus: string;
  cisoStatus: string;
  HeadOfDivisionStatus: string;
}

const RequestDetailsPage = () => {
  const [requestDetails, setRequestDetails] = useState<ServiceRequest | null>(
    null
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedRequestDetails = localStorage.getItem("selectedRequestDetails");
    if (storedRequestDetails) {
      setRequestDetails(JSON.parse(storedRequestDetails));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRequestDetails((prevDetails) =>
      prevDetails ? { ...prevDetails, [name]: value } : null
    );
  };
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("./profile");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (requestDetails) {
      try {
        const response = await axios.put(
          `http://localhost:3001/service-requests/${requestDetails.id}`,
          requestDetails
        );
        setMessage("Service request updated successfully!");
      } catch (error) {
        console.error("Error updating service request:", error);
        setMessage("Failed to update service request. Please try again.");
      }
    }
  };

  if (!requestDetails) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar
        userRole={""}
        onMenuToggle={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />

      <form className="max-w-3xl  mx-auto mt-8 p-4 border pt-20">
        <div className="grid  grid-cols-2 gap-4 mb-4">
          <div className="mb-2 flex flex-row items-center">
            <label className=" font-semibold  text-sm flex flex-none mr-2">
              Request No:
            </label>
            <input
              type="text"
              name="requestNo"
              id="requestNo"
              value={requestDetails.requestNo}
              readOnly
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold text-sm flex flex-none mr-2">
              Date:
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={requestDetails.date}
              onChange={handleInputChange}
              className=" w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold  text-sm flex flex-none mr-2">
              Request By : <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="requestedBy"
              id="requestedBy"
              value={requestDetails.requestedBy}
              onChange={handleInputChange}
              className="block w-full  py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold text-sm flex flex-none mr-2">
              Request For:
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="requestFor"
              id="requestFor"
              value={requestDetails.requestFor}
              onChange={handleInputChange}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold  text-sm flex flex-none mr-2">
              Department:
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="department"
              id="department"
              value={requestDetails.department}
              onChange={handleInputChange}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold flex  text-sm flex-none mr-2">
              Employee Id:
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="employeeId"
              id="employeeId"
              value={requestDetails.employeeId}
              onChange={handleInputChange}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            Designation:
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="designation"
            onChange={handleInputChange}
            value={requestDetails.designation}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            Request For Person:
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="reasonOfRequest"
            onChange={handleInputChange}
            value={requestDetails.reasonOfRequest}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            Access Date Duration:
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="accessDateDuration"
            onChange={handleInputChange}
            value={requestDetails.accessDateDuration}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            Access Time Duration:
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="accessTimeDuration"
            onChange={handleInputChange}
            value={requestDetails.accessTimeDuration}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2 ">
            Details of Access/Service:
            <span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            name="serviceDetails"
            onChange={handleInputChange}
            value={requestDetails.serviceDetails}
            className="block w-full py-2.5 px-0  pt-16 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className="grid grid-cols-2  ">
          <div className="mb-2  flex flex-row items-center">
            <label className=" font-semibold flex text-sm flex-none mr-2">
              Change/Execusion/
              <br />
              request ID :
            </label>
            <input
              type="text"
              id="execusion"
              onChange={handleInputChange}
              value={requestDetails.execusion}
              className="block w-[900px]  py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
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
          <input
            type="text"
            name="vandorName"
            onChange={handleInputChange}
            value={requestDetails.vandorName}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            vendor Assigned Reason:
          </label>
          <input
            type="text"
            name="vandorAssignedReason"
            onChange={handleInputChange}
            value={requestDetails.vandorAssignedReason}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="mb-1 flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              Tools/Device
              <br />
              required
            </label>
            <input
              type="text"
              name="deviceRequired"
              onChange={handleInputChange}
              value={requestDetails.deviceRequired}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-1 flex flex-row items-center">
            <label className="font-semibold  text-center flex flex-none text-sm mr-2">
              Device
              <br /> Approved By
            </label>
            <input
              type="text"
              name="deviceApprovedBy"
              onChange={handleInputChange}
              value={requestDetails.deviceApprovedBy}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            Work Team With Id
          </label>
          <input
            type="text"
            name="WorkTeamWithId"
            onChange={handleInputChange}
            value={requestDetails.WorkTeamWithId}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className=" flex flex-row items-center">
          <label className="font-semibold flex flex-none text-sm mr-2">
            Read By
          </label>
          <input
            type="text"
            name="readBy"
            onChange={handleInputChange}
            value={requestDetails.readBy}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="mb-1 flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              Revoke/return date <br /> & time:
            </label>
            <input
              type="text"
              name="ReturnTimeDate"
              onChange={handleInputChange}
              value={requestDetails.ReturnTimeDate}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-1 flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              revoked BY:
            </label>
            <input
              type="text"
              name="revokeBy"
              onChange={handleInputChange}
              value={requestDetails.revokeBy}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
            onClick={handleBackButtonClick}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change information
          </button>
        </div>
        {message && (
          <p className="text-center text-green-500 mt-2">{message}</p>
        )}
      </form>
    </>
  );
  // return (
  //   <div>
  //     <h1>Service Request Details</h1>
  //     {message && <p>{message}</p>}
  //     <form onSubmit={handleSubmit}>
  //       {/* Form fields here */}
  //       <label htmlFor="requestNo">Request No:</label>
  //       <input
  //         type="text"
  //         name="requestNo"
  //         id="requestNo"
  //         value={requestDetails.requestNo}
  //         onChange={handleInputChange}
  //       />
  //       {/* Add other fields similarly */}
  //       {/* Example for another field */}
  //       <label htmlFor="date">Date:</label>
  //       <input
  //         type="date"
  //         name="date"
  //         id="date"
  //         value={requestDetails.date}
  //         onChange={handleInputChange}
  //       />
  //       {/* ... more inputs for other fields ... */}

  //       <button type="submit">Update Service Request</button>
  //     </form>
  //   </div>
  // );
};

export default RequestDetailsPage;
