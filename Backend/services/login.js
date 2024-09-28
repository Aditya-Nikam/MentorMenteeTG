const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../config/dbconfig');
require('dotenv').config();

exports.login = ({ email, password }) => {
  const query = 'SELECT uid, type, password FROM login WHERE email = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [email], async (err, user) => {
      if (err) {
        console.error('Error fetching data:', err);
        return reject(err); // Reject the promise in case of error
      }
      if (user.length > 0 && await bcrypt.compare(password, user[0].password)) {
        const token = jwt.sign({ username: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        let {uid, type} = user[0];
        resolve({ token, user: {uid, type} }); // Resolve the promise with token and user
      } else {
        resolve(null); // Resolve with null if login fails
      }
    });
  });
};
