import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CGPAForm = ({ addSemesterDetails }) => {
  const [formData, setFormData] = useState({
    semester: '',
    grade: '',
    internalKT: '',
    externalKT: '',
    totalKT: '',
    aggregate: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const internalKT = parseFloat(formData.internalKT) || 0;
    const externalKT = parseFloat(formData.externalKT) || 0;
    const totalKT = internalKT + externalKT;
    const grade = parseFloat(formData.grade) || 0;

    let aggregate = 0;
    if (grade !== 0) {
      aggregate = (grade / 10 * (1 - (internalKT + externalKT) / 10)).toFixed(2);
    }

    setFormData((prevData) => ({
      ...prevData,
      totalKT: totalKT,
      aggregate: aggregate,
    }));
  }, [formData.internalKT, formData.externalKT, formData.grade]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSemesterDetails(formData);
    setFormData({
      semester: '',
      grade: '',
      internalKT: '',
      externalKT: '',
      totalKT: '',
      aggregate: '',
    });
  };

  const handleBack = () => {
    navigate('/PersonalD'); 
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="col-span-1">
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
          <input
            type="number"
            id="semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="Semester"
            className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">CGPA Obtained</label>
          <input
            type="number"
            step="0.01"
            id="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="CGPA Obtained"
            className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="internalKT" className="block text-sm font-medium text-gray-700">Internal K.T.</label>
          <input
            type="number"
            id="internalKT"
            value={formData.internalKT}
            onChange={handleChange}
            placeholder="Internal K.T."
            className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="externalKT" className="block text-sm font-medium text-gray-700">External K.T.</label>
          <input
            type="number"
            id="externalKT"
            value={formData.externalKT}
            onChange={handleChange}
            placeholder="External K.T."
            className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="totalKT" className="block text-sm font-medium text-gray-700">Total K.T.</label>
          <input
            type="number"
            id="totalKT"
            value={formData.totalKT}
            onChange={handleChange}
            placeholder="Total K.T."
            className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
            readOnly
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="aggregate" className="block text-sm font-medium text-gray-700">Aggregate</label>
          <input
            type="number"
            // step="10"
            id="aggregate"
            value={formData.aggregate*10}
            onChange={handleChange}
            placeholder="Aggregate"
            className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
            readOnly
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Details
      </button>
      {/* <button
        type="button"
        onClick={handleBack}
        className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
      >
        Back
      </button> */}
    </form>
  );
};

export default CGPAForm;
