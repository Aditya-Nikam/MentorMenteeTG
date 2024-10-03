const etcActivityServices = require('../../services/studentServices/etcActivityService')

exports.etcActivity = async (req, res)=>{
    try {
        const etcActivityService = await etcActivityServices.etcActivity(req.body, req.files);
        res.json(etcActivityService);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};