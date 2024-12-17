const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    img: [{type:String}],
    title: {type: String, required:true},
    description: {type: String, required:true},
    contact:{type:String, required:true},
    province: { type: String, required: true },
    isPaid:{
        type: Boolean, default:false
    }

},
{timestamps: true}
    );


const Job = mongoose.model('jobs', JobSchema);
module.exports = Job;