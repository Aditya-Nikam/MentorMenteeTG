import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import Navbars from "../Navbars";

const Internships = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobProfile: "",
    startDate: "",
    endDate: "",
    stipend: "",
    certificate: null,
  });

  const [internshipRecords, setInternshipRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCertificateChange = (e) => {
    setFormData({ ...formData, certificate: e.target.files[0] });
  };

  const handleAddRecord = () => {
    // Add the form data to the internshipRecords array
    setInternshipRecords([...internshipRecords, { ...formData }]);
    // Reset form data after submission
    setFormData({
      companyName: "",
      jobProfile: "",
      startDate: "",
      endDate: "",
      stipend: "",
      certificate: null,
    });
  };

  const handleDeleteRecord = (index) => {
    // Delete a specific record by index
    setInternshipRecords(internshipRecords.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRecord(); // Add record to the list
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-2">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white border m-3 p-9 shadow-2xl w-full max-w-3xl relative">
            <h1 className="text-2xl font-bold font-serif text-black text-left mb-6">
              Internship Details
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                {/* Job Profile */}
                <div>
                  <label
                    htmlFor="jobProfile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Profile
                  </label>
                  <input
                    type="text"
                    id="jobProfile"
                    name="jobProfile"
                    value={formData.jobProfile}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              {/* Start Date and End Date in a row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              {/* Stipend and Certificate Upload in a row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="stipend"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stipend
                  </label>
                  <select
                    id="stipend"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="certificate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Certificate
                  </label>
                  <input
                    type="file"
                    id="certificate"
                    name="certificate"
                    onChange={handleCertificateChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6 space-x-2">
                <button
                  type="button"
                  onClick={handleAddRecord}
                  className="bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 w-half"
                >
                  Add Details
                </button>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="bg-cyan-400 text-white py-2 px-4 rounded-md shadow-sm hover:bg-cyan-600 w-full"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display all records */}
            {internshipRecords.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Internship Records
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Company Name</th>
                        <th className="border px-4 py-2">Job Profile</th>
                        <th className="border px-4 py-2">Start Date</th>
                        <th className="border px-4 py-2">End Date</th>
                        <th className="border px-4 py-2">Stipend</th>
                        <th className="border px-4 py-2">Certificate</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {internshipRecords.map((record, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{record.companyName}</td>
                          <td className="border px-4 py-2">{record.jobProfile}</td>
                          <td className="border px-4 py-2">{record.startDate}</td>
                          <td className="border px-4 py-2">{record.endDate}</td>
                          <td className="border px-4 py-2">{record.stipend}</td>
                          <td className="border px-4 py-2">
                            {record.certificate ? record.certificate.name : "No Certificate"}
                          </td>
                          <td className="border px-4 py-2">
                            <div className="flex space-x-2">
                              <FaEdit className="text-yellow-500 cursor-pointer" />
                              <FaTrash
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleDeleteRecord(index)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Internships;
