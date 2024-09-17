import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import CGPAForm from "./CGPAForm";
import SemesterTable from "./SemesterTable";

const Cgpa = () => {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  const addSemesterDetails = (details) => {
    setSemesters((prevSemesters) => [...prevSemesters, details]);
  };

  const deleteSemesterDetails = (index) => {
    setSemesters((prevSemesters) =>
      prevSemesters.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const semData = localStorage.getItem("semesters");
    if(semData){
      setSemesters(JSON.parse(semData))
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem("semesters", JSON.stringify(semesters));
    navigate("/Internships");
  };

  const handleBack = () => {
    navigate("/PersonalD");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">CGPA Details</h1>
        <CGPAForm addSemesterDetails={addSemesterDetails} />
        <SemesterTable
          semesters={semesters}
          deleteSemesterDetails={deleteSemesterDetails}
        />
        <div className="mt-6 flex justify-between">
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
      </div>
    </div>
  );
};

export default Cgpa;
