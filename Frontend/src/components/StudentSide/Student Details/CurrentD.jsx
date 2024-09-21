import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbars from "../Navbars";

const CurrentD = () => {
  const [formData, setFormData] = useState({
    semester: "",
    subjectName: "",
    oralMarks: "",
    ia1Marks: "",
    ia2Marks: "",
    universityMarks: "",
    twMarks: "",
    passFail: "",
  });

  const [semesterSubjects, setSemesterSubjects] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const semesterSubjects = JSON.parse(localStorage.getItem("semesterSubjects"));
    if (semesterSubjects) {
      setFormData(semesterSubjects);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.semester) newErrors.semester = "Semester is required.";
    if (!formData.subjectName)
      newErrors.subjectName = "Subject name is required.";
    if (formData.subjectName.length < 3)
      newErrors.subjectName = "Subject name must be at least 3 characters.";
    if (!formData.oralMarks || isNaN(formData.oralMarks)) {
      newErrors.oralMarks = "Valid oral marks are required.";
    }
    if (!formData.universityMarks || isNaN(formData.universityMarks)) {
      newErrors.universityMarks = "Valid university marks are required.";
    }
    if (!formData.twMarks || isNaN(formData.twMarks)) {
      newErrors.twMarks = "Valid TW marks are required.";
    }
    if (!formData.passFail)
      newErrors.passFail = "Pass/Fail status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    const updatedSubjects = semesterSubjects[formData.semester] || [];
    if (editingIndex === null) {
      updatedSubjects.push(formData);
    } else {
      updatedSubjects[editingIndex] = formData;
    }

    setSemesterSubjects({
      ...semesterSubjects,
      [formData.semester]: updatedSubjects,
    });

    setFormData({
      semester: "",
      subjectName: "",
      oralMarks: "",
      ia1Marks: "",
      ia2Marks: "",
      universityMarks: "",
      twMarks: "",
      passFail: "",
    });
    setEditingIndex(null);
    setErrors({});
  };

  const handleDelete = (semester, index) => {
    const updatedSubjects = semesterSubjects[semester].filter(
      (_, i) => i !== index
    );
    setSemesterSubjects({ ...semesterSubjects, [semester]: updatedSubjects });
  };

  const handleEdit = (semester, index) => {
    const subject = semesterSubjects[semester][index];
    setFormData(subject);
    setEditingIndex(index);
    setErrors({});
  };

  const handleSubmit = () => {
    alert("Form submitted!");
    console.log(semesterSubjects)
    localStorage.setItem("semesterSubjects", JSON.stringify(semesterSubjects));
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-10 shadow-2xl w-full max-xl mx-auto">
          <h1 className="text-2xl font-bold text-black text-left mb-6">
            Current Result Details
          </h1>

          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="semester"
                  className="block text-sm font-medium text-gray-700"
                >
                  Semester
                </label>
                <input
                  type="text"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.semester ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.semester && (
                  <p className="text-red-500 text-sm">{errors.semester}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="subjectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subjectName"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.subjectName ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.subjectName && (
                  <p className="text-red-500 text-sm">{errors.subjectName}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="oralMarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Oral Marks
                </label>
                <input
                  type="text"
                  id="oralMarks"
                  name="oralMarks"
                  value={formData.oralMarks}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.oralMarks ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.oralMarks && (
                  <p className="text-red-500 text-sm">{errors.oralMarks}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="ia1Marks"
                  className="block text-sm font-medium text-gray-700"
                >
                  IA-1 Marks
                </label>
                <input
                  type="text"
                  id="ia1Marks"
                  name="ia1Marks"
                  value={formData.ia1Marks}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.oralMarks ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.ia1Marks && (
                  <p className="text-red-500 text-sm">{errors.ia1Marks}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="ia2Marks"
                  className="block text-sm font-medium text-gray-700"
                >
                  IA-2 Marks
                </label>
                <input
                  type="text"
                  id="ia2Marks"
                  name="ia2Marks"
                  value={formData.ia2Marks}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.ia2Marks ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.ia2Marks && (
                  <p className="text-red-500 text-sm">{errors.ia2Marks}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="universityMarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  University Marks
                </label>
                <input
                  type="text"
                  id="universityMarks"
                  name="universityMarks"
                  value={formData.universityMarks}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.universityMarks
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.universityMarks && (
                  <p className="text-red-500 text-sm">
                    {errors.universityMarks}
                  </p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="twMarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  TW Marks
                </label>
                <input
                  type="text"
                  id="twMarks"
                  name="twMarks"
                  value={formData.twMarks}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.twMarks ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.twMarks && (
                  <p className="text-red-500 text-sm">{errors.twMarks}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="passFail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pass/Fail
                </label>
                <select
                  id="passFail"
                  name="passFail"
                  value={formData.passFail}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.passFail ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                >
                  <option value="">Select</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
                {errors.passFail && (
                  <p className="text-red-500 text-sm">{errors.passFail}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddOrUpdate}
                className="bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 mt-4"
              >
                {editingIndex === null ? "Add Subject" : "Update Subject"}
              </button>
            </div>
          </form>

          {Object.keys(semesterSubjects).length > 0 && (
            <div className="mt-8">
              {Object.entries(semesterSubjects).map(([semester, subjects]) => (
                <div key={semester} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Subject Details for Semester {semester}
                  </h3>
                  <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Subject Name</th>
                        <th className="border px-4 py-2">Oral Marks</th>
                        <th className="border px-4 py-2">IA-1 Marks</th>
                        <th className="border px-4 py-2">IA-2 Marks</th>
                        <th className="border px-4 py-2">University Marks</th>
                        <th className="border px-4 py-2">TW Marks</th>
                        <th className="border px-4 py-2">Pass/Fail</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            {subject.subjectName}
                          </td>
                          <td className="border px-4 py-2">
                            {subject.oralMarks}
                          </td>
                          <td className="border px-4 py-2">
                            {subject.ia1Marks}
                          </td>
                          <td className="border px-4 py-2">
                            {subject.ia2Marks}
                          </td>
                          <td className="border px-4 py-2">
                            {subject.universityMarks}
                          </td>
                          <td className="border px-4 py-2">
                            {subject.twMarks}
                          </td>
                          <td className="border px-4 py-2">
                            {subject.passFail}
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => handleEdit(semester, index)}
                              className="text-blue-600"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(semester, index)}
                              className="text-red-600 ml-2"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-full font-semibold px-4 py-2 md-3rounded-md shadow-sm hover:bg-gray-400"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentD;
