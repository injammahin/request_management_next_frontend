// Import necessary libraries and components
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/signin", {
        email,
        password,
      });

      console.log(response.data);

      if (response.data && response.data.id) {
        setSuccessMessage(response.data.message);

        // Store user information in localStorage
        localStorage.setItem("userId", response.data.email);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("Id", response.data.id);
        localStorage.setItem("userName", response.data.employee_name);
        localStorage.setItem("employeeId", response.data.user_id);
        localStorage.setItem(
          "network",
          response.data.department.department_name
        );
        localStorage.setItem("designation", response.data.designation);
        // Redirect based on user role
        if (response.data.role === "admin") {
          router.push("/dashboard/admin-dashboard");
        } else if (response.data.role === "supervisor") {
          router.push("/dashboard/supervisor-dashboard");
        } else if (response.data.role === "user") {
          router.push("/dashboard/user-dashboard");
        } else if (response.data.role === "superadmin") {
          router.push("/dashboard/admin2-dashboard");
          ///////////////////////////////-applicationuser-management/////////////////////////////////
        } else if (response.data.role === "DHOapplicationusermanagement") {
          router.push("/dashboard/DepartmentHead/DASHBOARD");
          ///////////////////////////////alternative-channels/////////////////////////////////
        } else if (response.data.role === "DHOalternativechannels") {
          router.push(
            "/dashboard/DepartmentHead/AlternativeChannels-dashboard"
          );
          ///////////////////////////////CardsAndATMSystem/////////////////////////////////
        } else if (response.data.role === "DHOcardsandatmsystem") {
          router.push("/dashboard/DepartmentHead/CardsAndATMSystem");
          ///////////////////////////////CorporateApplication/////////////////////////////////
        } else if (response.data.role === "DHOcorporateapplication") {
          router.push("/dashboard/DepartmentHead/CorporateApplication");
          ///////////////////////////////DatabaseAdministration/////////////////////////////////
        } else if (response.data.role === "DHOdatabaseadministration") {
          router.push("/dashboard/DepartmentHead/DatabaseAdministration");
          ///////////////////////////////DataCenterManagement/////////////////////////////////
        } else if (response.data.role === "DHOdatacentermanagement") {
          router.push("/dashboard/DepartmentHead/DataCenterManagement");
          ///////////////////////////////DataCenterPassiveInfrastructure/////////////////////////////////
        } else if (
          response.data.role === "DHOdatacenterpassiveinfrastructure"
        ) {
          router.push(
            "/dashboard/DepartmentHead/DataCenterPassiveInfrastructure"
          );
          ///////////////////////////////HelpDesk/////////////////////////////////
        } else if (response.data.role === "DHOhelpdesk") {
          router.push("/dashboard/DepartmentHead/HelpDesk");
          ///////////////////////////////InitiativesAndProjects/////////////////////////////////
        } else if (response.data.role === "DHOinitiativesandprojects") {
          router.push("/dashboard/DepartmentHead/InitiativesAndProjects");
          ///////////////////////////////ITSecurityAndCompliance/////////////////////////////////
        } else if (response.data.role === "DHOitsecurityandcompliance") {
          router.push("/dashboard/DepartmentHead/ITSecurityAndCompliance");
          ///////////////////////////////MiddlewareAdministration/////////////////////////////////
        } else if (response.data.role === "DHOmiddlewareadministration") {
          router.push("/dashboard/DepartmentHead/MiddlewareAdministration");
          ///////////////////////////////MISAndDataSupport/////////////////////////////////
        } else if (response.data.role === "DHOmisandsatasupport") {
          router.push("/dashboard/DepartmentHead/MISAndDataSupport");
          ///////////////////////////////NetworkManagement/////////////////////////////////
        } else if (response.data.role === "DHOnetworkmanagement") {
          router.push("/dashboard/DepartmentHead/NetworkManagement");
          ///////////////////////////////ProcurementzzAndAssetManagement/////////////////////////////////
        } else if (
          response.data.role === "DHOprocurementzzandassetmanagement"
        ) {
          router.push(
            "/dashboard/DepartmentHead/ProcurementzzAndAssetManagement"
          );
          ///////////////////////////////RetailApplication/////////////////////////////////
        } else if (response.data.role === "DHOretailapplication") {
          router.push("/dashboard/DepartmentHead/RetailApplication");
          ///////////////////////////////ServerAndStorageManagement/////////////////////////////////
        } else if (response.data.role === "DHOserverandstoragemanagement") {
          router.push("/dashboard/DepartmentHead/ServerAndStorageManagement");
          ///////////////////////////////Swift/////////////////////////////////
        } else if (response.data.role === "DHOswift") {
          router.push("/dashboard/DepartmentHead/Swift");
          ///////////////////////////////WindowsSystemManagement/////////////////////////////////
        } else if (response.data.role === "DHOwindowssystemmanagement") {
          router.push("/dashboard/DepartmentHead/WindowsSystemManagement");

          ////////////////////////////
        } else if (response.data.role === "ciso") {
          router.push("/dashboard/ciso-dashboard");
        } else if (response.data.role === "head") {
          router.push("/dashboard/headOfDepartment-dashboard");
        } else {
          // Handle other roles or scenarios
          console.error("Unknown role:", response.data.role);
        }
      } else {
        console.error("Error logging in: User data is undefined");
        setErrorMessage("Failed to login. User data is undefined.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage(
        "Failed to login. Please check your credentials and try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>

          {successMessage && (
            <p className="text-center text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-center text-red-500 mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
