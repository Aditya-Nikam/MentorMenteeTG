const pyDetailsServices = require('../../services/studentServices/pyDetailsService')
exports.pydetails = async (req, res)=>{
    try {
        const pyDetailsService = await pyDetailsServices.pydetails(req.body, req.files);
        res.json(pyDetailsService);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};