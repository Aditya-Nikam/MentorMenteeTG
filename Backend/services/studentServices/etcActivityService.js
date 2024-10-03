const { connection } = require('../../config/dbconfig');
const fs = require('fs');
exports.etcActivity = (body, files) => {
    const etccurriact = JSON.parse(body.Etccurriact);
    console.log(etccurriact);
    console.log(files);

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
                    "SELECT * FROM mentor.student_etc_activity WHERE s_id = ?";

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
                                if (r.event_certificate_path) {
                                    fs.access(r.event_certificate_path, fs.constants.F_OK, (err) => {
                                        if (!err) {
                                            // File exists, remove it
                                            fs.unlink(r.event_certificate_path, (err) => {
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
                                const deleteInternshipQuery = `DELETE FROM mentor.student_etc_activity WHERE s_id = ?`;
                                connection.query(deleteInternshipQuery, [s_id], (err) => {
                                    if (err) {
                                        console.error("Error deleting student internship details:", err);
                                        return reject(err);
                                    }
    
                                    // Proceed with insertion after successful deletion
                                    insertEventRecords(s_id, etccurriact, resolve, reject, files);
                                });
                            })
                            .catch(reject); // Reject if any file deletion fails
                    } else {
                        // No existing records, proceed directly to insertion
                        insertEventRecords(s_id, etccurriact, resolve, reject, files);
                    }
                });
            }
        });
    })
}

//  Function to handle insertion logic
const insertEventRecords = (s_id, etccurriact, resolve, reject, files) => {
    const insertEventQuery = `INSERT INTO mentor.student_etc_activity 
        (s_id, date, semester, activity, event_name, event_certificate, event_certificate_path) 
        VALUES `;

    const valueSets = [];
    const values = [];

    etccurriact.forEach(event => {
        const {
            date,
            sem: semester, // renamed to match the DB field
            activity,
            event: eventName, // event is renamed to eventName to match the DB field
            document // Document (certificate) file name from the request
        } = event;

        // Find the corresponding certificate file path
        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === document) {
                certificatePath = file.path;
            }
        });

        valueSets.push(`(?, ?, ?, ?, ?, ?, ?)`); // For values (s_id, date, semester, activity, event_name, event_certificate, event_certificate_path)
        values.push(s_id, date, semester, activity, eventName, document, certificatePath);
    });

    const finalQuery = insertEventQuery + valueSets.join(', ');

    // Execute the SQL query
    connection.query(finalQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting student event activity details:", err);
            return reject(err);
        }
        resolve({ message: "Student event activity details inserted successfully: " + result });
    });
};
