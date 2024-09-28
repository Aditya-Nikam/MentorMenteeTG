const loginServices = require('../services/login') 
exports.login = async (req, res)=>{
    try {
        // console.log(req.body)
        const loginService = await loginServices.login(req.body);
        // console.log(loginService);
        res.json(loginService);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};