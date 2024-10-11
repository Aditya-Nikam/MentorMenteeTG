const { connection } = require('../../config/dbconfig');
exports.allMentors = () => {
    const query = "SELECT m_id AS id, name FROM mentor.mentors";

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