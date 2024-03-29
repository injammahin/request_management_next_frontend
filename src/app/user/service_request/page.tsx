// src/app/service-request/form.tsx

"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RequestServiceFormProps {}

interface ServiceDetails {
  requestNo: string;
  date: string;
  requestedBy: string;
  requestFor: string;
  department: string;
  employeeId: string;
  designation: string;
  reasonOfRequest: string;
  reasonOfRequested: string;
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
  execusiondata: string;
  deviceApprovedBy: string;
  submissionDateTime: "";
  superadmin: string;
  [key: string]: string; // Index signature to allow any additional string properties
}

const RequestServiceForm: React.FC<RequestServiceFormProps> = ({}) => {
  const [vendorNames, setVendorNames] = useState<string[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState("");
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    requestNo: "",
    date: "",
    requestedBy: localStorage.getItem("userName") || "",
    requestFor: "",
    department: localStorage.getItem("network") || "",
    employeeId: localStorage.getItem("employeeId") || "",
    designation: localStorage.getItem("designation") || "",
    reasonOfRequest: "",
    reasonOfRequested: "",
    serviceDetails: "",
    user: "",
    submissionDateTime: "",
    accessDateDuration: "",
    accessTimeDuration: "",
    execusiondata: "",
    vandorName: "",
    vandorAssignedReason: "",
    deviceRequired: "",
    WorkTeamWithId: "",
    readBy: "",
    ReturnTimeDate: "",
    revokeBy: "",

    deviceApprovedBy: "",
    superadmin: localStorage.getItem("superadmin") || "",
    subadmin: localStorage.getItem("subadmin") || "",
    ciso: localStorage.getItem("ciso") || "",
    head: localStorage.getItem("head") || "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedDetails, setSubmittedDetails] =
    useState<ServiceDetails | null>(null);
  const currentDateTime = new Date().toLocaleString();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headRole, setHeadRole] = useState("");
  const router = useRouter();

  // This function will be called by the Navbar component
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const autofillRequestNo = () => {
    // Auto-generate requestNo based on date, department, and requestedBy
    const generatedRequestNo = `DBL/${serviceDetails.date}/${serviceDetails.department}/${serviceDetails.employeeId}/01`;
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      requestNo: generatedRequestNo,
    }));
  };

  ///// fetch verdor name////////
  useEffect(() => {
    const fetchVendorNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/vendor/all-vendors"
        );
        setVendorNames(response.data);
      } catch (error) {
        console.error("Failed to fetch vendor names:", error);
      }
    };

    fetchVendorNames();
  }, []);

  useEffect(() => {
    autofillRequestNo();
  }, [
    serviceDetails.date,
    serviceDetails.department,
    serviceDetails.requestedBy,
  ]);
  const handleBackButtonClick = () => {
    router.push("../dashboard/user-dashboard");
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "date",
      "requestedBy",
      "requestFor",
      "department",
      "employeeId",
      "designation",
      "reasonOfRequest",

      "serviceDetails",
      "accessDateDuration",
      "accessTimeDuration",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !serviceDetails[field] || serviceDetails[field].trim() === ""
    );

    if (hasEmptyField) {
      setErrorMessage("Please fill in all the required fields");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/service-requests/fillup",
        {
          ...serviceDetails,
          userId: localStorage.getItem("Id"),
          user: localStorage.getItem("Id"),
          Userid: localStorage.getItem("Id"),
          submissionDateTime: currentDateTime,
        }
      );
      console.log(currentDateTime);

      setSubmittedDetails(serviceDetails); // Set submitted details
      setSuccessMessage("Form submitted successfully");
      setErrorMessage("");
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      setErrorMessage("Form submission failed");
      setSuccessMessage("");
      console.error("Form submission failed:", error);
    }
    // Set form submission status to true
    setIsFormSubmitted(true);
    setSubmissionTime(new Date().toLocaleTimeString());
    // Automatically hide the pop-up after 3 seconds
    setTimeout(() => {
      setIsFormSubmitted(false);
      // Redirect to home page
      router.push("./profile");
    }, 2500);
  };
  interface Roles {
    [key: string]: string[]; // Define the structure of your roles data
  }
  const [roles, setRoles] = useState<Roles>({}); // Use the Roles interface for typing the state

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/all-roles"
        );
        setRoles(response.data);
        console.log(response.data);
        if (response.data.superadmin) {
          localStorage.setItem("superadmin", response.data.superadmin);
        }
        if (response.data.subadmin) {
          localStorage.setItem("subadmin", response.data.subadmin);
        }
        if (response.data.ciso) {
          localStorage.setItem("ciso", response.data.ciso);
        }
        if (response.data.head) {
          localStorage.setItem("head", response.data.head);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-20 ${
          isMenuOpen ? "translate-x-[120px]" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-[1000px] pt-10  mx-auto mt-8 border"
        >
          <div className="grid  grid-cols-2 gap-4 ">
            <div className=" flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Request No:
                {/* <span style={{ color: "red" }}>*</span> */}
              </label>
              <input
                type="text"
                name="requestNo"
                id="requestNo"
                value={serviceDetails.requestNo} // Display requestNo
                readOnly
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className=" flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                Date:
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="date"
                onChange={handleInputChange}
                value={serviceDetails.date}
                className=" w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="mb-2 flex flex-row items-center">
              <label className=" font-semibold flex text-sm flex-none mr-2">
                Request By :{/* <span style={{ color: "red" }}>*</span> */}
              </label>
              <input
                type="text"
                name="requestedBy"
                // onChange={handleInputChange}
                readOnly
                value={serviceDetails.requestedBy}
                className="block w-full  py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className=" flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                Request For:
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="requestFor"
                onChange={handleInputChange}
                value={serviceDetails.requestFor}
                className="block w-full py-2.5 px-2 text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-20 "
              >
                <option value="">( select )</option>
                <option value="Access">Access</option>
                <option value="Mahin">Service Request</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="mb-1 flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                Department:
                {/* <span style={{ color: "red" }}>*</span> */}
              </label>
              <input
                type="text"
                name="department"
                //onChange={handleInputChange}
                readOnly
                value={serviceDetails.department}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className="mb-1 flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                Employee Id:
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="employeeId"
                //onChange={handleInputChange}
                readOnly
                value={serviceDetails.employeeId}
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
              readOnly
              value={serviceDetails.designation}
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
              value={serviceDetails.reasonOfRequest}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          <div className=" flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              Access Date Duration:
              <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="accessDateDuration"
              onChange={handleInputChange}
              value={serviceDetails.accessDateDuration}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">( select )</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="continous">1 year (Continous)</option>
            </select>
          </div>
          <div className=" flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              Access Time Duration:
              <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="accessTimeDuration"
              onChange={handleInputChange}
              value={serviceDetails.accessTimeDuration}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">( select )</option>
              <option value="30 mins"> 30 mins</option>
              <option value="1 hours">1 hour</option>
              <option value="3 hours">3 hours</option>
              <option value="6 hours">6 hours</option>
              <option value="12 hours">12 hours</option>
              <option value="continous">12+ ( continous )</option>
            </select>
          </div>
          <div className="grid grid-cols-2">
            <div></div>
            <div className=" flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2 ">
                reason of request:
                <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                name="reasonOfRequested"
                onChange={handleInputChange}
                value={serviceDetails.reasonOfRequested}
                className="block w-full py-2.5 px-0   text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className=" flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2 ">
              Details of Access/Service
              <span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="serviceDetails"
              onChange={handleInputChange}
              value={serviceDetails.serviceDetails}
              className="block w-full py-2.5 px-0  pt-12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className=" flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2 ">
              execusion
              <span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="execusiondata"
              id="execusiondata"
              onChange={handleInputChange}
              value={serviceDetails.execusiondata}
              className="block w-full py-2.5 px-0   text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          <div className=" flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              Vendor Name:
            </label>
            <select
              name="vandorName"
              id="vandorName"
              onChange={handleInputChange}
              value={serviceDetails.vandorName}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">( select )</option>
              {vendorNames.map((vendorName) => (
                <option key={vendorName} value={vendorName}>
                  {vendorName}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              vendor Assigned Reason:
            </label>
            <input
              type="text"
              name="vandorAssignedReason"
              id="vandorAssignedReason"
              onChange={handleInputChange}
              value={serviceDetails.vandorAssignedReason}
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
                id="deviceRequired"
                onChange={handleInputChange}
                value={serviceDetails.deviceRequired}
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
                id="deviceApprovedBy"
                onChange={handleInputChange}
                value={serviceDetails.deviceApprovedBy}
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
              id="WorkTeamWithId"
              onChange={handleInputChange}
              value={serviceDetails.WorkTeamWithId}
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
              id="readBy"
              onChange={handleInputChange}
              value={serviceDetails.readBy}
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
                id="ReturnTimeDate"
                onChange={handleInputChange}
                value={serviceDetails.ReturnTimeDate}
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
                id="revokeBy"
                onChange={handleInputChange}
                value={serviceDetails.revokeBy}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className="grid grid-cols-4  border-2 gap-4 bg-gray-300 mb-10  p-4">
            {/* Column 1 */}
            <div className="  text-center">
              <input
                type="text"
                name="revokeBy"
                // onChange={handleInputChange}
                readOnly
                value={serviceDetails.subadmin}
                className="block w-full py-2.5 px-0 text-lg underline underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label className="font-semibold flex flex-none text-sm mr-2  mx-6 ">
                ( Applicant Team leader )
              </label>
            </div>

            {/* Column 2 */}

            <div className="text-center">
              <select
                name="headRole"
                value={headRole}
                onChange={(e) => {
                  setHeadRole(e.target.value);
                  if (e.target.value === "Head of Irfa") {
                    setServiceDetails({
                      ...serviceDetails,
                      superadmin: "superadmin",
                    });
                  } else {
                    setServiceDetails({ ...serviceDetails, superadmin: "" });
                  }
                }}
                className="block w-full py-2.5 px-0 text-center text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="">( Select )</option>
                <option value="Head of Irfa">Mohammed Istiaq Parvez</option>
                <option value="Head of App">Mirza Faysal</option>
              </select>
              <label className="font-semibold text-sm mr-2 mx-6">
                ( Select Head Of Irfa/App )
              </label>
            </div>

            {/* Column 4 */}
            <div className="  items-center">
              <input
                type="text"
                name="revokeBy"
                // onChange={handleInputChange}
                readOnly
                value={serviceDetails.ciso}
                className="block w-full py-2.5 px-0 text-lg  underline underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
              />
              <label className="font-semibold flex flex-none text-sm mr-2 mx-[85px]">
                (CISO)
              </label>
            </div>

            {/* Column 5 */}
            <div className="  text-center">
              <input
                type="text"
                name="revokeBy"
                // onChange={handleInputChange}
                readOnly
                value={serviceDetails.head}
                className="block w-full py-2.5 px-0 text-lg underline underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label className="font-semibold flex flex-none mx-10   text-sm mr-2">
                ( Head Of Division )
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="bg-gray-800 text-white p-2 w-28 h-9 rounded hover:bg-gray-700 flex items-center"
                onClick={handleBackButtonClick}
              >
                <img
                  src="/back.svg"
                  alt="Delete Icon"
                  className="h-8 w-8 mr-2"
                />
                <span>back</span>
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

          {successMessage && (
            <p className="text-center text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-center text-red-500 mt-2">{errorMessage}</p>
          )}
        </form>
        {isFormSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Form submitted successfully at:{submissionTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestServiceForm;
