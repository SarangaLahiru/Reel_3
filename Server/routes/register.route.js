const express = require('express');
const User = require('../Database/models/users');  
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {firstname, secondname, email, password, age } = req.body;

         // Check if the email already exists
         const existingUser = await User.findOne({ email });
         if (existingUser) {
             return res.status(400).json({
                 status: 'failed',
                 message: 'Email already exists'
             });
         }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const user = new User({firstname, secondname, email, password: hashedPassword, age });

        // Save the user to the database
        await user.save();

        // Send a success response
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        console.error('Error details:', err);
        
        let errorMessage;

        if (err.code === 11000) {
            // Handle duplicate key error
            errorMessage = 'Duplication Error';
        } else if (err.name === 'ValidationError') {
            // Handle Mongoose validation error
            errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
        } else {
            // Generic error message
            errorMessage = err.message;
        }

        // Send a failed response
        res.status(500).json({
            status: 'failed',
            message: errorMessage
        });
    }
});

module.exports = router;