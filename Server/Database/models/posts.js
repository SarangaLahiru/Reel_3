const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
    type: { type: String },
    count: { type: Number, default: 0 }
});

const CommentSchema = new mongoose.Schema(
    {
        text: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User schema
        createdAt: { type: Date, default: Date.now }
    }
);

const PostSchema = new mongoose.Schema(
    {
    img: [{type:String}],
    title: {type: String, required:true, unique:true},
    description: {type:String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [CommentSchema],
    react: [ReactionSchema]
    
},
{timestamps: true}
    );

 module.exports = mongoose.model("Post", PostSchema);