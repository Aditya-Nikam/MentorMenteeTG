const studentServices = require('../../services/studentServices/studentServices')
exports.allStudents = async(req,res) => {
    const allStudents = await studentServices.allStudents();
    res.json(allStudents);
}