import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="./dhaka_bank_logo.png"
            alt="Logo"
            className=" h-12 w-max mr-2"
          />
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/dashboard" className="text-white">
            Home
          </Link>

          <Link href="/about" className="text-white">
            About Us
          </Link>
        </div>

        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
