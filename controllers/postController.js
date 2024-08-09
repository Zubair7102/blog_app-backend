const Post = require("../models/postModel");
exports.createPost = async (req, res) => {
    try{
        const { title, body} = req.body;
        const post = new Post({
            title, body
        });

        const savedPost = await post.save();
        res.status(200).json({
            post: savedPost,
            success: true,
            message: "Successfull"
        })
    }
    catch(error)
    {
        console.error(error);
        console.log(error)
        return res.status(500).json({
            error: "Error while creating comment"
        });
    }
};

exports.getAllPosts = async(req, res) =>{
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.status(200).json({
            posts,
        })
        
    }
    catch(error)
    {
        return res.status(500).json({
            error: "Error while fetching post"
        });
    }
}