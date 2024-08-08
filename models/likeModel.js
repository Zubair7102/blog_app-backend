// import mongoose
const mongoose = require("mongoose");

// route Handler
const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    // n MongoDB, every document (like a post or comment) has a unique identifier called an ObjectId. This ID is a special string of characters that MongoDB generates to uniquely identify each document.
    // When you define a field in a Mongoose schema with type: mongoose.Schema.Types.ObjectId, you're telling Mongoose that this field will store one of these unique ObjectIds.
    ref: "Post",
    // ref: "Post": This means that the ObjectId stored in this field is an ID from the Post model
    // The ref option tells Mongoose which model this ObjectId is referencing.
  },
  user: {
    type: String,
    required: true,
  },
});

// export
module.exports = mongoose.model("Like", likeSchema);

// mongoose.model():
// This is a Mongoose method that creates a model.
// It takes two main arguments:
// The name of the model (in this case, "Like").
// The schema that defines the structure of the documents in this model (in this case, likeSchema).

// "Like":
// This is the name of your model.
// In MongoDB, Mongoose will automatically create a collection with the pluralized version of this name, so "Like" becomes the "likes" collection in your database.

// likeSchema:
// This is the schema that you’ve defined earlier in your code, which specifies the structure of the documents in the likes collection.
// The schema defines what fields each document will have, the types of those fields, and any other constraints or options.

// module.exports:
// This is a Node.js feature that allows you to export something from a file so that it can be used in other files.
// By exporting the model, you're making it available to be imported and used in other parts of your application.
