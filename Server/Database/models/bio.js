const mongoose = require("mongoose")

const bioSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    profession: [String],
    city: String,
    education: [String],
    experience: [String],
    awards: [String]
});


const Bio = mongoose.model('Bio',bioSchema);
module.exports = Bio;