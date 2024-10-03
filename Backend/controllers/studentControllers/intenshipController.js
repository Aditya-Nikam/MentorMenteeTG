const internshipDetailsServices = require('../../services/studentServices/internshipDetailsServices')
exports.internshipDetails = async (req, res)=>{
    try {
        const internshipDetailsService = await internshipDetailsServices.intdetails(req.body, req.files);
        res.json(internshipDetailsService);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};