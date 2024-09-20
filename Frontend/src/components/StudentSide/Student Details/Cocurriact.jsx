import { useState } from "react";
import Navbars from "../Navbars";

const Cocurriact = () => {
  const [activities, setActivities] = useState([
    {
      date: "",
      sem: "",
      activity: "",
      status: "",
      document: null,
      isOtherActivity: false, 
    },
  ]);

  // Handle form input change for each activity
  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newActivities = [...activities];
    if (name === "document") {
      newActivities[index][name] = files[0]; 
    } else {
      newActivities[index][name] = value;
    }
    setActivities(newActivities);
  };

  // Handle adding a new activity
  const addActivity = () => {
    setActivities([
      ...activities,
      {
        date: "",
        sem: "",
        activity: "",
        status: "",
        document: null,
        isOtherActivity: false,
      },
    ]);
  };

  // Handle deleting an activity
  const deleteActivity = (index) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Activities Data Submitted:", activities);
    alert("Details successfully submitted!");
  };

  // Handle change in activity dropdown
  const handleActivityChange = (index, e) => {
    const newActivities = [...activities];
    const value = e.target.value;
    newActivities[index].activity = value;
    newActivities[index].isOtherActivity = value === "Other";
    setActivities(newActivities);
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-10 shadow-2xl w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-black text-left mb-6">
            Co-Curricular Activities
          </h1>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {activities.map((activity, index) => (
              <div key={index} className="border p-4 rounded-md shadow-sm space-y-4">
                <div className="flex flex-wrap gap-4">
                  {/* Date */}
                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor={`date-${index}`} className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id={`date-${index}`}
                      name="date"
                      value={activity.date}
                      onChange={(e) => handleChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                      required
                    />
                  </div>

                  {/* Semester Dropdown */}
                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor={`sem-${index}`} className="block text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <select
                      id={`sem-${index}`}
                      name="sem"
                      value={activity.sem}
                      onChange={(e) => handleChange(index, e)}
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

                  {/* Activity Details */}
                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor={`activity-${index}`} className="block text-sm font-medium text-gray-700">
                      Activity
                    </label>
                    <select
                      id={`activity-${index}`}
                      name="activity"
                      value={activity.activity}
                      onChange={(e) => handleActivityChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                      required
                    >
                      <option value="">Select an activity</option>
                      <option value="Conference">Conference</option>
                      <option value="Paper Published">Paper Published</option>
                      <option value="Professional Society Workshop">Professional Society Workshop</option>
                      <option value="Other">Other</option>
                    </select>

                    {/* Other Activity Input */}
                    {activity.isOtherActivity && (
                      <input
                        type="text"
                        name="activity"
                        value={activity.activity}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Enter other activity"
                        className="mt-2 block w-full px-3 py-2 border border-gray-700 rounded-md"
                        required
                      />
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor={`status-${index}`} className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <input
                      type="text"
                      id={`status-${index}`}
                      name="status"
                      value={activity.status}
                      onChange={(e) => handleChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                      placeholder="Enter status"
                      required
                    />
                  </div>

                  {/* Document Upload */}
                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor={`document-${index}`} className="block text-sm font-medium text-gray-700">
                      Upload Document
                    </label>
                    <input
                      type="file"
                      id={`document-${index}`}
                      name="document"
                      onChange={(e) => handleChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                      required
                    />
                  </div>
                </div>

                {/* Delete Activity Button */}
                {activities.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 hover:underline mt-2"
                    onClick={() => deleteActivity(index)}
                  >
                    Delete Activity
                  </button>
                )}
              </div>
            ))}

            {/* Add New Activity Button */}
            <button
              type="button"
              className="bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm"
              onClick={addActivity}
            >
              Add Another Activity
            </button>

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
    </>
  );
};

export default Cocurriact;
