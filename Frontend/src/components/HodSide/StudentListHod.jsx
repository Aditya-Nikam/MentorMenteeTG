import React, { useState, useEffect } from "react";
import HODNavbar from "./HodNavbar"; // Import the Navbar component
import axios from "axios";

export default function HODStudentList() {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]); // Renamed state variable

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/allStudents'); // Adjust the endpoint as needed
        setStudents(response.data); // Set the fetched data to 'students' state
        setFilteredStudents(response.data); // Initialize filtered students with all data
      } catch (error) {
        console.error('Error fetching students data:', error);
      }
    };
    fetchStudents();
  }, []);

  const filterStudents = () => {
    const filtered = students.filter(
      (student) =>
        (year ? student.year === year : true) &&
        (department ? student.department === department : true) &&
        (searchTerm
          ? student.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <HODNavbar />

      {/* Main Content */}
      <div className="container mx-auto py-8 pl-2 pr-2">
        {/* Filter Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Filter Students
          </h2>
          <div className="space-y-4">
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
            {/* Search Input */}
            <div>
              <label className="block text-gray-600 mb-2">Search by Name</label>
              <input
                type="text"
                className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={filterStudents}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Students List Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Students List
          </h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.year}</td>
                    <td className="px-4 py-2">{student.department}</td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
