const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../config/dbconfig');
require("dotenv").config();


const login = (req, res) => {
  const { email, password } = req.body;
  // console.log(email+":"+password);
  console.log(req.body);
  const query = 'SELECT uid, type, password FROM login WHERE email = ?';

  connection.query(query, [email], async (err, user) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data from database.');
      return;
    }
    if (user && await bcrypt.compare(password, user[0].password)) {
      // console.log(user);
      const token = jwt.sign({ username: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, user });
    } else {
      res.status(401).send('Invalid credentials');
    }
    // console.log( user );
  });
}

module.exports = {
  login,
};
