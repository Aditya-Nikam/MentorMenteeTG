const carrierPathServices = require('../../services/studentServices/careerPathService')

exports.carrierPath = async (req, res)=>{
    try {
        const carrierPathService = await carrierPathServices.carrierPath(req.body);
        res.json(carrierPathService);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};