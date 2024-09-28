const personaldetailsServices = require('../../services/studentServices/personaldetailsService');
exports.personaldetails = async (req, res)=>{
    try {
        const personaldetailsService = await personaldetailsServices.personaldetails(req.body);
        res.json(personaldetailsService);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};