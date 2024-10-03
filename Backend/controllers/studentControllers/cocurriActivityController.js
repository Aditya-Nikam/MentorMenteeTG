const cocurrActivityServices = require('../../services/studentServices/cocurriActivityService')

exports.cocurrActivity = async (req, res)=>{
    try {
        const cocurrActivityService = await cocurrActivityServices.cocurrAct(req.body, req.files);
        res.json(cocurrActivityService);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
};