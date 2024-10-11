const personaldetailsServices = require('../../services/studentServices/personaldetailsService');
exports.personaldetails = async (req, res)=>{
    try {
        const personaldetailsService = await personaldetailsServices.personaldetails(req.body);
        res.json(personaldetailsService);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};

exports.getStudent =  async (req, res)=>{
  try {
      const getStudentdetails = await personaldetailsServices.getStudentdetails(req.body.email);
      res.json(getStudentdetails);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

exports.getParent  =  async (req, res)=>{
  try {
      const getParentdetails = await personaldetailsServices.getParentdetails(req.body.email);
      res.json(getParentdetails);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};
