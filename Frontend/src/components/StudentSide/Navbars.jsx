import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbars = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [resultDropdown, setResultDropdown] = useState(false);
  const [achievementsDropdown, setAchievementsDropdown] = useState(false);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest(".dropdown-button")) {
        setProfileDropdown(false);
        setResultDropdown(false);
        setAchievementsDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const handleDropdownClick = (e, dropdownSetter) => {
    e.stopPropagation();
    dropdownSetter((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo and Header */}
        <div className="flex items-center">
          <img src="/src/assets/logo.png" className="h-12 w-12" />
          <div className="ml-4 text-3xl font-bold flex items-center">
            <span className="text-white">Mentee</span> 
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex-grow">
          <div className="flex items-center justify-end space-x-7">
            <Link
              to="/Sdashboard"
              className="text-sm font-semibold text-white hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              to="/StudentD"
              className="text-sm font-semibold text-white hover:text-gray-400"
            >
              Personal Details
            </Link>

            {/* Result Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, setResultDropdown)}
                className="dropdown-button font-semibold text-sm text-white hover:text-gray-400"
              >
                Result
              </button>
              {resultDropdown && (
                <div className="absolute bg-white shadow-lg rounded-md z-10">
                  <Link
                    to="/PYDetails"
                    className="block px-4 py-2 text-sm text-gray-800 hover:opacity-70"
                  >
                    Previous Details
                  </Link>
                  <Link
                    to="/CurrentD"
                    className="block px-4 py-2 text-sm text-gray-800 hover:opacity-70"
                  >
                    Current Details
                  </Link>
                </div>
              )}
            </div>

            {/* Internships Link */}
            <Link
              to="/Internships"
              className="text-sm font-semibold text-white hover:text-gray-400"
            >
              Internships
            </Link>

            {/* Achievements Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, setAchievementsDropdown)}
                className="dropdown-button text-sm font-semibold text-white hover:text-gray-400"
              >
                Achievements
              </button>
              {achievementsDropdown && (
                <div className="absolute bg-white  py-2 px-7 shadow-lg rounded-md z-10">
                  <Link
                    to="/Cocurriact"
                    className="block px-0 py-2 text-sm text-gray-800 hover:opacity-70"
                  >
                    Cocurricular Activities
                  </Link>
                  <Link
                    to="/Extracurriact"
                    className="block px-0 py-2 text-sm text-gray-800 hover:opacity-70"
                  >
                    Extracurricular Activities
                  </Link>
                </div>
              )}
            </div>

            {/* Career Pathways Link (Changed from Dropdown) */}
            <Link
              to="/CareerPath"
              className="text-sm font-semibold text-white hover:text-gray-400"
            >
              Career Pathways
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, setProfileDropdown)}
                className="dropdown-button text-lg bg-white text-gray-800 font-semibold px-4 py-2 rounded-md hover:opacity-50 hover:bg-gray-400"
              >
                Profile
              </button>
              {profileDropdown && (
                <div className="absolute bg-white py-2 shadow-lg rounded-md z-10">
                  <Link
                    to="/StudentD"
                    className="block px-4 py-2 text-sm text-gray-800 hover:opacity-50"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:opacity-70"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbars;
