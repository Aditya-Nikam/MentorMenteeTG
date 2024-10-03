const { connection } = require('../../config/dbconfig');
exports.carrierPath = (body) => {   
    const careerPath = JSON.parse(body.careerPath);
    const { careerOption, higherStudies, placement, entrepreneurship } = careerPath;
    const { universityName, course, country, admissionStatus, exam, score } = higherStudies;
    const { isEntrepreneur, company, registrationStatus, sector, certificationStatus } = entrepreneurship;
    const { companyName, jobProfile, offerLetterStatus, package } = placement;
    const getS_id = "SELECT s_id FROM login WHERE email = ?";

    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], async (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err); // Reject the promise in case of error
            }
            if (user.length > 0) {
                let s_id = user[0].s_id;

                const selectS_id = "SELECT * FROM mentor.student_carrier_option WHERE s_id = ?";

                // Execute the second query
                connection.query(selectS_id, [s_id], (err, result) => {
                    if (err) {
                        console.error("Error fetching student details:", err);
                        return reject(err); // Reject the promise in case of error
                    }

                    // If data already exists, update it
                    if (result.length > 0) {
                        let updateQuery, queryParams;

                        if (careerOption === 'higherStudies') {
                            updateQuery = `UPDATE mentor.student_carrier_option SET 
                                           careerOption = ?, 
                                           university_name = ?, 
                                           course = ?, 
                                           country = ?, 
                                           admission_status = ?, 
                                           exam = ?, 
                                           score = ?, 
                                           company_name = NULL, 
                                           job_profile = NULL, 
                                           offer_letter_status = NULL, 
                                           package = NULL, 
                                           isEntrepreneur = NULL, 
                                           company = NULL, 
                                           registration_status = NULL, 
                                           sector = NULL, 
                                           certificationStatus = NULL 
                                           WHERE s_id = ?;`;
                            queryParams = [careerOption, universityName, course, country, admissionStatus, exam, score, s_id];
                        } else if (careerOption === 'entrepreneurship') {
                            updateQuery = `UPDATE mentor.student_carrier_option SET 
                                           careerOption = ?, 
                                           university_name = NULL, 
                                           course = NULL, 
                                           country = NULL, 
                                           admission_status = NULL, 
                                           exam = NULL, 
                                           score = NULL, 
                                           company_name = NULL, 
                                           job_profile = NULL, 
                                           offer_letter_status = NULL, 
                                           package = NULL, 
                                           isEntrepreneur = ?, 
                                           company = ?, 
                                           registration_status = ?, 
                                           sector = ?, 
                                           certificationStatus = ? 
                                           WHERE s_id = ?;`;
                            queryParams = [careerOption, isEntrepreneur, company, registrationStatus, sector, certificationStatus, s_id];
                        } else if (careerOption === 'placement') {
                            updateQuery = `UPDATE mentor.student_carrier_option SET 
                                           careerOption = ?, 
                                           university_name = NULL, 
                                           course = NULL, 
                                           country = NULL, 
                                           admission_status = NULL, 
                                           exam = NULL, 
                                           score = NULL, 
                                           company_name = ?, 
                                           job_profile = ?, 
                                           offer_letter_status = ?, 
                                           package = ?, 
                                           isEntrepreneur = NULL, 
                                           company = NULL, 
                                           registration_status = NULL, 
                                           sector = NULL, 
                                           certificationStatus = NULL 
                                           WHERE s_id = ?;`;
                            queryParams = [careerOption, companyName, jobProfile, offerLetterStatus, package, s_id];
                        }

                        connection.query(updateQuery, queryParams, (err, result) => {
                            if (err) {
                                console.error("Error updating student details:", err);
                                return reject(err); // Reject the promise in case of error
                            }
                            resolve({ message: `${careerOption} data updated successfully.` });
                        });


                    } else {
                        // If data does not exist, insert it
                        let insertQuery, queryParams;
                        console.log("hehehehehheh");
                        if (careerOption === 'higherStudies') {
                            insertQuery = `INSERT INTO mentor.student_carrier_option (s_id, careerOption, university_name, course, country, admission_status, exam, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
                            queryParams = [s_id, careerOption, universityName, course, country, admissionStatus, exam, score];

                            connection.query(insertQuery, queryParams, (err, result) => {
                                if (err) {
                                    console.error("Error inserting student details:", err);
                                    return reject(err); // Reject the promise in case of error
                                }
                                resolve({ message: `${careerOption} data inserted successfully.` });
                            });
                        } else if (careerOption === 'entrepreneurship') {
                            insertQuery = `INSERT INTO mentor.student_carrier_option (s_id, careerOption, isEntrepreneur, company, registration_status, sector, certificationStatus) VALUES (?, ?, ?, ?, ?, ?, ?);`;
                            queryParams = [s_id, careerOption, isEntrepreneur, company, registrationStatus, sector, certificationStatus];

                            connection.query(insertQuery, queryParams, (err, result) => {
                                if (err) {
                                    console.error("Error inserting student details:", err);
                                    return reject(err); // Reject the promise in case of error
                                }
                                resolve({ message: `${careerOption} data inserted successfully.` });
                            });
                        } else if (careerOption === 'placement') {
                            insertQuery = `INSERT INTO mentor.student_carrier_option (s_id, careerOption, company_name, job_profile, offer_letter_status, package) VALUES (?, ?, ?, ?, ?, ?);`;
                            queryParams = [s_id, careerOption, companyName, jobProfile, offerLetterStatus, package];

                            connection.query(insertQuery, queryParams, (err, result) => {
                                if (err) {
                                    console.error("Error inserting student details:", err);
                                    return reject(err); // Reject the promise in case of error
                                }
                                console.log(result);
                                resolve({ message: `${careerOption} data inserted successfully.` });
                            });
                        }
                    }
                });
            } else {
                reject({ message: "User not found." });
            }
        });
    });
};
