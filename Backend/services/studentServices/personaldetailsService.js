const { connection } = require("../../config/dbconfig");

exports.personaldetails = ({ studentDetails, parentDetails }) => {
  studentDetails = JSON.parse(studentDetails);
  parentDetails = JSON.parse(parentDetails);
  console.log({ studentDetails, parentDetails });

  const {
    name,
    gender,
    email,
    admissionYear,
    department,
    program,
    mobileNumber,
    dob,
    currentAddress,
    permanentAddress,
  } = studentDetails;

  const {
    fatherName,
    fatherMobile,
    fatherEmail,
    motherName,
    motherMobile,
    motherEmail,
    mentorName,
  } = parentDetails;
  const getS_id = "SELECT s_id FROM login WHERE email = ?";
  const s_id = new Promise((resolve, reject) => {
    connection.query(getS_id, [email], async (err, user) => {
      if (err) {
        console.error("Error fetching data:", err);
        return reject(err); // Reject the promise in case of error
      }
      if (user.length > 0) {
        // re/solve(user[0].s_id); // Resolve the promise with token and user
        let s_id = user[0].s_id;

        const selectS_id =
          "SELECT * FROM mentor.student_details WHERE s_id = ?";

        // Execute the second query
        connection.query(selectS_id, [s_id], (err, result) => {
          if (err) {
            console.error("Error fetching student details:", err);
            return reject(err); // Reject the promise in case of error
          }

          // Resolve with the result of the second query
          if (result.length > 0) {
            const updateStudentDetailsQuery = `UPDATE mentor.student_details SET name = ?, date_of_birth = ?, admission_year = ?, program = ?, department = ?, email = ?, mentor = ?, current_address = ?, permanent_address = ?, mobile_number = ?,gender = ? WHERE s_id = ?;`;
            connection.query(
              updateStudentDetailsQuery,
              [
                name,
                dob,
                admissionYear,
                program,
                department,
                email,
                mentorName,
                currentAddress,
                permanentAddress,
                mobileNumber,
                gender,
                s_id,
              ],
              async (err, user) => {
                if (err) {
                  console.error("Error fetching data:", err);
                  return reject(err); // Reject the promise in case of error
                }
                resolve({ message: "Successfully uploaded files" });
              }
            );
          } else {
            const studentDetailsQuery = `
                            INSERT INTO \mentor\.\student_details\
                            (s_id, name, date_of_birth, admission_year, program, department, email, mentor, current_address, permanent_address, mobile_number, gender )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            connection.query(
              studentDetailsQuery,
              [
                s_id,
                name,
                dob,
                admissionYear,
                program,
                department,
                email,
                mentorName,
                currentAddress,
                permanentAddress,
                mobileNumber,
                gender,
              ],
              async (err, user) => {
                if (err) {
                  console.error("Error fetching data:", err);
                  return reject(err); // Reject the promise in case of error
                }
                resolve({ message: "Successfully uploaded files" });
              }
            );
          }
        });

        // insert parent detail query
        const selectd = "SELECT * FROM mentor.parent_details WHERE s_id = ?";

        // Execute the second query
        connection.query(selectd, [s_id], (err, result1) => {
          if (err) {
            console.error("Error fetching student details:", err);
            return reject(err); // Reject the promise in case of error
          }

          if (result1.length > 0) {
            const updateParentDetailsQuery = `UPDATE mentor.parent_details SET father_name = ?, father_contact = ?, father_email = ?, mother_name = ?, mother_contact = ?, mother_email = ? WHERE s_id = ?;`;

            connection.query(
              updateParentDetailsQuery,
              [
                fatherName,
                fatherMobile,
                fatherEmail,
                motherName,
                motherMobile,
                motherEmail,
                s_id,
              ],
              async (err, user) => {
                if (err) {
                  console.error("Error updating parent details:", err);
                  return reject(err); // Reject the promise in case of error
                }
                resolve({ message: "Successfully updated parent details" });
              }
            );
          } else {
            const insertParentDetailsQuery = `INSERT INTO mentor.parent_details (s_id, father_name, father_contact, father_email, mother_name, mother_contact, mother_email) VALUES (?, ?, ?, ?, ?, ?, ?);`;
            connection.query(
              insertParentDetailsQuery,
              [
                s_id,
                fatherName,
                fatherMobile,
                fatherEmail,
                motherName,
                motherMobile,
                motherEmail,
              ],
              async (err, user) => {
                if (err) {
                  console.error("Error inserting parent details:", err);
                  return reject(err); // Reject the promise in case of error
                }
                resolve({ message: "Successfully inserted parent details" });
              }
            );
          }
        });
      }
    });
  });
};
