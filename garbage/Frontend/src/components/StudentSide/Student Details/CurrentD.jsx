import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbars from "../Navbars";

const CurrentD = () => {
  const [formData, setFormData] = useState({
    semester: "",
    subjectName: "",
    oralMarks: "",
    universityMarks: "",
    twMarks: "",
    passFail: "",
    cgpa: "",
    certificate: null,
  });

  const [subjects, setSubjects] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData({ ...formData, certificate: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddOrUpdate = () => {
    setSubjects([...subjects, { ...formData }]);
    setFormData({
      semester: "",
      subjectName: "",
      oralMarks: "",
      universityMarks: "",
      twMarks: "",
      passFail: "",
      cgpa: "",
      certificate: null,
    });
  };

  const handleDelete = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-9 shadow-2xl w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold font-serif text-black text-left mb-6">
            Current Result Details
          </h1>

          {/* Form */}
          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {/* Semester */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                  Semester
                </label>
                <input
                  type="text"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>

              {/* Subject Name */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subjectName"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>

              {/* Oral Marks */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="oralMarks" className="block text-sm font-medium text-gray-700">
                  Oral Marks
                </label>
                <input
                  type="number"
                  id="oralMarks"
                  name="oralMarks"
                  value={formData.oralMarks}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>

              {/* University Marks */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="universityMarks" className="block text-sm font-medium text-gray-700">
                  University Marks
                </label>
                <input
                  type="number"
                  id="universityMarks"
                  name="universityMarks"
                  value={formData.universityMarks}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>

              {/* Term Work Marks */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="twMarks" className="block text-sm font-medium text-gray-700">
                  Term Work Marks
                </label>
                <input
                  type="number"
                  id="twMarks"
                  name="twMarks"
                  value={formData.twMarks}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>

              {/* Pass/Fail */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="passFail" className="block text-sm font-medium text-gray-700">
                  Pass/Fail Status
                </label>
                <select
                  id="passFail"
                  name="passFail"
                  value={formData.passFail}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                >
                  <option value="">Select Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>

              {/* CGPA */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">
                  Total CGPA
                </label>
                <input
                  type="number"
                  id="cgpa"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>

              {/* Certificate Upload */}
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                  Upload Marksheet
                </label>
                <input
                  type="file"
                  id="certificate"
                  name="certificate"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Add/Update Button */}
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 mt-4"
            >
              Add/Update Subject
            </button>
          </form>

          {/* Table to display subjects */}
          {subjects.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Subject Details</h3>
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Subject Name</th>
                    <th className="border px-4 py-2">Oral Marks</th>
                    <th className="border px-4 py-2">University Marks</th>
                    <th className="border px-4 py-2">TW Marks</th>
                    <th className="border px-4 py-2">Pass/Fail</th>
                    <th className="border px-4 py-2">CGPA</th>
                    <th className="border px-4 py-2">Certificate</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{subject.subjectName}</td>
                      <td className="border px-4 py-2">{subject.oralMarks}</td>
                      <td className="border px-4 py-2">{subject.universityMarks}</td>
                      <td className="border px-4 py-2">{subject.twMarks}</td>
                      <td className="border px-4 py-2">{subject.passFail}</td>
                      <td className="border px-4 py-2">{subject.cgpa}</td>
                      <td className="border px-4 py-2">{subject.certificate?.name}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="text-blue-600 mr-2"
                          onClick={() => handleEdit(index)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentD;
