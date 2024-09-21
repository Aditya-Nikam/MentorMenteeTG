import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
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

  useEffect(() => {
    const parentDetails = JSON.parse(localStorage.getItem("parentDetails"));
    if(parentDetails){
      setFormData(parentDetails)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("parentDetails", JSON.stringify(formData));
    console.log("Form data submitted:", formData);
    navigate("/pydetails")
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />
      <div className="relative min-h-screen bg-gray-100">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white border p-8 shadow-2xl w-full max-w-3xl">
              <div className="absolute top-40 left-50">
                <Link to="/StudentD">
                  <FaArrowLeft className="text-2xl text-gray-600 hover:text-gray-800 " />
                </Link>
              </div>
            <br />
            <h1 className="text-2xl font-bold font-serif text-black text-left">Parents Details</h1>
              {/*Arrow*/}
            
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
                </div>
              </div>

              {/* Mentor Details */}
              <hr className="my-6 border-gray-800" />
              <h2 className="text-xl font-bold font-serif text-black text-left mb-4">Mentor Details</h2>
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
                </div>
              </div>

              {/* Submit Button */}
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

export default ParentD;
