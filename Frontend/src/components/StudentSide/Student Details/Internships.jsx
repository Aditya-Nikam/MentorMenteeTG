import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    organizationName: '',
    year: '',
    role: '',
    periodFrom: '',
    periodTo: '',
    stipend: false,
    mode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({ ...prevData, [id]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  useEffect(() => {
    const storedInternshipInfo = localStorage.getItem("internshipInfo");
    if (storedInternshipInfo) {
      setInternships(JSON.parse(storedInternshipInfo));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInternships([...internships, formData]);
    setFormData({
      organizationName: '',
      year: '',
      role: '',
      periodFrom: '',
      periodTo: '',
      stipend: false,
      mode: '',
    });
  };

  const handleBack = () => {
    navigate('/CGPA');
  };

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("internshipInfo", JSON.stringify(internships));
    navigate('/StudentAchievement');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <main className="bg-white border rounded-md p-4 shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-left">Internship Details</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                id="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter Organization Name"
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <select
                id="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Year</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter your role"
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="periodFrom" className="block text-sm font-medium text-gray-700">Period From</label>
              <input
                type="date"
                id="periodFrom"
                value={formData.periodFrom}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="periodTo" className="block text-sm font-medium text-gray-700">Period To</label>
              <input
                type="date"
                id="periodTo"
                value={formData.periodTo}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">Stipend</label>
              <input
                type="checkbox"
                id="stipend"
                checked={formData.stipend}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">Yes</span>
            </div>
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode</label>
              <select
                id="mode"
                value={formData.mode}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto">
            Add Internship
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4 text-center">Internship List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stipend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {internships.map((internship, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{internship.organizationName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{internship.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{internship.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {internship.periodFrom} - {internship.periodTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{internship.stipend ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{internship.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Internships;
