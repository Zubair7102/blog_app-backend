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
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
        .populate("likes").exec();

        res.status(200).json({
            post: updatedPost,
            success: true,
            message: "Successfull"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            error: "Error while Liking post"
        });
    }
}

// Unlike a post 
exports.unlikePost = async(req, res) =>{
    try{
        const{post, like} = req.body;
        // find and delete the like from the collection
        const deletedLike = await Like.findOneAndDelete({post: post, _id:like});
        // findOneAndDelete():This is a Mongoose method that finds the first document matching the query criteria and deletes it from the collection.
        // post: post: This part of the query looks for a Like document that is associated with the specified post. post is a variable representing the ID of the post in question.
        // _id: like: This part of the query looks for a Like document with the specified _id, where like is a variable representing the ID of the like you want to delete.
        // deletedLike: This variable will hold the deleted Like document, including its _id, which is important for the next step.
        
        // update the post collection 
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true});
        // post: This is the ID of the post you want to update, which you pass to findByIdAndUpdate() to locate the specific post document.
        // $pull: This is a MongoDB operator that removes elements from an array that match a specified condition.
        // { likes: deletedLike._id }: This tells MongoDB to remove the deletedLike._id from the likes array in the Post document. The likes array stores the IDs of all the likes associated with that post.

        res.status(200).json({
            post: updatedPost,
            success: true,
            message: "Successfull"
        })


    }
    catch(error)
        {
            return res.status(500).json({
                error: "Error while Unliking post"
            });
        }
}