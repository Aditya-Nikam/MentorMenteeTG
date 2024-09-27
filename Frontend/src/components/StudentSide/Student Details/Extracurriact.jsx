import { useState, useEffect } from "react";
import Navbars from "../Navbars";
import { FaTrash, FaEdit } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
import axios from 'axios';

const Extracurriact = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    sem: "",
    activity: "",
    event: "",
    document: null,
  });
  const [SubmissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    const Etccurriact = JSON.parse(localStorage.getItem("Etccurriact"));
    if (Etccurriact) {
      setActivities(Etccurriact);
    }
  }, []);
  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // Handle file upload
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle adding a new activity or updating an existing one
  const addActivity = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (editIndex !== null) {
      const updatedActivities = [...activities];
      updatedActivities[editIndex] = formData;
      setActivities(updatedActivities);
      setEditIndex(null);
    } else {
      setActivities([...activities, formData]);
    }
    // Reset the form fields
    setFormData({
      date: "",
      sem: "",
      activity: "",
      event: "",
      document: null,
    });
    // Show submission success message
    setSubmissionMessage(editIndex !== null ? "Activity updated successfully!" : "Activity added successfully!");

    // Clear the message after a few seconds
    setTimeout(() => {
      setSubmissionMessage("");
    }, 3000);
  };

  // Handle deleting an activity
  const deleteActivity = (index) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  // Handle editing an activity
  const editActivity = (index) => {
    setFormData(activities[index]);
    setEditIndex(index);
  };

  // Handle form submission 
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("email", JSON.parse(localStorage.getItem("loggedInUser")).email);

    const etccurriactWithDocNames = activities.map((activitiy) => ({
      ...activitiy,
      document: activitiy.document ? activitiy.document.name : "N/A", // Replace certificate file with its name
    }));

    formDataObj.append(
      "Etccurriact",
      JSON.stringify(etccurriactWithDocNames)
    );

    activities.forEach((activitiy, index) => {
      if (activitiy.document) {
        formDataObj.append("etcdoc", activitiy.document); // Append actual file to FormData
      }
    });

    try {
      await axios.post("http://localhost:3001/etccurriact", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // alert('Files successfully uploaded!');
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
    localStorage.setItem(
      "Etccurriact",
      JSON.stringify(etccurriactWithDocNames)
    );
    alert("Details successfully submitted!");
    navigate("/careerpath")
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-10 shadow-2xl w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-black text-left mb-6">
            Extra-Curricular Activities
          </h1>

          

          {/* Form */}
          <form className="space-y-6" onSubmit={addActivity}>
            <div className="grid grid-cols-5 gap-4">
              {/* Date */}
              <div className="min-w-[150px]">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  required
                />
              </div>

              {/* Semester Dropdown */}
              <div className="min-w-[150px]">
                <label htmlFor="sem" className="block text-sm font-medium text-gray-700">
                  Semester
                </label>
                <select
                  id="sem"
                  name="sem"
                  value={formData.sem}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  required
                >
                  <option value="">Select a semester</option>
                  <option value="Sem 1">Sem 1</option>
                  <option value="Sem 2">Sem 2</option>
                  <option value="Sem 3">Sem 3</option>
                  <option value="Sem 4">Sem 4</option>
                  <option value="Sem 5">Sem 5</option>
                  <option value="Sem 6">Sem 6</option>
                  <option value="Sem 7">Sem 7</option>
                  <option value="Sem 8">Sem 8</option>
                </select>
              </div>

              {/* Activity Dropdown */}
              <div className="min-w-[150px]">
                <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
                  Activity
                </label>
                <select
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  required
                >
                  <option value="">Select an activity</option>
                  <option value="Sports">Sports</option>
                  <option value="NSS/Social Cell">NSS/Social Cell</option>
                  <option value="Participation">Participation</option>
                  <option value="Prize">Prize</option>
                </select>
              </div>

              {/* Event Name */}
              <div className="min-w-[150px]">
                <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  placeholder="Enter event name"
                  required
                />
              </div>

              {/* Document Upload */}
              <div className="min-w-[150px]">
                <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                  Upload Document
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Add/Update Activity Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm"
              >
                {editIndex !== null ? "Update Activity" : "Add Activity"}
              </button>
            </div>
          </form>

          {/* Activities Table */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Activities List</h2>
            <table className="min-w-full bg-white border border-gray-200 mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Activity</th>
                  <th className="border px-4 py-2">Event Name</th>
                  <th className="border px-4 py-2">Document</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{activity.date}</td>
                    <td className="border px-4 py-2">{activity.sem}</td>
                    <td className="border px-4 py-2">{activity.activity}</td>
                    <td className="border px-4 py-2">{activity.event}</td>
                    <td className="border px-4 py-2"> {activity.document ? (activity.document.name ? activity.document.name : activity.document) : "N/A"}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => editActivity(index)}
                        className="text-blue-600 hover:underline"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => deleteActivity(index)}
                        className="text-red-600 hover:underline ml-2"
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-gray-800 text-white rounded-full font-semibold px-4 py-2 shadow-sm hover:bg-gray-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Extracurriact;