const { connection } = require('../../config/dbconfig');

exports.cydetails = (body) => {
    const semesterSubjects = JSON.parse(body.semesterSubjects);
    const getS_id = "SELECT s_id FROM login WHERE email = ?";
    
    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err); // Reject the promise in case of error
            }

            if (user.length === 0) {
                return reject(new Error("No user found with the provided email.")); // Reject if no user found
            }

            let s_id = user[0].s_id;
            const selectS_id = "SELECT * FROM mentor.student_currentdetails WHERE s_id = ?";

            // Execute the second query
            connection.query(selectS_id, [s_id], (err, result) => {
                if (err) {
                    console.error("Error fetching student details:", err);
                    return reject(err); // Reject the promise in case of error
                }

                // If records exist, delete them before inserting new ones
                if (result.length > 0) {
                    const deleteStudentCurrentDetailsQuery = `DELETE FROM mentor.student_currentdetails WHERE s_id = ?`;
                    connection.query(deleteStudentCurrentDetailsQuery, [s_id], (err) => {
                        if (err) {
                            console.error("Error deleting student current details:", err);
                            return reject(err); // Reject the promise in case of error
                        }

                        // Proceed with insertion after successful deletion
                        insertStudentCurrentDetails(s_id, semesterSubjects, resolve, reject);
                    });
                } else {
                    // No existing records, proceed directly to insertion
                    insertStudentCurrentDetails(s_id, semesterSubjects, resolve, reject);
                }
            });
        });
    });
};

// Function to handle insertion logic
const insertStudentCurrentDetails = (s_id, semesterSubjects, resolve, reject) => {
    const insertStudentCurrentDetailsQuery = `INSERT INTO mentor.student_currentdetails (s_id, semester, subject, oral_marks, ia_1marks, ia_2_marks, university_marks, term_work_marks, pass_fail) VALUES `;

    // Initialize an array to hold all the value sets
    const valueSets = [];
    // Initialize an array to hold the actual values
    const values = [];

    // Iterate over the data object
    Object.entries(semesterSubjects).forEach(([key, subjects]) => {
        subjects.forEach(subject => {
            // Destructure the subject object
            const {
                semester,
                subjectName,
                oralMarks,
                ia1Marks,
                ia2Marks,
                universityMarks,
                twMarks,
                passFail,
            } = subject;

            // Append the values for this subject to the valueSets array
            valueSets.push(`(?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            values.push(s_id, semester, subjectName, oralMarks, ia1Marks, ia2Marks, universityMarks, twMarks, passFail);
        });
    });

    // Join all the value sets with commas
    const finalQuery = insertStudentCurrentDetailsQuery + valueSets.join(', ');

    // Execute the query
    connection.query(finalQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting student current details:", err);
            return reject(err);
        }
        resolve({ message: "Student current details inserted successfully: " + result });
    });
};
exports.getCyDetails = (email)=>{
    return new Promise(async (resolve, reject) => {
        const query = `SELECT * FROM mentor.student_currentdetails WHERE s_id = (SELECT s_id FROM login WHERE email = ?);`;
    
        connection.query(query,[email],async (err, records) => {
            if (err) {
              console.error("Error updating parent details:", err);
              return reject(err); // Reject the promise in case of error
            }
            let data = [];
            records.forEach(element => {
                let obj = {
                    semester:element.semester,
                    subjectName:element.subject,
                    oralMarks:element.oral_marks,
                    ia1Marks:element.ia_1marks,
                    ia2Marks:element.ia_2marks,
                    universityMarks:element.university_marks,
                    twMarks:element.term_work_marks,
                    passFail:element.pass_fail
                }
                data.push(obj);
            });
            resolve(data);
        });   
      });
}   