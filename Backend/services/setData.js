const { connection } = require('../config/dbconfig');

const setData = (req, res) => {
    // console.log("hehe")
    console.log(req.body);
    const { personalInfo, semesters, internshipInfo, achievements } = req.body;
    const {email} = personalInfo;
    setPersonalInfo(personalInfo);
    setSemesterInfo(semesters, email);
    setInternshipInfo(internshipInfo, email);

}

const setPersonalInfo = (personalInfo) => {
    const personalInfoQuery = `
    INSERT INTO \`mentor\`.\`studentinfo\` (id, name, program, branch, email, phone, dob)
    VALUES ((SELECT id FROM \`mentor\`.\`login\` WHERE email = ?), ?, ?, ?, ?, ?, ?);`;

    const { name, program, branch, email, phone, dob } = personalInfo;

    connection.query(personalInfoQuery, [email, name, program, branch, email, phone, dob], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data into database.');
            return;
        }
        // res.status(201).json({ message: 'Data added successfully' });
    });
}

const setSemesterInfo = (semesters,email) => {
    const semQuery = `
    INSERT INTO \`mentor\`.\`cgpadetails\` (id, semester, grade, internalkt, externalkt, totalkt, aggrigate)
    VALUES ((SELECT id FROM \`mentor\`.\`login\` WHERE email = ?), ?, ?, ?, ?, ?, ?);`;

    for (const sem in semesters) {
        console.log(sem);
        const { semester, grade, internalKT, externalKT, totalKT, aggregate } = semesters[sem];

        // console.log(semester, grade, internalkt, externalkt, totalkt, aggrigate);

        connection.query(semQuery, [email, semester, grade, internalKT, externalKT, totalKT, aggregate], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error inserting data into database.');
                return;
            }
            // res.status(201).json({ message: 'Data added successfully' });
        });
    }
}

const setInternshipInfo = (internshipInfo, email)=>{
    const query = `
    INSERT INTO \`mentor\`.\`internshipinfo\` (id, organization, year, role, periodFrom, periodTo, stipend, mode)
    VALUES ((SELECT id FROM \`mentor\`.\`login\` WHERE email = ?), ?, ?, ?, ?, ?, ?, ?);`;

    for (const info in internshipInfo) {
        console.log(info);
        const {organization, year, role, periodFrom, periodTo, stipend, mode} = internshipInfo[info];


        connection.query(query, [email, organization, year, role, periodFrom, periodTo, stipend, mode], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error inserting data into database.');
                return;
            }
            // res.status(201).json({ message: 'Data added successfully' });
        });
    }
} 
module.exports = {
    setData,
};
