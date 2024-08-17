const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { connection } = require('./config/dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT
const SECRET_KEY = 'adinik';

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // console.log(email+":"+password);
  // console.log(req.body);
  const query = 'SELECT uid, type, password FROM login WHERE email = ?';

  connection.query(query, [email], async (err, user) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data from database.');
      return;
    }
    if (user && await bcrypt.compare(password, user[0].password)) {
      // console.log(user);
      const token = jwt.sign({ username: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, user });
    } else {
      res.status(401).send('Invalid credentials');
    }
    // console.log( user );
  });
});


app.post('/register', async (req, res) => {
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
          const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

          res.status(201).json({ token, message: 'User registered successfully' });
        });
      });
    }
  });
});

app.post("/setData", (req, res) => {
  console.log("hehe")
  const { personalInfo, semesters, internshipInfo, achievements } = req.body;
  const personalInfoQuery = `
  INSERT INTO \`mentor\`.\`studentinfo\` (id, name, program, branch, email, phone, dob)
  VALUES ((SELECT id FROM \`mentor\`.\`login\` WHERE email = ?), ?, ?, ?, ?, ?, ?);`;
  
  const { name, program, branch, email, phone, dob } = personalInfo;

  connection.query(personalInfoQuery, [email, name, program, branch, email, phone, dob], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data into database.');
      return;
    }
    res.status(201).json({ message: 'Data added successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
