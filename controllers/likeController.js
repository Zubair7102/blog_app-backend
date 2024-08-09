// import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like a post
exports.likePost = async (req, res) => {
    try{
        const {post, user} = req.body
        const like = new like({
            post, user
        });

        const savedLike = await like.save();

        // update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true});
        

        res.status(200).json({
            post: updatedPost,
            success: true,
            message: "Successfull"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            error: "Error while fetching post"
        });
    }
}