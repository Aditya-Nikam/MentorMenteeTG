const registerServices = require('../services/register')
exports.register = async (req, res)=>{
    try {
        const register = await registerServices.register(req.body);
        res.json(register);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};