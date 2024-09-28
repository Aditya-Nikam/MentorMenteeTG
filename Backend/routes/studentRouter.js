const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const {upload,uploads} = require("../utils/multer")

router.use(cors());
router.use(bodyParser.json());
const {login} = require('../services/login');
const {register} = require('../services/register');
const {setData} = require('../services/setData');
const {addData} = require('../services/addData');
const {addInternships} = require('../services/setInternships');

const loginController = require('../controllers/loginController')
const registrationController = require('../controllers/registerController')

router.post('/login', loginController.login);
router.post('/register',registrationController.register);
router.post("/setData",setData);
router.post("/upload",addData);
router.post("/upload_files", uploads, addData);
router.post("/internships",upload.array("internship"),addInternships)
router.post("/cocurriact",upload.array("codoc"),addInternships)
router.post("/etccurriact",upload.array("etcdoc"),addInternships)


module.exports = router;