// src/app/user/profile/page.tsx

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading/page";

interface UserDetails {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
}

interface ServiceRequest {
  id: number;
  date: string;
  department: string;
  designation: string;
  employeeId: string;
  reasonOfRequest: string;
  requestFor: string;
  requestNo: string;
  requestedBy: string;
  serviceDetails: string;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("id")}`,
          },
        });

        const fetchedUserData = response.data as UserWithServiceRequests;

        // Initialize showFullForm property for each service request
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

  const toggleShowFullForm = (request: ServiceRequest) => {
    // Toggle the showFullForm property for the clicked request
    request.showFullForm = !request.showFullForm;
    setUserData((prevUserData) => {
      if (prevUserData) {
        // If prevUserData is not null, spread its properties and update serviceRequests
        return {
          ...prevUserData,
          serviceRequests: [...prevUserData.serviceRequests!], // Use the non-null assertion operator here
        };
      }
      return null;
    });
  };

  const filteredServiceRequests = userData?.serviceRequests?.filter((request) =>
    request.requestNo.includes(searchQuery)
  );

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/service-requests/${id}`);
      // Update state after successful deletion
      setUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            serviceRequests: prevUserData.serviceRequests?.filter(
              (request) => request.id !== id
            ),
          };
        }
        return null;
      });
    } catch (error) {
      console.error("Error deleting service request:", error);
    }
  };

  if (!userData) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div>
      <Navbar />
      <div className="screen-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Service Request
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <span className="font-bold"> your user ID is :</span>{" "}
              {userData.id}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            {userData.serviceRequests &&
              userData.serviceRequests.length > 0 && (
                <div className="bg-gray-200 p-6 rounded-lg">
                  <h1 className="text-lg font-semibold mb-2">
                    {" "}
                    search your requested form
                  </h1>
                  <input
                    type="text"
                    placeholder="Search by Request No"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 mb-4"
                  />
                  {filteredServiceRequests &&
                  filteredServiceRequests.length > 0 ? (
                    filteredServiceRequests.map((request) => (
                      <div
                        key={request.id}
                        className="mb-4 bg-white border-b-2 border-gray-300 p-4 relative"
                      >
                        <p className="text-sm text-gray-900">
                          <span className="font-bold">Request No:</span>{" "}
                          {request.requestNo}{" "}
                        </p>
                        {request.showFullForm && (
                          <>
                            <ul>
                              <li>
                                {/* Include the other details here */}
                                <p className="text-sm text-gray-900 ">
                                  <span className="font-bold">Date:</span>{" "}
                                  {request.date} |{" "}
                                  <span className="font-bold">Department:</span>{" "}
                                  {request.department}|{" "}
                                  <span className="font-bold">
                                    Designation:
                                  </span>{" "}
                                  {request.designation} |{" "}
                                  <span className="font-bold">
                                    Employee Id:
                                  </span>{" "}
                                  {request.employeeId} |{" "}
                                  <span className="font-bold">
                                    Reason of Request:
                                  </span>{" "}
                                  {request.reasonOfRequest} |{" "}
                                  <span className="font-bold">
                                    Request For:
                                  </span>{" "}
                                  {request.requestFor} |{" "}
                                  <span className="font-bold">
                                    Requested By:
                                  </span>{" "}
                                  {request.requestedBy} |{" "}
                                  <span className="font-bold">
                                    Service Details:
                                  </span>{" "}
                                  {request.serviceDetails}
                                </p>
                              </li>
                            </ul>
                          </>
                        )}
                        <div>
                          <button
                            onClick={() => toggleShowFullForm(request)}
                            className="bg-green-600 rounded-lg h-8 w-30 hover:underline text-white absolute top-2 right-2"
                          >
                            {request.showFullForm ? "Show Less" : "Show More"}

                            <a
                              onClick={() => handleDelete(request.id)}
                              className=" bg-red-600 rounded-lg h-8 w-30 hover:underline text-white absolute top-2 right-20"
                            >
                              Delete
                            </a>
                          </button>
                          <button>
                            <a
                              href="/user/updatedata"
                              className="block w-full text-center bg-blue-600 text-white rounded-lg h-8 w-30 hover:underline"
                            >
                              Edit Profile
                            </a>
                          </button>
                          <br />
                          {/* Add the delete button */}
                        </div>
                      </div>
                    ))
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
                type="submit"
                className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
              >
                <Link href="/dashboard">Back</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
