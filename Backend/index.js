const express = require('express');
const cors = require('cors');
const { connection } = require('./config/dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const {login} = require('./services/login');
const {register} = require('./services/register');
const {setData} = require('./services/setData');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());


app.post('/login', login);
app.post('/register', register);
app.post("/setData",setData);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
