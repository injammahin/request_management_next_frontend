"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-2 border-blue-500 border-b-2  h-12 w-12"></div>
    </div>
  );
};

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();

    const timeout = setTimeout(() => {
      router.push("/");
    }, 1000);

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
