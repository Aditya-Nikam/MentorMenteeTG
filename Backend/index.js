const express = require('express');
const cors = require('cors');
const { connection } = require('./config/dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require("multer");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const {login} = require('./services/login');
const {register} = require('./services/register');
const {setData} = require('./services/setData');
const {addData} = require('./services/addData');
const {addInternships} = require('./services/setInternships');

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    const email = req.body.email;
    const uploadPath = path.join(__dirname, './public/uploads', email);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    return cb(null,uploadPath);
  },
  filename: function(req, file, cb){
    return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
})

const upload = multer({ storage: storage});
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const uploads = upload.fields([
  { name: 'tenthMarksheet', maxCount: 1 },
  { name: 'twelfthMarksheet', maxCount: 1 },
  { name: 'diplomaMarsheet', maxCount: 1 },
  { name: 'gapCertificate', maxCount: 1 },
]);


app.post('/login', login);
app.post('/register', register);
app.post("/setData",setData);
app.post("/upload",addData);
app.post("/upload_files", uploads, addData);
app.post("/internships",upload.array("certificates"),addInternships)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
