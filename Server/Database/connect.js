const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    // Return the connection promise
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
