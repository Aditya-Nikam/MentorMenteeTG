import React from 'react';

const SemesterTable = ({ semesters, deleteSemesterDetails }) => {
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Semester</th>
            <th className="px-4 py-2">Grade</th>
            <th className="px-4 py-2">Total Number of Internal K.T.</th>
            <th className="px-4 py-2">Total Number of External K.T.</th>
            <th className="px-4 py-2">Total Number of K.T.</th>
            <th className="px-4 py-2">Aggregate</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((semester, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{semester.semester}</td>
              <td className="border px-4 py-2">{semester.grade}</td>
              <td className="border px-4 py-2">{semester.internalKT}</td>
              <td className="border px-4 py-2">{semester.externalKT}</td>
              <td className="border px-4 py-2">{semester.totalKT}</td>
              <td className="border px-4 py-2">{semester.aggregate}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteSemesterDetails(index)}
                  className="bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SemesterTable;