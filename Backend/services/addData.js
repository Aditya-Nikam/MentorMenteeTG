
const addData = (req, res) => {
    console.log(req.body);
    console.log(__dirname);
    res.json({ message: "Successfully uploaded files" });
};

module.exports = {
    addData
};
