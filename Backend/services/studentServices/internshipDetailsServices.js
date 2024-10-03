const { connection } = require('../../config/dbconfig');
const fs = require('fs');

exports.intdetails = (body, files) => {
    const internships = JSON.parse(body.internships);
    const getS_id = "SELECT s_id FROM login WHERE email = ?";

    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err);
            }

            if (user.length === 0) {
                return reject(new Error("No user found with the provided email."));
            }

            let s_id = user[0].s_id;
            const selectInternships = "SELECT * FROM mentor.students_internships WHERE s_id = ?";

            connection.query(selectInternships, [s_id], (err, result) => {
                if (err) {
                    console.error("Error fetching internship details:", err);
                    return reject(err);
                }

                // If records exist, delete them before inserting new ones
                if (result.length > 0) {
                    // Use Promise.all to handle multiple file deletions
                    const deleteFilePromises = result.map(r => {
                        return new Promise((resolveFile, rejectFile) => {
                            if (r.internship_certificate_path) {
                                fs.access(r.internship_certificate_path, fs.constants.F_OK, (err) => {
                                    if (!err) {
                                        // File exists, remove it
                                        fs.unlink(r.internship_certificate_path, (err) => {
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
                            const deleteInternshipQuery = `DELETE FROM mentor.students_internships WHERE s_id = ?`;
                            connection.query(deleteInternshipQuery, [s_id], (err) => {
                                if (err) {
                                    console.error("Error deleting student internship details:", err);
                                    return reject(err);
                                }

                                // Proceed with insertion after successful deletion
                                insertInternshipRecords(s_id, internships, resolve, reject, files);
                            });
                        })
                        .catch(reject); // Reject if any file deletion fails
                } else {
                    // No existing records, proceed directly to insertion
                    insertInternshipRecords(s_id, internships, resolve, reject, files);
                }
            });
        });
    });
};

// Function to handle insertion logic
const insertInternshipRecords = (s_id, internships, resolve, reject, files) => {
    const insertInternshipQuery = `INSERT INTO mentor.students_internships (s_id, company_name, job_profile, start_date, end_date, stipent_status, stipent, internship_cerificate, internship_certificate_path) VALUES `;
    
    const valueSets = [];
    const values = [];

    internships.forEach(internship => {
        const {
            companyName,
            jobProfile,
            startDate,
            endDate,
            stipendStatus,
            stipend,
            certificate
        } = internship;

        // Get the certificate path
        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === certificate) {
                certificatePath = file.path;
            }
        });

        valueSets.push(`(?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        values.push(s_id, companyName, jobProfile, startDate, endDate, stipendStatus, stipend, certificate, certificatePath);
    });

    const finalQuery = insertInternshipQuery + valueSets.join(', ');

    connection.query(finalQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting student internship details:", err);
            return reject(err);
        }
        resolve({ message: "Student internship details inserted successfully: " + result });
    });
};
