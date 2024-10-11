import React, { useState, useEffect } from "react";
import StudentListHod from "./StudentListHod";
import { Link } from "react-router-dom";
import HODNavbar from "./HodNavbar";

// Sample data for students and mentors
const studentsData = [
  { id: 1, name: "John Doe", year: "2023", department: "CSE" },
  { id: 2, name: "Jane Smith", year: "2023", department: "ECE" },
  { id: 3, name: "Alice Johnson", year: "2024", department: "CSE" },
  { id: 4, name: "Alice Johnson", year: "2024", department: "CSE" },
  { id: 5, name: "Alice Johnson", year: "2024", department: "CSE" },
  { id: 6, name: "Alice Johnson", year: "2024", department: "CSE" },
  { id: 7, name: "Alice Johnson", year: "2024", department: "CSE" },
];

const mentorsData = [
  { id: 1, name: "Mentor A" },
  { id: 2, name: "Mentor B" },
  { id: 3, name: "Mentor C" },
];

export default function HODDashboard() {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [mentorAssignments, setMentorAssignments] = useState({});
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState({});

  useEffect(() => {
    const filtered = studentsData.filter(
      (student) =>
        (year ? student.year === year : true) &&
        (department ? student.department === department : true)
    );
    setFilteredStudents(filtered);
  }, [year, department]);

  const handleMentorAssignment = (studentId) => {
    if (!selectedMentor) return;
    setMentorAssignments((prevAssignments) => ({
      ...prevAssignments,
      [selectedMentor.id]: [
        ...(prevAssignments[selectedMentor.id] || []),
        studentId,
      ],
    }));
    setAssignedStudents((prevAssigned) => ({
      ...prevAssigned,
      [studentId]: selectedMentor.name,
    }));
  };

  const handleRemoveAssignment = (studentId, mentorId) => {
    setMentorAssignments((prevAssignments) => ({
      ...prevAssignments,
      [mentorId]: prevAssignments[mentorId].filter((id) => id !== studentId),
    }));
    setAssignedStudents((prevAssigned) => {
      const updatedAssigned = { ...prevAssigned };
      delete updatedAssigned[studentId];
      return updatedAssigned;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Navbar */}
      <HODNavbar />

      {/* Main Content */}
      <div className="container mx-auto py-8 pl-2 pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filter Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
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
            </div>
          </div>

          {/* Mentor Selection */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Select a Mentor
            </h2>
            <select
              className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMentor ? selectedMentor.id : ""}
              onChange={(e) => {
                const mentor = mentorsData.find(
                  (m) => m.id === parseInt(e.target.value)
                );
                setSelectedMentor(mentor);
              }}
            >
              <option value="">Choose Mentor</option>
              {mentorsData.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student List and Assignment */}
          {selectedMentor && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Assign Students to {selectedMentor.name}
              </h2>
              {filteredStudents.length > 0 ? (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Student Name</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-t">
                        <td className="px-4 py-2">{student.name}</td>
                        <td className="px-4 py-2">
                          {assignedStudents[student.id]
                            ? `Assigned to ${assignedStudents[student.id]}`
                            : "Unassigned"}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            className={`border rounded-lg px-4 py-2 text-white ${
                              assignedStudents[student.id]
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700"
                            }`}
                            disabled={!!assignedStudents[student.id]}
                            onClick={() => handleMentorAssignment(student.id)}
                          >
                            {assignedStudents[student.id]
                              ? "Assigned"
                              : "Assign"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No students found for the selected criteria.</p>
              )}
            </div>
          )}
        </div>

        {/* Mentor Assignments */}
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Mentor Assignments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorsData.map((mentor) => (
              <div key={mentor.id}>
                <h3 className="font-semibold text-lg text-gray-700">
                  {mentor.name}
                </h3>
                <ul className="list-disc ml-5 mt-3">
                  {mentorAssignments[mentor.id] &&
                  mentorAssignments[mentor.id].length > 0 ? (
                    mentorAssignments[mentor.id].map((studentId) => {
                      const student = studentsData.find(
                        (student) => student.id === studentId
                      );
                      return (
                        <li
                          key={studentId}
                          className="flex justify-between items-center"
                        >
                          {student?.name}
                          <button
                            className="text-white hover:bg-red-700 border rounded-lg px-4 py-2 bg-red-500 "
                            onClick={() =>
                              handleRemoveAssignment(studentId, mentor.id)
                            }
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-gray-500">No students assigned</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
