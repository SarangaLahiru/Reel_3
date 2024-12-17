const router = require("express").Router();
const Post = require("../Database/models/posts")
const User = require("../Database/models/users");

router.get("/", async(req, res) => {
    
    
    try {
     
        const posts = await Post.find({});

        // Fetch author details separately
        const userIds = posts
            .filter(post => post.author)  // Ensure post has an author
            .map(post => post.author);
        const users = await User.find({ _id: { $in: userIds } });

        // Create a map for quick access to user details
        const userMap = {};
        users.forEach(user => {
            userMap[user._id.toString()] = user;  // Convert ObjectId to string for consistent key type
        });

        // Format posts with user details
        const formattedPosts = posts.map(post => {
            if (!post.author) return { ...post._doc, user: null };
            const user = userMap[post.author.toString()];  // Convert ObjectId to string for consistent key type
            return {
                ...post._doc,
                user: user ? {
                    firstname: user.firstname,
                    secondname: user.secondname,
                    username: `${user.firstname} ${user.secondname}`
                } : null
            };
        });

        console.log('Formatted posts:', formattedPosts);
        res.status(200).json({
            status: 'success',
            data: {
                posts: formattedPosts
            }
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

module.exports = router;