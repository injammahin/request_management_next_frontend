"use client";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:3001/auth/signout");

        await localStorage.clear();

        router.push("/");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error logging out:", error.message);
        } else {
          console.error("Unknown error logging out:", error);
        }
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Logging out...
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
