const mentorServices = require('../../services/mentorServices/mentorServices')
exports.allMentors = async(req,res) => {
    const allMentors = await mentorServices.allMentors();
    res.json(allMentors);
}