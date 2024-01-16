// Import necessary libraries and components
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import router, { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    requestNo: "",
    date: "",
    department: "",
    reasonOfRequest: "",
    requestFor: "",
    requestedBy: "",
    serviceDetails: "",
    employeeId: "",
    designation: "",
  });

  const [updateData, setUpdateData] = useState({
    requestNo: "",
    date: "",
    department: "",
    reasonOfRequest: "",
    requestFor: "",
    requestedBy: "",
    serviceDetails: "",
    employeeId: "",
    designation: "",
  });

  const [message, setMessage] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the user's data after they log in
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("requestId");

    setRequestId(Number(idParam));
  }, []); // Empty dependency array ensures this effect runs once after component mounts
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("/user/profile");
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/service-requests/${requestId}`,
        updateData
      );
      // console.log(userData);
      setUserData(response.data);
      setMessage("information change successful!");
      // Optionally, you can clear the updateData after a successful update
      setUpdateData({
        requestNo: "",
        date: "",
        department: "",
        reasonOfRequest: "",
        requestFor: "",
        requestedBy: "",
        serviceDetails: "",
        employeeId: "",
        designation: "",
      });
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("information change failed. Please try again.");
    }
  };
  const autofillRequestNo = () => {
    // Auto-generate requestNo based on date, department, and requestedBy
    const generatedRequestNo = `DBL/${updateData.date}/${updateData.department}/${updateData.requestedBy}`;
    setUpdateData((prevDetails) => ({
      ...prevDetails,
      requestNo: generatedRequestNo,
    }));
  };

  useEffect(() => {
    autofillRequestNo();
  }, [updateData.date, updateData.department, updateData.requestedBy]);
  console.log(updateData);
  return (
    <>
      <Navbar />
      <div className="mb-2 flex flex-row items-center">
        <label className="flex flex-none mr-2">Request ID:</label>
        <span className="text-gray-900">
          {requestId !== null ? requestId : "N/A"}
        </span>
      </div>
      <form className="max-w-3xl uppercase mx-auto mt-8 p-4 border">
        <div className="grid  grid-cols-2 gap-4 mb-4">
          <div className="mb-2 flex flex-row items-center">
            <label className="flex flex-none mr-2">request no:</label>
            <input
              type="text"
              name="requestNo"
              id="requestNo"
              value={updateData.requestNo} // Display requestNo
              readOnly
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="flex flex-none mr-2">date:</label>
            <input
              type="date"
              name="date"
              onChange={(e) =>
                setUpdateData({ ...updateData, date: e.target.value })
              }
              value={updateData?.date}
              className=" w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-2 flex flex-row items-center">
            <label className=" flex flex-none mr-2">request by : </label>
            <input
              type="text"
              name="requestedBy"
              onChange={(e) =>
                setUpdateData({ ...updateData, requestedBy: e.target.value })
              }
              value={updateData?.requestedBy}
              className="block w-full  py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="flex flex-none mr-2">request For:</label>
            <input
              type="text"
              name="requestFor"
              onChange={(e) =>
                setUpdateData({ ...updateData, requestFor: e.target.value })
              }
              value={updateData?.requestFor}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-2 flex flex-row items-center">
            <label className="flex flex-none mr-2">department:</label>
            <input
              type="text"
              name="department"
              onChange={(e) =>
                setUpdateData({ ...updateData, department: e.target.value })
              }
              value={updateData?.department}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="flex flex-none mr-2">employee Id:</label>
            <input
              type="text"
              name="employeeId"
              onChange={(e) =>
                setUpdateData({ ...updateData, employeeId: e.target.value })
              }
              value={updateData?.employeeId}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>

        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">designation:</label>
          <input
            type="text"
            name="designation"
            onChange={(e) =>
              setUpdateData({ ...updateData, designation: e.target.value })
            }
            value={updateData?.designation}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">reason Of Request:</label>
          <input
            type="text"
            name="reasonOfRequest"
            onChange={(e) =>
              setUpdateData({ ...updateData, reasonOfRequest: e.target.value })
            }
            value={updateData?.reasonOfRequest}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">service Details:</label>
          <input
            type="text"
            name="serviceDetails"
            onChange={(e) =>
              setUpdateData({ ...updateData, serviceDetails: e.target.value })
            }
            value={updateData?.serviceDetails}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
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
            onClick={handleUpdate}
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
};

export default ProfilePage;
