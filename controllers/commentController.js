// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel")

exports.createComment = async(req, res) => {
    // exports.createComment: This is exporting the createComment function so that it can be used in other files, typically in route handling. In an Express app, you might import this function and associate it with a route.
    try{
        // fetch data from req body
        const {post, user, body} = req.body;
        // const { post, user, body } = req.body;: This line uses destructuring to extract the post, user, and body fields from the request body (req.body).
        // req.body: This is where Express stores the data sent by the client in a POST request, typically in JSON format.

        // create a new comment object and insert in the Database
        const comment = new Comment({
            post, user, body
        });
        // new Comment({ ... }): This creates a new instance of the Comment model, which is an object representing a comment. The fields post, user, and body are being passed in, and these are the fields that will be stored in the database.

        // save the new comment into the database
        const savedComment = await comment.save();
        // here create method can also be used instead of save method here save is used primarily just for learning new methos
        // await: This keyword pauses the function execution until the comment.save() operation is complete, allowing the function to wait for the result of the save operation.
        // comment.save(): This is a method provided by Mongoose, and it saves the new Comment object to the MongoDB database. When you call save(), Mongoose inserts the new comment into the appropriate collection.


        // we will also be making changes into the post model by adding this comment into the array of the post model
        // find the post by ID, add the new commentto its comments array
        // here we are adding the new created and saved comment into the array of teh comment in post model by following steps:
        // the newly saved comment can be accessed using savedComment._id this new comment is obvious done on a post so get that post id
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true} )
        // Post.findByIdAndUpdate(), post ke collection ke andar findByIdAndUpdate() method use karo aur aur line 9 pe jo post hai usko fetch karo and uss post ke comment ke array ke andar savedComment ko uski id ka use karke insert or push kardo and post ko update karr do 
        // { new: true }: This option tells Mongoose to return the updated document rather than the old document before the update.
        .populate("comments") //populate the comments array with comment documents
        // .populate("comments"): After updating the post, this method replaces the comments ID with the actual comment documents.
        .exec();
        // .exec(): This method executes the query. Mongoose queries are not executed immediately; they are defined first and then executed with .exec() or by using await.

        res.status(200).json({
            post: updatedPost,
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
}






// Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
// Post.findByIdAndUpdate(): This is a Mongoose method used to find a document by its ID and update it. In this case, it’s used to find a post by its ID and add a new comment to its comments array.

// post: This is the ID of the post you want to update. It should be the value of the post variable, which is likely a string representing the ObjectId of the post.

// { $push: { comments: savedComment._id } }: This is the update operation.

// $push: This MongoDB operator adds an item to an array field. In this case, it adds the ID of the newly created comment (savedComment._id) to the comments array of the post.

// https://chatgpt.com/share/b72086ab-c52b-41ca-a995-01bfd64423ba 
// if can't understand read this 