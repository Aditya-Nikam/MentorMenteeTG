const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../config/dbconfig');
require("dotenv").config();

const register =  async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const checkUserQuery = 'SELECT uid FROM login WHERE email = ?';

  connection.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data from database.');
      return;
    }

    if (results.length > 0) {
      // User already exists
      res.status(409).json({ message: 'User already exists' });
    } else {
      // User does not exist, proceed with registration
      const insertUserQuery = 'INSERT INTO login (email, password, uid, type) VALUES (?, ?, "1", "1")';

      // Hash the password before saving it to the database
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Error processing request.');
          return;
        }

        connection.query(insertUserQuery, [email, hashedPassword], (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data into database.');
            return;
          }

          // Generate JWT token
          const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

          res.status(201).json({ token, message: 'User registered successfully' });
        });
      });
    }
  });
}
  
  module.exports = {
    register,
  };
  