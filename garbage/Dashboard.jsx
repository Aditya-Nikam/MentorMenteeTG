import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import {
  faUser,
  faGraduationCap,
  faBriefcase,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import authService from "../Frontend/src/services/authService";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.getUser()) {
      navigate("/userInfo");
    }
  }, [navigate]);

  function goToPersonalD() {
    navigate("/PersonalD");
  }

  function goToInternships() {
    navigate("/Internships");
  }

  function goToStudentAchievement() {
    navigate("/StudentAchievement");
  }

  function goToCGPA() {
    navigate("/CGPA");
  }

  return (
    <div className="relative">
      <nav className="bg-violet-900 text-white p-4 flex items-center">
        <div className="container mx-auto flex items-center">
          {/* Logo */}
          <div className="flex items-center mr-8">
            <img src="/src/assets/logo.png" alt="Logo" className="h-20 w-38" />
          </div>

          {/* Navigation Links */}
          <ul className="flex justify-center space-x-4">
            <li>
              <Link
                to="/PersonalD"
                className="hover:underline flex items-center"
                onClick={goToPersonalD}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Personal Information
              </Link>
            </li>
            <li>
              <Link
                to="/CGPA"
                className="hover:underline flex items-center"
                onClick={goToCGPA}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                CGPA
              </Link>
            </li>
            <li>
              <Link
                to="/Internships"
                className="hover:underline flex items-center"
                onClick={goToInternships}
              >
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                Internships
              </Link>
            </li>
            <li>
              <Link
                to="/StudentAchievement"
                className="hover:underline flex items-center"
                onClick={goToStudentAchievement}
              >
                <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                Achievements
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
