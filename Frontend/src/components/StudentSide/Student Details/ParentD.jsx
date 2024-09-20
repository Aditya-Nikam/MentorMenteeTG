import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbars from "../Navbars";

const ParentD = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fatherName: "",
    fatherMobile: "",
    fatherEmail: "",
    motherName: "",
    motherMobile: "",
    motherEmail: "",
    mentorName: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const parentDetails = JSON.parse(localStorage.getItem("parentDetails"));
    if (parentDetails) {
      setFormData(parentDetails);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; // Basic phone number regex for 10 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const nameRegex = /^[A-Za-z\s]+$/; // Name regex to allow only letters and spaces

    if (!formData.fatherName) newErrors.fatherName = "Father's Name is required.";
    else if (!nameRegex.test(formData.fatherName)) newErrors.fatherName = "Father's Name must contain only letters.";

    if (!formData.fatherMobile) {
      newErrors.fatherMobile = "Father's Mobile Number is required.";
    } else if (!phoneRegex.test(formData.fatherMobile)) {
      newErrors.fatherMobile = "Father's Mobile Number must be 10 digits.";
    }
    if (!formData.fatherEmail) {
      newErrors.fatherEmail = "Father's Email ID is required.";
    } else if (!emailRegex.test(formData.fatherEmail)) {
      newErrors.fatherEmail = "Invalid email format.";
    }

    if (!formData.motherName) newErrors.motherName = "Mother's Name is required.";
    else if (!nameRegex.test(formData.motherName)) newErrors.motherName = "Mother's Name must contain only letters.";

    if (!formData.motherMobile) {
      newErrors.motherMobile = "Mother's Mobile Number is required.";
    } else if (!phoneRegex.test(formData.motherMobile)) {
      newErrors.motherMobile = "Mother's Mobile Number must be 10 digits.";
    }
    if (!formData.motherEmail) {
      newErrors.motherEmail = "Mother's Email ID is required.";
    } else if (!emailRegex.test(formData.motherEmail)) {
      newErrors.motherEmail = "Invalid email format.";
    }

    if (!formData.mentorName) newErrors.mentorName = "Mentor's Name is required.";
    else if (!nameRegex.test(formData.mentorName)) newErrors.mentorName = "Mentor's Name must contain only letters.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent submission if there are validation errors
    }

    // Save form data to local storage
    localStorage.setItem("parentDetails", JSON.stringify(formData));
    
    // Display alert message
    alert("Details successfully submitted!");
    
    // Log form data to console
    console.log("Form data submitted:", formData);
   
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex items-center justify-center p-20">
          <div className="bg-white border p-10 shadow-2xl w-full max-w-4xl relative">
            <h1 className="text-2xl font-bold text-black text-left mb-6">Parents Details</h1>
            {/* Arrow */}
            <div className="absolute top-4 left-10">
              <Link to="/StudentD">
                <FaArrowLeft className="text-2xl text-gray-600 hover:text-gray-800" />
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent's Details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.fatherName && <p className="text-red-500 text-xs">{errors.fatherName}</p>}
                </div>
                <div>
                  <label htmlFor="fatherMobile" className="block text-sm font-medium text-gray-700">
                    Father's Mobile Number
                  </label>
                  <input
                    type="number"
                    id="fatherMobile"
                    name="fatherMobile"
                    value={formData.fatherMobile}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.fatherMobile && <p className="text-red-500 text-xs">{errors.fatherMobile}</p>}
                </div>
                <div>
                  <label htmlFor="fatherEmail" className="block text-sm font-medium text-gray-700">
                    Father's Email ID
                  </label>
                  <input
                    type="email"
                    id="fatherEmail"
                    name="fatherEmail"
                    value={formData.fatherEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.fatherEmail && <p className="text-red-500 text-xs">{errors.fatherEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    id="motherName"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.motherName && <p className="text-red-500 text-xs">{errors.motherName}</p>}
                </div>
                <div>
                  <label htmlFor="motherMobile" className="block text-sm font-medium text-gray-700">
                    Mother's Mobile Number
                  </label>
                  <input
                    type="number"
                    id="motherMobile"
                    name="motherMobile"
                    value={formData.motherMobile}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.motherMobile && <p className="text-red-500 text-xs">{errors.motherMobile}</p>}
                </div>
                <div>
                  <label htmlFor="motherEmail" className="block text-sm font-medium text-gray-700">
                    Mother's Email ID
                  </label>
                  <input
                    type="email"
                    id="motherEmail"
                    name="motherEmail"
                    value={formData.motherEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.motherEmail && <p className="text-red-500 text-xs">{errors.motherEmail}</p>}
                </div>
              </div>

              {/* Mentor Details */}
              <hr className="my-6 border-gray-800" />
              <h2 className="text-2xl font-bold text-black text-left mb-4">Mentor Details</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label htmlFor="mentorName" className="block text-sm font-medium text-gray-700">
                    Mentor's Name
                  </label>
                  <input
                    type="text"
                    id="mentorName"
                    name="mentorName"
                    value={formData.mentorName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm sm:text-sm"
                  />
                  {errors.mentorName && <p className="text-red-500 text-xs">{errors.mentorName}</p>}
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

export default ParentD;
