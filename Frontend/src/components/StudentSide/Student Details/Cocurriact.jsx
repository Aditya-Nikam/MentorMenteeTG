import { useState, useEffect } from "react";
import Navbars from "../Navbars";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from 'axios';
import {useNavigate } from "react-router-dom";

const Cocurriact = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    date: "",
    sem: "",
    activity: "",
    status: "",
    document: null,
  });
  const [editIndex, setEditIndex] = useState(null); 

  useEffect(() => {
    const Cocurriact = JSON.parse(localStorage.getItem("Cocurriact"));
    if (Cocurriact) {
      setActivities(Cocurriact);
    }
  }, []);
  // Handle input changes for new activity fields
  const handleNewActivityChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setNewActivity({ ...newActivity, [name]: files[0] });
    } else {
      setNewActivity({ ...newActivity, [name]: value });
    }
  };

  // Handle adding or updating an activity
  const handleActivitySubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing activity
      const updatedActivities = activities.map((activity, index) =>
        index === editIndex ? newActivity : activity
      );
      setActivities(updatedActivities);
      setEditIndex(null); // Reset edit index
    } else {
      // Add new activity
      setActivities([...activities, newActivity]);
    }
    setNewActivity({
      date: "",
      sem: "",
      activity: "",
      status: "",
      document: null,
    });
  };

  // Handle deleting an activity
  const deleteActivity = (index) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  // Handle filling in the form for editing
  const handleEditActivity = (index) => {
    setNewActivity(activities[index]);
    setEditIndex(index); // Set the index of the activity being edited
  };

  // Handle form submission 
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Activities Data Submitted:", activities);
    const formDataObj = new FormData();
    formDataObj.append("email", JSON.parse(localStorage.getItem("loggedInUser")).email);

    const CocurriactWithDocNames = activities.map((activitiy) => ({
      ...activitiy,
      document: activitiy.document ? activitiy.document.name : "N/A", // Replace certificate file with its name
    }));

    formDataObj.append(
      "Cocurriact",
      JSON.stringify(CocurriactWithDocNames)
    );

    activities.forEach((activitiy, index) => {
      if (activitiy.document) {
        formDataObj.append("codoc", activitiy.document); // Append actual file to FormData
      }
    });

    try {
      await axios.post("http://localhost:3001//cocurriact", formDataObj, {
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
      "Cocurriact",
      JSON.stringify(CocurriactWithDocNames)
    );
    navigate("/extracurriact")
    alert("Details successfully submitted!");
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-10 shadow-2xl w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-black text-left mb-6">
            Co-Curricular Activities
          </h1>

          {/* Form to Add or Update Activity */}
          <form onSubmit={handleActivitySubmit} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newActivity.date}
                  onChange={handleNewActivityChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Semester</label>
                <select
                  name="sem"
                  value={newActivity.sem}
                  onChange={handleNewActivityChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
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
              <div>
                <label className="block mb-1">Activity</label>
                <select
                  name="activity"
                  value={newActivity.activity}
                  onChange={handleNewActivityChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                  required
                >
                  <option value="">Select an activity</option>
                  <option value="Conference">Conference</option>
                  <option value="Paper Published">Paper Published</option>
                  <option value="Professional Society Workshop">Professional Society Workshop</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newActivity.status}
                  onChange={handleNewActivityChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                  placeholder="Enter status"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Document</label>
                <input
                  type="file"
                  name="document"
                  onChange={handleNewActivityChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm"
            >
              {editIndex !== null ? "Update Activity" : "Add Activity"}
            </button>
          </form>

          {/* Table to Display Activities */}
        < div className="mt-6">
          <h2 className="text-xl font-semibold "> Activities List</h2>
          <table className="table-auto w-full border-collapse">
            
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">Activity</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Document</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{activity.date || "-"}</td>
                  <td className="border px-4 py-2">{activity.sem || "-"}</td>
                  <td className="border px-4 py-2">{activity.activity || "-"}</td>
                  <td className="border px-4 py-2">{activity.status || "-"}</td>
                  <td className="border px-4 py-2">
                    {activity.document ? (activity.document.name ? activity.document.name : activity.document) : "N/A"}
                  </td >
                  <td className="border px-4 py-2 text-center">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEditActivity(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteActivity(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Button (optional, if needed for another purpose) */}
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

export default Cocurriact;  