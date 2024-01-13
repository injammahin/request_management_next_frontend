// Import statements
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading/page";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface UserDetails {
  departments: Department[];
}

interface Department {
  id: number;
  department_id: number;
  department_name: string;
  department_supervisor: string;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the following with your actual API endpoint for user data after login
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("userId")}`,
          },
        });

        const fetchedUserData = response.data as UserDetails;

        setUserData(fetchedUserData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div>
      <Navbar />
      <div className="screen-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white p-8 rounded-lg shadow-md space-y-8">
          {/* ... (existing code) */}

          {/* Display department information */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h1 className="text-lg font-semibold mb-2">
              Department Information
            </h1>
            {userData.departments && userData.departments.length > 0 ? (
              userData.departments.map((department) => (
                <div
                  key={department.id}
                  className="mb-4 bg-white border-b-2 border-gray-300 p-4 relative"
                >
                  {/* Display department information here */}
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">Department ID:</span>{" "}
                    {department.department_id}{" "}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">Department Name:</span>{" "}
                    {department.department_name}{" "}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">Department Supervisor:</span>{" "}
                    {department.department_supervisor}{" "}
                  </p>

                  {/* Include other department details as needed */}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-700">
                No department information found.
              </p>
            )}
          </div>
          {/* ... (existing code) */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
