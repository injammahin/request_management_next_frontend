/**
 * The code is a TypeScript React component that renders a form for submitting a management request and
 * displays the submitted details.
 * @param  - The code is a React functional component that represents a form for submitting a
 * management request. It includes form fields for various details such as request number, date,
 * requested by, department, employee ID, and more. The form also includes validation logic to ensure
 * that all required fields are filled in before submission.
 * @returns The ManagementForm component is being returned.
 */
// // src/app/service-request/form.tsx

// "use client";
// import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import axios from "axios";
// import Navbar from "@/app/components/navigation/page";
// import Link from "next/link";

// interface ManagementFormProps {}

// interface Management {
//   requestNumber: string;
//   subofChange: string;
//   requestedBy: string;
//   date: string;
//   requesterName: string;
//   EmployeeId: string;
//   department: string;
//   contractNo: string;
//   MaintenanceType: string;
//   purposeOfActivity: string;
//   priority: string;
//   impactLevel: string;
//   requiredDowntime: string;
//   mentionDowntime: string;
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   [key: string]: string; // Index signature to allow any additional string properties
// }

// const ManagementForm: React.FC<ManagementFormProps> = ({}) => {
//   const [Management, setManagement] = useState<Management>({
//     requestNumber: "",
//     subofChange: "",
//     requestedBy: "",
//     date: "",
//     requesterName: "",
//     EmployeeId: "",
//     department: "",
//     contractNo: "",
//     MaintenanceType: "",
//     purposeOfActivity: "",
//     priority: "",
//     impactLevel: "",
//     requiredDowntime: "",
//     mentionDowntime: "",
//     startDate: "",
//     startTime: "",
//     endDate: "",
//     endTime: "",
//   });
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [submittedDetails, setSubmittedDetails] = useState<Management | null>(
//     null
//   );

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setManagement((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const autofillRequestNo = () => {
//     // Auto-generate requestNo based on date, department, and requestedBy
//     const generatedRequestNo = `DBL/${Management.date}/${Management.department}/${Management.requestedBy}`;
//     setManagement((prevDetails) => ({
//       ...prevDetails,
//       requestNumber: generatedRequestNo,
//     }));
//   };

//   useEffect(() => {
//     autofillRequestNo();
//   }, [Management.date, Management.department, Management.requestedBy]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const requiredFields = [
//       "requestNumber",
//       "subofChange",
//       "requestedBy",
//       "date",
//       "requesterName",
//       "EmployeeId",
//       "department",
//       "contractNo",
//       "MaintenanceType",
//       "purposeOfActivity",
//       "priority",
//       "impactLevel",
//       "requiredDowntime",
//       "mentionDowntime",
//       "startDate",
//       "startTime",
//       "endDate",
//       "endTime",
//     ];

//     const hasEmptyField = requiredFields.some(
//       (field) => !Management[field] || Management[field].trim() === ""
//     );

//     if (hasEmptyField) {
//       setErrorMessage("Please fill in all the required fields");
//       setSuccessMessage("");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/maintenance/fillup",
//         {
//           ...Management,
//           userId: localStorage.getItem("userId"),
//         }
//       );

//       setSubmittedDetails(Management); // Set submitted details
//       setSuccessMessage("Form submitted successfully");
//       setErrorMessage("");
//       console.log("Form submitted successfully:", response.data);
//     } catch (error) {
//       setErrorMessage("Form submission failed");
//       setSuccessMessage("");
//       console.error("Form submission failed:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md uppercase mx-auto mt-8 p-4 border"
//       >
//         <div className="grid  grid-cols-2 gap-4 mb-4">
//           <div className="relative z-0 mb-2">
//             <label className="block">
//               request no:
//               <input
//                 type="text"
//                 name="requestNo"
//                 id="requestNo"
//                 value={Management.requestNo} // Display requestNo
//                 readOnly
//                 className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               />
//             </label>
//           </div>

//           <div className="relative z-0 mb-2">
//             <label className="block">
//               date:
//               <input
//                 type="date"
//                 name="date"
//                 onChange={handleInputChange}
//                 value={Management.date}
//                 className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               />
//             </label>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="mb-2">
//             <label className="block">
//               requested By:
//               <input
//                 type="text"
//                 name="requestedBy"
//                 onChange={handleInputChange}
//                 value={Management.requestedBy}
//                 className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               />
//             </label>
//           </div>

//           <div className="mb-2">
//             <label className="block">
//               request For:
//               <input
//                 type="text"
//                 name="requestFor"
//                 onChange={handleInputChange}
//                 value={Management.requestFor}
//                 className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               />
//             </label>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="mb-2">
//             <label className="block">
//               department:
//               <input
//                 type="text"
//                 name="department"
//                 onChange={handleInputChange}
//                 value={Management.department}
//                 className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               />
//             </label>
//           </div>

//           <div className="mb-2">
//             <label className="block">
//               employee Id:
//               <input
//                 type="text"
//                 name="employeeId"
//                 onChange={handleInputChange}
//                 value={Management.employeeId}
//                 className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               />
//             </label>
//           </div>
//         </div>

//         <div className="mb-2">
//           <label className="block">
//             designation:
//             <input
//               type="text"
//               name="designation"
//               onChange={handleInputChange}
//               value={Management.designation}
//               className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             />
//           </label>
//         </div>

//         <div className="mb-2">
//           <label className="block">
//             reason Of Request:
//             <input
//               type="text"
//               name="reasonOfRequest"
//               onChange={handleInputChange}
//               value={Management.reasonOfRequest}
//               className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             />
//           </label>
//         </div>

//         <div className="mb-2">
//           <label className="block">
//             service Details:
//             <input
//               type="text"
//               name="serviceDetails"
//               onChange={handleInputChange}
//               value={Management.serviceDetails}
//               className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             />
//           </label>
//         </div>

//         <div className="flex justify-between">
//           <button
//             type="button"
//             className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
//           >
//             <Link href="/dashboard">Back</Link>
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </div>

//         {successMessage && (
//           <p className="text-center text-green-500 mt-2">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="text-center text-red-500 mt-2">{errorMessage}</p>
//         )}
//       </form>

//       {submittedDetails && (
//         <div className="max-w-md uppercase mx-auto mt-8 p-4 border">
//           <h2 className="text-2xl font-semibold mb-4">Submitted Details</h2>
//           <div>
//             <p>
//               <strong>Request No:</strong> {submittedDetails.requestNo}
//             </p>
//             <p>
//               <strong>Date:</strong> {submittedDetails.date}
//             </p>
//             <p>
//               <strong>Requested By:</strong> {submittedDetails.requestedBy}
//             </p>
//             <p>
//               <strong>Request For:</strong> {submittedDetails.requestFor}
//             </p>
//             <p>
//               <strong>Department:</strong> {submittedDetails.department}
//             </p>
//             <p>
//               <strong>Employee Id:</strong> {submittedDetails.employeeId}
//             </p>
//             <p>
//               <strong>Designation:</strong> {submittedDetails.designation}
//             </p>
//             <p>
//               <strong>Reason Of Request:</strong>
//               {submittedDetails.reasonOfRequest}
//             </p>
//             <p>
//               <strong>Service Details:</strong>
//               {submittedDetails.serviceDetails}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagementForm;
