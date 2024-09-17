import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../Frontend/src/services/authService";
const StudentAchievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({
    studentName: "",
    achievementTitle: "",
    achievementDate: "",
    details: "",
    certificate: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, certificate: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  useEffect(() => {
    const achievements = localStorage.getItem("achievements");
    if (achievements) {
      setAchievements(JSON.parse(achievements));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAchievements([...achievements, formData]);
    setFormData({
      studentName: "",
      achievementTitle: "",
      achievementDate: "",
      details: "",
      certificate: null,
    });
  };

  const handleBack = () => {
    navigate("/Internships");
  };
  const handleNext = () => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
    const user = JSON.parse(localStorage.getItem("user"));
    user.type = "0";
    localStorage.setItem("user", JSON.stringify(user));
    // console.log(achievements)
    navigate("/");
    authService.setData();
  };
  return (
    <div className="flex items-center bg-gray-100 justify-center min-h-screen">
      <div className="bg-white border rounded-md p-8 shadow-lg w-1/1.5 min-w-md">
        <div className="p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Student Achievements
          </h1>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Student Name"
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="achievementTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Achievement Title
                </label>
                <input
                  type="text"
                  id="achievementTitle"
                  value={formData.achievementTitle}
                  onChange={handleChange}
                  placeholder="Achievement Title"
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="achievementDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Achievement Date
                </label>
                <input
                  type="date"
                  id="achievementDate"
                  value={formData.achievementDate}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Details about the achievement"
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                  rows="4"
                  required
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label
                  htmlFor="certificate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Certificate
                </label>
                <input
                  type="file"
                  id="certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto"
            >
              Add Achievement
            </button>
          </form>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Achievement List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Achievement Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {achievements.map((achievement, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {achievement.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {achievement.achievementTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {achievement.achievementDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {achievement.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {achievement.certificate
                        ? achievement.certificate.name
                        : "No certificate"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleBack}
            className="mt-6 bg-gray-500 text-white py-2 px-4 rounded w-full md:w-auto"
          >
            Back
          </button>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={handleNext}
              className="w-1/2 mt-2 font-bold items-center py-2 px-2 border border-transparent text-md rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Final Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAchievement;
