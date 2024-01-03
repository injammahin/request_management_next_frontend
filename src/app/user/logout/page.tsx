"use client"; // Import necessary libraries
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Create a LoadingSpinner component
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-2 border-blue-500 border-b-2 border-gray-500 h-12 w-12"></div>
    </div>
  );
};

// LogoutPage component with the LoadingSpinner
const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform logout logic here, such as destroying the session

    // Clear local storage data
    localStorage.clear();

    // Simulate a delay for demonstration purposes (you can remove this in production)
    const timeout = setTimeout(() => {
      // Redirect the user to another page after logout (e.g., the home page)
      router.push("/");
    }, 2000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      <p className="text-center">Logging out...</p>
      <LoadingSpinner />
    </div>
  );
};

export default LogoutPage;
