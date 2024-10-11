const { connection } = require('../../config/dbconfig');
exports.allStudents = () => {
    const query = "SELECT st_id AS id, name, YEAR(admission_year) as year, department FROM mentor.student_details;";

    return new Promise((resolve, reject) => {
        connection.query(query, async (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err); // Reject the promise in case of error
            }
            resolve(user)
        });
    });
}