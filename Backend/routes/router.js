const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { upload, uploads } = require("../utils/multer")

router.use(cors());
router.use(bodyParser.json());

const { addInternships } = require('../services/setInternships');

const loginController = require('../controllers/loginController')
const registrationController = require('../controllers/registerController')
const personaldetailsController = require('../controllers/studentControllers/personalDetailsController')
const prevYearController = require('../controllers/studentControllers/prevYearController')
const currentYearController = require('../controllers/studentControllers/currentYearController')


// Student Routes
router.post('/login', loginController.login);
router.post('/register', registrationController.register);
router.post('/personaldetails', upload.none(), personaldetailsController.personaldetails);
router.post("/pydetails", uploads, prevYearController.pydetails);
router.post("/cydetails", upload.none(), currentYearController.cydetails);
router.post("/internships", upload.array("internship"), addInternships)
router.post("/cocurriact", upload.array("codoc"), addInternships)
router.post("/etccurriact", upload.array("etcdoc"), addInternships)


module.exports = router;