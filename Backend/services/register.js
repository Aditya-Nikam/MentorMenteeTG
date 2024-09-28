const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../config/dbconfig');
require('dotenv').config();

exports.register = async ({ email, password }) => {
  try {
    const checkUserQuery = 'SELECT uid FROM login WHERE email = ?';

    const userExists = await new Promise((resolve, reject) => {
      connection.query(checkUserQuery, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    // User does not exist, proceed with registration
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = 'INSERT INTO login (email, password, uid, type) VALUES (?, ?, "1", "1")';

    await new Promise((resolve, reject) => {
      connection.query(insertUserQuery, [email, hashedPassword], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Return the token and success message
    return { token, message: 'User registered successfully' };

  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
