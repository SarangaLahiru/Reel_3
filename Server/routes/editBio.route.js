const router = require("express").Router();
const Bio = require("../Database/models/bio");
const User = require("../Database/models/users"); 
const mongoose = require('mongoose');
//const { authenticate } = require('../middleware/auth');

router.post('/', async (req, res) => {
    

    console.log('Request body:', req.body); // Log the request body
    const { userId, profession, city, education, experience, awards } = req.body;

        
        try {
            // Validate input data
            if (!userId || !profession || !city || !education || !experience || !awards) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
            // Convert userId to ObjectId (validate if it's a valid ObjectId)
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid userId format' });
            }
    
            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Check if the user already has a bio
            let bio = await Bio.findOne({ userId: userId });

            const parseField = (field) => {
                if (Array.isArray(field)) {
                    return field;
                }
                return field.split(',').map(item => item.trim());
            };
    
            if (!bio) {
                // If no bio exists, create a new one
                bio = new Bio({
                    userId: userId,
                    
                profession: parseField(profession),
                city,
                education: parseField(education),
                experience: parseField(experience),
                awards: parseField(awards)
                });
    
                await bio.save();
            } else {
                // If bio exists, update it
                /*bio.profession = profession.split(',').map(item => item.trim());
                bio.city = city;
                bio.education = education.split(',').map(item => item.trim());
                bio.experience = experience.split(',').map(item => item.trim());
                bio.awards = awards.split(',').map(item => item.trim());*/

                bio.profession = parseField(profession);
                bio.city = city;
                bio.education = parseField(education);
                bio.experience = parseField(experience);
                bio.awards = parseField(awards);
    
                await bio.save();
            }
    
            res.status(200).json(bio);
        } catch (error) {
            console.error('Error updating or creating bio:', error);
            res.status(500).json({ message: 'Server error' });
        }
});
    



module.exports = router;