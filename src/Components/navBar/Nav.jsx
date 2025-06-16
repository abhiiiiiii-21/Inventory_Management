import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-40">
      
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md shadow-inner focus-within:ring-2 focus-within:ring-blue-500">
        <svg
          className="w-5 h-5 text-gray-500 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 15z" />
        </svg>
        <input
          type="text"
          placeholder="Search products, suppliers, orders..."
          className="bg-transparent outline-none w-full text-sm placeholder-gray-500 text-gray-800"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-blue-600 transition duration-200">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <img
          src="./AdminImage.png"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
