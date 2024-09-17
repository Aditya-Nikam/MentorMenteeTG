import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import Navbars from "../Navbars"; // Make sure this path is correct

const StudentD = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    admissionYear: "",
    department: "",
    program: "",
    mobileNumber: "",
    dob: "",
    currentAddress: "",
    permanentAddress: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.email) {
      formData.email = loggedInUser.email
    }
    const studentDetails = JSON.parse(localStorage.getItem("studentDetails"));
    if(studentDetails){
      setFormData(studentDetails)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("studentDetails", JSON.stringify(formData));
    console.log("Form data submitted:", formData);
    navigate("/ParentD")
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />
      <div className="flex flex-col min-h-screen bg-gray-100">
        
        <div className="flex-grow flex items-center justify-center p-20">

          <div className="bg-white border p-10 shadow-2xl w-full max-w-4xl relative">
            <h1 className="text-2xl font-bold font-serif text-black text-left mb-6">Student Details</h1>
            {/*Arrow*/}
            <div className="absolute top-4 right-10">
              <Link to="/ParentD">
                <FaArrowRight className="text-2xl text-gray-600 hover:text-gray-800" />
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name, Gender, Date of Birth */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Admission Year, Department, Program */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="admissionYear" className="block text-sm font-medium text-gray-700">
                    Admission Year
                  </label>
                  <input
                    type="date"
                    id="admissionYear"
                    name="admissionYear"
                    value={formData.admissionYear}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                    Program
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                  >
                    <option value="">Select Program</option>
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Email, Mobile Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email-ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 4: Current Address, Permanent Address */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700">
                    Current Address
                  </label>
                  <textarea
                    id="currentAddress"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">
                    Permanent Address
                  </label>
                  <textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-cyan-400 text-white px-4 justify-center py-2 rounded-md shadow-sm hover:bg-cyan-700 "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentD;
