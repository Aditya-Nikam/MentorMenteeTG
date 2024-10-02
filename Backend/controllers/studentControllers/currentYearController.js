const cyDetailsServices = require('../../services/studentServices/cyDetailsService')
exports.cydetails = async (req, res)=>{
    try {
        const cyDetailsService = await cyDetailsServices.cydetails(req.body);
        res.json(cyDetailsService);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};