const fs = require('fs');
const { connection } = require("../../config/dbconfig");

exports.pydetails = (body, files) => {
    const pydetails = JSON.parse(body.pydetails);
    const {
        tenthMarks,
        tenthPercentage,
        tenthPassingYear,
        twelfthMarks,
        twelfthPercentage,
        twelfthPassingYear,
        diplomaMarks,
        diplomaPercentage,
        diplomaPassingYear,
        gap
    } = pydetails;

    const getS_id = "SELECT s_id FROM login WHERE email = ?";

    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], async (err, user) => {
            if (err) {
                console.error("Error fetching user data:", err);
                return reject(err);
            }

            if (user.length > 0) {
                const s_id = user[0].s_id;
                const selectS_id = "SELECT * FROM mentor.student_pydetails WHERE s_id = ?";

                connection.query(selectS_id, [s_id], async (err, result) => {
                    if (err) {
                        console.error("Error fetching student details:", err);
                        return reject(err);
                    }

                    if (result.length > 0) {
                        // Function to remove old files
                        const removeOldFile = (filePath) => {
                            return new Promise((resolve, reject) => {
                                if (!filePath) {
                                    console.log('No old file to remove');
                                    return resolve();
                                }

                                // console.log(`Attempting to remove file: ${filePath}`);
                                fs.access(filePath, fs.constants.F_OK, (err) => {
                                    if (err) {
                                        console.log(`File does not exist: ${filePath}`);
                                        return resolve(); // If the file doesn't exist, resolve the promise.
                                    }

                                    fs.unlink(filePath, (err) => {
                                        if (err) {
                                            console.error(`Error removing file: ${filePath}`, err);
                                            return reject({ message: `Error removing file: ${filePath}` });
                                        } else {
                                            console.log(`File successfully removed: ${filePath}`);
                                            return resolve();
                                        }
                                    });
                                });
                            });
                        };

                        const removalPromises = [];

                        var tenthMarksheet = null;
                        if (files.tenthMarksheet && files.tenthMarksheet[0]?.path) {
                            tenthMarksheet = files.tenthMarksheet[0].path;
                            removalPromises.push(removeOldFile(result[0].tenth_marksheet));
                        }

                        var twelfthMarksheet = null;
                        if (files.twelfthMarksheet && files.twelfthMarksheet[0]?.path) {
                            twelfthMarksheet = files.twelfthMarksheet[0].path;
                            removalPromises.push(removeOldFile(result[0].twelth_marksheet));
                        }

                        var diplomaMarksheet = null;
                        if (files.diplomaMarksheet && files.diplomaMarksheet[0]?.path) {
                            diplomaMarksheet = files.diplomaMarksheet[0].path;
                            removalPromises.push(removeOldFile(result[0].diploma_marksheet));
                        }

                        var gapCertificate = null;
                        if (files.gapCertificate && files.gapCertificate[0]?.path) {
                            gapCertificate = files.gapCertificate[0].path;
                            removalPromises.push(removeOldFile(result[0].gap_certificate));
                        }

                        try {
                            await Promise.all(removalPromises);
                        } catch (error) {
                            return reject(error);
                        }

                        // Update existing student details
                        const updateStudentPYDetailsQuery = `UPDATE mentor.student_pydetails SET tenth_marks = ?, tenth_percent = ?, tenth_passing_year = ?, tenth_marksheet = COALESCE(?, tenth_marksheet), twelth_marks = ?, twelth_percent = ?, twelth_passing_year = ?, twelth_marksheet = COALESCE(?, twelth_marksheet), diploma_marks = ?, diploma_percent = ?, diploma_passing_year = ?, diploma_marksheet = COALESCE(?, diploma_marksheet), has_gap = ?, gap_certificate = COALESCE(?, gap_certificate) WHERE s_id = ?;`;

                        connection.query(updateStudentPYDetailsQuery,
                            [tenthMarks, tenthPercentage, tenthPassingYear, tenthMarksheet,
                                twelfthMarks, twelfthPercentage, twelfthPassingYear, twelfthMarksheet,
                                diplomaMarks, diplomaPercentage, diplomaPassingYear, diplomaMarksheet,
                                gap, gapCertificate, s_id],
                            (err, result) => {
                                if (err) {
                                    console.error("Error updating student details:", err);
                                    return reject(err);
                                }
                                resolve({ message: "Student details updated successfully: " + result });
                            }
                        );

                    } else {
                        // Insert new student details
                        const insertStudentPYDetailsQuery = `INSERT INTO mentor.student_pydetails (s_id, tenth_marks, tenth_percent, tenth_passing_year, tenth_marksheet, twelth_marks, twelth_percent, twelth_passing_year, twelth_marksheet, diploma_marks, diploma_percent, diploma_passing_year, diploma_marksheet, has_gap, gap_certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

                        connection.query(insertStudentPYDetailsQuery,
                            [s_id, tenthMarks, tenthPercentage, tenthPassingYear, tenthMarksheet,
                                twelfthMarks, twelfthPercentage, twelfthPassingYear, twelfthMarksheet,
                                diplomaMarks, diplomaPercentage, diplomaPassingYear, diplomaMarksheet,
                                gap, gapCertificate],
                            (err, result) => {
                                if (err) {
                                    console.error("Error inserting student details:", err);
                                    return reject(err);
                                }
                                resolve({ message: "Student details inserted successfully: " + result });
                            }
                        );
                    }
                });
            } else {
                reject(new Error("No user found with the provided email"));
            }
        });
    });
};

exports.getPyDetails = (email)=>{
    return new Promise(async (resolve, reject) => {
        const query = `SELECT * FROM mentor.student_pydetails WHERE s_id = (SELECT s_id FROM login WHERE email = ?);`;
    
        connection.query(query,[email],async (err, user) => {
            if (err) {
              console.error("Error updating parent details:", err);
              return reject(err); // Reject the promise in case of error
            }
            const {
                tenth_marks,
                tenth_percent,
                tenth_passing_year,
                tenth_marksheet,
                twelth_marks,
                twelth_percent,
                twelth_passing_year,
                twelth_marksheet,
                diploma_marks,
                diploma_percent,
                diploma_passing_year,
                diploma_marksheet,
                has_gap,
                gap_certificate
              }=user[0];
              const obj = {
                tenth_marks,
                tenth_percent,
                tenth_passing_year,
                tenth_marksheet,
                twelth_marks,
                twelth_percent,
                twelth_passing_year,
                twelth_marksheet,
                diploma_marks,
                diploma_percent,
                diploma_passing_year,
                diploma_marksheet,
                has_gap,
                gap_certificate
              }

            resolve(obj);
        });   
      });
}   