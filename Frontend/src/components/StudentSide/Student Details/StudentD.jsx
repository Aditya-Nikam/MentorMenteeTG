import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import Navbars from "../Navbars"; // Make sure this path is correct
import axios from 'axios';

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      
      if (loggedInUser && loggedInUser.email) {
        setFormData((prevData) => ({ ...prevData, email: loggedInUser.email }));

        const formDataObj = new FormData();
        formDataObj.append("email", loggedInUser.email);

        try {
          const response = await axios.post('http://localhost:3001/getStudentDetails', formDataObj, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const {
            name,
            date_of_birth,
            admission_year,
            program,
            department,
            email,
            current_address,
            permanent_address,
            mobile_number,
            gender
        } = JSON.parse(response.data)
          console.log(JSON.parse(response.data)); // Handle the response data from the server
          // If you want to update formData based on the response:

          setFormData({
            name: name,
            gender: gender,
            email: email,
            admissionYear: admission_year.split("T")[0],
            department: department,
            program: program,
            mobileNumber: mobile_number,
            dob: date_of_birth.split("T")[0],
            currentAddress: current_address,
            permanentAddress: permanent_address,
          });

        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      }
    };

    fetchData(); // Call the async function

  }, []); 

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    const mobilePattern = /^[0-9]{10}$/; // Mobile number should be 10 digits
    const namePattern = /^[a-zA-Z\s]*$/; // Only allow alphabetic characters

    // Full Name validation
    if (!formData.name) {
      formErrors.name = "Full Name is required";
    } else if (!namePattern.test(formData.name)) {
      formErrors.name = "Full Name should only contain alphabets";
    }

    // Gender validation
    if (!formData.gender) {
      formErrors.gender = "Gender is required";
    }

    // Date of Birth validation
    if (!formData.dob) {
      formErrors.dob = "Date of Birth is required";
    }

    // Admission Year validation
    if (!formData.admissionYear) {
      formErrors.admissionYear = "Admission Year is required";
    }

    // Program validation
    if (!formData.program) {
      formErrors.program = "Program is required";
    }

    // Department validation
    if (!formData.department) {
      formErrors.department = "Department is required";
    }

    // Mobile number validation
    if (!formData.mobileNumber) {
      formErrors.mobileNumber = "Mobile Number is required";
    } else if (!mobilePattern.test(formData.mobileNumber)) {
      formErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    // Current Address validation
    if (!formData.currentAddress) {
      formErrors.currentAddress = "Current Address is required";
    }

    // Permanent Address validation
    if (!formData.permanentAddress) {
      formErrors.permanentAddress = "Permanent Address is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Save form data to localStorage
      localStorage.setItem("studentDetails", JSON.stringify(formData));

      // Alert message
      alert("Details successfully submitted!");

      // Log form data to console
      console.log("Form data submitted:", formData);

      // Navigate to ParentD page
      navigate("/ParentD");
    } else {
      alert("Please correct the errors in the form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />
      <div className="flex flex-col min-h-screen bg-gray-100 ">
        <div className="flex-grow flex items-center justify-center p-20 ">
          <div className="bg-white border p-10 shadow-2xl w-full max-w-4xl relative">
            <h1 className="text-2xl font-bold text-black text-left mb-6">
              Student Details
            </h1>
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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs">{errors.dob}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Admission Year, Program, Department */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="admissionYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Admission Year
                  </label>
                  <input
                    type="date"
                    id="admissionYear"
                    name="admissionYear"
                    value={formData.admissionYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  {errors.admissionYear && (
                    <p className="text-red-500 text-xs">
                      {errors.admissionYear}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="program"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Program
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                  >
                    <option value="">Select Program</option>
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                  {errors.program && (
                    <p className="text-red-500 text-xs">{errors.program}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Artificial Intelligence & Data Science">
                      Artificial Intelligence & Data Science
                    </option>
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-xs">{errors.department}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Email, Mobile Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Current Address, Permanent Address */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="currentAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Address
                  </label>
                  <textarea
                    id="currentAddress"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  {errors.currentAddress && (
                    <p className="text-red-500 text-xs">
                      {errors.currentAddress}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="permanentAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Permanent Address
                  </label>
                  <textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                  {errors.permanentAddress && (
                    <p className="text-red-500 text-xs">
                      {errors.permanentAddress}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentD;
