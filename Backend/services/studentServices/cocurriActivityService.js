const { connection } = require('../../config/dbconfig');
const fs = require('fs');
exports.cocurrAct = (body, files) => {
    const cocurriact = JSON.parse(body.Cocurriact);

    const getS_id = "SELECT s_id FROM login WHERE email = ?";
    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], async (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err); // Reject the promise in case of error
            }
            if (user.length > 0) {
                // re/solve(user[0].s_id); // Resolve the promise with token and user
                let s_id = user[0].s_id;

                const selectS_id =
                    "SELECT * FROM mentor.student_cocurricula_activity WHERE s_id = ?";

                // Execute the second query
                connection.query(selectS_id, [s_id], (err, result) => {
                    if (err) {
                        console.error("Error fetching student details:", err);
                        return reject(err); // Reject the promise in case of error
                    }

                    // Resolve with the result of the second query
                    if (result.length > 0) {
                        // Use Promise.all to handle multiple file deletions
                        const deleteFilePromises = result.map(r => {
                            return new Promise((resolveFile, rejectFile) => {
                                if (r.internship_certificate_path) {
                                    fs.access(r.activity_certificate_path, fs.constants.F_OK, (err) => {
                                        if (!err) {
                                            // File exists, remove it
                                            fs.unlink(r.activity_certificate_path, (err) => {
                                                if (err) {
                                                    console.error('Error removing old file:', err);
                                                    return rejectFile(err); // Reject the promise for file deletion
                                                } else {
                                                    resolveFile(); // Resolve the file deletion promise
                                                }
                                            });
                                        } else {
                                            resolveFile(); // File does not exist, resolve immediately
                                        }
                                    });
                                } else {
                                    resolveFile(); // No path, resolve immediately
                                }
                            });
                        });
    
                        // Wait for all file deletions to complete
                        Promise.all(deleteFilePromises)
                            .then(() => {
                                const deleteInternshipQuery = `DELETE FROM mentor.student_cocurricula_activity WHERE s_id = ?`;
                                connection.query(deleteInternshipQuery, [s_id], (err) => {
                                    if (err) {
                                        console.error("Error deleting student internship details:", err);
                                        return reject(err);
                                    }
    
                                    // Proceed with insertion after successful deletion
                                    insertActivityRecords(s_id, cocurriact, resolve, reject, files);
                                });
                            })
                            .catch(reject); // Reject if any file deletion fails
                    } else {
                        // No existing records, proceed directly to insertion
                        insertActivityRecords(s_id, cocurriact, resolve, reject, files);
                    }
                });
            }
        });
    })
}

//  Function to handle insertion logic
const insertActivityRecords = (s_id, cocurriact, resolve, reject, files) => {
    const insertActivityQuery = `INSERT INTO mentor.student_cocurricula_activity 
        (s_id, date, semester, activity, status, activity_certificate, activity_certificate_path) 
        VALUES `;

    const valueSets = [];
    const values = [];

    cocurriact.forEach(activity => {
        const {
            date,
            sem: semester, // renamed to match the DB field
            activity: activityName,
            status,
            document // Document (certificate) file name from the request
        } = activity;

        // Find the corresponding certificate file path
        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === document) {
                certificatePath = file.path;
            }
        });

        valueSets.push(`(?, ?, ?, ?, ?, ?, ?)`); // For values (s_id, date, semester, activity, status, certificate, certificatePath)
        values.push(s_id, date, semester, activityName, status, document, certificatePath);
    });

    const finalQuery = insertActivityQuery + valueSets.join(', ');

    // Execute the SQL query
    connection.query(finalQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting student co-curricular activity details:", err);
            return reject(err);
        }
        resolve({ message: "Student co-curricular activity details inserted successfully: " + result });
    });
};
