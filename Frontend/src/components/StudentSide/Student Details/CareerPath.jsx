import { useState, useEffect } from "react";
import Navbars from "../Navbars";
import PropTypes from "prop-types";
import axios from 'axios';
import {useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    careerOption: "",
    higherStudies: {
      universityName: "",
      course: "",
      country:"",
      admissionStatus: "",
      exam: "",
      score: "",
    },
    placement: {
      companyName: "",
      jobProfile: "",
      offerLetterStatus: "",
      package: "",
    },
    entrepreneurship: {
      isEntrepreneur: "No",
      company: "",
      registrationStatus: "",
      sector: "",
      certificationStatus: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const CareerPath = JSON.parse(localStorage.getItem("CareerPath"));
    if (CareerPath) {
      setFormData(CareerPath);
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.careerOption === "higherStudies") {
      if (!formData.higherStudies.universityName)
        newErrors.universityName = "University Name is required";
      if (!formData.higherStudies.course)
        newErrors.course = "Course is required";
      if (!formData.higherStudies.country)
        newErrors.country = "Country is required";
      if (!formData.higherStudies.admissionStatus)
        newErrors.admissionStatus = "Admission Status is required";
      if (!formData.higherStudies.exam)
        newErrors.exam = "Exam is required";
      if (!formData.higherStudies.score)
        newErrors.score = "Score is required";
    } else if (formData.careerOption === "placement") {
      if (!formData.placement.companyName)
        newErrors.companyName = "Company Name is required";
      if (!formData.placement.jobProfile)
        newErrors.jobProfile = "Job Profile is required";
      if (!formData.placement.offerLetterStatus)
        newErrors.offerLetterStatus = "Offer Letter Status is required";
      if (!formData.placement.package)
        newErrors.package = "Package is required";
    } else if (formData.careerOption === "entrepreneurship") {
      if (formData.entrepreneurship.isEntrepreneur === "Yes") {
        if (!formData.entrepreneurship.company)
          newErrors.company = "Company is required";
        if (!formData.entrepreneurship.registrationStatus)
          newErrors.registrationStatus = "Registration Status is required";
        if (!formData.entrepreneurship.sector)
          newErrors.sector = "Sector is required";
        if (!formData.entrepreneurship.certificationStatus)
          newErrors.certificationStatus = "Certification Status is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
    const formDataObj = new FormData();
    formDataObj.append("email", JSON.parse(localStorage.getItem("loggedInUser")).email);
    formDataObj.append("careerPath", JSON.stringify(formData));
    try {
      await axios.post("http://localhost:3001//carrierPath", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // alert('Files successfully uploaded!');
    } catch (error) {
      console.error("Error uploading data:", error);
    }
    localStorage.setItem("CareerPath",JSON.stringify(formData));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />
      <div className="container mx-auto py-3">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Career Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Career Option
              </label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="careerOption"
                    value="higherStudies"
                    checked={formData.careerOption === "higherStudies"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span className="ml-2">Higher Studies</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="careerOption"
                    value="placement"
                    checked={formData.careerOption === "placement"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span className="ml-2">Placement</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="careerOption"
                    value="entrepreneurship"
                    checked={formData.careerOption === "entrepreneurship"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span className="ml-2">Entrepreneurship</span>
                </label>
              </div>
            </div>

            {/* Conditionally render Higher Studies fields */}
            {formData.careerOption === "higherStudies" && (
              <div className="space-y-4">
                <InputField
                  label="University Name"
                  name="universityName"
                  value={formData.higherStudies.universityName}
                  onChange={(e) =>
                    handleNestedChange("higherStudies", "universityName", e.target.value)
                  }
                  error={errors.universityName}
                />
                <InputField
                  label="Course"
                  name="course"
                  value={formData.higherStudies.course}
                  onChange={(e) =>
                    handleNestedChange("higherStudies", "course", e.target.value)
                  }
                  error={errors.course}
                />
                <InputField
                  label="Country"
                  name="country"
                  value={formData.higherStudies.country}
                  onChange={(e) =>
                    handleNestedChange("higherStudies", "country", e.target.value)
                  }
                  error={errors.country}
                />
                <SelectField
                  label="Admission Status"
                  name="admissionStatus"
                  value={formData.higherStudies.admissionStatus}
                  onChange={(e) =>
                    handleNestedChange("higherStudies", "admissionStatus", e.target.value)
                  }
                  options={["", "Admitted", "Waiting"]}
                  error={errors.admissionStatus}
                />
                <SelectField
                  label="Exam"
                  name="exam"
                  value={formData.higherStudies.exam}
                  onChange={(e) =>
                    handleNestedChange("higherStudies", "exam", e.target.value)
                  }
                  options={["", "GRE", "TOEFL", "CAT", "GATE"]}
                  error={errors.exam}
                />
                <InputField
                  label="Score"
                  name="score"
                  value={formData.higherStudies.score}
                  onChange={(e) =>
                    handleNestedChange("higherStudies", "score", e.target.value)
                  }
                  error={errors.score}
                />
              </div>
            )}

            {/* Conditionally render Placement fields */}
            {formData.careerOption === "placement" && (
              <div className="space-y-4">
                <InputField
                  label="Company Name"
                  name="companyName"
                  value={formData.placement.companyName}
                  onChange={(e) =>
                    handleNestedChange("placement", "companyName", e.target.value)
                  }
                  error={errors.companyName}
                />
                <InputField
                  label="Job Profile"
                  name="jobProfile"
                  value={formData.placement.jobProfile}
                  onChange={(e) =>
                    handleNestedChange("placement", "jobProfile", e.target.value)
                  }
                  error={errors.jobProfile}
                />
                <SelectField
                  label="Offer Letter Status"
                  name="offerLetterStatus"
                  value={formData.placement.offerLetterStatus}
                  onChange={(e) =>
                    handleNestedChange("placement", "offerLetterStatus", e.target.value)
                  }
                  options={["", "Received", "Pending"]}
                  error={errors.offerLetterStatus}
                />
                <InputField
                  label="Package"
                  name="package"
                  value={formData.placement.package}
                  onChange={(e) =>
                    handleNestedChange("placement", "package", e.target.value)
                  }
                  error={errors.package}
                />
              </div>
            )}

            {/* Conditionally render Entrepreneurship fields */}
            {formData.careerOption === "entrepreneurship" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Are you an Entrepreneur?
                  </label>
                  <div className="mt-2 flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isEntrepreneur"
                        value="Yes"
                        checked={formData.entrepreneurship.isEntrepreneur === "Yes"}
                        onChange={(e) =>
                          handleNestedChange("entrepreneurship", "isEntrepreneur", e.target.value)
                        }
                        className="form-radio h-4 w-4"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isEntrepreneur"
                        value="No"
                        checked={formData.entrepreneurship.isEntrepreneur === "No"}
                        onChange={(e) =>
                          handleNestedChange("entrepreneurship", "isEntrepreneur", e.target.value)
                        }
                        className="form-radio h-4 w-4"
                      />
                      <span className="ml-2">No</span>
                    </label>
                    
                  </div>
                </div>

                {formData.entrepreneurship.isEntrepreneur === "Yes" && (
                  <div className="space-y-4">
                    <InputField
                      label="Company"
                      name="company"
                      value={formData.entrepreneurship.company}
                      onChange={(e) =>
                        handleNestedChange("entrepreneurship", "company", e.target.value)
                      }
                      error={errors.company}
                    />
                    <SelectField
                      label="Registration Status"
                      name="registrationStatus"
                      value={formData.entrepreneurship.registrationStatus}
                      onChange={(e) =>
                        handleNestedChange("entrepreneurship", "registrationStatus", e.target.value)
                      }
                      options={["", "Registered", "Not Registered"]}
                      error={errors.registrationStatus}
                    />
                    <InputField
                      label="Sector"
                      name="sector"
                      value={formData.entrepreneurship.sector}
                      onChange={(e) =>
                        handleNestedChange("entrepreneurship", "sector", e.target.value)
                      }
                      error={errors.sector}
                    />
                    <SelectField
                      label="Certification Status"
                      name="certificationStatus"
                      value={formData.entrepreneurship.certificationStatus}
                      onChange={(e) =>
                        handleNestedChange("entrepreneurship", "certificationStatus", e.target.value)
                      }
                      options={["", "Certified", "Not Certified"]}
                      error={errors.certificationStatus}
                    />
                  </div>
                )}
              </div>
            )}

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

// Reusable Input field component
const InputField = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

// Reusable Select field component
const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
};

export default StudentForm;
