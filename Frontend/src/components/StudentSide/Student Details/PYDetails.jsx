import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbars from "../Navbars"; // Import Navbars component
import axios from 'axios';

const PYDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenthMarks: "",
    tenthPercentage: "",
    tenthPassingYear: "",
    twelfthMarks: "",
    twelfthPercentage: "",
    twelfthPassingYear: "",
    diplomaMarks: "",
    diplomaPercentage: "",
    diplomaPassingYear: "",
    gap: false,
    certificates: { tenth: null, twelfth: null, diploma: null, gapCertificate: null },
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  useEffect(() => {
    const pydetails = JSON.parse(localStorage.getItem("pydetails"));
    if (pydetails) {
      setFormData(pydetails);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCertificateChange = (e, key) => {
    setFormData({
      ...formData,
      certificates: { ...formData.certificates, [key]: e.target.files[0] },
    });
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.tenthMarks) validationErrors.tenthMarks = "Total Marks is required.";
    if (!formData.tenthPercentage) validationErrors.tenthPercentage = "Percentage is required.";
    if (!formData.tenthPassingYear) validationErrors.tenthPassingYear = "Passing Year is required.";
    return validationErrors;
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent submission if there are validation errors
    }

    

    const formData1 = new FormData();
    formData1.append("email", JSON.parse(localStorage.getItem("loggedInUser")).email);
    formData1.append("tenthMarksheet", formData.certificates.tenth)
    formData1.append("twelfthMarksheet", formData.certificates.twelfth)
    formData1.append("diplomaMarsheet", formData.certificates.diploma)
    formData1.append("gapCertificate", formData.certificates.gapCertificate);
    
    try {
      await axios.post('http://localhost:3001/upload_files', formData1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // alert('Files successfully uploaded!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files.');
    }
    localStorage.setItem("pydetails",JSON.stringify(formData));
    navigate("/currentd");
  };

  return (
    <div className=" bg-gray-100">
      <Navbars />
      <div className="flex items-center justify-center ">
        <div className="bg-white border p-20 shadow-2xl w-4/5">
          <h1 className="text-2xl font-bold text-black mb-6">Previous Years Details</h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* 10th Details */}
            <div>
              <h2 className="text-lg font-bold text-black mb-2">10th Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input
                    type="number"
                    name="tenthMarks"
                    value={formData.tenthMarks}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.tenthMarks && <p className="text-red-500 text-xs">{errors.tenthMarks}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage</label>
                  <input
                    type="number"
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.tenthPercentage && <p className="text-red-500 text-xs">{errors.tenthPercentage}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    type="number"
                    name="tenthPassingYear"
                    value={formData.tenthPassingYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.tenthPassingYear && <p className="text-red-500 text-xs">{errors.tenthPassingYear}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "tenth")}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-800" />

            {/* 12th Details */}
            <div>
              <h2 className="text-lg font-bold text-black mb-4">12th Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input
                    type="number"
                    name="twelfthMarks"
                    value={formData.twelfthMarks}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.twelfthMarks && <p className="text-red-500 text-xs">{errors.twelfthMarks}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage</label>
                  <input
                    type="number"
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.twelfthPercentage && <p className="text-red-500 text-xs">{errors.twelfthPercentage}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    type="number"
                    name="twelfthPassingYear"
                    value={formData.twelfthPassingYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.twelfthPassingYear && <p className="text-red-500 text-xs">{errors.twelfthPassingYear}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "twelfth")}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-800" />

            {/* Diploma Details */}
            <div>
              <h2 className="text-lg font-bold text-black mb-4">Diploma Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input
                    type="number"
                    name="diplomaMarks"
                    value={formData.diplomaMarks}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.diplomaMarks && <p className="text-red-500 text-xs">{errors.diplomaMarks}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage</label>
                  <input
                    type="number"
                    name="diplomaPercentage"
                    value={formData.diplomaPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.diplomaPercentage && <p className="text-red-500 text-xs">{errors.diplomaPercentage}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    type="number"
                    name="diplomaPassingYear"
                    value={formData.diplomaPassingYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                  {errors.diplomaPassingYear && <p className="text-red-500 text-xs">{errors.diplomaPassingYear}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "diploma")}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-800" />

            {/* Academic Gap */}
            <div>
              <h2 className="text-lg font-bold text-black mb-4">Academic Gap</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  name="gap"
                  checked={formData.gap}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-800 border-gray-300 rounded"
                />
                <label className="block text-sm font-medium text-gray-700">Tick if there was a gap</label>
              </div>
              {formData.gap && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Upload Gap Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "gapCertificate")}
                    className="mt-1 block w-full"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
        
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gray-800 text-white rounded-full font-semibold px-4 py-2 shadow-sm hover:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PYDetails;
