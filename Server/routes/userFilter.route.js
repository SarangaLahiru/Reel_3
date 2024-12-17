const router = require("express").Router();
const Bio = require("../Database/models/bio");
const User = require("../Database/models/users");

router.get("/", async (req, res) => {
   
     try {
        const { name, city, profession } = req.query;
        let bioQuery = {};
        let userQuery = {};

        if (name) {
            userQuery.$or = [
                { firstname: new RegExp(name, 'i') },
                { secondname: new RegExp(name, 'i') }
            ];
        }
        if (city) bioQuery.city = city;
        if (profession) bioQuery.profession = new RegExp(profession, 'i'); 

        const users = await User.find(userQuery).select('_id firstname secondname profilePicture');
        const userIds = users.map(user => user._id);
        bioQuery.userId = { $in: userIds };

        const bios = await Bio.find(bioQuery);
        const biosWithUserDetails = bios.map(bio => {
            const user = users.find(u => u._id.equals(bio.userId));
            return {
                ...bio._doc,
                user
            };
        });

        res.status(200).json({
            status: 'success',
            data: biosWithUserDetails
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

module.exports = router;
