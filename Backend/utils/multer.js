const multer = require("multer");
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      const email = req.body.email;
      const uploadPath = path.join(__dirname, '../public/uploads', email);
  
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

const uploads = upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'diplomaMarsheet', maxCount: 1 },
    { name: 'gapCertificate', maxCount: 1 },
]);

module.exports={
    uploads,
    upload
}