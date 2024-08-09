import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Internships = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [stipend, setStipend] = useState("");

  const [internshipInfo, setInternshipInfo] = useState({
    organization: "",
    year: "",
    branch: "",
    role: "",
    from: "",
    to: "",
    stipend: "",
    mode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternshipInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  useEffect(() => {
    const storedInternshipInfo = localStorage.getItem("internshipInfo");
    if (storedInternshipInfo) {
      setInternshipInfo(JSON.parse(storedInternshipInfo));
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("internshipInfo", JSON.stringify(internshipInfo));
    navigate("/StudentAchievement");
  };

  const handleBack = () => {
    navigate("/CGPA");
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen ba p-4">
      <div className="bg-white border rounded-md p-8 shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Internship Details
        </h1>
        <form onSubmit={handleNext}>
          <div className="my-4">
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700"
            >
              Organization
            </label>
            <input
              type="text"
              id="organization"
              className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
              placeholder="Enter Organization Name"
              name="organization"
              value={internshipInfo.organization}
              onChange={handleChange}
            />
            {errors.organization && (
              <p className="text-red-500 text-sm">{errors.organization}</p>
            )}
          </div>
          <div className="my-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <select
              id="year"
              className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
              name="year"
              value={internshipInfo.year}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="First Year">First Year (FE)</option>
              <option value="Second Year">Second Year (SE)</option>
              <option value="Third Year">Third Year (TE)</option>
              <option value="Final Year">Final Year (BE)</option>
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
              placeholder="Enter your role"
              name="role"
              value={internshipInfo.role}
              onChange={handleChange}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="my-4 w-full sm:w-1/2">
              <label
                htmlFor="period-from"
                className="block text-sm font-medium text-gray-700"
              >
                Period From
              </label>
              <input
                type="date"
                id="period-from"
                className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
                name="from"
                value={internshipInfo.from}
                onChange={handleChange}
              />
            </div>
            <div className="my-4 w-full sm:w-1/2">
              <label
                htmlFor="period-to"
                className="block text-sm font-medium text-gray-700"
              >
                Period To
              </label>
              <input
                type="date"
                id="period-to"
                className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
                name="to"
                value={internshipInfo.to}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-3">
          <div className="my-4 w-1/2">
            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
              Stipend
            </label>
            <select
              id="stipend"
              className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
              name="stipend"
              value={internshipInfo.stipend}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select Stipend
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="my-4 w-1/2">
            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
              Mode
            </label>
            <select
              id="mode"
              className="block w-full py-2 px-3 text-sm border border-black-900 rounded-md focus:border-black"
              name="mode"
              value={internshipInfo.mode}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select Mode
              </option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto py-2 px-4 bg-gray-500 text-white rounded-md mb-2 sm:mb-0"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Internships;
