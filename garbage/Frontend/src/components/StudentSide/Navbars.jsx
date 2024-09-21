import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbars = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [resultDropdown, setResultDropdown] = useState(false);
  const [achievementsDropdown, setAchievementsDropdown] = useState(false);
  const [higherStudiesDropdown, setHigherStudiesDropdown] = useState(false);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest(".dropdown-button")) {
        setProfileDropdown(false);
        setResultDropdown(false);
        setAchievementsDropdown(false);
        setHigherStudiesDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const handleDropdownClick = (e, dropdownSetter) => {
    e.stopPropagation(); // Prevent closing the dropdown when clicking inside
    dropdownSetter((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 shadow-md">
      {" "}
      {/* Changed background color */}
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Header */}
        <div className="flex items-center">
          <img src="/src/assets/logo.png" className="h-12 w-12" />
          <div className="ml-4 text-3xl font-bold flex items-center">
            <span className="text-black">Ment</span> {/* Changed text color */}
            <span className="text-black">ee</span> {/* Changed text color */}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex-grow">
          <div className="flex items-center justify-end space-x-7">
            <Link
              to="/Sdashboard"
              className="text-sm font-semibold text-black hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/StudentD"
              className="text-sm font-semibold text-black hover:text-blue-400"
            >
              Personal Details
            </Link>

            {/* Result Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, setResultDropdown)}
                className="dropdown-button font-semibold text-sm text-black hover:text-blue-400"
              >
                Result
              </button>
              {resultDropdown && (
                <div className="absolute bg-white shadow-lg rounded-md z-10">
                  <Link
                    to="/PYDetails"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Previous Details
                  </Link>
                  <Link
                    to="/CurrentD"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Current Details
                  </Link>
                </div>
              )}
            </div>

            {/* Internships Link */}
            <Link
              to="/Internships"
              className="text-sm font-semibold text-black hover:text-blue-400"
            >
              Internships
            </Link>

            {/* Achievements Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, setAchievementsDropdown)}
                className="dropdown-button text-sm font-semibold text-black hover:text-blue-400"
              >
                Achievements
              </button>
              {achievementsDropdown && (
                <div className="absolute bg-white shadow-lg rounded-md z-10">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Co-curricular Activities
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Extra-curricular Activities
                  </Link>
                </div>
              )}
            </div>

            {/* Higher Studies Dropdown */}
            <div className="relative">
              <button
                onClick={(e) =>
                  handleDropdownClick(e, setHigherStudiesDropdown)
                }
                className="dropdown-button text-sm font-semibold text-black hover:text-blue-400"
              >
                Higher Studies
              </button>
              {higherStudiesDropdown && (
                <div className="absolute bg-white shadow-lg rounded-md z-10">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Entrepreneurship
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Higher Studies
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Placements
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, setProfileDropdown)}
                className="dropdown-button text-lg bg-blue-200 text-black font-semibold px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Profile
              </button>
              {profileDropdown && (
                <div className="absolute bg-white py-2 shadow-lg rounded-md z-10">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-blue-200"
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
