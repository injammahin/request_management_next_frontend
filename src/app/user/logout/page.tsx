"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform logout logic here, such as destroying the session

    // Clear local storage data
    localStorage.clear();

    // Redirect the user to another page after logout (e.g., the home page)
    router.push("/");
  }, []);

  return (
    <div>
      <p>Logging out...</p>
      {/* You can add a spinner or any loading indication here */}
    </div>
  );
};

export default LogoutPage;
