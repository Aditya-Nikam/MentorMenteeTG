const loginServices = require('../services/login') 
exports.login = async (req, res)=>{
    try {
        const loginService = await loginServices.login(req.body);
        res.json(loginService);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};