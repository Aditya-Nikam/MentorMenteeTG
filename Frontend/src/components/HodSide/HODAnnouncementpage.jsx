import React, { useState, useEffect } from "react";
import HODNavbar from "./HodNavbar";
import axios from "axios";

export default function HODAnnouncementPage() {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/allStudents"); // Adjust the endpoint as needed
        setStudentsData(response.data); // Set the fetched data to 'students' state
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };
    fetchStudents();
  }, []); // Fetch student data only once when the component mounts

  useEffect(() => {
    const filterStudents = () => {
      const filtered = studentsData.filter(
        (student) =>
          (year ? student.year === year : true) &&
          (department ? student.department === department : true)
      );
      setFilteredStudents(filtered);
    };

    filterStudents();
  }, [year, department, studentsData]); // Re-run filtering when year, department, or studentsData changes

  const handleSendAnnouncement = () => {
    if (announcement.trim() === "") {
      alert("Please enter an announcement message.");
      return;
    }

    if (filteredStudents.length === 0) {
      alert("No students found for the selected year and branch.");
      return;
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <HODNavbar />

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Make an Announcement
        </h1>

        {/* Filter Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Select Year and Department
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Select Year</label>
              <select
                className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Select Department
              </label>
              <select
                className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Announcement Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Write Announcement
          </h2>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="5"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Write your announcement here..."
          />

          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSendAnnouncement}
          >
            Send Announcement
          </button>
        </div>

        {/* Display Filtered Students */}
        {filteredStudents.length > 0 && (
          <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Announcement will be sent to the following students:
            </h2>
            <ul className="list-disc pl-6">
              {filteredStudents.map((student) => (
                <li key={student.id}>
                  {student.name} ({student.department}, {student.year})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
