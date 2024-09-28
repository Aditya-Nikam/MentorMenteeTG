const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/studentRouter')


const app = express();
const port = 3001;

app.use('',routes);
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
